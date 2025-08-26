'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Post } from '@/lib/posts';
import { estimateReadingMinutes, formatTimeAgo } from '@/lib/utils';

interface LatestNewsFeedProps {
  posts: Post[];
  limit?: number;
}

const isValidImageSrc = (src: string) => {
  if (!src) return false;
  if (src.startsWith('/')) return true;
  if (/^https?:\/\//i.test(src)) return true;
  return false;
};

const fallbackImages = [
  '/backgrounds/pattern-1.svg',
  '/backgrounds/pattern-2.svg',
  '/backgrounds/pattern-3.svg',
  '/backgrounds/pattern-4.svg',
  '/backgrounds/thumb-1.svg',
  '/backgrounds/thumb-2.svg',
  '/backgrounds/thumb-3.svg',
];

function resolveImage(imageUrl: string | undefined, seed: string) {
  if (imageUrl && isValidImageSrc(imageUrl)) return imageUrl;
  const idx = Math.abs(seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % fallbackImages.length;
  return fallbackImages[idx];
}

export function LatestNewsFeed({ posts, limit = 12 }: LatestNewsFeedProps) {
  if (!posts || posts.length === 0) return null;

  const sorted = [...posts].sort((a, b) => {
    const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return tb - ta;
  });

  const items = sorted.slice(0, Math.max(0, limit));

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden divide-y divide-border">
      {items.map((post) => (
        <Link key={post.slug} href={`/posts/${post.slug}`} className="block">
          <Card className="flex gap-4 items-start p-3 sm:p-4 border-0 rounded-none hover:bg-muted/30 transition-colors">
            <div className="relative w-28 h-20 sm:w-40 sm:h-28 flex-shrink-0 overflow-hidden rounded-xl">
              <Image
                src={resolveImage(post.imageUrl, post.slug)}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 112px, 160px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="px-2 py-0.5 text-[10px]">{post.category}</Badge>
                {post.featured && <Badge className="px-2 py-0.5 text-[10px] border-none bg-primary-gradient">Hot</Badge>}
              </div>
              <h3 className="font-semibold text-foreground text-sm sm:text-base line-clamp-2">{post.title}</h3>
              <div className="mt-0.5 text-[11px] text-muted-foreground flex items-center gap-2">
                <span>{formatTimeAgo(post.createdAt)}</span>
                <span>•</span>
                <span>{estimateReadingMinutes(post.content)} phút đọc</span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                {(post.excerpt || post.content).replace(/!\[.*?\]\(.*?\)/g, '').replace(/<.*?>/g, '').slice(0, 160)}
                {(post.excerpt || post.content).length > 160 ? '…' : ''}
              </p>
            </div>
            <ArrowRight className="hidden sm:block mt-1 h-4 w-4 text-muted-foreground flex-shrink-0" />
          </Card>
        </Link>
      ))}
    </div>
  );
}


