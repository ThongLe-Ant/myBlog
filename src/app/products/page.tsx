'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SectionReveal } from '@/components/motion/section-reveal';
import { ExternalLink, Github } from 'lucide-react';

type Product = {
  title: string;
  category: string;
  client: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  slug: string;
  tags: string[];
};

export default function ProductsPage() {
  const { language } = useLanguage();

  const products: Product[] = [
    {
      title: 'GoEat App',
      category: 'Admin Portal',
      client: 'GoEat',
      description:
        language === 'vi'
          ? 'Ứng dụng quản trị Next.js (React 19, Tailwind, shadcn/ui, Refine, Supabase) với Page Builder, Schema Editor và RBAC.'
          : 'Admin app in Next.js (React 19, Tailwind, shadcn/ui, Refine, Supabase) with Page Builder, Schema Editor and RBAC.',
      imageUrl: '/backgrounds/project-1.svg',
      githubUrl: 'https://github.com/ThongLe-Ant/goeat-erp',
      slug: 'go-erp',
      tags: ['Next.js', 'Supabase', 'Refine', 'RBAC'],
    },
    {
      title: 'Go Eat ZAVN - Hệ thống Đặt Món Ăn',
      category: 'Odoo ERP',
      client: 'ZAVN',
      description:
        language === 'vi'
          ? 'Hệ thống quản lý đặt món ăn cho công ty, multi-environment, hot reload, auto-setup users và DB.'
          : 'Meal ordering management on Odoo 18 with multi-environment, hot reload, auto-setup users and DB.',
      imageUrl: '/backgrounds/project-2.svg',
      githubUrl: 'https://github.com/ThongLe-Ant/GoEat-ZAVN_V2',
      slug: 'go-eat',
      tags: ['Odoo 18', 'PostgreSQL', 'Docker'],
    },
    {
      title: 'Goeat Backend API',
      category: 'Backend API',
      client: 'GoEat',
      description:
        language === 'vi'
          ? 'Backend API viết bằng Go, dùng Gin, Wire DI, GORM, Postgres và tích hợp Swagger UI.'
          : 'Backend API written in Go using Gin, Wire DI, GORM, Postgres with Swagger UI.',
      imageUrl: '/backgrounds/project-4.svg',
      githubUrl: 'https://github.com/ThongLe-Ant?tab=repositories',
      slug: 'go-arc',
      tags: ['Go', 'Gin', 'GORM', 'PostgreSQL', 'Swagger'],
    },
    {
      title: 'FastAPI Clean Architecture Migration',
      category: 'Backend API',
      client: 'GoEat',
      description:
        language === 'vi'
          ? 'Kiến trúc sạch với FastAPI, SQLAlchemy, Alembic; phân lớp domain, repository, usecase, handler.'
          : 'Clean Architecture with FastAPI, SQLAlchemy, Alembic; layered domain, repository, usecase, handler.',
      imageUrl: '/backgrounds/project-3.svg',
      githubUrl: 'https://github.com/ThongLe-Ant/py-arc',
      slug: 'py-arc',
      tags: ['FastAPI', 'SQLAlchemy', 'Alembic', 'Clean Architecture'],
    },
  ];

  const pageTitle = language === 'vi' ? 'Sản phẩm' : 'Products';
  const pageDesc =
    language === 'vi'
      ? 'Ba sản phẩm tiêu biểu với hạ tầng hiện đại và khả năng mở rộng.'
      : 'Three featured products with modern stack and scalability.';

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          {pageTitle}
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
          {pageDesc}
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {products.map((project, index) => (
          <SectionReveal key={project.title} options={{ delay: index * 0.08 }}>
            <Card className="group bg-surface/70 border-border/60 rounded-2xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-surface/60 to-surface/40">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-contain p-6"
                />
              </div>
              <CardHeader className="px-6 pt-5 pb-0">
                <CardDescription className="text-xs uppercase tracking-wide text-muted-foreground">{project.category}</CardDescription>
                <CardTitle className="text-lg font-semibold leading-tight text-foreground mt-1">
                  {project.title}
                </CardTitle>
                <div className="text-sm text-muted-foreground mt-1">{project.client}</div>
              </CardHeader>
              <CardContent className="px-6 pt-4 pb-0">
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-2.5 py-0.5 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-5 mt-auto flex items-center justify-between">
                <Button variant="outline" size="sm" asChild className="gap-2">
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    {language === 'vi' ? 'GitHub' : 'GitHub'}
                  </Link>
                </Button>
                <Button size="sm" className="gap-2" asChild>
                  <Link href={`/products/${project.slug}`}>
                    {language === 'vi' ? 'Chi tiết' : 'Details'}
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </SectionReveal>
        ))}
      </div>
    </div>
  );
}


