
'use client';

import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle,
  ChevronRight,
  Cpu,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Target,
  Twitter,
  User,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SectionReveal } from '@/components/motion/section-reveal';
import { CardInteractive } from '@/components/motion/card-interactive';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';

const experiences = [
    {
        company: 'Asia Commercial Bank (ACB)',
        period: '2022 - Present',
        role: 'Backend Engineer',
        description: 'Developing the Digital Banking system for one of the leading banks in Vietnam.',
        tasks: [
            'SmartPOS: A smart POS application built on .NET Core and Docker',
            'International Payments: Integrated ARP/MoneyGram/Western Union systems',
        ],
        highlight: 'Processed >10,000 transactions/day',
    },
    {
        company: 'MoMo',
        period: '2020 - 2021',
        role: 'Backend Developer',
        description: 'Developed the CSM & Internal Payment system for Vietnam\'s leading e-wallet.',
        tasks: ['Optimized transaction system with Golang & Kafka'],
        highlight: 'Reduced payment processing time by 20%',
    },
    {
        company: 'FPT Software',
        period: '2018 - 2020',
        role: 'Technical Analyst',
        description: 'Developed ERP solutions for major domestic and international clients.',
        tasks: [
            'Nguyen Minh Steel: Comprehensive steel production management system',
            'Sacombank: Centralized equipment warehouse management solution',
        ],
    },
    {
        company: 'SamHo',
        period: '2016 - 2018',
        role: 'ERP Developer',
        description: 'Developed an ERP system for a factory with over 5,000 employees.',
        tasks: ['Integrated HR - Payroll module', 'Production Management & Product BOM'],
    },
];

const projects = [
    {
        title: 'Cashless Payment',
        client: 'MWG',
        category: 'Retail',
        description: 'Integrated electronic payment solution for Vietnam\'s largest retail chain, handling millions of transactions per month.',
        tags: ['.NET Core', 'API Gateway', 'MSSQL', 'Docker'],
        imageUrl: 'https://placehold.co/600x400.png',
        aiHint: 'digital payment retail'
    },
    {
        title: 'Order & Inventory Management',
        client: 'EOC',
        category: 'Industrial Catering',
        description: 'Supply chain management system for an industrial catering provider with over 50,000 meals/day.',
        tags: ['Python', 'Java', 'Node.js', 'MongoDB'],
        imageUrl: 'https://placehold.co/600x400.png',
        aiHint: 'supply chain food'
    },
    {
        title: 'IoT Production Management',
        client: 'VCS',
        category: 'Agriculture',
        description: 'IoT solution for monitoring and managing high-tech agricultural production on over 500ha.',
        tags: ['Golang', 'Next.js', 'IoT', 'PostgreSQL'],
        imageUrl: 'https://placehold.co/600x400.png',
        aiHint: 'iot agriculture farm'
    },
    {
        title: 'Warehouse & Customs Management',
        client: 'ZA VN',
        category: 'Logistics',
        description: 'Warehouse, import/export, and customs management solution for a logistics company, integrating goods control and electronic document processes.',
        tags: ['Python', 'React Native'],
        imageUrl: 'https://placehold.co/600x400.png',
        aiHint: 'warehouse logistics customs'
    },
];

const blogPosts = [
    {
        title: 'Architecting Resilient Microservices',
        category: 'System Architecture',
        excerpt: 'A deep dive into patterns for building fault-tolerant and scalable microservices systems.',
        imageUrl: 'https://placehold.co/800x600.png',
        aiHint: 'microservices architecture diagram',
    },
    {
        title: 'The Power of Golang in High-Performance Systems',
        category: 'Backend Development',
        excerpt: 'Exploring how Go\'s concurrency model and performance make it ideal for payment gateways and high-traffic APIs.',
        imageUrl: 'https://placehold.co/800x600.png',
        aiHint: 'golang code abstract',
    },
    {
        title: 'From Monolith to Micro-frontends: A Journey',
        category: 'Frontend',
        excerpt: 'Our experience in breaking down a monolithic frontend into manageable, deployable micro-frontends.',
        imageUrl: 'https://placehold.co/800x600.png',
        aiHint: 'frontend code modules',
    }
];


