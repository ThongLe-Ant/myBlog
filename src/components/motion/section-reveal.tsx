'use client';

import React, { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  options?: {
    once?: boolean;
    margin?: string;
    amount?: number | 'some' | 'all';
    delay?: number;
    duration?: number;
  };
}

export function SectionReveal({
  children,
  className,
  options = {},
}: SectionRevealProps) {
  const ref = useRef(null);
  const {
    once = true,
    margin = '0px 0px -20% 0px',
    amount = 0.2,
    delay = 0,
    duration = 0.5,
  } = options;

  const isInView = useInView(ref, { once, margin, amount });

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // ease-smooth
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}
