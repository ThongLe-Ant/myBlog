
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Menu, Mountain, Search, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
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
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const ratio = Math.min(y / 200, 1);
      const computed = ratio * 0.7; // from 0.0 to 0.7
      setNavOpacity(computed);
      setScrolled(y > 4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isLinkActive = (href: string) => {
    const [path] = href.split('#');
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

  return (
    <header>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 lg:px-8 py-4 backdrop-blur-sm transition-colors duration-300 ${scrolled ? 'border-b border-white/20' : ''}`}
        style={{ backgroundColor: scrolled ? `rgba(0,0,0, ${navOpacity})` : 'transparent' }}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white font-semibold text-xl">
            <Mountain className="h-6 w-6" />
            <span>LMT</span>
          </Link>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                router.push(`/posts?search=${encodeURIComponent(searchQuery.trim())}`);
              }
            }}
            className="hidden md:block ml-4"
            role="search"
            aria-label="Site search"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
              <Input
                type="search"
                placeholder={language === 'vi' ? 'Tìm bài viết...' : 'Search posts...'}
                className="pl-9 w-44 lg:w-56 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks[language].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                aria-current={isLinkActive(link.href) ? 'page' : undefined}
                className="text-white/90 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            
           
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white/90"
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
            >
              {language === 'vi' ? 'VI' : 'EN'}
            </Button>
            <Link href="#" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
              Login
            </Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
            <div className="flex flex-col space-y-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    router.push(`/posts?search=${encodeURIComponent(searchQuery.trim())}`);
                  }
                }}
                role="search"
                aria-label="Site search"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
                  <Input
                    type="search"
                    placeholder={language === 'vi' ? 'Tìm bài viết...' : 'Search posts...'}
                    className="pl-9 w-full bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>

              <div className="flex items-center gap-3">
                <ThemeToggle />
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white/90"
                  onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
                >
                  {language === 'vi' ? 'VI' : 'EN'}
                </Button>
              </div>

              {navLinks[language].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    handleLinkClick(link.href);
                  }}
                  aria-current={isLinkActive(link.href) ? 'page' : undefined}
                  className="text-white/90 hover:text-white text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-white/20" />
              <Link href="#" className="text-white/90 hover:text-white text-sm font-medium">
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </header>
  );
}
