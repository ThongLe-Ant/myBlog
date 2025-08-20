
'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Send } from 'lucide-react';
import React from 'react';

export function HeroHighlight() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    hover: {
      y: -2,
      scale: 1.05,
      boxShadow: '0px 10px 30px -5px hsla(var(--primary), 0.3)',
      transition: { type: 'spring', stiffness: 300 },
    },
    tap: {
      scale: 0.98,
      y: 0,
    }
  };

  return (
    <motion.section
      className="relative w-full h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0">
        <motion.div
           className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
        />
      </div>

      <div className="z-10 flex flex-col items-center space-y-6 px-4">
        <motion.h1 
          className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-7xl"
          variants={itemVariants}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
            Lê Minh Thông
          </span>
        </motion.h1>

        <motion.h2 
          className="text-xl md:text-2xl font-medium text-primary-foreground/90"
          variants={itemVariants}
        >
          Senior Software Engineer | Solution Architect
        </motion.h2>

        <motion.p 
          className="max-w-2xl mx-auto text-muted-foreground md:text-lg"
          variants={itemVariants}
        >
          Đam mê xây dựng các giải pháp phần mềm hiệu suất cao, có khả năng mở rộng và mang lại trải nghiệm tuyệt vời cho người dùng.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          variants={itemVariants}
        >
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button size="lg" className="w-full sm:w-auto">
              Dự án của tôi <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Liên hệ ngay <Send className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
