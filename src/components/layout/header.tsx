
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Menu, Mountain, Search, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/language-context';
import { useSession, signOut } from 'next-auth/react';
import { ThemeToggle } from './theme-toggle';
import { useRouter, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';


const navLinks = {
  en: [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/projects', label: 'Projects' },
    { href: '/posts', label: 'Blog' },
    { href: '/about', label: 'About' },
  ],
  vi: [
      { href: '/', label: 'Trang chủ' },
      { href: '/products', label: 'Sản phẩm' },
      { href: '/projects', label: 'Dự án' },
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

type AuthState = { authenticated: boolean; user?: { username: string; role: string } } | null

export function Header({ initialAuth }: { initialAuth?: AuthState }) {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [auth, setAuth] = useState<AuthState>(initialAuth ?? null);

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

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setAuth({ authenticated: true, user: { username: session.user.email || session.user.name || 'user', role: (session.user as any).role || 'user' } });
    } else if (status === 'unauthenticated') {
      setAuth({ authenticated: false });
    }
  }, [status, session]);

  const isLinkActive = (href: string) => {
    const [path] = href.split('#');
    return pathname === path;
  };

  const userInitial = 'U';

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
        className={`fixed top-0 left-0 right-0 z-50 px-4 lg:px-8 py-3 transition-colors duration-300 ${scrolled ? 'border-b border-border shadow-soft' : ''}`}
        style={{
          background:
            scrolled
              ? `linear-gradient(to bottom, hsl(var(--background) / ${Math.min(navOpacity + 0.2, 0.9)}), hsl(var(--background) / ${navOpacity}))`
              : 'linear-gradient(to bottom, transparent, transparent)',
          backdropFilter: scrolled ? 'blur(8px)' : undefined,
          WebkitBackdropFilter: scrolled ? 'blur(8px)' : undefined,
        }}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-foreground font-semibold text-xl">
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={language === 'vi' ? 'Tìm bài viết...' : 'Search posts...'}
                className="pl-9 w-44 lg:w-56 bg-background/80 border-border text-foreground placeholder:text-muted-foreground"
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
                className="text-foreground hover:text-foreground text-sm font-medium transition-colors"
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
              className="border-border text-foreground"
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
            >
              {language === 'vi' ? 'VI' : 'EN'}
            </Button>
            {auth === null ? (
              <Skeleton className="h-8 w-8 rounded-full" />
            ) : auth?.authenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar.jpg" alt="avatar" />
                      <AvatarFallback className="text-xs font-semibold">{userInitial}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="space-y-1">
                    <div className="text-sm font-medium leading-none truncate max-w-[220px]">{auth.user?.username ?? 'Account'}</div>
                    <div className="text-xs text-muted-foreground">{auth.user?.role === 'superadmin' ? 'Super Admin' : 'User'}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      await signOut({ redirect: false });
                      setAuth({ authenticated: false });
                      router.refresh();
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" className="text-foreground hover:text-foreground text-sm font-medium transition-colors">
                Login
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              className="border-border text-foreground"
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
            >
              {language === 'vi' ? 'VI' : 'EN'}
            </Button>
            <button className="text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-background/80 backdrop-blur-md rounded-lg border border-border">
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
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={language === 'vi' ? 'Tìm bài viết...' : 'Search posts...'}
                    className="pl-9 w-full bg-background/80 border-border text-foreground placeholder:text-muted-foreground"
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
                  className="border-border text-foreground"
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
                  className="text-foreground hover:text-foreground text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-border" />
              {auth?.authenticated ? (
                <button
                  className="text-foreground hover:text-foreground text-sm font-medium text-left"
                  onClick={async () => {
                    await fetch('/api/logout', { method: 'POST' });
                    setAuth({ authenticated: false });
                    setMobileMenuOpen(false);
                    router.refresh();
                  }}
                >
                  Logout
                </button>
              ) : (
                <Link href="/login" className="text-foreground hover:text-foreground text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </header>
  );
}
