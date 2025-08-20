
'use client';

import { useState, useEffect } from 'react';
import { getPostBySlug, Post } from '@/lib/posts';
import { notFound, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const postData = await getPostBySlug(params.slug);
        if (postData) {
          setPost(postData);
        } else {
          notFound();
        }
      } catch (error) {
        console.error('Failed to fetch post', error);
        // Optionally, redirect to a generic error page or show a message
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
            <Skeleton className="h-10 w-24" />
        </div>
        <Card className="p-6 md:p-8 lg:p-12 bg-surface/50 border-border/50">
          <div className="mb-8 text-center">
            <Skeleton className="h-6 w-20 mx-auto mb-4" />
            <Skeleton className="h-12 w-3/4 mx-auto" />
          </div>
          <div className="prose dark:prose-invert max-w-none space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </Card>
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
       <div className="mb-4">
            <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
       </div>
      <Card className="p-6 md:p-8 lg:p-12 bg-surface/50 border-border/50">
        <div className="mb-8 text-center">
            <Badge variant="secondary" className="mb-4">{post.category}</Badge>
            <h1 className="text-primary mb-2 text-3xl md:text-4xl lg:text-5xl font-bold">{post.title}</h1>
        </div>
        <article className="prose dark:prose-invert max-w-none">
          <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, ...props }) => (
                  <img {...props} className="rounded-lg shadow-lg mx-auto" />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote {...props} className="border-l-4 border-primary bg-muted/20 p-4" />
                ),
                code({node, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return match ? (
                    <div className="bg-surface rounded-lg p-4 my-4 overflow-x-auto">
                       <pre><code className={className} {...props}>
                        {children}
                      </code></pre>
                    </div>
                  ) : (
                    <code className="bg-muted text-primary rounded-sm px-1" {...props}>
                      {children}
                    </code>
                  )
                }
              }}
          >
              {post.content}
          </ReactMarkdown>
        </article>
      </Card>
    </div>
  );
}
