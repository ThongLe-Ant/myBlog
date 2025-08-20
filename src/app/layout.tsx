import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Header } from '@/components/layout/header';
import { AppFooter } from '@/components/layout/app-footer';
import { Toaster } from '@/components/ui/toaster';

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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} dark`} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <div className="noise-bg"></div>
        <Header />
        <main className="container mx-auto px-4 py-8 pt-24 sm:px-6 lg:px-8">
          {children}
        </main>
        <AppFooter />
        <Toaster />
      </body>
    </html>
  );
}
