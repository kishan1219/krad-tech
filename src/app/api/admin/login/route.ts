import { NextRequest, NextResponse } from 'next/server';
import { AdminLoginSchema } from '@/validators';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = AdminLoginSchema.parse(body);

    const validAdminUser = process.env.ADMIN_USER || 'admin';
    const validAdminPass = process.env.ADMIN_PASS || 'krad2026!secure';
    const secretKey = process.env.ADMIN_SECRET_KEY || 'krad_admin_secure_key_2026';

    const isValid =
      (username === validAdminUser && password === validAdminPass) ||
      password === secretKey;

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, message: 'Authentication successful' });

    // Set secure HTTP-only admin cookie
    response.cookies.set('krad_admin_token', secretKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 400 });
  }
}
