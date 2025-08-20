
'use client';

import { Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export function AppFooter() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/thongproleminh', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/thongproleminh', icon: Linkedin },
    { name: 'Twitter', href: 'https://twitter.com/thongproleminh', icon: Twitter },
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const iconVariants = {
    hover: {
      y: -3,
      scale: 1.1,
      color: 'hsl(var(--primary))',
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  return (
    <motion.footer
      className="border-t border-border/20 bg-transparent"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {currentYear + 1} Le Minh Thong. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors"
              aria-label={link.name}
              variants={iconVariants}
              whileHover="hover"
            >
              <link.icon className="h-5 w-5" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
