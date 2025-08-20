
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Code, Pyramid, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface CardInteractiveProps {
  title: string;
  description: string;
  content?: {
    type: 'image' | 'thumbnails' | 'icon';
    url?: string;
    hint?: string;
    items?: { title: string; image: string; hint: string }[];
    name?: string;
  };
  className?: string;
}

const iconMap: { [key: string]: React.ElementType } = {
  Architecture: Pyramid,
  Code: Code,
  Tech: Rocket,
};


export function CardInteractive({
  title,
  description,
  content,
  className
}: CardInteractiveProps) {
  
  const renderContent = () => {
    if (!content) return null;
    switch (content.type) {
      case 'image':
        return (
          <div className="relative w-full h-full min-h-[300px] rounded-lg overflow-hidden">
            <Image
              src={content.url!}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
              data-ai-hint={content.hint}
            />
          </div>
        );
      case 'thumbnails':
        return (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {content.items?.map((item, index) => (
              <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                 <Image src={item.image} alt={item.title} fill className="object-cover" data-ai-hint={item.hint} />
              </div>
            ))}
          </div>
        );
      case 'icon':
          const Icon = content.name ? iconMap[content.name] : null;
          return (
             <div className="flex justify-center items-center h-full">
                {Icon && <Icon className="w-16 h-16 text-primary/50" />}
             </div>
          )
      default:
        return null;
    }
  };
  
  return (
     <Card
      className={cn(
        'group relative w-full h-full rounded-2xl bg-surface/50 border-border/50 p-6 flex flex-col',
        className
      )}
    >
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="mt-2 text-md text-muted-foreground">{description}</p>
      </div>
      <div className="mt-4">
        {renderContent()}
      </div>
    </Card>
  );
}
