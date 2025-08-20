
'use client';

import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle,
  ChevronRight,
  Cpu,
  Download,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Mountain,
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SectionReveal } from '@/components/motion/section-reveal';
import { CardInteractive } from '@/components/motion/card-interactive';
import React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Autoplay from "embla-carousel-autoplay"

const experiences = [
    {
        company: 'Asia Commercial Bank (ACB)',
        period: '2022 - Present',
        role: 'Backend Engineer',
        description: 'Developing Digital Banking systems for one of the leading banks in Vietnam.',
        tasks: [
            'SmartPOS: An intelligent POS application built on .NET Core and Docker',
            'International Payments: Integration with ARP/MoneyGram/Western Union systems',
        ],
        highlight: 'Handles >10,000 transactions/day',
    },
    {
        company: 'MoMo',
        period: '2020 - 2021',
        role: 'Backend Developer',
        description: 'Developed CSM & Internal Payment systems for Vietnam\'s leading e-wallet.',
        tasks: ['Optimized transaction systems with Golang & Kafka'],
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
        title: 'Cashless Payment Solution',
        client: 'MWG',
        category: 'Retail',
        description: 'Integrated electronic payment solution for Vietnam\'s largest retail chain, processing millions of transactions monthly.',
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
        title: 'IoT for Production Management',
        client: 'VCS',
        category: 'Agriculture',
        description: 'IoT solution for monitoring and managing high-tech agricultural production over 500ha.',
        tags: ['Golang', 'Next.js', 'IoT', 'PostgreSQL'],
        imageUrl: 'https://placehold.co/600x400.png',
        aiHint: 'iot agriculture farm'
    },
    {
        title: 'Warehouse & Customs Management',
        client: 'ZA VN',
        category: 'Logistics',
        description: 'Warehouse, import/export, and customs management solution for a logistics company, integrating goods control and e-document processes.',
        tags: ['Python', 'React Native'],
        imageUrl: 'https://placehold.co/600x400.png',
        aiHint: 'warehouse logistics customs'
    },
];

const skills = {
  domain: [
    { name: 'System Architecture', level: 'Expert' },
    { name: 'ERP Solutions', level: 'Expert' },
    { name: 'Payment Systems', level: 'Advanced' },
    { name: 'Reporting & Dashboards', level: 'Expert' },
    { name: 'Automation', level: 'Advanced' },
    { name: 'Performance Tuning', level: 'Expert' },
    { name: 'Project Management', level: 'Advanced' },
    { name: 'System Security', level: 'Advanced' },
  ],
  tech: [
    '.NET', 'Golang', 'Python', 'Java', 'Node.js', 'React', 'Next.js', 'TypeScript',
    'SQL Server', 'PostgreSQL', 'MongoDB', 'Kafka', 'Redis', 'Docker', 'Kubernetes',
    'AWS', 'Azure', 'CI/CD', 'Microservices', 'API Gateway'
  ]
};

const expertiseAreas = [
  'ERP Systems', 'Production Management', 'HR & Payroll', 'Warehouse & Procurement', 'Payment Systems'
];

const keyResults = [
  'Handles >10,000 transactions/day', '30% reduction in inventory time', '20% reduction in processing time',
  'Automated processes', 'Optimized operational costs'
];

const blogCategories = [
  { name: 'System Architecture', count: 5 },
  { name: 'Backend Development', count: 8 },
  { name: 'Cloud & DevOps', count: 3 },
  { name: 'Career & Productivity', count: 4 },
  { name: 'Project Management', count: 2 },
];


