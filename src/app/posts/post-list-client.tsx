
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

interface PostListClientProps {
    posts: Post[];
    categories: string[];
    initialCategory: string;
    initialSearchTerm: string;
}

const gradientColors = [
  "from-blue-500/20 to-cyan-500/20",
  "from-purple-500/20 to-pink-500/20",
  "from-green-500/20 to-teal-500/20",
  "from-yellow-500/20 to-orange-500/20",
  "from-red-500/20 to-rose-500/20",
  "from-indigo-500/20 to-violet-500/20",
];

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
    // We only update the category param, keeping the search param if it exists
    // The search is now controlled by local state, so we don't push it to router here
    router.replace(`/posts?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="space-y-8">
        <Card className="bg-surface/50 border-border/50">
           <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            type="search" 
                            placeholder="Search collection..." 
                            className="pl-10 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full overflow-x-auto">
                        <Tabs value={activeTab} onValueChange={handleTabChange}>
                            <TabsList>
                                {categories.map(category => (
                                    <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
           </CardContent>
        </Card>
      
      <div>
          {filteredPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPosts.map((post, index) => (
                 <Link href={`/posts/${post.slug}`} key={post.slug} className="group">
                    <Card className={cn(
                        "bg-surface/50 border-border/50 flex flex-col h-full transition-all duration-300 ease-smooth group-hover:border-primary group-hover:shadow-xl group-hover:-translate-y-1 bg-gradient-to-br",
                        gradientColors[index % gradientColors.length]
                    )}>
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
