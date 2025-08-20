
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface CardInteractiveProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  aiHint?: string;
  className?: string;
  viewDetailsText?: string;
}

export function CardInteractive({
  title,
  description,
  tags,
  imageUrl,
  aiHint,
  className,
  viewDetailsText = 'View Details'
}: CardInteractiveProps) {
  
  return (
     <div
      className={cn(
        'group relative w-full h-full rounded-2xl bg-surface border border-border/50 shadow-lg transition-shadow duration-300 ease-smooth hover:shadow-2xl hover:shadow-primary/20',
        className
      )}
    >
      <Card className="bg-transparent border-0 shadow-none h-full">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden mb-4">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
              data-ai-hint={aiHint}
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <h3 className="text-lg font-bold text-secondary">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground flex-grow">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
