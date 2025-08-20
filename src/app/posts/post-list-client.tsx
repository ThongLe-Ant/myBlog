
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FilePenLine, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Post } from '@/lib/posts';
import Link from 'next/link';

interface PostListClientProps {
    posts: Post[];
    categories: string[];
    initialCategory: string;
    searchTerm: string;
}

export function PostListClient({ posts, categories, initialCategory, searchTerm }: PostListClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(initialCategory);

  useEffect(() => {
    setActiveTab(initialCategory);
  }, [initialCategory]);

  const filteredPostsByCategory = activeTab === 'All'
    ? posts
    : posts.filter(post => post.category === activeTab);

  const filteredPosts = filteredPostsByCategory.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getExcerpt = (content: string, length = 100) => {
    const cleanedContent = content.replace(/!\[.*?\]\(.*?\)/g, "").replace(/<.*?>/g, "");
    if (cleanedContent.length <= length) return cleanedContent;
    return cleanedContent.substring(0, length) + '...';
  }
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(window.location.search);
    if (value === 'All') {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    router.replace(`/posts?${params.toString()}`, { scroll: false });
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-none md:flex-wrap md:h-auto md:w-auto md:inline-flex">
        {categories.map(category => (
          <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
        ))}
      </TabsList>
      
      <div className="mt-8">
          {filteredPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map(post => (
                 <Link href={`/posts/${post.slug}`} key={post.slug} className="group">
                    <Card className="bg-surface/50 border-border/50 flex flex-col h-full transition-all duration-300 ease-smooth group-hover:border-primary group-hover:shadow-xl group-hover:-translate-y-1">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-foreground text-xl transition-colors duration-300 group-hover:text-primary pr-2">{post.title}</CardTitle>
                          <Badge variant={post.published ? 'default' : 'secondary'} className={post.published ? 'bg-green-500/20 text-green-700 border-green-500/30' : 'bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30'}>
                              {post.published ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
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
                <p>{searchTerm ? `No results found for "${searchTerm}".` : 'No posts in this category yet.'}</p>
                {searchTerm ? 
                    <Button variant="link" onClick={() => router.push('/posts')}>Clear Search</Button> :
                    <p>Why not create one?</p>
                }
            </div>
          )}
      </div>
    </Tabs>
  );
}