export default function HomePage() {
  const autoplay = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  const handleDownloadCV = () => {
    const cvContent = document.getElementById('cv-content');
    if (cvContent) {
      html2canvas(cvContent, {
        scale: 2, // Improve resolution
        useCORS: true,
        backgroundColor: '#0a0a0a' 
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'p',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('Le-Minh-Thong-CV.pdf');
      });
    }
  };

  return (
    <div className="flex flex-col w-full">

      {/* Blog Banner Section */}
      <section className="w-full bg-surface/50 pb-12 md:pb-16 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-2">
                 <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[autoplay.current]}
                    className="w-full"
                >
                    <CarouselContent>
                        {projects.map((project, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                   <CardInteractive
                                        title={project.title}
                                        description={project.description}
                                        tags={project.tags}
                                        imageUrl={project.imageUrl}
                                        aiHint={project.aiHint}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Post Categories</CardTitle>
                  <CardDescription>Explore posts by topic.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {blogCategories.map(cat => (
                       <li key={cat.name} className="flex justify-between items-center text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                         <span>{cat.name}</span>
                         <Badge variant="secondary" className="font-mono">{cat.count}</Badge>
                       </li>
                    ))}
                  </ul>
                   <Button variant="outline" className="w-full mt-4">
                      <Search className="mr-2 h-4 w-4" />
                      Search all posts
                  </Button>
                </CardContent>
              </Card>
            </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <div id="cv-content" className="container mx-auto px-4 pt-24 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section id="home" className="relative grid lg:grid-cols-3 items-center gap-8 lg:gap-16 w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:col-span-1 flex justify-center lg:justify-start"
            >
              <Avatar className="w-40 h-40 border-4 border-primary/20 shadow-xl shadow-primary/20">
                <AvatarImage src="https://storage.googleapis.com/maker-studio-5a93d.appspot.com/users%2FqEg2yVE49bZ230z3a42qfI4pB3t1%2Fstudios%2Fdc48b261-26c3-424a-a434-d023b36ed658%2Fimage_1724036662446_46.png" alt="Le Minh Thong Avatar" data-ai-hint="professional portrait man" />
                <AvatarFallback>LMT</AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="flex flex-col gap-4 lg:col-span-2">
                 <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Le Minh Thong</h2>
                <h3 className="mt-2 text-xl font-semibold text-secondary">Senior Software Engineer | Solution Architect</h3>
                <p className="mt-4 text-lg text-muted-foreground">Software engineer with over 10 years of experience in developing ERP systems and enterprise solutions. Specializing in .NET, Golang, Cloud, and Microservices.</p>
                <div className="mt-6 space-y-3 text-muted-foreground">
                  <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary"/><span>thongproleminh@gmail.com</span></div>
                  <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary"/><span>(+84) 396 870 644</span></div>
                  <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary"/><span>HCMC, Vietnam</span></div>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <Button size="lg" onClick={handleDownloadCV}>
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </Button>
                  <Button size="lg" variant="outline">Contact Me</Button>
                </div>
            </div>
          </section>

          {/* About Section */}
          <SectionReveal id="about" className="scroll-mt-24 py-24">
            <div className="w-full grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">About Me</h2>
                    <h3 className="mt-2 text-xl font-semibold text-secondary">Software engineer with over 10 years of experience in enterprise systems and ERP solutions.</h3>
                    <p className="mt-4 text-lg text-muted-foreground">With over 10 years of experience, I specialize in designing and implementing large-scale ERP systems for leading corporations in Vietnam. I have a strong technical foundation and a deep understanding of various business domains.</p>
                    <p className="mt-4 text-lg text-muted-foreground">Successfully deployed 20+ large-scale systems for top Vietnamese corporations in finance-banking, manufacturing, and HR.</p>
                    <p className="mt-4 text-lg text-muted-foreground">I always aim to create technology solutions that not only meet technical requirements but also effectively solve complex business problems.</p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="font-bold text-secondary">Areas of Expertise</h4>
                    <ul className="space-y-2">
                      {expertiseAreas.map(area => (
                        <li key={area} className="flex items-center gap-3 text-muted-foreground">
                          <CheckCircle className="w-5 h-5 text-primary"/>
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h4 className="font-bold text-secondary">Key Achievements</h4>
                    <ul className="space-y-2">
                      {keyResults.map(result => (
                        <li key={result} className="flex items-center gap-3 text-muted-foreground">
                          <Zap className="w-5 h-5 text-primary"/>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
            </div>
          </SectionReveal>
          
          {/* Skills Section */}
          <SectionReveal id="skills" className="scroll-mt-24 py-24">
            <div className="w-full">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Core Skills</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Technologies and expertise that create distinct value.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold text-secondary mb-6">Domain</h3>
                        <div className="space-y-4">
                            {skills.domain.map(skill => (
                                <div key={skill.name}>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-medium text-muted-foreground">{skill.name}</span>
                                        <span className="text-sm font-semibold text-primary">{skill.level}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h3 className="text-2xl font-bold text-secondary mb-6">Technology</h3>
                        <div className="flex flex-wrap gap-3">
                            {skills.tech.map(tech => (
                                <Badge key={tech} variant="secondary" className="text-base px-4 py-2">{tech}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          </SectionReveal>

          {/* Experience Section */}
          <SectionReveal id="experience" className="scroll-mt-24 py-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Professional Experience</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                  A journey of professional growth over the past 10 years.
                </p>
            </div>
            <div className="relative w-full max-w-4xl mx-auto">
                 <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border/50 hidden md:block" />
                 <div className="space-y-16">
                    {experiences.map((exp, index) => (
                        <div key={index} className="md:grid md:grid-cols-2 md:gap-16 relative">
                            {/* Content */}
                            <div className={`${index % 2 === 0 ? 'md:order-2 md:text-right' : ''}`}>
                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.6 }}
                                    className="p-6 bg-surface border border-border/50 rounded-2xl w-full"
                                >
                                    <p className="text-sm font-semibold text-primary">{exp.period}</p>
                                    <h3 className="mt-1 text-xl font-bold text-secondary">{exp.company}</h3>
                                    <p className="text-base font-semibold text-primary/80">{exp.role}</p>
                                    <p className="mt-3 text-muted-foreground">{exp.description}</p>
                                </motion.div>
                            </div>
                            
                            {/* Timeline Circle */}
                            <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-primary ring-8 ring-background" />

                            {/* Spacer */}
                            <div className={`${index % 2 === 0 ? 'md:order-1' : ''}`}></div>
                        </div>
                    ))}
                 </div>
            </div>
          </SectionReveal>

          {/* Projects Section */}
          <SectionReveal id="projects" className="scroll-mt-24 py-24">
            <div className="w-full">
                <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Featured Consulting Projects</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Successfully implemented technology solutions for partners.
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

          {/* Career Goals Section */}
           <SectionReveal id="goals" className="scroll-mt-24 py-24">
             <div className="w-full text-center">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Career Goals</h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                  Aiming for a Senior System Architect/Technical Product Owner role, focusing on developing enterprise-scale ERP and payment solutions. Continuously enhancing expertise in microservices architecture, cloud computing, and AI applications in business management.
                </p>
             </div>
           </SectionReveal>
          
          {/* Contact Section */}
          <SectionReveal id="contact" className="scroll-mt-24 py-24">
            <div className="w-full">
                <Card className="p-6 md:p-8 lg:p-12 bg-surface border-border/50">
                  <div className="grid md:grid-cols-2 gap-12">
                      <div>
                          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Get in Touch</h2>
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
    </div>
  );
}

    

    

    