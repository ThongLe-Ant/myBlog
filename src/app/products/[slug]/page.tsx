'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/language-context';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { productsContent } from '@/data/products';
import { ArrowLeft } from 'lucide-react';

export default function ProductDetailPage() {
  const { language } = useLanguage();
  const params = useParams<{ slug: string | string[] }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const c = productsContent[language];
  const project = c.items.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'vi' ? 'Quay lại' : 'Back'}
            </Link>
          </Button>
        </div>
        <p className="text-muted-foreground">{language === 'vi' ? 'Không tìm thấy sản phẩm.' : 'Product not found.'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'vi' ? 'Quay lại' : 'Back'}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <Card className="p-4 bg-surface/50 border-border/50">
            <div className="relative w-full aspect-[16/10]">
              <Image src={project.imageUrl} alt={project.title} fill className="object-contain p-6" />
            </div>
          </Card>
        </div>
        <div className="lg:col-span-5">
          <Card className="p-6 space-y-4 bg-surface/50 border-border/50">
            <div className="text-sm text-muted-foreground">{project.category}</div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">{project.title}</h1>
            <div className="text-lg font-semibold">{project.client}</div>
            <p className="text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


