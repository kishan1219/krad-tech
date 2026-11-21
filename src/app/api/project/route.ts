import { NextRequest, NextResponse } from 'next/server';
import { ProjectRequirementSchema } from '@/validators';
import { saveProjectRequirement } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limiter';
import { sanitizeObject } from '@/lib/sanitize';

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown-client';
    const rateCheck = await checkRateLimit(ip, 6, 300000);

    if (!rateCheck.success) {
      return NextResponse.json(
        { error: `Too many submissions. Please wait ${rateCheck.resetInSeconds} seconds before trying again.` },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validated = ProjectRequirementSchema.parse(body);

    if (validated._hp_company_field && validated._hp_company_field.length > 0) {
      return NextResponse.json({ success: true, message: 'Requirements received' });
    }

    const sanitized = sanitizeObject({
      client_name: validated.client_name,
      work_email: validated.work_email,
      phone: validated.phone,
      company_name: validated.company_name || undefined,
      country: validated.country || undefined,
      project_title: validated.project_title,
      service_category: validated.service_category,
      description: validated.description,
      target_platforms: validated.target_platforms,
      preferred_stack: validated.preferred_stack || undefined,
      estimated_budget: validated.estimated_budget,
      timeline: validated.timeline,
      priority: validated.priority || 'Standard',
      scope_notes: validated.scope_notes || undefined,
    });

    const saved = await saveProjectRequirement(sanitized);

    return NextResponse.json({
      success: true,
      message: 'Project requirements received successfully.',
      leadId: saved?.id,
    });
  } catch (error: unknown) {
    console.error('Project API error:', error);
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
      { error: 'Failed to process project requirements.' },
      { status: 500 }
    );
  }
}
