
import { getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card className="p-6 md:p-8 lg:p-12 bg-surface/50 border-border/50">
        <div className="max-w-4xl mx-auto">
            <article className="prose dark:prose-invert">
              <div className="mb-8 text-center">
                  <Badge variant="secondary" className="mb-4">{post.category}</Badge>
                  <h1 className="text-primary mb-2">{post.title}</h1>
              </div>

              <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Custom renderer for images to add styling
                    img: ({ node, ...props }) => (
                      <img {...props} className="rounded-lg shadow-lg mx-auto" />
                    ),
                    // Custom renderer for blockquotes
                    blockquote: ({ node, ...props }) => (
                      <blockquote {...props} className="border-l-4 border-primary bg-muted/20 p-4" />
                    ),
                    // Custom renderer for code blocks
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
        </div>
      </Card>
    </div>
  );
}
