import { cookies } from 'next/headers';
import { randomBytes, createHmac, timingSafeEqual } from 'crypto';

const AUTH_COOKIE_NAME = 'auth_token';
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function getEnvOptional(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

function constantTimeEqualString(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export type UserRole = 'superadmin' | 'user';

export type AuthResult =
  | {
      ok: true;
      token: string;
      role: UserRole;
      username: string;
    }
  | {
      ok: false;
      error: string;
    };

function isDebugEnabled(): boolean {
  const v = process.env.AUTH_DEBUG;
  return v === '1' || (v ?? '').toLowerCase() === 'true';
}

function maskValue(value: string | undefined): string {
  if (!value) return '[unset]';
  if (value.length <= 2) return '*'.repeat(value.length);
  return `${value[0]}***${value[value.length - 1]}(len=${value.length})`;
}

export async function authenticateWithEnv(username: string, password: string): Promise<AuthResult> {
  const secret = getEnv('AUTH_SECRET');

  const superUser = getEnvOptional('SUPER_ADMIN_USERNAME') ?? getEnvOptional('SUPER_ADMIN_EMAIL');
  const superPass = getEnvOptional('SUPER_ADMIN_PASSWORD');
  const user = getEnvOptional('AUTH_USERNAME');
  const pass = getEnvOptional('AUTH_PASSWORD');

  const candidates: Array<{ u?: string; p?: string; role: UserRole }> = [
    { u: superUser, p: superPass, role: 'superadmin' },
    { u: user, p: pass, role: 'user' },
  ];

  if (isDebugEnabled()) {
    // Never print raw password
    console.log('[AUTH][DEBUG] authenticateWithEnv called', {
      providedUsername: username,
      configured: {
        SUPER_ADMIN_USERNAME: maskValue(getEnvOptional('SUPER_ADMIN_USERNAME')),
        SUPER_ADMIN_EMAIL: maskValue(getEnvOptional('SUPER_ADMIN_EMAIL')),
        SUPER_ADMIN_PASSWORD: superPass ? '***' : '[unset]',
        AUTH_USERNAME: maskValue(user),
        AUTH_PASSWORD: pass ? '***' : '[unset]',
        AUTH_SECRET: secret ? `set(len=${secret.length})` : '[unset]',
      },
    });
  }

  let matched: { role: UserRole; username: string } | null = null;

  for (const c of candidates) {
    if (!c.u || !c.p) continue;
    const isUser = constantTimeEqualString(username, c.u);
    const isPass = constantTimeEqualString(password, c.p);
    if (isUser && isPass) {
      matched = { role: c.role, username: c.u };
      break;
    }
  }

  if (!matched) {
    if (isDebugEnabled()) {
      console.log('[AUTH][DEBUG] credential mismatch for provided username', username);
    }
    return { ok: false, error: 'Invalid credentials' };
  }

  const nonce = randomBytes(16).toString('hex');
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = `${matched.username}:${matched.role}:${issuedAt}:${nonce}`;
  const signature = createHmac('sha256', secret).update(payload).digest('hex');
  const token = Buffer.from(`${payload}:${signature}`).toString('base64url');
  if (isDebugEnabled()) {
    console.log('[AUTH][DEBUG] authentication success', { username: matched.username, role: matched.role });
  }
  return { ok: true, token, role: matched.role, username: matched.username };
}

export function verifyToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const secret = getEnv('AUTH_SECRET');
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split(':');
    if (parts.length !== 5) return false;
    const [username, role, issuedAtStr, nonce, sig] = parts;
    const payload = `${username}:${role}:${issuedAtStr}:${nonce}`;
    const expectedSig = createHmac('sha256', secret).update(payload).digest('hex');
    const a = Buffer.from(sig);
    const b = Buffer.from(expectedSig);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function parseToken(token: string | undefined | null): { username: string; role: UserRole } | null {
  if (!token) return null;
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split(':');
    if (parts.length !== 5) return null;
    const [username, role] = parts as [string, UserRole, string, string, string];
    return { username, role };
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: AUTH_COOKIE_MAX_AGE,
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return verifyToken(token);
}

export { AUTH_COOKIE_NAME };



