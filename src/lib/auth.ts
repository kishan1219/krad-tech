import crypto from 'crypto';

/**
 * Timing-safe string comparison to protect against side-channel timing attacks
 * Hashes inputs with SHA-256 before comparing to guarantee constant length and time.
 */
export function timingSafeCompare(a?: string | null, b?: string | null): boolean {
  if (!a || !b) return false;
  try {
    const hashA = crypto.createHash('sha256').update(String(a)).digest();
    const hashB = crypto.createHash('sha256').update(String(b)).digest();
    return crypto.timingSafeEqual(hashA, hashB);
  } catch {
    return false;
  }
}

/**
 * Validates admin credentials against configured environment variables
 */
export function verifyAdminCredentials(user: string, pass: string): boolean {
  const validUser = process.env.ADMIN_USER || 'admin';
  const validPass = process.env.ADMIN_PASS || 'krad2026!secure';
  const validSecret = process.env.ADMIN_SECRET_KEY || 'krad_admin_secure_key_2026';

  const userMatch = timingSafeCompare(user, validUser);
  const passMatch = timingSafeCompare(pass, validPass);
  const secretMatch = timingSafeCompare(pass, validSecret);

  return (userMatch && passMatch) || secretMatch;
}

/**
 * Validates request authorization token or cookie against the secret key
 */
export function verifyAdminToken(token?: string | null): boolean {
  if (!token) return false;
  const validSecret = process.env.ADMIN_SECRET_KEY || 'krad_admin_secure_key_2026';
  return timingSafeCompare(token, validSecret);
}
