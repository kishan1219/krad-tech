import { NextRequest, NextResponse } from 'next/server';
import { getSiteContentOverrides, updateSiteContentOverride } from '@/lib/db';
import { ContentOverrideSchema } from '@/validators';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get('locale') || 'en';

  const overrides = await getSiteContentOverrides(locale);
  return NextResponse.json(overrides);
}

export async function POST(req: NextRequest) {
  try {
    const adminToken = req.cookies.get('krad_admin_token')?.value;
    const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');
    const validSecret = process.env.ADMIN_SECRET_KEY || 'krad_admin_secure_key_2026';

    if (adminToken !== validSecret && authHeader !== validSecret) {
      return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
    }

    const body = await req.json();
    const validated = ContentOverrideSchema.parse(body);

    const result = await updateSiteContentOverride(
      validated.id,
      validated.category,
      validated.locale,
      validated.value
    );

    return NextResponse.json({ success: true, updated: result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update content' }, { status: 400 });
  }
}
