import crypto from 'crypto';

export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

function getSigningSecret(): string | null {
  const secret = process.env.ADMIN_SECRET_KEY?.trim();
  return secret && secret.length > 0 ? secret : null;
}

function toBase64Url(input: Buffer | string): string {
  const buf = typeof input === 'string' ? Buffer.from(input, 'utf8') : input;
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(input: string): string {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((input.length + 3) % 4);
  return Buffer.from(padded, 'base64').toString('utf8');
}

/**
 * Timing-safe string comparison to protect against side-channel timing attacks.
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
 * Returns true only when ADMIN_USER, ADMIN_PASS, and ADMIN_SECRET_KEY are configured.
 */
export function isAdminAuthConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_USER?.trim() &&
      process.env.ADMIN_PASS &&
      getSigningSecret()
  );
}

/**
 * Validates admin credentials strictly against configured environment variables (fail-closed).
 */
export function verifyAdminCredentials(user: string, pass: string): boolean {
  const validUser = process.env.ADMIN_USER?.trim();
  const validPass = process.env.ADMIN_PASS;
  if (!validUser || !validPass) return false;

  const userMatch = timingSafeCompare(user.trim(), validUser);
  const passMatch = timingSafeCompare(pass, validPass);

  return userMatch && passMatch;
}

/**
 * Creates a signed, expiring HMAC-SHA256 session token (never exposes the raw secret).
 */
export function createAdminSessionToken(username: string): string | null {
  const secret = getSigningSecret();
  if (!secret) return null;

  const nowSec = Math.floor(Date.now() / 1000);
  const payload = {
    sub: username,
    iat: nowSec,
    exp: nowSec + ADMIN_SESSION_TTL_SECONDS,
    jti: crypto.randomUUID(),
  };

  const payloadB64 = toBase64Url(JSON.stringify(payload));
  const sig = crypto
    .createHmac('sha256', secret)
    .update(payloadB64)
    .digest();

  return `${payloadB64}.${toBase64Url(sig)}`;
}

/**
 * Verifies HMAC-SHA256 signature and strict expiration timestamp (`exp`).
 */
export function verifyAdminToken(token?: string | null): boolean {
  const secret = getSigningSecret();
  if (!secret || !token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payloadB64, sigB64] = parts;
  if (!payloadB64 || !sigB64) return false;

  const expectedSig = toBase64Url(
    crypto.createHmac('sha256', secret).update(payloadB64).digest()
  );

  if (!timingSafeCompare(sigB64, expectedSig)) {
    return false;
  }

  try {
    const payload = JSON.parse(fromBase64Url(payloadB64)) as { exp?: unknown; sub?: unknown };
    const nowSec = Math.floor(Date.now() / 1000);
    if (typeof payload.exp !== 'number' || payload.exp <= nowSec) {
      return false;
    }
    return typeof payload.sub === 'string' && payload.sub.length > 0;
  } catch {
    return false;
  }
}
