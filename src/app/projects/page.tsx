'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SectionReveal } from '@/components/motion/section-reveal';
import { projectsContent, type ProjectItem } from '@/data/projects';

export default function ProjectsPage() {
  const { language } = useLanguage();
  const c = projectsContent[language];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent sm:text-4xl">
          {c.title}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{c.description}</p>
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {c.items.map((project: ProjectItem, index: number) => (
          <SectionReveal key={project.slug} options={{ delay: index * 0.1 }}>
            <Card className="group relative bg-surface/60 backdrop-blur rounded-3xl overflow-hidden border border-border/50 h-full flex flex-col">
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-contain mt-5 p-5"
                  data-ai-hint={project.aiHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" className="bg-white text-primary hover:bg-white/90" asChild>
                    <Link href={`/projects/${project.slug}`}>
                      {language === 'vi' ? 'Xem chi tiết' : 'View details'}
                    </Link>
                  </Button>
                </div>
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="text-sm text-muted-foreground mb-1">{project.category}</div>
                <div className="text-xl font-bold text-primary mb-1">{project.client}</div>
                <h3 className="text-lg font-semibold text-foreground">
                  <Link href={`/projects/${project.slug}`} className="hover:underline">
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </SectionReveal>
        ))}
      </div>
    </div>
  );
}


