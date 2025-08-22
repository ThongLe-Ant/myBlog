
'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Mountain, Search } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/language-context';
import { ThemeToggle } from './theme-toggle';
import { useRouter, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';


const navLinks = {
  en: [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Product' },
    { href: '/about#projects', label: 'Project' },
    { href: '/posts', label: 'Blog' },
    { href: '/about', label: 'About' },
  ],
  vi: [
      { href: '/', label: 'Trang chủ' },
      { href: '/products', label: 'Sản phẩm' },
      { href: '/about#projects', label: 'Dự án' },
      { href: '/posts', label: 'Bài viết' },
      { href: '/about', label: 'Giới thiệu' },
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
    { code: 'en', label: 'English', short: 'EN', flag: <UKFlag /> },
    { code: 'vi', label: 'Tiếng Việt', short: 'VI', flag: <VietnamFlag /> }
]

export function Header() {
  const [hoveredPath, setHoveredPath] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { language, setLanguage } = useLanguage();
  const currentLangConfig = languages.find(lang => lang.code === language) || languages[0];
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const desktopSearchRef = useRef<HTMLInputElement | null>(null);
  const mobileSearchRef = useRef<HTMLInputElement | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  const searchPlaceholder = language === 'vi' ? 'Tìm bài viết...' : 'Search posts...';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        if (desktopSearchRef.current) {
          desktopSearchRef.current.focus();
          return;
        }
        if (mobileSearchRef.current) {
          mobileSearchRef.current.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const isLinkActive = (href: string) => {
    const [path] = href.split('#');
    if (!hasMounted) return false;
    return pathname === path;
  };

  const handleLinkClick = (href: string) => {
    if (href.startsWith('/') && href.includes('#')) {
      const [path, id] = href.split('#');
       if (pathname === path) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(href);
      }
    } else {
        router.push(href);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/posts?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const headerClassWhenMounted = `sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-colors ${scrolled ? 'border-border/40 bg-background/95 shadow-sm' : 'border-border/20 bg-background/80'}`;
  const headerClassWhenSSR = 'sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-xl';
  const effectiveHeaderClass = hasMounted ? headerClassWhenMounted : headerClassWhenSSR;

  const effectivePlaceholder = hasMounted ? (language === 'vi' ? 'Tìm bài viết...' : 'Search posts...') : 'Search posts...';

  return (
    <header className={effectiveHeaderClass}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold" onMouseOver={() => setHoveredPath('/')} onMouseLeave={() => setHoveredPath('')}>
            <Mountain className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold tracking-wider text-foreground">LMT</span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-2 text-sm font-medium md:flex">
              {navLinks[language].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                  }}
                  aria-current={isLinkActive(link.href) ? 'page' : undefined}
                  className={`relative rounded-md px-3 py-2 uppercase tracking-wider transition-colors hover:text-primary ${isLinkActive(link.href) ? 'text-primary/90 bg-primary/5' : ''}`}
                  onMouseOver={() => setHoveredPath(link.href)}
                  onMouseLeave={() => setHoveredPath('')}
                >
                  {link.label}
                  {(hoveredPath === link.href) && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-full w-full bg-primary/10 rounded-md -z-10"
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
            <form onSubmit={handleSearchSubmit} className="hidden md:block" role="search" aria-label="Site search">
              <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                      type="search" 
                      placeholder={effectivePlaceholder} 
                      className="pl-10 w-40 lg:w-56 bg-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      ref={desktopSearchRef}
                  />
              </div>
            </form>
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  {currentLangConfig.flag}
                  <span className="font-semibold">{currentLangConfig.short}</span>
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
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
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
                    <form onSubmit={handleSearchSubmit} role="search" aria-label="Site search">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input 
                                type="search" 
                                placeholder={effectivePlaceholder} 
                                className="pl-10 w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                ref={mobileSearchRef}
                            />
                        </div>
                    </form>
                    {navLinks[language].map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          onClick={(e) => {
                              e.preventDefault();
                              setIsMobileMenuOpen(false);
                              handleLinkClick(link.href);
                          }}
                          aria-current={isLinkActive(link.href) ? 'page' : undefined}
                          className={`transition-colors hover:text-primary uppercase ${isLinkActive(link.href) ? 'text-primary/90' : ''}`}
                        >
                          {link.label}
                        </a>
                    ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
      </div>
    </header>
  );
}
