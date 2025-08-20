
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FilePenLine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Post } from '@/lib/posts';

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
  
  const getExcerpt = (content: string, length = 150) => {
    if (content.length <= length) return content;
    return content.substring(0, length) + '...';
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
                <Card key={post.slug} className="bg-surface/50 border-border/50 flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-foreground text-xl">{post.title}</CardTitle>
                    <CardDescription>{getExcerpt(post.content)}</CardDescription>
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
