import { NextResponse } from 'next/server';
import { authenticateWithEnv, setAuthCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
    }

    const hasSuper = Boolean(process.env.SUPER_ADMIN_USERNAME && process.env.SUPER_ADMIN_PASSWORD);
    const hasUser = Boolean(process.env.AUTH_USERNAME && process.env.AUTH_PASSWORD);
    if (!process.env.AUTH_SECRET) {
      console.warn('[AUTH][DEBUG] AUTH_SECRET missing');
      return NextResponse.json({ ok: false, error: 'Server not configured: AUTH_SECRET missing' }, { status: 500 });
    }
    if (!hasSuper && !hasUser) {
      console.warn('[AUTH][DEBUG] No credentials set (SUPER_ADMIN_* or AUTH_*)');
      return NextResponse.json({ ok: false, error: 'Server not configured: No credentials set' }, { status: 500 });
    }

    if (process.env.AUTH_DEBUG === '1' || (process.env.AUTH_DEBUG ?? '').toLowerCase() === 'true') {
      console.log('[AUTH][DEBUG] /api/login attempt', { username });
    }

    const result = await authenticateWithEnv(username, password);
    if (!result.ok) {
      console.warn('[AUTH][DEBUG] /api/login unauthorized for', { username });
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    await setAuthCookie(result.token);
    if (process.env.AUTH_DEBUG === '1' || (process.env.AUTH_DEBUG ?? '').toLowerCase() === 'true') {
      console.log('[AUTH][DEBUG] /api/login success', { username: result.username, role: result.role });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[AUTH][DEBUG] /api/login exception', err);
    return NextResponse.json({ ok: false, error: 'Bad Request' }, { status: 400 });
  }
}


