
'use client';

import {
  ArrowRight,
  Download,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { HeroHighlight } from '@/components/motion/hero-highlight';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProfileAvatar } from '@/components/profile-avatar';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

const content = {
  en: {
    hero: {
      title: "Le Minh Thong",
      subtitle: "Senior Software Engineer | Solution Architect",
      description: "Software engineer with over 10 years of experience in developing ERP systems and enterprise solutions. Specializing in .NET, Golang, Cloud, and Microservices.",
    },
    downloadCV: "Download CV",
    readMore: "Read More",
    stats: [
        { value: "10+", label: "Years of Experience" },
        { value: "20+", label: "Systems Deployed" },
        { value: "5+", label: "Areas of Expertise" }
    ],
    contact: {
      hero: {
        email: "thongproleminh@gmail.com",
        phone: "(+84) 396 870 644",
        location: "HCMC, Vietnam",
      }
    }
  },
  vi: {
    hero: {
      title: "Lê Minh Thông",
      subtitle: "Kỹ sư Phần mềm Cao cấp | Kiến trúc sư Giải pháp",
      description: "Kỹ sư phần mềm với hơn 10 năm kinh nghiệm phát triển hệ thống ERP và các giải pháp cho doanh nghiệp. Chuyên sâu về .NET, Golang, Cloud và Microservices.",
    },
    downloadCV: "Tải CV",
    readMore: "Xem thêm",
    stats: [
        { value: "10+", label: "Năm kinh nghiệm" },
        { value: "20+", label: "Hệ thống triển khai" },
        { value: "5+", label: "Lĩnh vực chuyên môn" }
    ],
    contact: {
      hero: {
        email: "thongproleminh@gmail.com",
        phone: "0396 870 644",
        location: "TP.HCM, Việt Nam",
      }
    }
  }
};

interface HeroBannerProps {
    showContactInfo?: boolean;
    onDownloadCV?: () => void;
    showStats?: boolean;
}

export function HeroBanner({ showContactInfo = false, onDownloadCV, showStats = false }: HeroBannerProps) {
  const { language } = useLanguage();
  const c = content[language];
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
      <HeroHighlight>
        <div
          ref={containerRef}
          onMouseMove={(e) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            containerRef.current?.style.setProperty('--mx', `${x}%`);
            containerRef.current?.style.setProperty('--my', `${y}%`);
          }}
          className="relative overflow-hidden container mx-auto px-4 sm:px-6 lg:px-8 section-gradient rounded-[var(--radius-2xl)] py-6"
        >
          <div className="aurora" />
          <div className="spotlight-mask" />
          <div className="grid lg:grid-cols-5 items-center gap-4 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="lg:col-span-2 flex justify-center"
              >
                <ProfileAvatar className="w-40 h-40 lg:w-48 lg:h-48 border-4 border-primary/20 shadow-xl shadow-primary/20" alt="Le Minh Thong Avatar" fallbackText="LMT" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="flex flex-col gap-2 lg:col-span-3 text-center lg:text-left">
                    <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-4xl">{c.hero.title}</h1>
                    <h2 className="mt-1 text-lg font-semibold text-foreground">{c.hero.subtitle}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{c.hero.description}</p>
                    
                    {showStats && (
                        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                            {c.stats.map(stat => (
                                <div key={stat.label}>
                                    <p className="text-xl font-bold text-primary">{stat.value}</p>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {showContactInfo && (
                        <div className="mt-3 space-y-1 text-muted-foreground">
                            <div className="flex items-center justify-center lg:justify-start gap-3"><Mail className="w-4 h-4 text-primary"/><span>{c.contact.hero.email}</span></div>
                            <div className="flex items-center justify-center lg:justify-start gap-3"><Phone className="w-4 h-4 text-primary"/><span>{c.contact.hero.phone}</span></div>
                            <div className="flex items-center justify-center lg:justify-start gap-3"><MapPin className="w-4 h-4 text-primary"/><span>{c.contact.hero.location}</span></div>
                        </div>
                    )}

                    <div className="mt-3 flex items-center justify-center lg:justify-start gap-2">
                        {onDownloadCV ? (
                            <Button id="download-cv-btn" size="default" variant="default" onClick={onDownloadCV}>
                                <Download className="mr-2 h-4 w-4" />
                                {c.downloadCV}
                            </Button>
                        ) : (
                            <Button size="default" variant="default" onClick={() => router.push('/about')}>
                                {c.readMore} <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </div>
              </motion.div>
          </div>
        </div>
      </HeroHighlight>
  );
}
