
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
    router.replace(`/posts?${params.toString()}`, { scroll: false });
  }

  const getExcerpt = (contentStr: string, length = 100) => {
    if (!contentStr) return '';
    const cleanedContent = contentStr.replace(/!\[.*?\]\(.*?\)/g, "").replace(/<.*?>/g, "");
    if (cleanedContent.length <= length) return cleanedContent;
    return cleanedContent.substring(0, length) + '...';
  }
  
  const handleCardClick = (slug: string) => {
    router.push(`/posts/${slug}`);
  };

  // Background patterns for non-image cards
  const backgroundPatterns = [
    '/backgrounds/dot-grid.svg',
    '/backgrounds/pattern-1.svg',
    '/backgrounds/pattern-2.svg',
    '/backgrounds/pattern-3.svg',
    '/backgrounds/pattern-4.svg',
    '/backgrounds/thumb-1.svg',
    '/backgrounds/thumb-2.svg',
    '/backgrounds/thumb-3.svg',
    '/backgrounds/project-1.svg', 
    '/backgrounds/project-2.svg',
    '/backgrounds/project-3.svg',
    '/backgrounds/project-4.svg'
  ];


  return (
    <div className="space-y-8">
       <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-xl -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {filteredPosts.map((post, index) => {
                const patternIndex = index % 6;
                
                let cardClass = "h-80";
                
                if (patternIndex === 0 || patternIndex === 5) { // First item, large
                    cardClass += " lg:col-span-2";
                }
                
                const isImageCard = patternIndex === 0 || patternIndex === 5;

                return (
                 <div
                    key={post.slug} 
                    className={cn("group relative block w-full", cardClass)}
                >
                    <Card
                        onClick={() => handleCardClick(post.slug)}
                        className={cn(
                        "h-full w-full overflow-hidden rounded-2xl transition-all duration-300 ease-smooth group-hover:shadow-xl group-hover:-translate-y-1 cursor-pointer",
                        !isImageCard && "bg-surface border"
                    )}>
                        {isImageCard ? (
                          <>
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
                                    <h3 className="font-bold text-xl group-hover:underline">{post.title}</h3>
                                    <p className="mt-2 text-sm text-white/80 opacity-90">{getExcerpt(post.content, getExcerptLength(patternIndex))}</p>
                                 </div>
                                 <div className="mt-4 flex items-center justify-between pt-4">
                                    <Badge variant={post.published ? 'default' : 'secondary'} className={cn('flex-shrink-0', post.published ? 'bg-green-500/20 text-green-700 border-green-500/30' : 'bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30')}>
                                        {post.published ? 'Published' : 'Draft'}
                                    </Badge>
                                     <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <Link href={`/posts/edit/${post.slug}`} passHref>
                                            <Button variant="secondary" size="sm" onClick={(e) => e.stopPropagation()}>
                                                <FilePenLine className="mr-2 h-4 w-4" />
                                                Edit
                                            </Button>
                                        </Link>
                                     </div>
                                 </div>
                            </div>
                          </>
                        ) : (
                            <div className="relative flex flex-col h-full p-6">
                                <Image
                                    src={backgroundPatterns[index % backgroundPatterns.length]}
                                    alt=""
                                    fill
                                    className="object-cover opacity-20 select-none pointer-events-none"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                                <div className="relative z-10 flex-grow">
                                  <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                                  <h3 className="font-bold text-foreground group-hover:text-primary text-lg">{post.title}</h3>
                                  <p className="mt-2 text-sm text-muted-foreground">{getExcerpt(post.content, 120)}</p>
                                </div>
                                <div className="relative z-10 mt-4 flex items-center justify-between pt-4 border-t">
                                  <Badge variant={post.published ? 'outline' : 'secondary'}>
                                      {post.published ? 'Published' : 'Draft'}
                                  </Badge>
                                   <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <Link href={`/posts/edit/${post.slug}`} passHref>
                                            <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                                                <FilePenLine className="mr-2 h-4 w-4" />
                                                Edit
                                            </Button>
                                        </Link>
                                   </div>
                                </div>
                            </div>
                        )}
                    </Card>
                 </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-24 text-muted-foreground space-y-4">
                <h3 className="text-2xl font-semibold">No Posts Found</h3>
                <p>No articles match your current filter criteria.</p>
                <Button variant="link" onClick={() => { setSearchTerm(''); setActiveTab('All'); router.replace('/posts', { scroll: false })}}>Clear all filters</Button>
            </div>
          )}
      </div>
    </div>
  );
}


function getExcerptLength(index: number) {
    const patternIndex = index % 6;
    if (patternIndex === 0 || patternIndex === 5) { // Larger cards
        return 150;
    }
    return 80; // Smaller cards
}

    

    

