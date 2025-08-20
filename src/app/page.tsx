
'use client';

import {
  ArrowRight,
  Newspaper
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SectionReveal } from '@/components/motion/section-reveal';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import { useRouter } from 'next/navigation';
import { Post, getPosts } from '@/lib/posts';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const content = {
  en: {
    blog: {
        title: "Featured Articles",
        description: "Sharing knowledge and insights from my journey in the tech world.",
        viewAll: "View All Posts"
    },
  },
  vi: {
    blog: {
        title: "Bài viết nổi bật",
        description: "Chia sẻ kiến thức và góc nhìn từ hành trình trong thế giới công nghệ.",
        viewAll: "Xem tất cả"
    },
  }
};


export default function HomePage() {
  const { language } = useLanguage();
  const c = content[language];
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const allPosts = await getPosts();
      const publishedPosts = allPosts.filter(p => p.published);
      setPosts(publishedPosts.slice(0, 5)); // Get latest 5 posts
    }
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Blog Posts Section */}
        <SectionReveal id="blog" className="scroll-mt-24 py-24">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{c.blog.title}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    {c.blog.description}
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                    <SectionReveal 
                        key={post.slug} 
                        className={cn(
                            "group",
                            index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                        )}
                        options={{delay: index * 0.1}}
                    >
                        <Link href={`/posts/${post.slug}`} className="block h-full">
                            <Card className="bg-surface h-full flex flex-col overflow-hidden transition-all duration-300 ease-smooth group-hover:border-primary group-hover:shadow-xl group-hover:-translate-y-1">
                                <div className={cn("relative w-full overflow-hidden", index === 0 ? "aspect-video" : "aspect-[16/10]")}>
                                    <Image
                                        src={post.imageUrl || 'https://placehold.co/800x600.png'}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                                        data-ai-hint="tech blog"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <Badge variant="secondary" className="self-start mb-2">{post.category}</Badge>
                                    <h3 className={cn("font-bold text-foreground", index === 0 ? "text-2xl" : "text-xl")}>{post.title}</h3>
                                    <p className="mt-3 text-muted-foreground text-base flex-grow">{post.excerpt}</p>
                                    <div className="mt-4 text-sm font-semibold text-primary group-hover:underline">
                                        Read More <ArrowRight className="inline-block h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </SectionReveal>
                ))}
            </div>
             <div className="mt-16 text-center">
                <Button size="lg" asChild variant="outline">
                    <Link href="/posts">
                        {c.blog.viewAll} <Newspaper className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </SectionReveal>
      </div>
    </div>
  );
}
