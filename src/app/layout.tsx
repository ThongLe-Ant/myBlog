
import type { Metadata } from 'next';
import { AuthSessionProvider } from '@/components/auth-session-provider';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import 'highlight.js/styles/github-dark.css';
import { Header } from '@/components/layout/header';
import { AppFooter } from '@/components/layout/app-footer';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/language-context';
import { ThemeProvider } from '@/components/theme-provider';
import { GoToTopButton } from '@/components/layout/go-to-top-button';

export const metadata: Metadata = {
  title: 'Le Minh Thong - Senior Software Engineer | Solution Architect',
  description: 'The personal blog of Le Minh Thong, sharing knowledge, experience, and projects in software engineering, system architecture, and motion design.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen">
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthSessionProvider>
              <Header />
              <main className="flex-grow">{children}</main>
              <AppFooter />
              <Toaster />
              <GoToTopButton />
            </AuthSessionProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
