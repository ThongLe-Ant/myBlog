
'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Mountain, Globe } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [hoveredPath, setHoveredPath] = useState('');

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border/20 bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <Link href="/" className="flex items-center gap-2 font-bold" onMouseOver={() => setHoveredPath('/')} onMouseLeave={() => setHoveredPath('')}>
        <Mountain className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-stone-400">LMT</span>
      </Link>
      
      <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="relative rounded-md px-3 py-2 transition-colors hover:text-primary"
            onMouseOver={() => setHoveredPath(link.href)}
            onMouseLeave={() => setHoveredPath('')}
          >
            {link.label}
            {hoveredPath === link.href && (
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                layoutId="underline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Globe className="h-4 w-4" />
              <span className="sr-only">Change language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>EN</DropdownMenuItem>
            <DropdownMenuItem>VI</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button>Contact Me</Button>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-surface">
            <nav className="grid gap-6 p-6 text-lg font-medium">
              <Link href="/" className="flex items-center gap-2 font-bold mb-4">
                  <Mountain className="h-6 w-6 text-primary" />
                  <span className="text-lg">LMT</span>
              </Link>
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
