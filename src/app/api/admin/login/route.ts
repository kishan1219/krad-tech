import { NextRequest, NextResponse } from 'next/server';
import { AdminLoginSchema } from '@/validators';
import {
  ADMIN_SESSION_TTL_SECONDS,
  createAdminSessionToken,
  isAdminAuthConfigured,
  verifyAdminCredentials,
} from '@/lib/auth';
import { checkRateLimit } from '@/lib/rate-limiter';

export async function POST(req: NextRequest) {
  try {
    if (!isAdminAuthConfigured()) {
      return NextResponse.json(
        { error: 'Admin authentication is not configured on this server.' },
        { status: 503 }
      );
    }

    const ip =
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown';

    const rateCheck = await checkRateLimit(`admin_login_${ip}`, 5, 15 * 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: `Too many login attempts. Try again in ${rateCheck.resetInSeconds}s.` },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { username, password } = AdminLoginSchema.parse(body);

    const isValid = verifyAdminCredentials(username, password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const sessionToken = createAdminSessionToken(username);
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Admin session signing secret is not configured.' },
        { status: 503 }
      );
    }
    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      expiresIn: ADMIN_SESSION_TTL_SECONDS,
    });

    response.cookies.set('krad_admin_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: ADMIN_SESSION_TTL_SECONDS,
    });

    return response;
  } catch (err: unknown) {
    const errObj = err as { errors?: Array<{ message?: string }> };
    return NextResponse.json(
      { error: errObj?.errors?.[0]?.message || 'Authentication failed' },
      { status: 400 }
    );
  }
}
