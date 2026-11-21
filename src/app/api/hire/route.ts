import { NextRequest, NextResponse } from 'next/server';
import { ResourceHireSchema } from '@/validators';
import { saveResourceHire } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limiter';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown-client';
    const rateCheck = await checkRateLimit(ip, 6, 300000);

    if (!rateCheck.success) {
      return NextResponse.json(
        { error: `Too many submissions. Please wait ${rateCheck.resetInSeconds} seconds before trying again.` },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validated = ResourceHireSchema.parse(body);

    if (validated._hp_company_field && validated._hp_company_field.length > 0) {
      return NextResponse.json({ success: true, message: 'Request received' });
    }

    const saved = await saveResourceHire({
      name: validated.name,
      email: validated.email,
      company: validated.company || undefined,
      role: validated.role,
      skills: validated.skills || [],
      seniority: validated.seniority,
      num_resources: validated.num_resources,
      engagement_type: validated.engagement_type,
      start_date: validated.start_date || undefined,
      description: validated.description || undefined,
    });

    return NextResponse.json({
      success: true,
      message: 'Resource request received successfully.',
      leadId: saved?.id,
    });
  } catch (error: any) {
    console.error('Hire API error:', error);
    if (error?.errors) {
      return NextResponse.json({ error: error.errors[0]?.message || 'Validation error' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to submit resource hire inquiry.' }, { status: 500 });
  }
}
