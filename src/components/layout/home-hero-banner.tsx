
'use client';

import {
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import React from 'react';

const content = {
  en: {
    hero: {
      title: "Le Minh Thong",
      subtitle: "Senior Software Engineer | Solution Architect",
      description: "Software engineer with over 10 years of experience in developing ERP systems and enterprise solutions. Specializing in .NET, Golang, Cloud, and Microservices.",
    },
    readMore: "Read More",
    stats: [
        { value: "10+", label: "Years of Experience" },
        { value: "20+", label: "Systems Deployed" },
        { value: "5+", label: "Areas of Expertise" }
    ],
  },
  vi: {
    hero: {
      title: "Lê Minh Thông",
      subtitle: "Kỹ sư Phần mềm Cao cấp | Kiến trúc sư Giải pháp",
      description: "Kỹ sư phần mềm với hơn 10 năm kinh nghiệm phát triển hệ thống ERP và các giải pháp cho doanh nghiệp. Chuyên sâu về .NET, Golang, Cloud và Microservices.",
    },
    readMore: "Xem thêm",
    stats: [
        { value: "10+", label: "Năm kinh nghiệm" },
        { value: "20+", label: "Hệ thống triển khai" },
        { value: "5+", label: "Lĩnh vực chuyên môn" }
    ],
  }
};

export function HomeHeroBanner() {
  const { language } = useLanguage();
  const c = content[language];
  const router = useRouter();

  return (
      <section className="relative w-full overflow-hidden pt-16 md:pt-24 pb-12 md:pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 items-center gap-8 w-full z-10 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="lg:col-span-2 flex justify-center"
              >
                <Avatar className="w-52 h-52 lg:w-64 lg:h-64 border-4 border-primary/20 shadow-xl shadow-primary/20">
                  <AvatarImage src="https://storage.googleapis.com/maker-studio-5a93d.appspot.com/users%2FqEg2yVE49bZ230z3a42qfI4pB3t1%2Fstudios%2Fdc48b261-26c3-424a-a434-d023b36ed658%2Fimage_1724036662446_46.png" alt="Le Minh Thong Avatar" data-ai-hint="professional portrait man" />
                  <AvatarFallback>LMT</AvatarFallback>
                </Avatar>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="flex flex-col gap-4 lg:col-span-3 text-center lg:text-left">
                    <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">{c.hero.title}</h1>
                    <h2 className="mt-2 text-2xl font-semibold text-foreground">{c.hero.subtitle}</h2>
                    <p className="mt-4 text-lg text-muted-foreground">{c.hero.description}</p>
                    
                    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                        {c.stats.map(stat => (
                            <div key={stat.label}>
                                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
                        <Button size="lg" variant="default" onClick={() => router.push('/about')}>
                            {c.readMore} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
              </motion.div>
          </div>
      </section>
  );
}
