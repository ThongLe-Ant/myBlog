
'use client';
import { motion } from 'framer-motion';
import React from 'react';

export function HeroHighlight({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      className="relative w-full flex flex-col items-center justify-center text-center overflow-hidden py-16 md:py-24"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {/* Background Gradient & Effects */}
      <div className="absolute inset-0 z-0">
        <motion.div
           className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_-20%,hsla(var(--primary),0.15),transparent)]"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1.5 }}
        />
      </div>

      <div className="z-10 w-full">
          {children}
      </div>
    </motion.section>
  );
}
