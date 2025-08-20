
'use client';

import {
  ArrowRight,
  Newspaper
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { SectionReveal } from '@/components/motion/section-reveal';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import { useRouter } from 'next/navigation';
import { Post, getPosts } from '@/lib/posts';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { HeroBanner } from '@/components/layout/hero-banner';

const content = {
  en: {
    blog: {
        title: "From the Blog",
        description: "Sharing knowledge and insights from my journey in the tech world.",
        viewAll: "View All"
    },
    categories: {
        title: "Browse by Topic",
        description: "Explore content by your area of interest."
    }
  },
  vi: {
    blog: {
        title: "Từ Blog",
        description: "Chia sẻ kiến thức và góc nhìn từ hành trình trong thế giới công nghệ.",
        viewAll: "Xem tất cả"
    },
    categories: {
        title: "Khám phá theo chủ đề",
        description: "Chọn lọc nội dung theo lĩnh vực bạn quan tâm."
    }
  }
};

const categoryColors = [
  'bg-blue-500/80', 'bg-purple-500/80', 'bg-green-500/80',
  'bg-pink-500/80', 'bg-orange-500/80', 'bg-red-500/80',
  'bg-indigo-500/80', 'bg-teal-500/80', 'bg-yellow-500/80'
];


export default function HomePage() {
  const { language } = useLanguage();
  const c = content[language];
  const router = useRouter();

  const [postsByCategory, setPostsByCategory] = useState<Record<string, Post[]>>({});
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const allPosts = await getPosts();
      const publishedPosts = allPosts.filter(p => p.published);
      
      const groupedPosts = publishedPosts.reduce((acc, post) => {
        const category = post.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(post);
        return acc;
      }, {} as Record<string, Post[]>);
      
      const sortedCategories = Object.keys(groupedPosts).sort((a, b) => a.localeCompare(b));
      
      const counts: Record<string, number> = {};
      for(const category of sortedCategories) {
        counts[category] = groupedPosts[category].length;
      }

      setPostsByCategory(groupedPosts);
      setCategories(sortedCategories);
      setCategoryCounts(counts);
    }
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col w-full">
        <HeroBanner showContactInfo={false} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-24">
            {/* Category Section */}
            <SectionReveal>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{c.categories.title}</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{c.categories.description}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {categories.map((category, index) => (
                        <Link href={`/posts?category=${encodeURIComponent(category)}`} key={category} className="group">
                           <Card className={cn(
                             'text-white p-6 rounded-2xl flex flex-col justify-end min-h-[120px] transition-transform duration-300 ease-smooth group-hover:scale-105 group-hover:shadow-xl',
                             categoryColors[index % categoryColors.length]
                           )}>
                               <h3 className="font-bold text-lg">{category}</h3>
                               <p className="text-sm opacity-80">{`${categoryCounts[category] || 0} articles`}</p>
                           </Card>
                        </Link>
                    ))}
                </div>
            </SectionReveal>

            {/* Posts by Category Sections */}
            {categories.map((category, catIndex) => {
              const posts = postsByCategory[category];
              if (!posts || posts.length === 0) return null;

              const mainPost = posts[0];
              const sidePosts = posts.slice(1, 5);

              return (
                <SectionReveal key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-24">
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
                                            src={mainPost.imageUrl || 'https://placehold.co/800x600.png'}
                                            alt={mainPost.title}
                                            fill
                                            className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                                            data-ai-hint="tech blog"
                                        />
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
                                        <Card className="bg-surface h-full flex flex-col overflow-hidden transition-all duration-300 ease-smooth group-hover:border-primary group-hover:shadow-lg group-hover:-translate-y-1">
                                            <div className="relative w-full overflow-hidden aspect-[16/10]">
                                                <Image
                                                    src={post.imageUrl || 'https://placehold.co/600x400.png'}
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
                                <Link href={`/posts?category=${category}`}>
                                    {c.blog.viewAll} {category} posts <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    )}
                </SectionReveal>
              );
            })}
        </div>
    </div>
  );
}
