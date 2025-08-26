
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import { SectionReveal } from '@/components/motion/section-reveal';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Post } from '@/lib/posts';
import { estimateReadingMinutes, formatTimeAgo } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselDots } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"

const content = {
  en: {
    viewAll: "View All",
    readMore: "Read More",
    viewMore: "View more"
  },
  vi: {
    viewAll: "Xem tất cả",
    readMore: "Đọc thêm",
    viewMore: "Xem thêm"
  }
};

interface CategorySectionProps {
    category: string;
    posts: Post[];
    limit?: number;
    totalCount?: number;
    showViewAll?: boolean;
}

export function CategorySection({ category, posts, limit, totalCount, showViewAll }: CategorySectionProps) {
    const { language } = useLanguage();
    const c = content[language];
    
    if (!posts || posts.length === 0) return null;

    const effectivePosts = typeof limit === 'number' ? posts.slice(0, Math.max(0, limit)) : posts;

    const featuredPosts = effectivePosts.filter(p => p.featured);
    const regularPosts = effectivePosts.filter(p => !p.featured);

    const getExcerpt = (contentStr: string, length = 150) => {
        const cleanedContent = contentStr.replace(/!\[.*?\]\(.*?\)/g, "").replace(/<.*?>/g, "");
        if (cleanedContent.length <= length) return cleanedContent;
        return cleanedContent.substring(0, length) + '...';
    }

    const chunk = <T,>(arr: T[], size: number) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
    );

    const chunkedRegularPosts = chunk(regularPosts, 4);

    const categoryGradients = [
        'from-sky-500 to-blue-600',
        'from-purple-500 to-indigo-600',
        'from-emerald-500 to-green-600',
        'from-pink-500 to-rose-600',
        'from-amber-500 to-orange-600',
        'from-red-500 to-red-700',
        'from-violet-500 to-purple-600',
        'from-teal-500 to-cyan-600',
        'from-yellow-400 to-amber-500'
    ];

    const pickGradientIndex = (seed: string) => {
        let total = 0;
        for (let i = 0; i < seed.length; i++) total = (total + seed.charCodeAt(i)) % categoryGradients.length;
        return total;
    };
    const gradientClass = categoryGradients[pickGradientIndex(category)];

    const backgroundPatterns = [
        '/backgrounds/pattern-1.svg',
        '/backgrounds/pattern-2.svg',
        '/backgrounds/pattern-3.svg',
        '/backgrounds/pattern-4.svg',
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

    const pickPatternIndex = (seed: string) => {
        let total = 0;
        for (let i = 0; i < seed.length; i++) total = (total + seed.charCodeAt(i)) % backgroundPatterns.length;
        return total;
    };

    const getSafeImageSrc = (src: string | undefined, seed: string) => {
        if (src && isValidImageSrc(src)) return src;
        return backgroundPatterns[pickPatternIndex(seed)];
    };

    const MainPostCard = ({ post }: { post: Post }) => (
        <Link href={`/posts/${post.slug}`} className="block h-full group">
            <Card className="relative h-full min-h-[480px] flex flex-col overflow-hidden transition-all duration-300 ease-smooth group-hover:shadow-[0_0_0_1px_hsla(var(--foreground)/0.08)] group-hover:-translate-y-1 rounded-2xl bg-surface/60 backdrop-blur border border-border">
                <Image
                    src={getSafeImageSrc(post.imageUrl, post.slug)}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                    data-ai-hint="tech blog"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10" />
                <div className="relative z-20 h-full flex flex-col justify-start p-8 text-white">
                    <div className="flex gap-2 mb-2">
                        <Badge variant="secondary" className="bg-white/20 text-white border-none">{post.category}</Badge>
                        {post.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
                    </div>
                    <h3 className="text-3xl font-bold text-white transition-colors">{post.title}</h3>
                    <p className="mt-4 text-base text-white/80">{getExcerpt(post.content, 250)}</p>
                    <div className="mt-auto pt-4 text-sm font-semibold text-white group-hover:underline">
                       {c.readMore} <ArrowRight className="inline-block h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div>
            </Card>
        </Link>
    );

    const SidePostCard = ({ post }: { post: Post }) => (
         <Link href={`/posts/${post.slug}`} className="block">
            <Card className="flex gap-4 items-start p-3 sm:p-4 border border-border rounded-2xl transition-colors hover:bg-muted/30">
                <div className="relative w-28 h-20 sm:w-36 sm:h-24 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image
                        src={getSafeImageSrc(post.imageUrl, post.slug)}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-smooth hover:scale-105"
                        data-ai-hint="tech blog"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="px-2 py-0.5 text-[10px]">{post.category}</Badge>
                        {post.featured && <Badge className="px-2 py-0.5 text-[10px] border-none bg-primary-gradient">Hot</Badge>}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base line-clamp-2">{post.title}</h3>
                    <div className="mt-0.5 text-[11px] text-muted-foreground flex items-center gap-2">
                        <span>{formatTimeAgo(post.createdAt)}</span>
                        <span>•</span>
                        <span>{estimateReadingMinutes(post.content)} phút đọc</span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-2">{getExcerpt(post.content, 140)}</p>
                </div>
            </Card>
        </Link>
    );

    return (
        <SectionReveal id={category.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-24">
            <div className="mb-8">
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mx-auto w-fit">
                        <span className={`h-3 w-3 rounded-full bg-gradient-to-br ${gradientClass}`} />
                        <h2 className="text-3xl font-bold tracking-tight text-primary-gradient sm:text-4xl">{category}</h2>
                        <Button asChild size="sm" variant="ghost" className="h-7 px-2 text-primary hover:text-primary/90">
                            <Link href={`/posts?category=${encodeURIComponent(category)}`} className="flex items-center">
                                {c.viewMore} <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                    <div className={`mt-2 h-1 w-24 rounded-full bg-gradient-to-r ${gradientClass}`} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Featured Posts Carousel */}
                {featuredPosts.length > 0 && (
                     <div className="flex flex-col">
                        <Carousel 
                            className="w-full group" 
                            opts={{ loop: true }}
                            plugins={[
                                Autoplay({
                                    delay: 5000,
                                    stopOnInteraction: true,
                                }),
                            ]}
                        >
                            <CarouselContent>
                                {featuredPosts.map((post) => (
                                    <CarouselItem key={post.slug}>
                                         <SectionReveal className="h-full" options={{ delay: 0.1 }}>
                                            <MainPostCard post={post} />
                                         </SectionReveal>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <CarouselDots />
                        </Carousel>
                    </div>
                )}


                {/* Regular Posts as vertical feed */}
                {regularPosts.length > 0 && (
                     <div className="flex flex-col divide-y divide-border rounded-2xl overflow-hidden">
                        {regularPosts.map((post, index) => (
                            <div key={post.slug} className="py-3 first:pt-0 last:pb-0">
                                <SectionReveal className="h-full" options={{ delay: 0.05 + (index % 4) * 0.05 }}>
                                    <SidePostCard post={post} />
                                </SectionReveal>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {(typeof showViewAll === 'boolean' ? showViewAll : ((totalCount ?? posts.length) > (limit ?? 5))) && (
                <div className="mt-12 text-center">
                    <Button size="lg" asChild variant="link" className="text-primary hover:text-primary/80">
                        <Link href={`/posts?category=${encodeURIComponent(category)}`}>
                            {c.viewAll} {category} posts <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            )}
        </SectionReveal>
    );
}
