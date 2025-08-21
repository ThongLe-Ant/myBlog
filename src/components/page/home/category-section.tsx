
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
import { ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselDots } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"

const content = {
  en: {
    viewAll: "View All",
    readMore: "Read More"
  },
  vi: {
    viewAll: "Xem tất cả",
    readMore: "Đọc thêm"
  }
};

interface CategorySectionProps {
    category: string;
    posts: Post[];
}

export function CategorySection({ category, posts }: CategorySectionProps) {
    const { language } = useLanguage();
    const c = content[language];
    
    if (!posts || posts.length === 0) return null;

    const featuredPosts = posts.filter(p => p.featured);
    const regularPosts = posts.filter(p => !p.featured);

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

    const MainPostCard = ({ post }: { post: Post }) => (
        <Link href={`/posts/${post.slug}`} className="block h-full group">
            <Card className="relative h-full min-h-[480px] flex flex-col overflow-hidden transition-all duration-300 ease-smooth group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)] group-hover:-translate-y-1 rounded-2xl bg-surface/60 backdrop-blur border border-white/10">
                {post.imageUrl && (
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                        data-ai-hint="tech blog"
                    />
                )}
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
         <Link href={`/posts/${post.slug}`} className="block h-full group">
            <Card className="relative h-full min-h-[220px] flex flex-col overflow-hidden transition-all duration-300 ease-smooth group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)] group-hover:-translate-y-1 rounded-2xl bg-surface/60 backdrop-blur border border-white/10">
                {post.imageUrl && (
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105 z-0"
                        data-ai-hint="tech blog"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent z-10" />
                <div className="relative z-20 h-full flex flex-col justify-start p-4 text-white">
                    <h3 className="font-semibold text-white text-md group-hover:underline transition-all">{post.title}</h3>
                    <p className="mt-2 text-sm text-white/80 flex-grow">{getExcerpt(post.content, 100)}</p>
                </div>
            </Card>
        </Link>
    );

    return (
        <SectionReveal id={category.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{category}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    {`The latest articles and insights on ${category}.`}
                </p>
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


                {/* Regular Posts Carousel */}
                {regularPosts.length > 0 && (
                     <div className="flex flex-col">
                        <Carousel
                            opts={{ align: "start", loop: chunkedRegularPosts.length > 1 }}
                            plugins={[
                                Autoplay({
                                    delay: 5500,
                                    stopOnInteraction: true,
                                }),
                            ]}
                            className="w-full group col-span-1"
                        >
                            <CarouselContent className="-ml-4">
                                 {chunkedRegularPosts.map((postChunk, index) => (
                                    <CarouselItem key={index} className="pl-4 basis-full">
                                         <div className="grid grid-cols-2 gap-4">
                                            {postChunk.map((post) => (
                                                <SectionReveal key={post.slug} className="h-full" options={{ delay: 0.2 + index * 0.1 }}>
                                                    <SidePostCard post={post} />
                                                </SectionReveal>
                                            ))}
                                         </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                             {chunkedRegularPosts.length > 1 && (
                                <>
                                    <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </>
                             )}
                            {chunkedRegularPosts.length > 1 && <CarouselDots />}
                        </Carousel>
                    </div>
                )}
            </div>
            
            {posts.length > 5 && (
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
