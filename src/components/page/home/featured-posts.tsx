
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
import { cn } from '@/lib/utils';

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
                        <Card className="relative h-[450px] flex flex-col overflow-hidden transition-all duration-300 ease-smooth group-hover:shadow-xl group-hover:-translate-y-1 rounded-2xl">
                           {post.imageUrl && (
                              <Image
                                  src={post.imageUrl}
                                  alt={post.title}
                                  fill
                                  className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                                  data-ai-hint="tech blog"
                              />
                           )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                            <div className="relative h-full flex flex-col justify-end p-6 text-white z-20">
                                <div className="flex gap-2 mb-2">
                                    <Badge variant="secondary" className="bg-white/20 text-white border-none">{post.category}</Badge>
                                    {post.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
                                </div>
                                <h3 className="text-xl font-bold text-white transition-colors">{post.title}</h3>
                                <p className="mt-2 text-sm text-white/80">{post.excerpt}</p>
                            </div>
                        </Card>
                      </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
        </SectionReveal>
    );
}
