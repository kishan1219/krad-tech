import { NextRequest, NextResponse } from 'next/server';
import { ContactFormSchema } from '@/validators';
import { saveContactInquiry } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limiter';
import { sanitizeObject } from '@/lib/sanitize';

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction for distributed rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown-client';
    const rateCheck = await checkRateLimit(ip, 6, 300000); // 6 requests per 5 minutes

    if (!rateCheck.success) {
      return NextResponse.json(
        { error: `Too many submissions. Please wait ${rateCheck.resetInSeconds} seconds before trying again.` },
        { status: 429 }
      );
    }

    // 2. Parse & validate request payload with Zod
    const body = await req.json();
    const validated = ContactFormSchema.parse(body);

    // 3. Honeypot bot protection
    if (validated._hp_company_field && validated._hp_company_field.length > 0) {
      // Silently accept bot submission to prevent bot retraining
      return NextResponse.json({ success: true, message: 'Inquiry received' });
    }

    // 4. Input sanitization (strip dangerous HTML/scripts/control characters)
    const sanitized = sanitizeObject({
      name: validated.name,
      email: validated.email,
      phone: validated.phone || undefined,
      subject: validated.subject,
      service: validated.service || undefined,
      message: validated.message,
    });

    // 5. Save to Supabase PostgreSQL (with disk fallback)
    const saved = await saveContactInquiry(sanitized);

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been successfully transmitted to the KRAD Technology engineering team.',
      leadId: saved?.id,
    });
  } catch (error: unknown) {
    console.error('Contact API error:', error);
    if (error && typeof error === 'object' && 'errors' in error) {
      const errObj = error as { errors?: Array<{ message?: string }> };
      if (Array.isArray(errObj.errors)) {
        return NextResponse.json(
          { error: errObj.errors[0]?.message || 'Validation error' },
          { status: 400 }
        );
      }
    }
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please try again later.' },
      { status: 500 }
    );
  }
}
