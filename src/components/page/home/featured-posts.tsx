
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import { SectionReveal } from '@/components/motion/section-reveal';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/lib/posts';
import { estimateReadingMinutes, formatTimeAgo } from '@/lib/utils';
import Autoplay from "embla-carousel-autoplay"

const content = {
  en: {
    title: "Featured Posts",
    description: "Hand-picked articles and deep dives.",
    featuredLabel: "Featured"
  },
  vi: {
    title: "Bài viết nổi bật",
    description: "Những bài viết chọn lọc và chuyên sâu.",
    featuredLabel: "Nổi bật"
  }
};

interface FeaturedPostsProps {
    featuredPosts: Post[];
}

const EXCERPT_LENGTH = 140;

function sanitizeExcerpt(contentStr: string, length = EXCERPT_LENGTH): string {
  const withoutImages = contentStr.replace(/!\[.*?\]\(.*?\)/g, "");
  const withoutHtml = withoutImages.replace(/<.*?>/g, "");
  const collapsedWhitespace = withoutHtml.replace(/\s+/g, " ").trim();
  return collapsedWhitespace.length <= length
    ? collapsedWhitespace
    : `${collapsedWhitespace.substring(0, length)}...`;
}

function resolveImageSrc(imageUrl?: string): string {
  if (!imageUrl) return '/backgrounds/pattern-1.svg';
  const isAbsolute = /^https?:\/\//i.test(imageUrl);
  const isRootRelative = imageUrl.startsWith('/');
  return isAbsolute || isRootRelative ? imageUrl : '/backgrounds/pattern-1.svg';
}

export function FeaturedPosts({ featuredPosts }: FeaturedPostsProps) {
    const { language } = useLanguage();
    const c = content[language];
    
    const autoplay = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

    if (featuredPosts.length === 0) {
        return null;
    }

    return (
        <SectionReveal>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-primary-gradient sm:text-3xl">{c.title}</h2>
                <p className="mt-3 max-w-2xl mx-auto text-base text-muted-foreground">{c.description}</p>
            </div>
            <Carousel 
              opts={{ align: "start", loop: true }}
              plugins={[autoplay.current]}
              className="w-full"
            >
              <CarouselContent>
                {featuredPosts.map((post) => (
                  <CarouselItem key={post.slug} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 group">
                      <Link href={`/posts/${post.slug}`} className="block h-full">
                        <Card className="relative h-[340px] flex flex-col overflow-hidden transition-all duration-300 ease-smooth group-hover:shadow-xl group-hover:-translate-y-1 rounded-2xl">
                           <Image
                              src={resolveImageSrc(post.imageUrl)}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105 z-0"
                              data-ai-hint="tech blog"
                           />
                           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10" />
                           <div className="relative z-20 h-full flex flex-col justify-start p-4 text-white">
                                <div className="flex gap-2 mb-2">
                                    <Badge variant="secondary" className="bg-white/20 text-white border-none px-2 py-0.5 text-[10px]">{post.category}</Badge>
                                    {post.featured && <Badge className="px-2 py-0.5 text-[10px] border-none bg-primary-gradient">{c.featuredLabel}</Badge>}
                                </div>
                                <h3 className="text-lg font-bold text-white transition-colors">{post.title}</h3>
                                <div className="mt-1 text-[11px] text-white/80 flex items-center gap-2">
                                  <span>{formatTimeAgo(post.createdAt)}</span>
                                  <span>•</span>
                                  <span>{estimateReadingMinutes(post.content)} phút đọc</span>
                                </div>
                                <p className="mt-1.5 text-xs text-white/80">{sanitizeExcerpt(post.content, EXCERPT_LENGTH)}</p>
                            </div>
                        </Card>
                      </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselDots />
            </Carousel>
        </SectionReveal>
    );
}
