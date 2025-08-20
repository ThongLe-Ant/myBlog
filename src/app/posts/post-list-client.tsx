
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FilePenLine, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Post } from '@/lib/posts';
import Link from 'next/link';

interface PostListClientProps {
    posts: Post[];
    categories: string[];
}

export function PostListClient({ posts, categories }: PostListClientProps) {
  const [activeTab, setActiveTab] = useState('All');
  const router = useRouter();

  const filteredPosts = activeTab === 'All'
    ? posts
    : posts.filter(post => post.category === activeTab);
  
  const getExcerpt = (content: string, length = 100) => {
    const cleanedContent = content.replace(/!\[.*?\]\(.*?\)/g, "").replace(/<.*?>/g, "");
    if (cleanedContent.length <= length) return cleanedContent;
    return cleanedContent.substring(0, length) + '...';
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex md:grid-cols-none">
        {categories.map(category => (
          <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
        ))}
      </TabsList>
      
      <div className="mt-8">
          {filteredPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map(post => (
                 <Link href={`/posts/${post.slug}`} key={post.slug} className="group">
                    <Card className="bg-surface/50 border-border/50 flex flex-col h-full transition-all duration-300 ease-smooth group-hover:border-primary group-hover:shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-foreground text-xl transition-colors duration-300 group-hover:text-primary">{post.title}</CardTitle>
                        <CardDescription>{getExcerpt(post.content)}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                         <span className="text-sm font-semibold text-primary/80">{post.category}</span>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
                          Read More <ArrowRight className="inline-block h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <Button variant="ghost" size="icon" onClick={(e) => { e.preventDefault(); router.push(`/posts/edit/${post.slug}`); }}>
                            <FilePenLine className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                 </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
                <p>No posts in this category yet.</p>
                <p>Why not create one?</p>
            </div>
          )}
      </div>
    </Tabs>
  );
}
