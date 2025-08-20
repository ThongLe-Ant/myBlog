
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

const skills = {
  domain: [
    { name: 'Kiến trúc hệ thống', level: 'Chuyên gia' },
    { name: 'Giải pháp ERP', level: 'Chuyên gia' },
    { name: 'Hệ thống thanh toán', level: 'Nâng cao' },
    { name: 'Báo cáo & Dashboard', level: 'Chuyên gia' },
    { name: 'Tự động hóa', level: 'Nâng cao' },
    { name: 'Tối ưu hiệu năng', level: 'Chuyên gia' },
    { name: 'Quản lý dự án', level: 'Nâng cao' },
    { name: 'Bảo mật hệ thống', level: 'Nâng cao' },
  ],
  tech: [
    '.NET', 'Golang', 'Python', 'Java', 'Node.js', 'React', 'Next.js', 'TypeScript',
    'SQL Server', 'PostgreSQL', 'MongoDB', 'Kafka', 'Redis', 'Docker', 'Kubernetes',
    'AWS', 'Azure', 'CI/CD', 'Microservices', 'API Gateway'
  ]
};

const expertiseAreas = [
  'Hệ thống ERP', 'Quản lý sản xuất', 'Nhân sự & Tiền lương', 'Quản lý kho & Mua hàng', 'Hệ thống thanh toán'
];

const keyResults = [
  'Xử lý >10.000 giao dịch/ngày', 'Giảm 30% thời gian kiểm kê', 'Giảm 20% thời gian xử lý',
  'Tự động hóa quy trình', 'Tối ưu chi phí vận hành'
];


