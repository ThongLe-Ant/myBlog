
'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Mountain } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { href: '#about', label: 'Giới thiệu' },
  { href: '#skills', label: 'Kỹ năng' },
  { href: '#experience', label: 'Kinh nghiệm' },
  { href: '#projects', label: 'Dự án' },
  { href: '#contact', label: 'Liên hệ' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <Link href="#home" className="flex items-center gap-2 font-bold">
        <Mountain className="h-6 w-6 text-primary" />
        <span className="text-lg">LMT</span>
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="transition-colors hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <a href="#contact">
            <Button className="hidden sm:inline-flex">Liên hệ ngay</Button>
        </a>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium p-6">
                 {navLinks.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="transition-colors hover:text-primary"
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
