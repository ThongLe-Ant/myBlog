
import { getPostBySlug, getPosts, Post } from '@/lib/posts';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export default async function PostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const allPosts = await getPosts();
  const relatedPosts: Post[] = allPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 6);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
       <div className="mb-4">
            <Button variant="outline" asChild>
                <Link href="/posts">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
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
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    img: ({ node, ...props }) => (
                      <img {...props} className="rounded-lg shadow-lg mx-auto" />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote {...props} className="border-l-4 border-primary bg-muted/20 p-4" />
                    ),
                    pre: ({ node, ...props }) => {
                      // Wrap pre blocks to add copy button. Avoid server component inlining.
                      const PreWithCopy = require('@/components/markdown-pre-with-copy').PreWithCopy;
                      return <PreWithCopy {...props} />;
                    },
                    code({ node, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return match ? (
                        <code className={className} {...props}>{children}</code>
                      ) : (
                        <code className="bg-muted text-primary rounded-sm px-1" {...props}>
                          {children}
                        </code>
                      );
                    },
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
