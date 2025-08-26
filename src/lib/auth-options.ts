import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

function getEnvOptional(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const username = credentials?.username ?? '';
        const password = credentials?.password ?? '';

        const superUser = getEnvOptional('SUPER_ADMIN_USERNAME') ?? getEnvOptional('SUPER_ADMIN_EMAIL');
        const superPass = getEnvOptional('SUPER_ADMIN_PASSWORD');
        const user = getEnvOptional('AUTH_USERNAME');
        const pass = getEnvOptional('AUTH_PASSWORD');

        const candidates: Array<{ u?: string; p?: string; role: 'superadmin' | 'user' }> = [
          { u: superUser, p: superPass, role: 'superadmin' },
          { u: user, p: pass, role: 'user' },
        ];

        for (const c of candidates) {
          if (!c.u || !c.p) continue;
          if (username === c.u && password === c.p) {
            return { id: c.role, name: username, email: username, role: c.role } as any;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as any).role = (user as any).role ?? 'user';
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).role = (token as any).role ?? 'user';
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};