export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="flex flex-col">
      {/* New Hero Section */}
      <section className="relative flex flex-col lg:flex-row gap-8 lg:gap-16 min-h-[calc(100vh-4rem)] w-full py-12 md:py-24">
        {/* Left: Personal Info (Sticky) */}
        <motion.div 
            className="lg:w-1/3 lg:sticky lg:top-24 h-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="flex flex-col items-center lg:items-start">
            <Avatar className="w-40 h-40 border-4 border-primary/20 shadow-xl shadow-primary/20">
              <AvatarImage src="https://storage.googleapis.com/maker-studio-5a93d.appspot.com/users%2FqEg2yVE49bZ230z3a42qfI4pB3t1%2Fstudios%2Fdc48b261-26c3-424a-a434-d023b36ed658%2Fimage_1724036662446_46.png" alt="Avatar Le Minh Thong" data-ai-hint="man portrait professional" />
              <AvatarFallback>LMT</AvatarFallback>
            </Avatar>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-stone-400">
              Le Minh Thong
            </h1>
            <h2 className="mt-2 text-xl font-semibold text-primary">
              Senior Software Engineer | Solution Architect
            </h2>
            <p className="mt-4 text-left text-muted-foreground">
              Software engineer with over 10 years of experience in developing ERP systems and enterprise solutions.
            </p>
            <div className="mt-6 space-y-3 text-muted-foreground">
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary"/><span>thongproleminh@gmail.com</span></div>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary"/><span>0396 870 644</span></div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary"/><span>HCMC, Vietnam</span></div>
            </div>
            <div className="flex items-center gap-4 mt-6">
                <Button variant="ghost" size="icon" asChild><a href="https://github.com/thongproleminh" target="_blank"><Github/></a></Button>
                <Button variant="ghost" size="icon" asChild><a href="https://linkedin.com/in/thongproleminh" target="_blank"><Linkedin/></a></Button>
                <Button variant="ghost" size="icon" asChild><a href="https://twitter.com/thongproleminh" target="_blank"><Twitter/></a></Button>
            </div>
          </div>
        </motion.div>

        {/* Right: Blog Slider */}
        <motion.div 
            className="lg:w-2/3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-secondary">Featured Articles</h3>
                <Button variant="outline">
                    <Search className="mr-2 h-4 w-4"/>
                    Search Blog
                </Button>
            </div>
            <Carousel className="w-full" opts={{ align: "start", loop: true }}>
              <CarouselContent className="-ml-4">
                {blogPosts.map((post, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-full">
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden group">
                        <Image src={post.imageUrl} alt={post.title} layout="fill" className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-110" data-ai-hint={post.aiHint} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"/>
                        <div className="absolute bottom-0 left-0 p-6 md:p-8">
                            <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                            <h4 className="text-2xl md:text-3xl font-bold text-white">{post.title}</h4>
                            <p className="mt-2 text-white/80 max-w-lg">{post.excerpt}</p>
                            <Button variant="link" className="p-0 mt-4 text-primary h-auto">Read More <ArrowRight className="ml-2"/></Button>
                        </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        </motion.div>
      </section>

      {/* Experience Section - The Journey */}
      <SectionReveal id="experience" className="scroll-mt-24 py-24">
        <div className="w-full">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">The Journey</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    A timeline of my professional growth and key contributions over the past decade.
                </p>
            </div>
            <div className="relative w-full">
                {/* The timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-border/50 -translate-x-1/2"></div>
                
                <motion.div 
                    className="space-y-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {experiences.map((exp, index) => (
                        <motion.div 
                            key={index} 
                            className="relative flex items-start gap-6 md:gap-12"
                            variants={itemVariants}
                        >
                            {/* Dot on timeline */}
                            <div className="absolute left-4 top-1 h-4 w-4 rounded-full bg-primary ring-8 ring-background md:left-1/2 -translate-x-1/2"></div>
                            
                            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-[calc(50%+2rem)]' : 'md:pr-[calc(50%+2rem)] md:text-right'} md:ml-auto`}>
                                <div className={`p-6 bg-surface border border-border/50 rounded-2xl ${index % 2 === 0 ? '' : 'md:ml-auto'}`}>
                                    <p className="text-sm font-semibold text-primary">{exp.period}</p>
                                    <h3 className="mt-1 text-xl font-bold text-secondary">{exp.company}</h3>
                                    <p className="text-base font-semibold text-primary/80">{exp.role}</p>
                                    <p className="mt-3 text-muted-foreground">{exp.description}</p>
                                    <ul className={`mt-3 space-y-1 list-inside ${index % 2 !== 0 && 'md:text-left'}`}>
                                        {exp.tasks.map(task => (
                                            <li key={task} className="flex items-start gap-2 text-muted-foreground">
                                                <ChevronRight className="w-4 h-4 text-accent mt-1 shrink-0"/>
                                                <span>{task}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {exp.highlight && <Badge variant="secondary" className="mt-4 bg-accent/10 text-accent-foreground border-accent/20">{exp.highlight}</Badge>}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
      </SectionReveal>

      {/* Projects Section */}
      <SectionReveal id="projects" className="scroll-mt-24 py-24">
        <div className="w-full">
            <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Featured Projects</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Successfully implemented technology solutions for partners
            </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-12">
                {projects.map((project, index) => (
                    <SectionReveal key={project.title} options={{ delay: index * 0.1 }}>
                        <CardInteractive
                            title={project.title}
                            description={project.description}
                            tags={project.tags}
                            imageUrl={project.imageUrl}
                            aiHint={project.aiHint}
                        />
                    </SectionReveal>
                ))}
            </div>
        </div>
      </SectionReveal>
      
      {/* Contact Section */}
      <SectionReveal id="contact" className="scroll-mt-24 py-24">
        <div className="w-full">
            <Card className="p-6 md:p-8 lg:p-12 bg-surface border-border/50">
              <div className="grid md:grid-cols-2 gap-12">
                  <div>
                      <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Contact Me</h2>
                      <p className="mt-4 text-lg text-muted-foreground">
                          Always open to collaboration opportunities, new projects, and professional knowledge exchange.
                      </p>
                      <div className="mt-8 space-y-4">
                          <div className="flex items-center gap-4 text-lg">
                              <Mail className="w-6 h-6 text-primary"/>
                              <span className="text-muted-foreground">thongproleminh@gmail.com</span>
                          </div>
                          <div className="flex items-center gap-4 text-lg">
                              <Phone className="w-6 h-6 text-primary"/>
                              <span className="text-muted-foreground">0396 870 644</span>
                          </div>
                          <div className="flex items-center gap-4 text-lg">
                              <MapPin className="w-6 h-6 text-primary"/>
                              <span className="text-muted-foreground">HCMC, Vietnam</span>
                          </div>
                      </div>
                  </div>
                  <form className="space-y-6">
                      <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-secondary">Full Name</label>
                          <Input id="name" placeholder="Enter your full name" />
                      </div>
                      <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-secondary">Email</label>
                          <Input id="email" type="email" placeholder="Enter your email address" />
                      </div>
                      <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium text-secondary">Message</label>
                          <Textarea id="message" placeholder="Enter your message" rows={4}/>
                      </div>
                      <Button type="submit" size="lg" className="w-full">
                          Send Message <Send className="ml-2"/>
                      </Button>
                  </form>
              </div>
            </Card>
        </div>
      </SectionReveal>
    </div>
  );
}
