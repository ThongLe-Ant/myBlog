// Edge-compatible token verification for middleware (uses Web Crypto API)

export const AUTH_COOKIE_NAME = 'auth_token';

function toHex(arrayBuffer: ArrayBuffer): string {
  const bytes = new Uint8Array(arrayBuffer);
  let hex = '';
  for (let i = 0; i < bytes.length; i++) {
    const h = bytes[i].toString(16).padStart(2, '0');
    hex += h;
  }
  return hex;
}

function base64UrlDecode(input: string): string {
  // atob handles base64 (not url). Convert to base64 first.
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  // Add padding
  const pad = base64.length % 4;
  const padded = base64 + (pad ? '='.repeat(4 - pad) : '');
  const binary = typeof atob !== 'undefined' ? atob(padded) : Buffer.from(padded, 'base64').toString('binary');
  let str = '';
  for (let i = 0; i < binary.length; i++) {
    str += String.fromCharCode(binary.charCodeAt(i));
  }
  // Decode UTF-8
  try {
    return decodeURIComponent(escape(str));
  } catch {
    return str;
  }
}

export async function verifyTokenEdge(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.AUTH_SECRET;
  if (!secret) return false;
  try {
    const decoded = base64UrlDecode(token);
    const parts = decoded.split(':');
    if (parts.length !== 5) return false;
    const [username, role, issuedAtStr, nonce, sig] = parts;
    const payload = `${username}:${role}:${issuedAtStr}:${nonce}`;

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const signature = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
    const expectedSig = toHex(signature);

    if (expectedSig.length !== sig.length) return false;
    // timing-safe compare
    let isEqual = 0;
    for (let i = 0; i < expectedSig.length; i++) {
      isEqual |= expectedSig.charCodeAt(i) ^ sig.charCodeAt(i);
    }
    return isEqual === 0;
  } catch {
    return false;
  }
}

export async function parseTokenEdge(token: string | undefined | null): Promise<{ username: string; role: 'superadmin' | 'user' } | null> {
  if (!token) return null;
  const valid = await verifyTokenEdge(token);
  if (!valid) return null;
  try {
    const decoded = base64UrlDecode(token);
    const parts = decoded.split(':');
    if (parts.length !== 5) return null;
    const [username, role] = parts as [string, 'superadmin' | 'user', string, string, string];
    return { username, role };
  } catch {
    return null;
  }
}

export async function isSuperAdminEdge(token: string | undefined | null): Promise<boolean> {
  const parsed = await parseTokenEdge(token);
  return parsed?.role === 'superadmin';
}


