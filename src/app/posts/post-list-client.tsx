
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FilePenLine, ArrowRight, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Post } from '@/lib/posts';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface PostListClientProps {
    posts: Post[];
    categories: string[];
    initialCategory: string;
    initialSearchTerm: string;
}

export function PostListClient({ posts, categories, initialCategory, initialSearchTerm }: PostListClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    // This updates the tab if the category changes via URL
    setActiveTab(initialCategory);
  }, [initialCategory]);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeTab === 'All' || post.category === activeTab;
    const matchesSearch = searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(window.location.search);
    if (value === 'All') {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    // We only update the category param, keeping the search param if it exists
    // The search is now controlled by local state, so we don't push it to router here
    router.replace(`/posts?${params.toString()}`, { scroll: false });
  }

  const getExcerpt = (contentStr: string, length = 150) => {
    if (!contentStr) return '';
    const cleanedContent = contentStr.replace(/!\[.*?\]\(.*?\)/g, "").replace(/<.*?>/g, "");
    if (cleanedContent.length <= length) return cleanedContent;
    return cleanedContent.substring(0, length) + '...';
  }


  return (
    <div className="space-y-8">
        <div className="sticky top-[6.5rem] z-40 bg-background/80 backdrop-blur-xl -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col gap-4 max-w-7xl mx-auto">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        type="search" 
                        placeholder="Search collection..." 
                        className="pl-10 w-full h-12 text-base"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full overflow-x-auto">
                    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                        <TabsList className="w-full justify-start">
                            {categories.map(category => (
                                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>
            </div>
        </div>
      
      <div>
          {filteredPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPosts.map((post) => (
                 <Link href={`/posts/edit/${post.slug}`} key={post.slug} className="group relative block h-96 w-full">
                    <Card className="h-full w-full overflow-hidden rounded-2xl">
                         {post.imageUrl && (
                             <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                                data-ai-hint="tech blog"
                            />
                         )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                             <div className="flex-grow">
                                <Badge variant="secondary" className="mb-2 max-w-min whitespace-nowrap bg-white/20 text-white border-none">{post.category}</Badge>
                                <h3 className="text-xl font-bold transition-colors group-hover:text-primary">{post.title}</h3>
                                <p className="mt-2 text-sm text-white/80 opacity-90">{getExcerpt(post.content)}</p>
                             </div>
                             <div className="mt-4 flex items-center justify-between pt-4">
                                <Badge variant={post.published ? 'default' : 'secondary'} className={cn('flex-shrink-0', post.published ? 'bg-green-500/20 text-green-700 border-green-500/30' : 'bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30')}>
                                    {post.published ? 'Published' : 'Draft'}
                                </Badge>
                                <div className="text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    Edit Post <ArrowRight className="inline-block h-4 w-4" />
                                </div>
                             </div>
                        </div>
                    </Card>
                 </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-muted-foreground space-y-4">
                <h3 className="text-2xl font-semibold">No Posts Found</h3>
                <p>No articles match your current filter criteria.</p>
                <Button variant="link" onClick={() => { setSearchTerm(''); setActiveTab('All'); router.push('/posts', { scroll: false })}}>Clear all filters</Button>
            </div>
          )}
      </div>
    </div>
  );
}
