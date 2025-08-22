
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FilePenLine, Search, ChevronLeft, ChevronRight, Tag, Code2, Database, Cpu, Wrench, BookOpen, Sparkles, Terminal, Workflow, Bot, Rocket, Palette, Server, Globe, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Post } from '@/lib/posts';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface PostListClientProps {
    posts: Post[];
    categories: string[];
    initialCategory: string;
    initialSearchTerm: string;
}

export function PostListClient({ posts, categories, initialCategory, initialSearchTerm }: PostListClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    // This updates the tab if the category changes via URL
    setActiveTab(initialCategory);
  }, [initialCategory]);

  const searchFilteredPosts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return posts;
    return posts.filter(post =>
      post.title.toLowerCase().includes(term) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(term)) ||
      post.content.toLowerCase().includes(term)
    );
  }, [posts, searchTerm]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of categories) counts[c] = 0;
    for (const p of searchFilteredPosts) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    counts['All'] = searchFilteredPosts.length;
    return counts;
  }, [categories, searchFilteredPosts]);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeTab === 'All' || post.category === activeTab;
    const matchesSearch = searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(window.location.search);
    if (value === 'All') {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    router.replace(`/posts?${params.toString()}`, { scroll: false });
  }

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => updateScrollButtons();
    el.addEventListener('scroll', onScroll);
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  useEffect(() => {
    updateScrollButtons();
  }, [categories, searchTerm]);

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const getCategoryIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n === 'all') return Sparkles;
    if (n.includes('ai')) return Bot;
    if (n.includes('front')) return Code2;
    if (n.includes('back')) return Server;
    if (n.includes('devops')) return Wrench;
    if (n.includes('data')) return Database;
    if (n.includes('cheat')) return Terminal;
    if (n.includes('learn')) return BookOpen;
    if (n.includes('life')) return Globe;
    if (n.includes('search')) return Workflow;
    if (n.includes('showcase') || n.includes('demo')) return Rocket;
    if (n.includes('design')) return Palette;
    if (n.includes('package') || n.includes('lib')) return Package;
    if (n.includes('cpu') || n.includes('system')) return Cpu;
    return Tag;
  };

  const getExcerpt = (contentStr: string, length = 100) => {
    if (!contentStr) return '';
    const cleanedContent = contentStr.replace(/!\[.*?\]\(.*?\)/g, "").replace(/<.*?>/g, "");
    if (cleanedContent.length <= length) return cleanedContent;
    return cleanedContent.substring(0, length) + '...';
  }
  
  const handleCardClick = (slug: string) => {
    router.push(`/posts/${slug}`);
  };

  // Background patterns for non-image cards
  const backgroundPatterns = [
    
    '/backgrounds/pattern-1.svg',
    '/backgrounds/pattern-2.svg',
    '/backgrounds/pattern-3.svg',
    '/backgrounds/pattern-4.svg',
    '/backgrounds/pattern-light.svg',
    '/backgrounds/thumb-1.svg',
    '/backgrounds/thumb-2.svg',
    '/backgrounds/thumb-3.svg',
    '/backgrounds/project-1.svg', 
    '/backgrounds/project-2.svg',
    '/backgrounds/project-3.svg',
    '/backgrounds/project-4.svg'
  ];

  const isValidImageSrc = (src: string) => {
    if (!src) return false;
    if (src.startsWith('/')) return true;
    if (/^https?:\/\//i.test(src)) return true;
    return false;
  };

  const getSafeImageSrc = (src: string | undefined, index: number) => {
    if (src && isValidImageSrc(src)) return src;
    return backgroundPatterns[index % backgroundPatterns.length];
  };

  return (
    <div className="space-y-8">
       <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-xl -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-4 max-w-7xl mx-auto">
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    type="search" 
                    placeholder="Search collection..." 
                    className="pl-10 w-full h-12 text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="relative w-full">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <div ref={scrollRef} className="w-full overflow-x-auto scroll-smooth px-6 sm:px-8">
                        <TabsList className="flex w-max gap-3 bg-transparent p-0 h-11">
                            {categories.map((category) => {
                                const Icon = getCategoryIcon(category);
                                const count = categoryCounts[category] ?? 0;
                                const isActive = activeTab === category;
                                return (
                                    <TabsTrigger
                                        key={category}
                                        value={category}
                                        className={cn(
                                            "rounded-full h-11 px-5 border transition-colors",
                                            "bg-background text-foreground/80 hover:bg-muted",
                                            isActive && "bg-primary text-primary-foreground shadow"
                                        )}
                                    >
                                        <Icon className="mr-2 h-4 w-4" />
                                        <span className="whitespace-nowrap">{category}</span>
                                        <span
                                            className={cn(
                                                "ml-2 shrink-0 rounded-full px-2 py-0.5 text-[11px] leading-none",
                                                isActive ? "bg-primary-foreground/25 text-primary-foreground" : "bg-muted text-muted-foreground"
                                            )}
                                        >
                                            {count}
                                        </span>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </div>
                </Tabs>
                <div className="pointer-events-none absolute left-0 top-0 h-11 w-12 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 h-11 w-12 bg-gradient-to-l from-background to-transparent" />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Scroll categories left"
                    onClick={() => scrollByAmount('left')}
                    className={cn(
                        "absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 rounded-full border bg-background/80 backdrop-blur",
                        canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Scroll categories right"
                    onClick={() => scrollByAmount('right')}
                    className={cn(
                        "absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 rounded-full border bg-background/80 backdrop-blur",
                        canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </div>
      
      <div>
          {filteredPosts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {filteredPosts.map((post, index) => {
                const patternIndex = index % 6;
                
                let cardClass = "h-80";
                
                if (patternIndex === 0 || patternIndex === 5) { // First item, large
                    cardClass += " lg:col-span-2";
                }
                
                const isImageCard = patternIndex === 0 || patternIndex === 5;

                return (
                 <div
                    key={post.slug} 
                    className={cn("group relative block w-full", cardClass)}
                >
                    <Card
                        onClick={() => handleCardClick(post.slug)}
                        className={cn(
                        "h-full w-full overflow-hidden rounded-2xl transition-all duration-300 ease-smooth group-hover:shadow-xl group-hover:-translate-y-1 cursor-pointer",
                        !isImageCard && "bg-surface border"
                    )}>
                        {isImageCard ? (
                          <>
                            <Image
                              src={getSafeImageSrc(post.imageUrl, index)}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                              data-ai-hint="tech blog"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                 <div className="flex-grow">
                                    <Badge variant="secondary" className="mb-2 max-w-min whitespace-nowrap bg-white/20 text-white border-none">{post.category}</Badge>
                                    <h3 className="font-bold text-xl group-hover:underline">{post.title}</h3>
                                    <p className="mt-2 text-sm text-white/80 opacity-90">{getExcerpt(post.content, getExcerptLength(patternIndex))}</p>
                                 </div>
                                 <div className="mt-4 flex items-center justify-between pt-4">
                                    <Badge variant={post.published ? 'default' : 'secondary'} className={cn('flex-shrink-0', post.published ? 'bg-green-500/20 text-green-700 border-green-500/30' : 'bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30')}>
                                        {post.published ? 'Published' : 'Draft'}
                                    </Badge>
                                     <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <Link href={`/posts/edit/${post.slug}`} passHref>
                                            <Button variant="secondary" size="sm" onClick={(e) => e.stopPropagation()}>
                                                <FilePenLine className="mr-2 h-4 w-4" />
                                                Edit
                                            </Button>
                                        </Link>
                                     </div>
                                 </div>
                            </div>
                          </>
                        ) : (
                            <div className="relative flex flex-col h-full p-6">
                                <Image
                                    src={backgroundPatterns[index % backgroundPatterns.length]}
                                    alt=""
                                    fill
                                    className="object-cover opacity-20 select-none pointer-events-none"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                                <div className="relative z-10 flex-grow">
                                  <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                                  <h3 className="font-bold text-foreground group-hover:text-primary text-lg">{post.title}</h3>
                                  <p className="mt-2 text-sm text-muted-foreground">{getExcerpt(post.content, 120)}</p>
                                </div>
                                <div className="relative z-10 mt-4 flex items-center justify-between pt-4 border-t">
                                  <Badge variant={post.published ? 'outline' : 'secondary'}>
                                      {post.published ? 'Published' : 'Draft'}
                                  </Badge>
                                   <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <Link href={`/posts/edit/${post.slug}`} passHref>
                                            <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                                                <FilePenLine className="mr-2 h-4 w-4" />
                                                Edit
                                            </Button>
                                        </Link>
                                   </div>
                                </div>
                            </div>
                        )}
                    </Card>
                 </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-24 text-muted-foreground space-y-4">
                <h3 className="text-2xl font-semibold">No Posts Found</h3>
                <p>No articles match your current filter criteria.</p>
                <Button variant="link" onClick={() => { setSearchTerm(''); setActiveTab('All'); router.replace('/posts', { scroll: false })}}>Clear all filters</Button>
            </div>
          )}
      </div>
    </div>
  );
}


function getExcerptLength(index: number) {
    const patternIndex = index % 6;
    if (patternIndex === 0 || patternIndex === 5) { // Larger cards
        return 150;
    }
    return 80; // Smaller cards
}

    

    

    

