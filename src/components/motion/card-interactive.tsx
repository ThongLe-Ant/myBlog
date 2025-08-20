'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'group relative w-full h-full rounded-2xl bg-surface border border-border/50 shadow-lg transition-shadow duration-300 ease-smooth hover:shadow-2xl hover:shadow-primary/20',
        className
      )}
    >
      <div style={{ transform: 'translateZ(20px)' }} className="p-6 h-full flex flex-col">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            className="object-cover transition-transform duration-300 ease-smooth group-hover:scale-105"
            data-ai-hint={aiHint}
          />
        </div>
        <h3 className="text-xl font-bold text-primary-foreground">{title}</h3>
        <p className="mt-2 text-muted-foreground flex-grow">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-muted/50 text-muted-foreground">{tag}</Badge>
          ))}
        </div>
         <div className="mt-6 flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-smooth">
          {viewDetailsText} <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </div>
      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-smooth" style={{ 
        backgroundImage: 'radial-gradient(circle at 50% 50%, transparent, hsl(var(--primary)))',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
        WebkitMaskComposite: 'xor',
      }} />
    </motion.div>
  );
}
