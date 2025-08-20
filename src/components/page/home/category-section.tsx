
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
    viewAll: "View All"
  },
  vi: {
    viewAll: "Xem tất cả"
  }
};

const gradientColors = [
    "from-purple-500/20 to-pink-500/20",
    "from-green-500/20 to-teal-500/20",
    "from-yellow-500/20 to-orange-500/20",
    "from-red-500/20 to-rose-500/20",
];

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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Main Post */}
                <SectionReveal className="group h-full" options={{ delay: 0.1 }}>
                   <Link href={`/posts/${mainPost.slug}`} className="block h-full">
                       <Card className="bg-surface h-full flex flex-col overflow-hidden transition-all duration-300 ease-smooth group-hover:border-primary group-hover:shadow-xl group-hover:-translate-y-1">
                            <div className="relative w-full overflow-hidden aspect-[16/10]">
                                <Image
                                    src={mainPost.imageUrl!}
                                    alt={mainPost.title}
                                    fill
                                    className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                                    data-ai-hint="tech blog"
                                />
                                {mainPost.featured && <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">Featured</Badge>}
                            </div>
                            <CardHeader>
                              <Badge variant="secondary" className="self-start mb-2">{mainPost.category}</Badge>
                              <CardTitle className="text-foreground text-2xl group-hover:text-primary transition-colors">{mainPost.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground text-base">{mainPost.excerpt}</p>
                            </CardContent>
                            <CardFooter>
                               <div className="text-sm font-semibold text-primary group-hover:underline">
                                   Read More <ArrowRight className="inline-block h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                               </div>
                            </CardFooter>
                        </Card>
                   </Link>
                </SectionReveal>

                {/* Side Posts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {sidePosts.map((post, index) => (
                        <SectionReveal key={post.slug} className="group" options={{ delay: 0.2 + index * 0.1 }}>
                            <Link href={`/posts/${post.slug}`} className="block h-full">
                                <Card className={cn(
                                    "bg-surface h-full flex flex-col overflow-hidden transition-all duration-300 ease-smooth group-hover:border-primary group-hover:shadow-lg group-hover:-translate-y-1 bg-gradient-to-br",
                                    gradientColors[index % gradientColors.length]
                                  )}>
                                    <div className="relative w-full overflow-hidden aspect-[16/10]">
                                        <Image
                                            src={post.imageUrl!}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                                            data-ai-hint="tech blog"
                                        />
                                    </div>
                                    <div className="p-4 flex-grow flex flex-col">
                                        <h3 className="font-semibold text-foreground text-md flex-grow group-hover:text-primary transition-colors">{post.title}</h3>
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
