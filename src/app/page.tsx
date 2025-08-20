
'use client';

import {
  ArrowRight,
  Download,
  Mail,
  MapPin,
  Phone,
  Search,
  Send,
  CheckCircle,
  Zap,
  Newspaper
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SectionReveal } from '@/components/motion/section-reveal';
import { CardInteractive } from '@/components/motion/card-interactive';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Autoplay from "embla-carousel-autoplay"
import { useLanguage } from '@/context/language-context';
import { HeroHighlight } from '@/components/motion/hero-highlight';
import { useRouter } from 'next/navigation';
import { Post, getPosts } from '@/lib/posts';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const content = {
  en: {
    hero: {
      title: "Le Minh Thong",
      subtitle: "Senior Software Engineer | Solution Architect",
      description: "Software engineer with over 10 years of experience in developing ERP systems and enterprise solutions. Specializing in .NET, Golang, Cloud, and Microservices.",
      email: "thongproleminh@gmail.com",
      phone: "(+84) 396 870 644",
      location: "HCMC, Vietnam",
      downloadCV: "Download CV",
      readMore: "Read More"
    },
    blog: {
        title: "Featured Articles",
        description: "Sharing knowledge and insights from my journey in the tech world.",
        viewAll: "View All Posts"
    },
  },
  vi: {
    hero: {
      title: "Lê Minh Thông",
      subtitle: "Kỹ sư Phần mềm Cao cấp | Kiến trúc sư Giải pháp",
      description: "Kỹ sư phần mềm với hơn 10 năm kinh nghiệm phát triển hệ thống ERP và các giải pháp cho doanh nghiệp. Chuyên sâu về .NET, Golang, Cloud và Microservices.",
      email: "thongproleminh@gmail.com",
      phone: "0396 870 644",
      location: "TP.HCM, Việt Nam",
      downloadCV: "Tải CV",
      readMore: "Xem thêm"
    },
    blog: {
        title: "Bài viết nổi bật",
        description: "Chia sẻ kiến thức và góc nhìn từ hành trình trong thế giới công nghệ.",
        viewAll: "Xem tất cả"
    },
  }
};


export default function HomePage() {
  const { language } = useLanguage();
  const c = content[language];
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const allPosts = await getPosts();
      const publishedPosts = allPosts.filter(p => p.published);
      setPosts(publishedPosts.slice(0, 5)); // Get latest 5 posts
    }
    fetchPosts();
  }, []);

  const handleScrollTo = (id: string) => {
    if (id.startsWith('/')) {
        router.push(id);
    } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
    }
  };


  return (
    <div className="flex flex-col w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <HeroHighlight>
            <div className="grid lg:grid-cols-5 items-center gap-8 w-full">
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
                      <div className="mt-6 space-y-3 text-muted-foreground">
                        <div className="flex items-center justify-center lg:justify-start gap-3"><Mail className="w-5 h-5 text-primary"/><span>{c.hero.email}</span></div>
                        <div className="flex items-center justify-center lg:justify-start gap-3"><Phone className="w-5 h-5 text-primary"/><span>{c.hero.phone}</span></div>
                        <div className="flex items-center justify-center lg:justify-start gap-3"><MapPin className="w-5 h-5 text-primary"/><span>{c.hero.location}</span></div>
                      </div>
                      <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
                        <Button size="lg" onClick={() => handleScrollTo('/about')}>
                          {c.hero.readMore} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                </motion.div>
            </div>
        </HeroHighlight>

        {/* Blog Posts Section */}
        <SectionReveal id="blog" className="scroll-mt-24 py-24">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{c.blog.title}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    {c.blog.description}
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                    <SectionReveal 
                        key={post.slug} 
                        className={cn(
                            "group",
                            index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                        )}
                        options={{delay: index * 0.1}}
                    >
                        <Link href={`/posts/${post.slug}`} className="block h-full">
                            <Card className="bg-surface h-full flex flex-col overflow-hidden transition-all duration-300 ease-smooth group-hover:border-primary group-hover:shadow-xl group-hover:-translate-y-1">
                                <div className={cn("relative w-full overflow-hidden", index === 0 ? "aspect-video" : "aspect-[16/10]")}>
                                    <Image
                                        src={post.imageUrl || 'https://placehold.co/800x600.png'}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                                        data-ai-hint="tech blog"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <Badge variant="secondary" className="self-start mb-2">{post.category}</Badge>
                                    <h3 className={cn("font-bold text-foreground", index === 0 ? "text-2xl" : "text-xl")}>{post.title}</h3>
                                    <p className="mt-3 text-muted-foreground text-base flex-grow">{post.excerpt}</p>
                                    <div className="mt-4 text-sm font-semibold text-primary group-hover:underline">
                                        Read More <ArrowRight className="inline-block h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </SectionReveal>
                ))}
            </div>
             <div className="mt-16 text-center">
                <Button size="lg" asChild variant="outline">
                    <Link href="/posts">
                        {c.blog.viewAll} <Newspaper className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </SectionReveal>
      </div>
    </div>
  );
}
