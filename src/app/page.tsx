
'use client';

import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle,
  ChevronRight,
  Cpu,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Send,
  ShieldCheck,
  Smartphone,
  Target,
  User,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SectionReveal } from '@/components/motion/section-reveal';
import { HeroHighlight } from '@/components/motion/hero-highlight';
import { CardInteractive } from '@/components/motion/card-interactive';
import React from 'react';

const stats = [
    { value: '10+', label: 'Years of Experience' },
    { value: '20+', label: 'Systems' },
    { value: '5+', label: 'Industries' },
    { value: '100%', label: 'Commitment' },
];

const skills = {
    'Domain': [
        { name: 'System Architecture', level: 'Expert' },
        { name: 'ERP Solutions', level: 'Expert' },
        { name: 'Payment Systems', level: 'Advanced' },
        { name: 'Reporting & Dashboards', level: 'Expert' },
        { name: 'Automation', level: 'Advanced' },
        { name: 'Performance Optimization', level: 'Expert' },
        { name: 'Project Management', level: 'Advanced' },
        { name: 'System Security', level: 'Advanced' },
    ],
    'Technology': [
        { name: '.NET', level: 'Expert' },
        { name: 'Golang', level: 'Expert' },
        { name: 'SQL Server', level: 'Expert' },
        { name: 'Kafka', level: 'Advanced' },
        { name: 'Kubernetes', level: 'Advanced' },
        { name: 'React', level: 'Advanced' },
        { name: 'Azure', level: 'Advanced' },
        { name: 'Docker', level: 'Advanced' },
    ],
};

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

const expertiseAreas = [
    { title: 'ERP Systems', icon: Cpu },
    { title: 'Production Management', icon: Building2 },
    { title: 'HR & Payroll', icon: User },
    { title: 'Warehouse & Procurement', icon: Briefcase },
    { title: 'Payment Systems', icon: Smartphone },
];

const keyResults = [
    { title: 'Processed >10,000 transactions/day', icon: Zap },
    { title: 'Reduced inventory time by 30%', icon: CheckCircle },
    { title: 'Reduced processing time by 20%', icon: Rocket },
    { title: 'Automated processes', icon: ShieldCheck },
];


