import { NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, parseToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // next/headers cookies() not accessible here; read via Request cookies is handled by Next
    // But in route handlers, NextResponse/Request manage cookies automatically.
    // We'll rely on the cookie header being parsed by Next.
    // Since we don't have the Request object here, use a workaround: use NextResponse.next()? Not available.
    // Simpler: Move logic into a server action-like function using headers(). But here we can read from cookies via next/headers.
    // Use next/headers to access cookies in route handler.
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    const parsed = parseToken(token);
    if (!parsed) {
      return NextResponse.json({ authenticated: false });
    }
    return NextResponse.json({ authenticated: true, user: { username: parsed.username, role: parsed.role } });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}


