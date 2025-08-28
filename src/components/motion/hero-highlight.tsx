
'use client';
import { motion } from 'framer-motion';
import React from 'react';

export function HeroHighlight({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'compact' }) {

  const paddingClasses = variant === 'compact'
    ? 'pt-6 md:pt-8 pb-6 md:pb-8'
    : 'pt-16 md:pt-24 pb-12 md:pb-20';

  return (
    <motion.section
      className={`relative w-full flex flex-col items-center justify-center text-center overflow-hidden ${paddingClasses}`}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_-20%,hsla(var(--primary),0.15),transparent)]" />
      <div className="z-10 w-full">
          {children}
      </div>
    </motion.section>
  );
}