export default function HomePage() {
  return (
    <div className="flex flex-col space-y-24 md:space-y-32">
      {/* Hero Section */}
      <HeroHighlight>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -100 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                 className="lg:w-1/3 relative flex justify-center"
            >
                <Avatar className="w-64 h-64 md:w-80 md:h-80 border-4 border-primary/20 shadow-2xl shadow-primary/20">
                    <AvatarImage src="https://storage.googleapis.com/maker-studio-5a93d.appspot.com/users%2FqEg2yVE49bZ230z3a42qfI4pB3t1%2Fstudios%2Fdc48b261-26c3-424a-a434-d023b36ed658%2Fimage_1724036662446_46.png" alt="Avatar Le Minh Thong" data-ai-hint="man portrait professional" />
                    <AvatarFallback>LMT</AvatarFallback>
                </Avatar>
            </motion.div>
            <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                 <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-stone-400 sm:text-5xl md:text-6xl"
                >
                    Le Minh Thong
                </motion.h1>
                 <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-2 text-2xl font-semibold text-primary"
                >
                   Senior Software Engineer | Solution Architect
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-4 max-w-xl text-lg text-muted-foreground"
                >
                    Software engineer with over 10 years of experience in developing ERP systems and enterprise solutions. Specializing in .NET, Golang, Cloud, and Microservices.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-6 space-y-2 text-muted-foreground">
                    <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary"/><span>thongproleminh@gmail.com</span></div>
                    <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary"/><span>0396 870 644</span></div>
                    <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary"/><span>HCMC, Vietnam</span></div>
                </motion.div>
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8"
                >
                    <Button size="lg">View My Projects <ArrowRight className="ml-2"/></Button>
                </motion.div>
            </div>
        </div>
      </HeroHighlight>

       {/* Stats Section */}
      <SectionReveal>
        <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-4 rounded-xl"
                >
                    <p className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</p>
                    <p className="mt-2 text-muted-foreground">{stat.label}</p>
                </motion.div>
            ))}
            </div>
        </div>
      </SectionReveal>

      {/* About Section */}
      <SectionReveal id="about" className="scroll-mt-24">
        <div className="w-full">
            <div className="grid md:grid-cols-5 gap-12 items-start">
                <div className="md:col-span-2">
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">About Me</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Software engineer with over 10 years of experience in developing enterprise systems and ERP solutions.
                    </p>
                </div>
                <div className="md:col-span-3 space-y-6 text-muted-foreground">
                    <p>With over 10 years of experience, I specialize in designing and implementing large-scale ERP systems for leading corporations in Vietnam. I have a strong technical foundation and deep cross-industry business knowledge.</p>
                    <p>Successfully deployed 20+ large-scale systems for leading Vietnamese corporations in finance-banking, manufacturing, and HR.</p>
                    <p>I always aim to create technology solutions that not only meet technical requirements but also effectively solve complex business problems.</p>
                </div>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-secondary">Areas of Expertise</h3>
                    <div className="space-y-3">
                        {expertiseAreas.map(area => (
                            <div key={area.title} className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                                <area.icon className="w-6 h-6 text-primary"/>
                                <span className="text-muted-foreground">{area.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-secondary">Key Achievements</h3>
                    <div className="space-y-3">
                        {keyResults.map(result => (
                            <div key={result.title} className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                                <result.icon className="w-6 h-6 text-accent"/>
                                <span className="text-muted-foreground">{result.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </SectionReveal>

       {/* Skills Section */}
      <SectionReveal id="skills" className="scroll-mt-24">
        <div className="w-full">
            <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Core Skills</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Technologies and expertise that create distinct value
            </p>
            </div>
            <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-8">
            {Object.entries(skills).map(([category, skillList]) => (
                <div key={category}>
                <h3 className="text-2xl font-semibold text-secondary mb-4">{category}</h3>
                <div className="space-y-4">
                    {skillList.map(skill => (
                    <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-muted-foreground">{skill.name}</span>
                        <span className="text-sm font-medium text-primary">{skill.level}</span>
                        </div>
                        <div className="w-full bg-surface rounded-full h-2.5">
                        <motion.div
                            className="bg-primary h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: skill.level === 'Expert' ? '100%' : '80%' }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            viewport={{ once: true, amount: 0.8 }}
                        />
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            ))}
            </div>
        </div>
      </SectionReveal>

      {/* Experience Section */}
      <SectionReveal id="experience" className="scroll-mt-24">
        <div className="w-full">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Professional Experience</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    My career journey over the past 10 years
                </p>
            </div>
            <div className="mt-12 relative border-l-2 border-primary/20 pl-8">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp.company}
                        className="mb-12"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute -left-[1.05rem] mt-1.5 h-8 w-8 rounded-full bg-background border-4 border-primary flex items-center justify-center">
                            <Briefcase className="w-4 h-4 text-primary"/>
                        </div>
                        <p className="text-sm font-semibold text-primary">{exp.period}</p>
                        <h3 className="mt-1 text-xl font-bold text-secondary">{exp.company} - {exp.role}</h3>
                        <p className="mt-2 text-muted-foreground">{exp.description}</p>
                        <ul className="mt-3 space-y-1 list-inside">
                            {exp.tasks.map(task => (
                                <li key={task} className="flex items-start gap-2 text-muted-foreground">
                                    <ChevronRight className="w-4 h-4 text-accent mt-1 shrink-0"/>
                                    <span>{task}</span>
                                </li>
                            ))}
                        </ul>
                        {exp.highlight && <Badge variant="secondary" className="mt-3 bg-accent/10 text-accent-foreground border-accent/20">{exp.highlight}</Badge>}
                    </motion.div>
                ))}
            </div>
        </div>
      </SectionReveal>

      {/* Projects Section */}
      <SectionReveal id="projects" className="scroll-mt-24">
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
      
      {/* Career Goals */}
      <SectionReveal>
        <div className="w-full">
            <div className="text-center p-8 bg-surface rounded-2xl border border-border/50">
                <Target className="w-12 h-12 mx-auto text-primary mb-4"/>
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Career Goals</h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                    Aiming for a Senior System Architect/Technical Product Owner role, focusing on developing enterprise-scale ERP and payment systems.
                </p>
                <p className="mt-2 max-w-3xl mx-auto text-muted-foreground">
                    Continuing to enhance expertise in microservices architecture, cloud computing, and AI applications in enterprise management.
                </p>
            </div>
        </div>
      </SectionReveal>


      {/* Contact Section */}
      <SectionReveal id="contact" className="scroll-mt-24">
        <div className="w-full">
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
                <Card className="p-6 md:p-8 bg-surface border-border/50">
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
                </Card>
            </div>
        </div>
      </SectionReveal>
    </div>
  );
}
