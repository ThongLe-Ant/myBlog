import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Header } from '@/components/layout/header';
import { AppFooter } from '@/components/layout/app-footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Lê Minh Thông - Senior Software Engineer | Solution Architect',
  description: 'Trang blog cá nhân của Lê Minh Thông, nơi chia sẻ kiến thức, kinh nghiệm và các dự án về công nghệ phần mềm, kiến trúc hệ thống và thiết kế chuyển động.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${GeistSans.variable} ${GeistMono.variable} dark`} suppressHydrationWarning>
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
