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
     <motion.div
      whileHover="hover"
      className={cn(
        'group relative w-full h-full rounded-2xl bg-surface border border-border/50 shadow-lg transition-shadow duration-300 ease-smooth hover:shadow-2xl hover:shadow-primary/20',
        className
      )}
    >
      <Card className="bg-transparent border-0 shadow-none h-full">
        <CardContent className="p-6 h-full flex flex-col">
          <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden mb-6 shadow-inner">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
              data-ai-hint={aiHint}
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <h3 className="text-xl font-bold text-secondary">{title}</h3>
          <p className="mt-2 text-muted-foreground flex-grow">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="font-mono">{tag}</Badge>
            ))}
          </div>
          <div className="mt-6 flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-smooth">
            {viewDetailsText} <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
