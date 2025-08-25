
'use client';

import { useState, useEffect, useRef } from 'react';
import { getPostBySlug, getPosts, Post } from '@/lib/posts';
import { notFound, useRouter, useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export default function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const lastFetchedSlugRef = useRef<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    if (lastFetchedSlugRef.current === slug) return; // Prevent double-call in Strict Mode
    lastFetchedSlugRef.current = slug;

    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const postData = await getPostBySlug(slug);
        if (postData) {
          setPost(postData);
          const allPosts = await getPosts();
          const related = allPosts
            .filter(p => p.category === postData.category && p.slug !== postData.slug)
            .slice(0, 6);
          setRelatedPosts(related);
        } else {
          notFound();
        }
      } catch (error) {
        console.error('Failed to fetch post', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

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
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9">
            <Card className="p-6 md:p-8 lg:p-12 bg-surface/50 border-border/50">
              <div className="mb-8 text-center">
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
          <aside className="lg:col-span-3">
            <Card className="p-6 space-y-4 bg-surface/50 border-border/50 sticky top-24">
              <div>
                <h3 className="text-lg font-semibold text-primary">Chủ đề liên quan</h3>
                <p className="text-sm text-muted-foreground">Các bài viết cùng mục "{post.category}"</p>
              </div>
              <div className="space-y-3">
                {relatedPosts.length === 0 && (
                  <p className="text-sm text-muted-foreground">Không có bài viết liên quan.</p>
                )}
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/posts/${rp.slug}`} className="block">
                    <div className="group rounded-lg border bg-background/60 hover:bg-muted/40 transition-colors p-3">
                      <div className="flex items-start gap-2">
                        <div>
                          <p className="text-sm font-medium group-hover:text-primary line-clamp-2">{rp.title}</p>
                          {rp.excerpt && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{rp.excerpt}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </aside>
       </div>
    </div>
  );
}
