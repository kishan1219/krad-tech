import { NextRequest, NextResponse } from 'next/server';
import { ProjectRequirementSchema } from '@/validators';
import { saveProjectRequirement } from '@/lib/db';
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
    const validated = ProjectRequirementSchema.parse(body);

    if (validated._hp_company_field && validated._hp_company_field.length > 0) {
      return NextResponse.json({ success: true, message: 'Requirements received' });
    }

    const saved = await saveProjectRequirement({
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

    return NextResponse.json({
      success: true,
      message: 'Project requirements received successfully.',
      leadId: saved?.id,
    });
  } catch (error: any) {
    console.error('Project API error:', error);
    if (error?.errors) {
      return NextResponse.json({ error: error.errors[0]?.message || 'Validation error' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to process project requirements.' }, { status: 500 });
  }
}
