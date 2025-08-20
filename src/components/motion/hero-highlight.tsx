
'use client';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const backgroundPatterns = [
    '/backgrounds/pattern-1.svg',
    '/backgrounds/pattern-2.svg',
    '/backgrounds/pattern-3.svg',
    '/backgrounds/pattern-4.svg',
];

export function HeroHighlight({ children }: { children: React.ReactNode }) {
  const [backgroundUrl, setBackgroundUrl] = useState('');

  useEffect(() => {
    // Select a random background on client-side mount to avoid hydration mismatch
    const randomPattern = backgroundPatterns[Math.floor(Math.random() * backgroundPatterns.length)];
    setBackgroundUrl(`url(${randomPattern})`);
  }, []);


  return (
    <motion.section
      className="relative w-full flex flex-col items-center justify-center text-center overflow-hidden pt-8 md:pt-12 pb-8 md:pb-12"
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
         {backgroundUrl && (
            <motion.div
              className="absolute inset-0 z-[-1] opacity-20 dark:opacity-5"
              style={{
                  backgroundImage: backgroundUrl,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
              }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: [0, 0.2, 0.05], scale: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
         )}
      </div>

      <div className="z-10 w-full">
          {children}
      </div>
    </motion.section>
  );
}
