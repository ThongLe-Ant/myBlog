
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
    { value: '10+', label: 'Năm kinh nghiệm' },
    { value: '20+', label: 'Hệ thống' },
    { value: '5+', label: 'Lĩnh vực' },
    { value: '100%', label: 'Cam kết' },
];

const skills = {
    'Lĩnh Vực': [
        { name: 'Kiến trúc hệ thống', level: 'Chuyên gia' },
        { name: 'Giải pháp ERP', level: 'Chuyên gia' },
        { name: 'Hệ thống thanh toán', level: 'Nâng cao' },
        { name: 'Báo cáo & Dashboard', level: 'Chuyên gia' },
        { name: 'Tự động hóa', level: 'Nâng cao' },
        { name: 'Tối ưu hiệu năng', level: 'Chuyên gia' },
        { name: 'Quản lý dự án', level: 'Nâng cao' },
        { name: 'Bảo mật hệ thống', level: 'Nâng cao' },
    ],
    'Công nghệ': [
        { name: '.NET', level: 'Chuyên gia' },
        { name: 'Golang', level: 'Chuyên gia' },
        { name: 'SQL Server', level: 'Chuyên gia' },
        { name: 'Kafka', level: 'Nâng cao' },
        { name: 'Kubernetes', level: 'Nâng cao' },
        { name: 'React', level: 'Nâng cao' },
        { name: 'Azure', level: 'Nâng cao' },
        { name: 'Docker', level: 'Nâng cao' },
    ],
};

const experiences = [
    {
        company: 'Ngân hàng Á Châu (ACB)',
        period: '2022 - Hiện tại',
        role: 'Backend Engineer',
        description: 'Phát triển hệ thống Ngân hàng Số cho một trong những ngân hàng hàng đầu Việt Nam.',
        tasks: [
            'SmartPOS: Ứng dụng POS thông minh xây dựng trên nền tảng .NET Core và Docker',
            'Thanh toán quốc tế: Tích hợp các hệ thống ARP/MoneyGram/Western Union',
        ],
        highlight: 'Xử lý >10.000 giao dịch/ngày',
    },
    {
        company: 'MoMo',
        period: '2020 - 2021',
        role: 'Backend Developer',
        description: 'Phát triển hệ thống CSM & Thanh toán nội bộ cho ví điện tử hàng đầu Việt Nam.',
        tasks: ['Tối ưu hóa hệ thống giao dịch với Golang & Kafka'],
        highlight: 'Giảm 20% thời gian xử lý thanh toán',
    },
    {
        company: 'FPT Software',
        period: '2018 - 2020',
        role: 'Technical Analyst',
        description: 'Phát triển các giải pháp ERP cho các khách hàng lớn trong nước và quốc tế.',
        tasks: [
            'Nguyễn Minh Steel: Hệ thống quản lý sản xuất thép toàn diện',
            'Sacombank: Giải pháp quản lý kho thiết bị tập trung',
        ],
    },
    {
        company: 'SamHo',
        period: '2016 - 2018',
        role: 'ERP Developer',
        description: 'Phát triển hệ thống ERP cho nhà máy với hơn 5.000 nhân viên.',
        tasks: ['Module Nhân sự - Tiền lương tích hợp', 'Quản lý sản xuất & BOM sản phẩm'],
    },
];

const projects = [
    {
        title: 'Thanh toán không dùng tiền mặt',
        client: 'MWG',
        category: 'Bán lẻ',
        description: 'Giải pháp tích hợp thanh toán điện tử cho chuỗi bán lẻ lớn nhất Việt Nam, xử lý hàng triệu giao dịch mỗi tháng.',
        tags: ['.NET Core', 'API Gateway', 'MSSQL', 'Docker'],
        imageUrl: 'https://placehold.co/600x400.png',
        aiHint: 'digital payment retail'
    },
    {
        title: 'Quản lý đặt hàng & tồn kho',
        client: 'EOC',
        category: 'Suất ăn công nghiệp',
        description: 'Hệ thống quản lý chuỗi cung ứng cho nhà cung cấp suất ăn công nghiệp với hơn 50.000 suất/ngày.',
        tags: ['Python', 'Java', 'Node.js', 'MongoDB'],
        imageUrl: 'https://placehold.co/600x400.png',
        aiHint: 'supply chain food'
    },
    {
        title: 'IoT quản lý sản xuất',
        client: 'VCS',
        category: 'Nông nghiệp',
        description: 'Giải pháp IoT giám sát và quản lý sản xuất nông nghiệp công nghệ cao trên 500ha.',
        tags: ['Golang', 'Next.js', 'IoT', 'PostgreSQL'],
        imageUrl: 'https://placehold.co/600x400.png',
        aiHint: 'iot agriculture farm'
    },
    {
        title: 'Quản lý kho & hải quan',
        client: 'ZA VN',
        category: 'Xuất nhập khẩu',
        description: 'Giải pháp quản lý kho, xuất nhập khẩu và hải quan cho doanh nghiệp logistics, tích hợp quy trình kiểm soát hàng hóa và chứng từ điện tử.',
        tags: ['Python', 'React Native'],
        imageUrl: 'https://placehold.co/600x400.png',
        aiHint: 'warehouse logistics customs'
    },
];

