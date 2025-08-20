
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, FilePenLine } from 'lucide-react';
import { useRouter } from 'next/navigation';

const mockPosts = [
  {
    slug: 'hexagonal-architecture',
    title: 'Architecture Pattern - Part 7: Hexagonal Architecture',
    category: 'Architecture',
    excerpt: 'Hexagonal Architecture is an architectural pattern where every external interaction must go through an Adapter to connect to an Application Port.',
  },
  {
    slug: 'init-py-guide',
    title: 'The __init__.py file in Python: A Comprehensive Guide',
    category: 'Technology',
    excerpt: 'A deep dive into the purpose and usage of the __init__.py file in Python projects.',
  },
  {
    slug: 'high-performance-leaderboard',
    title: 'High-Performance Leaderboard Design: When to Choose SQL vs. Redis',
    category: 'Architecture',
    excerpt: 'Analyzing the trade-offs between SQL and Redis for implementing scalable leaderboards.',
  },
  {
    slug: 'senior-engineer-behaviors',
    title: 'Behaviors That Distinguish Senior Engineers from the Rest',
    category: 'Experience',
    excerpt: 'Exploring the key behaviors and mindsets that define a true senior engineer.',
  },
  {
    slug: 'async-request-reply',
    title: 'Asynchronous Request-Reply Pattern: A Solution for Heavy Tasks',
    category: 'Architecture',
    excerpt: 'How to handle long-running tasks without blocking the user interface.',
  },
  {
    slug: 'intro-to-nextjs',
    title: 'What is Next.js? Fundamental Next.js Knowledge You Need',
    category: 'Technology',
    excerpt: 'A beginner-friendly introduction to the Next.js framework for React.',
  },
];

const categories = ['All', 'Architecture', 'Technology', 'Experience'];

export default function PostsListPage() {
  const [activeTab, setActiveTab] = useState('All');
  const router = useRouter();

  const filteredPosts = activeTab === 'All'
    ? mockPosts
    : mockPosts.filter(post => post.category === activeTab);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">My Blog Posts</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Find and manage all your articles here.
            </p>
        </div>
        <Button size="lg" onClick={() => router.push('/posts/create')}>
          <PlusCircle className="mr-2 h-5 w-5" />
          Create New Post
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
        
        <div className="mt-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map(post => (
                <Card key={post.slug} className="bg-surface/50 border-border/50 flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-foreground text-xl">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                     <span className="text-sm font-semibold text-primary">{post.category}</span>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" onClick={() => router.push(`/posts/edit/${post.slug}`)}>
                        <FilePenLine className="mr-2 h-4 w-4" />
                        Edit Post
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
        </div>
      </Tabs>
    </div>
  );
}
