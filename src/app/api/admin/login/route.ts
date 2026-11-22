import { NextRequest, NextResponse } from 'next/server';
import { AdminLoginSchema } from '@/validators';
import { verifyAdminCredentials } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = AdminLoginSchema.parse(body);

    const isValid = verifyAdminCredentials(username, password);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const secretKey = process.env.ADMIN_SECRET_KEY || 'krad_admin_secure_key_2026';
    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      token: secretKey,
    });

    // Set secure HTTP-only admin cookie
    response.cookies.set('krad_admin_token', secretKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
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
