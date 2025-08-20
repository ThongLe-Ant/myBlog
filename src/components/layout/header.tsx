
'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Mountain } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useLanguage } from '@/context/language-context';
import { ThemeToggle } from './theme-toggle';
import { useRouter } from 'next/navigation';


const navLinks = {
  en: [
    { href: '/#about', label: 'About' },
    { href: '/#skills', label: 'Skills' },
    { href: '/#experience', label: 'Experience' },
    { href: '/#projects', label: 'Projects' },
    { href: '/posts', label: 'Blog' },
    { href: '/#contact', label: 'Contact' },
  ],
  vi: [
      { href: '/#about', label: 'Giới thiệu' },
      { href: '/#skills', label: 'Kỹ năng' },
      { href: '/#experience', label: 'Kinh nghiệm' },
      { href: '/#projects', label: 'Dự án' },
      { href: '/posts', label: 'Bài viết' },
      { href: '/#contact', label: 'Liên hệ' },
  ]
};

const UKFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="18">
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

const VietnamFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="18">
        <path d="M0 0h60v30H0z" fill="#DA251D"/>
        <path d="M30 19.5l-5.878 4.244 2.246-6.91-5.878-4.244h7.256L30 5.68l2.246 6.91h7.256l-5.878 4.244 2.246 6.91z" fill="#FFFF00"/>
    </svg>
);


const languages = [
    { code: 'en', label: 'English', flag: <UKFlag /> },
    { code: 'vi', label: 'Tiếng Việt', flag: <VietnamFlag /> }
]

export function Header() {
  const [hoveredPath, setHoveredPath] = useState('');
  const { language, setLanguage } = useLanguage();
  const currentLangConfig = languages.find(lang => lang.code === language) || languages[0];
  const router = useRouter();

  const handleLinkClick = (href: string) => {
    if (href.startsWith('/#')) {
      const elementId = href.substring(2);
       // If we are not on the homepage, navigate to it first
      if (window.location.pathname !== '/') {
        router.push('/' + href.substring(1));
      } else {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    } else {
      router.push(href);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border/20 bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <Link href="/" className="flex items-center gap-2 font-bold" onMouseOver={() => setHoveredPath('/')} onMouseLeave={() => setHoveredPath('')}>
        <Mountain className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold tracking-wider text-foreground">LMT</span>
      </Link>
      
      <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
        {navLinks[language].map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
            }}
            className="relative rounded-md px-3 py-2 uppercase tracking-wider transition-colors hover:text-primary cursor-pointer"
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
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              {currentLangConfig.flag}
              <span className="sr-only">Toggle language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((lang) => (
                 <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code as 'en' | 'vi')} className="gap-2">
                    {lang.flag}
                    <span>{lang.label}</span>
                 </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
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
              {navLinks[language].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                  }}
                  className="transition-colors hover:text-primary uppercase cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
