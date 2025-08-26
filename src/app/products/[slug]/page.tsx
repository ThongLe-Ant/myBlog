import fs from 'node:fs/promises';
import path from 'node:path';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Github } from 'lucide-react';

type ProductDoc = {
  title: string;
  githubUrl: string;
  imageUrl: string;
  docFile: string;
};

const productMap: Record<string, ProductDoc> = {
  'go-erp': {
    title: 'GoEat App',
    githubUrl: 'https://github.com/ThongLe-Ant/goeat-erp',
    imageUrl: '/backgrounds/project-1.svg',
    docFile: 'docs/go-erp.md',
  },
  'go-eat': {
    title: 'Go Eat ZAVN - Hệ thống Đặt Món Ăn',
    githubUrl: 'https://github.com/ThongLe-Ant/GoEat-ZAVN_V2',
    imageUrl: '/backgrounds/project-2.svg',
    docFile: 'docs/go-eat.md',
  },
  'go-arc': {
    title: 'Goeat Backend API',
    githubUrl: 'https://github.com/ThongLe-Ant?tab=repositories',
    imageUrl: '/backgrounds/project-4.svg',
    docFile: 'docs/go-arc.md',
  },
  'py-arc': {
    title: 'FastAPI Clean Architecture Migration',
    githubUrl: 'https://github.com/ThongLe-Ant/py-arc',
    imageUrl: '/backgrounds/project-3.svg',
    docFile: 'docs/py-arc.md',
  },
};

export const dynamic = 'force-dynamic';
export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const meta = productMap[slug];
  if (!meta) return notFound();

  const filePath = path.join(process.cwd(), meta.docFile);
  let content = '';
  try {
    content = await fs.readFile(filePath, 'utf-8');
  } catch {
    return notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <Button variant="outline" asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild className="gap-2">
          <Link href={meta.githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4" />
            GitHub
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* <div className="lg:col-span-4">
          <Card className="p-4 bg-surface/50 border-border/50">
            <div className="relative w-full aspect-[16/10]">
              <Image src={meta.imageUrl} alt={meta.title} fill className="object-contain p-6" />
            </div>
          </Card>
        </div> */}
        <div className="lg:col-span-12">
          <Card className="p-6 md:p-8 lg:p-10 bg-surface/50 border-border/50">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary">{meta.title}</h1>
            </div>
            <article className="prose dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  img: ({ node, ...props }) => (
                    <img {...props} className="rounded-lg shadow-sm mx-auto" />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote {...props} className="border-l-4 border-primary bg-muted/20 p-4" />
                  ),
                  pre: ({ node, ...props }) => {
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
                {content}
              </ReactMarkdown>
            </article>
          </Card>
        </div>
      </div>
    </div>
  );
}


