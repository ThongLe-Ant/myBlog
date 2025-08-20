
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import { SectionReveal } from '@/components/motion/section-reveal';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Post } from '@/lib/posts';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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

    // Prioritize featured post as main post, otherwise take the latest one
    const featuredPostInCategory = posts.find(p => p.featured);
    const mainPost = featuredPostInCategory || posts[0];
    const sidePosts = posts.filter(p => p.slug !== mainPost.slug).slice(0, 4);

    return (
        <SectionReveal id={category.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{category}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    {`The latest articles and insights on ${category}.`}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Main Post */}
                <SectionReveal className="group h-full" options={{ delay: 0.1 }}>
                   <Link href={`/posts/${mainPost.slug}`} className="block h-full">
                       <Card className="relative h-full min-h-[480px] flex flex-col overflow-hidden transition-all duration-300 ease-smooth group-hover:shadow-xl group-hover:-translate-y-1 rounded-2xl">
                           <Image
                                src={mainPost.imageUrl!}
                                alt={mainPost.title}
                                fill
                                className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105 -z-10"
                                data-ai-hint="tech blog"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent -z-10" />
                           <div className="relative h-full flex flex-col justify-end p-8 text-white">
                                <div className="flex gap-2 mb-2">
                                    <Badge variant="secondary" className="bg-white/20 text-white border-none">{mainPost.category}</Badge>
                                    {mainPost.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
                                </div>
                                <h3 className="text-3xl font-bold text-white transition-colors">{mainPost.title}</h3>
                                <p className="mt-4 text-base text-white/80">{mainPost.excerpt}</p>
                                <div className="mt-6 text-sm font-semibold text-white group-hover:underline">
                                   {c.readMore} <ArrowRight className="inline-block h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                               </div>
                           </div>
                        </Card>
                   </Link>
                </SectionReveal>

                {/* Side Posts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {sidePosts.map((post, index) => (
                        <SectionReveal key={post.slug} className="group" options={{ delay: 0.2 + index * 0.1 }}>
                            <Link href={`/posts/${post.slug}`} className="block h-full">
                                <Card className="relative h-full min-h-[220px] flex flex-col overflow-hidden transition-all duration-300 ease-smooth group-hover:shadow-lg group-hover:-translate-y-1 rounded-2xl">
                                    <Image
                                        src={post.imageUrl!}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105 -z-10"
                                        data-ai-hint="tech blog"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent -z-10" />
                                    <div className="relative h-full flex flex-col justify-end p-4 text-white">
                                        <h3 className="font-semibold text-white text-md flex-grow group-hover:underline transition-all">{post.title}</h3>
                                    </div>
                                </Card>
                            </Link>
                        </SectionReveal>
                    ))}
                </div>
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
