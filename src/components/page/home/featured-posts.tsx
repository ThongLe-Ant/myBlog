
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import { SectionReveal } from '@/components/motion/section-reveal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/lib/posts';
import Autoplay from "embla-carousel-autoplay"

const content = {
  en: {
    title: "Featured Posts",
    description: "Hand-picked articles and deep dives."
  },
  vi: {
    title: "Bài viết nổi bật",
    description: "Những bài viết chọn lọc và chuyên sâu."
  }
};

interface FeaturedPostsProps {
    featuredPosts: Post[];
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
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{c.title}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{c.description}</p>
            </div>
            <Carousel 
              opts={{ align: "start", loop: true }}
              plugins={[autoplay.current]}
              className="w-full"
            >
              <CarouselContent>
                {featuredPosts.map((post, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 group">
                      <Link href={`/posts/${post.slug}`} className="block h-full">
                        <Card className="bg-surface h-full flex flex-col overflow-hidden transition-all duration-300 ease-smooth group-hover:border-primary group-hover:shadow-xl group-hover:-translate-y-1">
                            <div className="relative w-full overflow-hidden aspect-[16/10]">
                                <Image
                                    src={post.imageUrl || 'https://placehold.co/800x600.png'}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                                    data-ai-hint="tech blog"
                                />
                            </div>
                            <CardHeader>
                              <Badge variant="secondary" className="self-start mb-2">{post.category}</Badge>
                              <CardTitle className="text-foreground text-xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                            </CardContent>
                        </Card>
                      </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
        </SectionReveal>
    );
}
