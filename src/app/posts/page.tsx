
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { getPosts, Post } from '@/lib/posts';
import { PostListClient } from './post-list-client';

export const dynamic = 'force-dynamic';

export default async function PostsListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const posts: Post[] = await getPosts();
  const searchTerm = (searchParams?.search as string) || '';
  const category = (searchParams?.category as string) || 'All';
  
  // Extract unique categories and sort them
  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category))).sort()];
  
  const pageTitle = searchTerm ? `Search Results for "${searchTerm}"` : "My Blog Posts";
  const pageDescription = searchTerm ? `Found ${posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.content.toLowerCase().includes(searchTerm.toLowerCase())).length} posts.` : "Find and manage all your articles here.";

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{pageTitle}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                {pageDescription}
            </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/posts/create">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create New Post
          </Link>
        </Button>
      </div>

      <PostListClient 
        posts={posts} 
        categories={categories}
        initialCategory={category}
        searchTerm={searchTerm}
      />
    </div>
  );
}
