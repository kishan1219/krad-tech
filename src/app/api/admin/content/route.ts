import { NextRequest, NextResponse } from 'next/server';
import { getSiteContentOverrides, updateSiteContentOverride } from '@/lib/db';
import { ContentOverrideSchema } from '@/validators';
import { verifyAdminToken } from '@/lib/auth';
import { sanitizeString } from '@/lib/sanitize';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const locale = searchParams.get('locale') || 'en';
    const cleanLocale = sanitizeString(locale);

    const overrides = await getSiteContentOverrides(cleanLocale);
    return NextResponse.json(overrides);
  } catch (err: unknown) {
    console.error('Content GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve content' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminToken = req.cookies.get('krad_admin_token')?.value;
    const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');

    if (!verifyAdminToken(adminToken) && !verifyAdminToken(authHeader)) {
      return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
    }

    const body = await req.json();
    const validated = ContentOverrideSchema.parse(body);

    const safeValue = sanitizeString(validated.value);
    const safeId = sanitizeString(validated.id);
    const safeCategory = sanitizeString(validated.category);
    const safeLocale = sanitizeString(validated.locale);

    const result = await updateSiteContentOverride(
      safeId,
      safeCategory,
      safeLocale,
      safeValue
    );

    return NextResponse.json({ success: true, updated: result });
  } catch (err: unknown) {
    console.error('Content POST error:', err);
    const errObj = err as { errors?: Array<{ message?: string }>; message?: string };
    return NextResponse.json(
      { error: errObj?.errors?.[0]?.message || errObj.message || 'Failed to update content' },
      { status: 400 }
    );
  }
}