export default function HomePage() {

  return (
    <div className="flex flex-col w-full">

      {/* Hero Section */}
      <section id="home" className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 min-h-[calc(100vh-4rem)] w-full py-12 md:py-24">
        <div className="lg:w-2/5">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Avatar className="w-40 h-40 border-4 border-primary/20 shadow-xl shadow-primary/20">
              <AvatarImage src="https://storage.googleapis.com/maker-studio-5a93d.appspot.com/users%2FqEg2yVE49bZ230z3a42qfI4pB3t1%2Fstudios%2Fdc48b261-26c3-424a-a434-d023b36ed658%2Fimage_1724036662446_46.png" alt="Avatar Lê Minh Thông" data-ai-hint="man portrait professional" />
              <AvatarFallback>LMT</AvatarFallback>
            </Avatar>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-stone-400 sm:text-5xl">
              Lê Minh Thông
            </h1>
            <h2 className="mt-2 text-xl font-semibold text-primary">
              Senior Software Engineer | Solution Architect
            </h2>
            <p className="mt-4 text-left text-muted-foreground">
              Kỹ sư phần mềm với hơn 10 năm kinh nghiệm trong phát triển hệ thống ERP và giải pháp doanh nghiệp. Chuyên sâu về .NET, Golang, Cloud và Microservices.
            </p>
            <div className="mt-6 space-y-3 text-muted-foreground">
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary"/><span>thongproleminh@gmail.com</span></div>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary"/><span>0396 870 644</span></div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary"/><span>TP.HCM, Việt Nam</span></div>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <Button size="lg">Xem dự án của tôi</Button>
              <Button size="lg" variant="outline">Liên hệ ngay</Button>
            </div>
          </motion.div>
        </div>
        <div className="lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              <Card className="p-6 bg-surface border-border/50">
                <CardHeader className="p-0">
                  <CardTitle className="text-5xl font-bold text-primary">10+</CardTitle>
                  <CardDescription className="text-muted-foreground">Năm kinh nghiệm</CardDescription>
                </CardHeader>
              </Card>
              <Card className="p-6 bg-surface border-border/50">
                <CardHeader className="p-0">
                  <CardTitle className="text-5xl font-bold text-primary">20+</CardTitle>
                  <CardDescription className="text-muted-foreground">Hệ thống</CardDescription>
                </CardHeader>
              </Card>
               <Card className="p-6 bg-surface border-border/50">
                <CardHeader className="p-0">
                  <CardTitle className="text-5xl font-bold text-primary">5+</CardTitle>
                  <CardDescription className="text-muted-foreground">Lĩnh vực</CardDescription>
                </CardHeader>
              </Card>
               <Card className="p-6 bg-surface border-border/50">
                <CardHeader className="p-0">
                  <CardTitle className="text-5xl font-bold text-primary">100%</CardTitle>
                  <CardDescription className="text-muted-foreground">Cam kết</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
        </div>
      </section>

      {/* About Section */}
      <SectionReveal id="about" className="scroll-mt-24 py-24">
        <div className="w-full grid md:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Giới thiệu</h2>
                <h3 className="mt-2 text-xl font-semibold text-secondary">Kỹ sư phần mềm với hơn 10 năm kinh nghiệm trong phát triển hệ thống doanh nghiệp và giải pháp ERP</h3>
                <p className="mt-4 text-lg text-muted-foreground">Với hơn 10 năm kinh nghiệm, tôi chuyên sâu về thiết kế và triển khai các hệ thống ERP quy mô lớn cho các tập đoàn hàng đầu tại Việt Nam. Nền tảng kỹ thuật vững chắc cùng hiểu biết sâu về nghiệp vụ đa ngành.</p>
                <p className="mt-4 text-lg text-muted-foreground">Đã triển khai thành công 20+ hệ thống quy mô lớn cho các tập đoàn hàng đầu Việt Nam trong các lĩnh vực tài chính-ngân hàng, sản xuất và nhân sự.</p>
                <p className="mt-4 text-lg text-muted-foreground">Tôi luôn hướng đến việc tạo ra các giải pháp công nghệ không chỉ đáp ứng yêu cầu kỹ thuật mà còn giải quyết hiệu quả các bài toán nghiệp vụ phức tạp.</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="font-bold text-secondary">Lĩnh vực chuyên sâu</h4>
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
                <h4 className="font-bold text-secondary">Kết quả nổi bật</h4>
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
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Kỹ năng cốt lõi</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Các công nghệ và lĩnh vực chuyên môn tạo nên giá trị khác biệt
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-2xl font-bold text-secondary mb-6">Lĩnh Vực</h3>
                    <div className="space-y-4">
                        {skills.domain.map(skill => (
                            <div key={skill.name}>
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium text-muted-foreground">{skill.name}</span>
                                    <span className="text-sm font-semibold text-primary">{skill.level}</span>
                                </div>
                                {/* You can add a progress bar here if you want */}
                            </div>
                        ))}
                    </div>
                </div>
                 <div>
                    <h3 className="text-2xl font-bold text-secondary mb-6">Công nghệ</h3>
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
        <div className="w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Kinh nghiệm nổi bật</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Hành trình phát triển nghề nghiệp trong 10 năm qua
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border/50 hidden md:block"></div>
            {experiences.map((exp, index) => (
              <div key={index} className={`md:grid md:grid-cols-2 md:gap-12 relative mb-12 md:mb-0`}>
                <div className={`${index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1 md:text-right'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="p-6 bg-surface border border-border/50 rounded-2xl w-full relative"
                  >
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2" style={index % 2 === 0 ? { left: '-3.1rem' } : { right: '-3.1rem' }}>
                      <div className="h-4 w-4 rounded-full bg-primary ring-8 ring-background"></div>
                    </div>
                    <p className="text-sm font-semibold text-primary">{exp.period}</p>
                    <h3 className="mt-1 text-xl font-bold text-secondary">{exp.company}</h3>
                    <p className="text-base font-semibold text-primary/80">{exp.role}</p>
                    <p className={`mt-3 text-muted-foreground ${index % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>{exp.description}</p>
                    <ul className={`mt-3 space-y-1 list-inside ${index % 2 !== 0 ? 'md:text-right items-end' : 'md:text-left'} flex flex-col`}>
                        {exp.tasks.map(task => (
                            <li key={task} className={`flex items-start gap-2 text-muted-foreground ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                <ChevronRight className={`w-4 h-4 text-accent mt-1 shrink-0 ${index % 2 !== 0 ? 'md:transform md:rotate-180' : ''}`}/>
                                <span>{task}</span>
                            </li>
                        ))}
                    </ul>
                    {exp.highlight && <Badge variant="secondary" className="mt-4 bg-accent/10 text-accent-foreground border-accent/20">{exp.highlight}</Badge>}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Projects Section */}
      <SectionReveal id="projects" className="scroll-mt-24 py-24">
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

      {/* Career Goals Section */}
       <SectionReveal id="goals" className="scroll-mt-24 py-24">
         <div className="w-full text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Mục tiêu nghề nghiệp</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Hướng tới vai trò Senior System Architect/Technical Product Owner, tập trung phát triển giải pháp ERP và hệ thống thanh toán quy mô doanh nghiệp. Tiếp tục nâng cao chuyên môn về kiến trúc microservices, điện toán đám mây và AI ứng dụng trong quản trị doanh nghiệp.
            </p>
         </div>
       </SectionReveal>
      
      {/* Contact Section */}
      <SectionReveal id="contact" className="scroll-mt-24 py-24">
        <div className="w-full">
            <Card className="p-6 md:p-8 lg:p-12 bg-surface border-border/50">
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
              </div>
            </Card>
        </div>
      </SectionReveal>
    </div>
  );
}

    