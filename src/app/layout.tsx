
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppFooter } from '@/components/layout/app-footer';
import { GeistSans } from 'geist/font/sans';
import { Header } from '@/components/layout/header';


export const metadata: Metadata = {
  title: 'Lê Minh Thông - Senior Software Engineer | Solution Architect',
  description: 'Portfolio của Lê Minh Thông, một kỹ sư phần mềm với hơn 10 năm kinh nghiệm trong phát triển hệ thống ERP và giải pháp doanh nghiệp.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className="scroll-smooth">
      <body className={`${GeistSans.className} bg-background text-foreground antialiased`}>
        <Header />
        <main className="flex-1">{children}</main>
        <AppFooter />
        <Toaster />
      </body>
    </html>
  );
}
