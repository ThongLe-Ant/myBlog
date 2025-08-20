
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
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

export default function RootLayout({
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
            <Header />
            <main className="flex-grow">{children}</main>
            <AppFooter />
            <Toaster />
            <GoToTopButton />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