const expertiseAreas = [
    { title: 'Hệ thống ERP', icon: Cpu },
    { title: 'Quản lý sản xuất', icon: Building2 },
    { title: 'Nhân sự & Tiền lương', icon: User },
    { title: 'Quản lý kho & Mua hàng', icon: Briefcase },
    { title: 'Hệ thống thanh toán', icon: Smartphone },
];

const keyResults = [
    { title: 'Xử lý >10.000 giao dịch/ngày', icon: Zap },
    { title: 'Giảm 30% thời gian kiểm kê', icon: CheckCircle },
    { title: 'Giảm 20% thời gian xử lý', icon: Rocket },
    { title: 'Tự động hóa quy trình', icon: ShieldCheck },
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
                    <AvatarImage src="https://placehold.co/400x400.png" alt="Avatar Lê Minh Thông" data-ai-hint="man portrait professional" />
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
                    Lê Minh Thông
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
                    Kỹ sư phần mềm với hơn 10 năm kinh nghiệm trong phát triển hệ thống ERP và giải pháp doanh nghiệp. Chuyên sâu về .NET, Golang, Cloud và Microservices.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-6 space-y-2 text-muted-foreground">
                    <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary"/><span>thongproleminh@gmail.com</span></div>
                    <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary"/><span>0396 870 644</span></div>
                    <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary"/><span>TP.HCM, Việt Nam</span></div>
                </motion.div>
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8"
                >
                    <Button size="lg">Xem dự án của tôi <ArrowRight className="ml-2"/></Button>
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
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Giới thiệu</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Kỹ sư phần mềm với hơn 10 năm kinh nghiệm trong phát triển hệ thống doanh nghiệp và giải pháp ERP.
                    </p>
                </div>
                <div className="md:col-span-3 space-y-6 text-muted-foreground">
                    <p>Với hơn 10 năm kinh nghiệm, tôi chuyên sâu về thiết kế và triển khai các hệ thống ERP quy mô lớn cho các tập đoàn hàng đầu tại Việt Nam. Nền tảng kỹ thuật vững chắc cùng hiểu biết sâu về nghiệp vụ đa ngành.</p>
                    <p>Đã triển khai thành công 20+ hệ thống quy mô lớn cho các tập đoàn hàng đầu Việt Nam trong các lĩnh vực tài chính-ngân hàng, sản xuất và nhân sự.</p>
                    <p>Tôi luôn hướng đến việc tạo ra các giải pháp công nghệ không chỉ đáp ứng yêu cầu kỹ thuật mà còn giải quyết hiệu quả các bài toán nghiệp vụ phức tạp.</p>
                </div>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-secondary">Lĩnh vực chuyên sâu</h3>
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
                    <h3 className="text-2xl font-semibold mb-4 text-secondary">Kết quả nổi bật</h3>
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
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Kỹ năng cốt lõi</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Các công nghệ và lĩnh vực chuyên môn tạo nên giá trị khác biệt
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
                            whileInView={{ width: skill.level === 'Chuyên gia' ? '100%' : '80%' }}
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
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Kinh nghiệm nổi bật</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Hành trình phát triển nghề nghiệp trong 10 năm qua
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
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Dự án tư vấn tiêu biểu</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Các giải pháp công nghệ đã triển khai thành công cho đối tác
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
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Mục tiêu nghề nghiệp</h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                    Hướng tới vai trò Senior System Architect/Technical Product Owner, tập trung phát triển giải pháp ERP và hệ thống thanh toán quy mô doanh nghiệp.
                </p>
                <p className="mt-2 max-w-3xl mx-auto text-muted-foreground">
                    Tiếp tục nâng cao chuyên môn về kiến trúc microservices, điện toán đám mây và AI ứng dụng trong quản trị doanh nghiệp.
                </p>
            </div>
        </div>
      </SectionReveal>


      {/* Contact Section */}
      <SectionReveal id="contact" className="scroll-mt-24">
        <div className="w-full">
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Liên hệ với tôi</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Luôn sẵn sàng cho các cơ hội hợp tác, dự án mới và trao đổi kiến thức chuyên môn.
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
                            <span className="text-muted-foreground">TP.HCM, Việt Nam</span>
                        </div>
                    </div>
                </div>
                <Card className="p-6 md:p-8 bg-surface border-border/50">
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-secondary">Họ và tên</label>
                            <Input id="name" placeholder="Nhập họ tên của bạn" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-secondary">Email</label>
                            <Input id="email" type="email" placeholder="Nhập địa chỉ email" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-secondary">Nội dung</label>
                            <Textarea id="message" placeholder="Nhập nội dung liên hệ" rows={4}/>
                        </div>
                        <Button type="submit" size="lg" className="w-full">
                            Gửi thông điệp <Send className="ml-2"/>
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
      </SectionReveal>
    </div>
  );
}
