
'use client';

import {
  ArrowRight,
  Download,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  Zap,
  Plus,
  Network,
  Boxes,
  Wallet,
  BarChart3,
  Bot,
  Gauge,
  Users,
  Shield,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SectionReveal } from '@/components/motion/section-reveal';
import { CardInteractive } from '@/components/motion/card-interactive';
import React from 'react';
import Image from 'next/image';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLanguage } from '@/context/language-context';
import { HeroHighlight } from '@/components/motion/hero-highlight';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HeroBanner } from '@/components/layout/hero-banner';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { RadarChart as ReRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const content = {
  en: {
    hero: {
      title: "Le Minh Thong",
      subtitle: "Senior Software Engineer | Solution Architect",
      description: "Software engineer with over 10 years of experience in developing ERP systems and enterprise solutions. Specializing in .NET, Golang, Cloud, and Microservices.",
    },
    downloadCV: "Download CV",
    strengths: {
      title: "What makes my work different?",
      items: [
        {
          title: "Practical Project Experience",
          description: "Hands-on experience in designing and developing large-scale enterprise systems.",
          type: "main",
          content: {
            type: 'icon',
            name: 'Tech'
          } as { type: 'icon'; name: string }
        },
        {
          title: "Flexible & Adaptive",
          description: "Ability to quickly adapt to new technologies and deliver solutions suitable for various business needs.",
          type: "side",
          content: {
            type: 'icon',
            name: 'Architecture'
          } as { type: 'icon'; name: string }
        },
        {
          title: "Architecture Mindset",
          description: "Focus on building scalable, maintainable, and high-performance systems.",
          type: "small",
          content: {
            type: 'icon',
            name: 'Architecture'
          } as { type: 'icon'; name: string }
        },
        {
          title: "70% Hands-on",
          description: "A significant portion of my time is dedicated to hands-on development and project implementation.",
          type: "small",
           content: {
            type: 'icon',
            name: 'Code'
          } as { type: 'icon'; name: string }
        },
        {
          title: "Tech Enthusiast",
          description: "Always exploring and applying the latest trends in software development.",
          type: "small",
           content: {
            type: 'icon',
            name: 'Tech'
          } as { type: 'icon'; name: string }
        }
      ]
    },
    about: {
      title: "About Me",
      subtitle: "Software engineer with over 10 years of experience in enterprise systems and ERP solutions.",
      p1: "With over 10 years of experience, I specialize in designing and implementing large-scale ERP systems for leading corporations in Vietnam. I have a strong technical foundation and a deep understanding of various business domains.",
      p2: "Successfully deployed 20+ large-scale systems for top Vietnamese corporations in finance-banking, manufacturing, and HR.",
      p3: "I always aim to create technology solutions that not only meet technical requirements but also effectively solve complex business problems.",
      stats: [
        { value: "10+", label: "Years of Experience" },
        { value: "20+", label: "Systems Deployed" },
        { value: "5+", label: "Areas of Expertise" }
      ],
      expertiseAreas: {
        title: "Areas of Expertise",
        items: ['ERP Systems', 'Production Management', 'HR & Payroll', 'Warehouse & Procurement', 'Payment Systems']
      },
      keyAchievements: {
        title: "Key Achievements",
        items: ['Handles >10,000 transactions/day', '30% reduction in inventory time', '20% reduction in processing time', 'Automated processes', 'Optimized operational costs']
      }
    },
    skills: {
      title: "Core Skills",
      description: "Technologies and expertise that create distinct value.",
      domain: {
        title: "Domain",
        items: [
            { name: 'System Architecture', level: 'Expert' },
            { name: 'ERP Solutions', level: 'Expert' },
            { name: 'Payment Systems', level: 'Advanced' },
            { name: 'Reporting & Dashboards', level: 'Expert' },
            { name: 'Automation', level: 'Advanced' },
            { name: 'Performance Tuning', level: 'Expert' },
            { name: 'Project Management', level: 'Advanced' },
            { name: 'System Security', level: 'Advanced' },
        ]
      },
      tech: {
        title: "Technology",
        items: [
            '.NET', 'Golang', 'Python', 'Java', 'Node.js', 'React', 'Next.js', 'TypeScript',
            'SQL Server', 'PostgreSQL','Oracle','MySQL', 'Kafka', 'Redis', 'Docker', 'Kubernetes',
            'Azure', 'CI/CD', 'Microservices', 'API Gateway', 'AI', 'LLM'
        ]
      }
    },
    experience: {
        title: 'Professional Experience',
        description: 'A journey of professional growth over the past 10 years.',
        items: [
            {
                company: 'Asia Commercial Bank (ACB)',
                period: '2022 - Present',
                role: 'Backend Engineer',
                description: 'Developing Digital Banking systems.',
                projects: [
                    'SmartPOS - Convenient payment system',
                    'International payments integrating ARP/MoneyGram/Western Union',
                    'Transaction reconciliation',
                    'Distribution & payment of partner commissions'
                ],
                result: 'Handles >10,000 transactions/day',
            },
            {
                company: 'MoMo',
                period: '2020 - 2021',
                role: 'Backend Developer',
                description: 'Developed CSM & Internal Payment systems for the leading e-wallet.',
                projects: [
                    'HR & Payroll management',
                    'Internal payment management',
                    'Internal payment management'
        
                ],
                result: 'Reduced processing time by ~20%',
            },
            {
                company: 'FPT Software',
                period: '2018 - 2020',
                role: 'Technical Analyst',
                description: 'Delivered ERP solutions for large enterprises.',
                projects: [
                    'Nguyen Minh Steel – comprehensive production management',
                    'Sacombank – centralized equipment/warehouse management',
                    'Ehealth – hospital management system'


                ],
            },
            {
                company: 'SamHo',
                period: '2016 - 2018',
                role: 'ERP & MES Developer',
                description: 'Built ERP for a factory with >12,000 employees.',
                projects: [
                    'Integrated HR & Payroll module',
                    'Production management & product BOM'
                ],
            },
        ]
    },
    projects: {
        title: "Featured Consulting Projects",
        description: "Successfully implemented technology solutions for partners.",
        items: [
            {
                title: 'Cashless Payment Solution',
                client: 'MWG',
                category: 'Retail',
                description: 'Integrated electronic payment solution for Vietnam\'s largest retail chain, processing millions of transactions monthly.',
                tags: ['.NET Core', 'API Gateway', 'MSSQL', 'Docker'],
                imageUrl: '/mwg_logo.jpg',
                aiHint: 'digital payment retail'
            },
            {
                title: 'Order & Inventory Management',
                client: 'EOC',
                category: 'Industrial Catering',
                description: 'Supply chain management system for an industrial catering provider with over 50,000 meals/day.',
                tags: ['Python', 'Java', 'Node.js', 'PostgreSQL'],
                imageUrl: '/eoc_logo.jpg',
                aiHint: 'supply chain food'
            },
            {
                title: 'IoT for Production Management',
                client: 'VCS',
                category: 'Agriculture',
                description: 'IoT solution for monitoring and managing high-tech agricultural production over 500ha.',
                tags: ['Golang', 'Next.js', 'IoT', 'PostgreSQL'],
                imageUrl: '/rriv_logo.png',
                aiHint: 'iot agriculture farm'
            },
            {
                title: 'Warehouse & Customs Management',
                client: 'ZA VN',
                category: 'Logistics',
                description: 'Warehouse, import/export, and customs management solution for a logistics company, integrating goods control and e-document processes.',
                tags: ['Python', 'React Native'],
                imageUrl: '/zavn_logo.png',
                aiHint: 'warehouse logistics customs'
            },
        ]
    },
    goals: {
        title: "Career Goals",
        description: "Aiming for a Senior System Architect/Technical Product Owner role, focusing on developing enterprise-scale ERP and payment solutions. Continuously enhancing expertise in microservices architecture, cloud computing, and AI applications in business management."
    },
    contact: {
        title: "Get in Touch",
        description: "Always open to collaboration opportunities, new projects, and professional knowledge exchange.",
        form: {
            name: "Full Name",
            namePlaceholder: "Enter your full name",
            email: "Email",
            emailPlaceholder: "Enter your email address",
            message: "Message",
            messagePlaceholder: "Enter your message",
            submit: "Send Message"
        },
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
     strengths: {
      title: "Điều gì làm nên sự khác biệt?",
      items: [
        {
          title: "Kinh nghiệm dự án thực tế",
          description: "Kinh nghiệm thực chiến trong việc thiết kế và phát triển các hệ thống doanh nghiệp quy mô lớn.",
          type: "main",
          content: {
            type: 'icon',
            name: 'Tech'
          } as { type: 'icon'; name: string }
        },
        {
          title: "Linh hoạt & Thích ứng",
          description: "Khả năng thích ứng nhanh với công nghệ mới và cung cấp các giải pháp phù hợp với nhu cầu kinh doanh đa dạng.",
          type: "side",
          content: {
            type: 'icon',
            name: 'Architecture'
          } as { type: 'icon'; name: string }
        },
        {
          title: "Tư duy kiến trúc sư",
          description: "Tập trung vào việc xây dựng các hệ thống có khả năng mở rộng, dễ bảo trì và hiệu năng cao.",
          type: "small",
           content: {
            type: 'icon',
            name: 'Architecture'
          } as { type: 'icon'; name: string }
        },
        {
          title: "70% Thực hành",
          description: "Phần lớn thời gian của tôi dành cho việc phát triển và triển khai dự án thực tế.",
          type: "small",
           content: {
            type: 'icon',
            name: 'Code'
          } as { type: 'icon'; name: string }
        },
        {
          title: "Đam mê công nghệ",
          description: "Luôn khám phá và áp dụng các xu hướng mới nhất trong phát triển phần mềm.",
          type: "small",
           content: {
            type: 'icon',
            name: 'Tech'
          } as { type: 'icon'; name: string }
        }
      ]
    },
    about: {
      title: "Về bản thân",
      subtitle: "Kỹ sư phần mềm với hơn 10 năm kinh nghiệm về hệ thống doanh nghiệp và giải pháp ERP.",
      p1: "Với hơn 10 năm kinh nghiệm, tôi chuyên sâu về thiết kế và triển khai các hệ thống ERP quy mô lớn cho các tập đoàn hàng đầu tại Việt Nam. Nền tảng kỹ thuật vững chắc cùng hiểu biết sâu về nghiệp vụ đa ngành.",
      p2: "Đã triển khai thành công 20+ hệ thống quy mô lớn cho các tập đoàn hàng đầu Việt Nam trong các lĩnh vực tài chính-ngân hàng, sản xuất và nhân sự.",
      p3: "Tôi luôn hướng đến việc tạo ra các giải pháp công nghệ không chỉ đáp ứng yêu cầu kỹ thuật mà còn giải quyết hiệu quả các bài toán nghiệp vụ phức tạp.",
      stats: [
        { value: "10+", label: "Năm kinh nghiệm" },
        { value: "20+", label: "Hệ thống triển khai" },
        { value: "5+", label: "Lĩnh vực chuyên môn" }
      ],
      expertiseAreas: {
        title: "Lĩnh vực chuyên môn",
        items: ['Hệ thống ERP', 'Quản lý sản xuất', 'Nhân sự & Tính lương', 'Kho & Mua hàng', 'Hệ thống thanh toán']
      },
      keyAchievements: {
        title: "Thành tựu chính",
        items: ['Xử lý >10,000 giao dịch/ngày', 'Giảm 30% thời gian tồn kho', 'Giảm 20% thời gian xử lý', 'Tự động hóa quy trình', 'Tối ưu hóa chi phí vận hành']
      }
    },
    skills: {
      title: "Kỹ năng chính",
      description: "Các công nghệ và chuyên môn tạo nên giá trị khác biệt.",
      domain: {
        title: "Lĩnh vực",
        items: [
            { name: 'Kiến trúc hệ thống', level: 'Chuyên gia' },
            { name: 'Giải pháp ERP', level: 'Chuyên gia' },
            { name: 'Hệ thống thanh toán', level: 'Nâng cao' },
            { name: 'Báo cáo & Dashboard', level: 'Chuyên gia' },
            { name: 'Tự động hóa', level: 'Nâng cao' },
            { name: 'Tối ưu hóa', level: 'Chuyên gia' },
            { name: 'Quản lý dự án', level: 'Nâng cao' },
            { name: 'Bảo mật hệ thống', level: 'Nâng cao' },
        ]
      },
      tech: {
        title: "Công nghệ",
        items: [
            '.NET', 'Golang', 'Python', 'Java', 'Node.js', 'React', 'Next.js', 'TypeScript',
            'SQL Server', 'PostgreSQL','Oracle','MySQL', 'Kafka', 'Redis', 'Docker', 'Kubernetes',
            'Azure', 'CI/CD', 'Microservices', 'API Gateway', 'AI', 'LLM'
        ]
      }
    },
    experience: {
        title: 'Kinh nghiệm làm việc',
        description: 'Hành trình phát triển chuyên môn trong hơn 10 năm qua.',
        items: [
            {
                company: 'Ngân hàng Á Châu (ACB)',
                period: '2022 - Hiện tại',
                role: 'Kỹ sư Backend',
                description: 'Phát triển Ngân hàng Số.',
                projects: [
                    'SmartPOS hệ thống thanh toán tiện lợi',
                    'Thanh toán quốc tế tích hợp ARP/MoneyGram/Western Union',
                    'Đối soát giao dịch',
                    'Phân bổ và thanh toán hoa hồng đối tác'
                ],
                result: 'Xử lý >10.000 giao dịch/ngày',
            },
            {
                company: 'MoMo',
                period: '2020 - 2021',
                role: 'Lập trình viên Backend',
                description: 'Phát triển CSM & Thanh toán nội bộ cho ví điện tử hàng đầu.',
                projects: [
                    'Quản lý nhân sự & tiền lương',
                    'Quản lý hoa hồng điểm thanh toán điện tử',
                    'Quản lý & thanh toán nội bộ'
                ],
                result: 'Giảm ~20% thời gian xử lý',
            },
            {
                company: 'FPT Software',
                period: '2018 - 2020',
                role: 'Chuyên viên Phân tích Kỹ thuật',
                description: 'Triển khai giải pháp ERP cho doanh nghiệp lớn.',
                projects: [
                    'Nguyễn Minh Steel – hệ thống quản lý sản xuất toàn diện',
                    'Sacombank – quản lý kho/thiết bị tập trung',
                    'Ehealth – hệ thống quản lý bệnh viện'
                ],
            },
            {
                company: 'SamHo',
                period: '2016 - 2018',
                role: 'Lập trình viên ERP, MES',
                description: 'Xây dựng ERP cho nhà máy >12.000 nhân viên.',
                projects: [
                    'Nhân sự & Tính lương tích hợp',
                    'Quản lý sản xuất & BOM sản phẩm'
                ],
            },
        ]
    },
    projects: {
        title: "Dự án tư vấn tiêu biểu",
        description: "Triển khai thành công các giải pháp công nghệ cho đối tác.",
        items: [
            {
                title: 'Giải pháp thanh toán không dùng tiền mặt',
                client: 'MWG',
                category: 'Bán lẻ',
                description: 'Giải pháp thanh toán điện tử tích hợp cho chuỗi bán lẻ lớn nhất Việt Nam, xử lý hàng triệu giao dịch mỗi tháng.',
                tags: ['.NET Core', 'API Gateway', 'MSSQL', 'Docker'],
                imageUrl: '/mwg_logo.jpg',
                aiHint: 'digital payment retail'
            },
            {
                title: 'Quản lý đơn hàng & tồn kho',
                client: 'EOC',
                category: 'Suất ăn công nghiệp',
                description: 'Hệ thống quản lý chuỗi cung ứng cho nhà cung cấp suất ăn công nghiệp với hơn 50,000 bữa ăn/ngày.',
                tags: ['Python', 'Java', 'Node.js', 'PostgreSQL'],
                imageUrl: '/eoc_logo.jpg',
                aiHint: 'supply chain food'
            },
            {
                title: 'IoT trong quản lý sản xuất',
                client: 'VCS',
                category: 'Nông nghiệp',
                description: 'Giải pháp IoT giám sát và quản lý sản xuất nông nghiệp công nghệ cao trên 500ha.',
                tags: ['Golang', 'Next.js', 'IoT', 'PostgreSQL'],
                imageUrl: '/rriv_logo.png',
                aiHint: 'iot agriculture farm'
            },
            {
                title: 'Quản lý kho & hải quan',
                client: 'ZA VN',
                category: 'Logistics',
                description: 'Giải pháp quản lý kho, xuất nhập khẩu và hải quan cho công ty logistics, tích hợp kiểm soát hàng hóa và quy trình chứng từ điện tử.',
                tags: ['Python', 'React Native'],
                imageUrl: '/zavn_logo.png',
                aiHint: 'warehouse logistics customs'
            },
        ]
    },
    goals: {
        title: "Mục tiêu nghề nghiệp",
        description: "Hướng tới vai trò Kiến trúc sư hệ thống cao cấp/Chủ sở hữu sản phẩm kỹ thuật, tập trung vào phát triển các giải pháp ERP và thanh toán quy mô doanh nghiệp. Tiếp tục nâng cao chuyên môn về kiến trúc microservices, điện toán đám mây và ứng dụng AI trong quản lý doanh nghiệp."
    },
    contact: {
        title: "Liên hệ",
        description: "Luôn sẵn sàng cho các cơ hội hợp tác, dự án mới và trao đổi kiến thức chuyên môn.",
        form: {
            name: "Họ và tên",
            namePlaceholder: "Nhập họ và tên của bạn",
            email: "Email",
            emailPlaceholder: "Nhập địa chỉ email của bạn",
            message: "Lời nhắn",
            messagePlaceholder: "Nhập lời nhắn của bạn",
            submit: "Gửi tin nhắn"
        },
        hero: {
          email: "thongproleminh@gmail.com",
          phone: "0396 870 644",
          location: "TP.HCM, Việt Nam",
        }
    }
  }
};


export default function AboutPage() {
  const { language } = useLanguage();
  const c = content[language];
  const cvContentRef = React.useRef<HTMLDivElement>(null);

  // carousel autoplay removed

  const handleDownloadCV = () => {
    if (cvContentRef.current) {
      const element = cvContentRef.current;
      const backgroundColor = window.getComputedStyle(document.body).getPropertyValue('--background').trim();

      html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: `hsl(${backgroundColor})`,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        scrollX: 0,
        scrollY: -window.scrollY,
        // Exclude the download button and the noise background layer to prevent load errors
        ignoreElements: (el) => el.id === 'download-cv-btn' || el.id === 'cv-noise-bg',
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth; // fit to page width
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight; // shift image up for next page
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }

        pdf.save('Le-Minh-Thong-CV.pdf');
      });
    }
  };


  return (
    <div ref={cvContentRef} className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      <div id="cv-noise-bg" className="pointer-events-none absolute inset-0 -z-10 bg-[url(/noise.png)] opacity-20" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <HeroBanner showContactInfo={true} onDownloadCV={handleDownloadCV} />
      </div>

      {/* Strengths Section */}
      <section className="w-full bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">{c.strengths.title}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {c.strengths.items.map((card, index) => (
                <SectionReveal key={index} options={{ delay: index * 0.1 }}>
                  <CardInteractive
                    title={card.title}
                    description={card.description}
                    content={card.content}
                    className="h-full"
                  />
                </SectionReveal>
              ))}
            </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Projects Section */}
        <section id="projects" className="scroll-mt-24 py-24">
          <div className="w-full">
              <div className="text-center">
              <div className="flex items-center justify-center gap-3">
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent sm:text-4xl">{c.projects.title}</h2>
                <Badge variant="secondary" className="px-3 py-1 text-base bg-amber-500/10 text-amber-400 border border-amber-400/30">10+</Badge>
              </div>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                  {c.projects.description}
              </p>
              </div>
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                  {c.projects.items.map((project, index) => (
                      <SectionReveal key={project.title} options={{ delay: index * 0.1 }}>
                          <Card className="group relative bg-white/5 dark:bg-surface/60 backdrop-blur rounded-3xl overflow-hidden border border-white/10 h-full flex flex-col">
                              <div className="relative w-full aspect-[16/10] overflow-hidden">
                                  <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    fill
                                    className="object-contain bg-background"
                                    data-ai-hint={project.aiHint}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                      <Button size="sm" className="bg-white text-primary hover:bg-white/90">{language === 'vi' ? 'Xem chi tiết' : 'View details'}</Button>
                                  </div>
                              </div>
                              <CardContent className="p-6 flex flex-col flex-grow">
                                  <div className="text-sm text-muted-foreground mb-1">{project.category}</div>
                                  <div className="text-xl font-bold text-primary mb-1">{project.client}</div>
                                  <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                                  <p className="mt-2 text-sm text-muted-foreground flex-grow">{project.description}</p>
                                  <div className="flex flex-wrap gap-2 mt-4">
                                      {project.tags.map((tag: string) => (
                                        <Badge key={tag} variant="secondary" className="px-3 py-1">{tag}</Badge>
                                      ))}
                                  </div>
                              </CardContent>
                          </Card>
                      </SectionReveal>
                  ))}
              </div>
              <div className="mt-4 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-amber-400/40 px-3 py-1 text-sm text-muted-foreground">
                  <Plus className="h-6 w-6 text-amber-500" />
                  {language === 'vi' ? 'Còn nhiều dự án khác' : 'More projects'}
                </span>
              </div>
          </div>
        </section>
        
        {/* About Section */}
        <SectionReveal id="about" className="scroll-mt-24 py-24">
          <div className="w-full grid md:grid-cols-2 gap-16 items-start">
              <div>
                  <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{c.about.title}</h2>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">{c.about.subtitle}</h3>
                  <p className="mt-4 text-lg text-muted-foreground">{c.about.p1}</p>
                  <p className="mt-4 text-lg text-muted-foreground">{c.about.p2}</p>
                  <p className="mt-4 text-lg text-muted-foreground">{c.about.p3}</p>
                  <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                      {c.about.stats.map(stat => (
                          <div key={stat.label} className="bg-surface p-4 rounded-lg">
                              <p className="text-3xl font-bold text-primary">{stat.value}</p>
                              <p className="text-sm text-muted-foreground">{stat.label}</p>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-0 md:pt-16">
                <div className="space-y-6">
                  <h4 className="font-bold text-foreground">{c.about.expertiseAreas.title}</h4>
                  <ul className="space-y-2">
                    {c.about.expertiseAreas.items.map(area => (
                      <li key={area} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-primary"/>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="font-bold text-foreground">{c.about.keyAchievements.title}</h4>
                  <ul className="space-y-2">
                    {c.about.keyAchievements.items.map(result => (
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
                  <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{c.skills.title}</h2>
                  <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                      {c.skills.description}
                  </p>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                  <div className="bg-surface/60 backdrop-blur rounded-2xl border border-white/10 p-8">
                      <h3 className="text-2xl font-bold text-foreground mb-8">{c.skills.domain.title}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {c.skills.domain.items.map((skill) => {
                            let IconComp: LucideIcon = Network;
                            const name = skill.name.toLowerCase();
                            if (name.includes('kiến trúc') || name.includes('architecture')) IconComp = Network;
                            else if (name.includes('erp')) IconComp = Boxes;
                            else if (name.includes('thanh toán') || name.includes('payment')) IconComp = Wallet;
                            else if (name.includes('báo cáo') || name.includes('report')) IconComp = BarChart3;
                            else if (name.includes('tự động') || name.includes('automation')) IconComp = Bot;
                            else if (name.includes('hiệu năng') || name.includes('performance')) IconComp = Gauge;
                            else if (name.includes('dự án') || name.includes('project')) IconComp = Users;
                            else if (name.includes('bảo mật') || name.includes('security')) IconComp = Shield;

                            return (
                              <div key={skill.name} className="flex items-center gap-4 bg-background/40 p-4 rounded-xl border border-border/50">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                  <IconComp className="w-6 h-6" />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-semibold text-foreground truncate">{skill.name}</div>
                                  <div className="text-primary text-sm font-medium">{skill.level}</div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                  </div>
                  <div className="bg-surface/60 backdrop-blur rounded-2xl border border-white/10 p-8 relative overflow-hidden">
                      <h3 className="text-2xl font-bold text-foreground mb-6">{c.skills.tech.title}</h3>
                      <div className="flex justify-center">
                        <ChartContainer
                          config={{ skill: { label: language === 'vi' ? 'Kỹ năng' : 'Skill', color: 'hsl(var(--primary))' } }}
                          className="aspect-square w-full max-w-[640px]"
                        >
                          <ReRadarChart
                            data={[
                              { label: '.NET/C#', value: 95 },
                              { label: 'Golang', value: 85 },
                              { label: 'Python', value: 80 },
                              { label: 'Node.js', value: 90 },
                              { label: 'React.js', value: 85 },
                              { label: 'MSSQL/Oracle', value: 90 },
                              { label: 'Docker', value: 80 },
                              { label: 'Cloud Solutions', value: 85 },
                            ]}
                            margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
                          >
                            <PolarGrid />
                            <PolarAngleAxis dataKey="label" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 14 }} />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} />
                            <Radar dataKey="value" stroke="var(--color-skill)" fill="var(--color-skill)" fillOpacity={0.3} dot={{ r: 3 }} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </ReRadarChart>
                        </ChartContainer>
                      </div>
                  </div>
              </div>
          </div>
        </SectionReveal>

        {/* Experience Section */}
        <SectionReveal id="experience" className="scroll-mt-24 py-24">
          <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{c.experience.title}</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                {c.experience.description}
              </p>
          </div>
          <div className="relative w-full max-w-4xl mx-auto">
                <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border/50 hidden md:block" />
                <div className="space-y-16">
                  {c.experience.items.map((exp, index) => (
                      <div key={index} className="md:grid md:grid-cols-2 md:gap-16 relative">
                          <div className={index % 2 === 0 ? 'md:order-2' : ''}>
                              <motion.div
                                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true, amount: 0.5 }}
                                  transition={{ duration: 0.6 }}
                                  className={`p-6 bg-surface border border-border/50 rounded-2xl w-full ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}
                              >
                                  <p className="text-sm font-semibold text-primary">{exp.period}</p>
                                  <h3 className="mt-1 text-xl font-bold text-foreground">{exp.company}</h3>
                                  <p className="text-base font-semibold text-primary/80">{exp.role}</p>
                                  <p className="mt-3 text-muted-foreground">{exp.description}</p>
                                  {Array.isArray((exp as any).projects) && (
                                    <div className="mt-3 space-y-2">
                                      {(exp as any).projects.map((project: string, i: number) => (
                                        <div key={i} className="text-muted-foreground flex items-start gap-3">
                                          <span className="text-primary text-xl">•</span>
                                          <span>{project}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  {(exp as any).result && (
                                    <div className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-4 py-2 rounded-full text-sm inline-block mt-4 font-medium">
                                      {(exp as any).result}
                                    </div>
                                  )}
                              </motion.div>
                          </div>
                          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-primary ring-8 ring-background" />
                          <div className={index % 2 !== 0 ? 'md:order-2' : ''}></div>
                      </div>
                  ))}
                </div>
          </div>
        </SectionReveal>

        {/* Career Goals Section */}
          <SectionReveal id="goals" className="scroll-mt-24 py-24">
            <div className="w-full text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{c.goals.title}</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                {c.goals.description}
              </p>
            </div>
          </SectionReveal>
        
        {/* Contact Section */}
        <SectionReveal id="contact" className="scroll-mt-24 py-24">
          <div className="w-full">
              <Card className="p-6 md:p-8 lg:p-12 bg-surface border-border/50">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{c.contact.title}</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {c.contact.description}
                        </p>
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-4 text-lg">
                                <Mail className="w-6 h-6 text-primary"/>
                                <span className="text-muted-foreground">{c.contact.hero.email}</span>
                            </div>
                            <div className="flex items-center gap-4 text-lg">
                                <Phone className="w-6 h-6 text-primary"/>
                                <span className="text-muted-foreground">{c.contact.hero.phone}</span>
                            </div>
                            <div className="flex items-center gap-4 text-lg">
                                <MapPin className="w-6 h-6 text-primary"/>
                                <span className="text-muted-foreground">{c.contact.hero.location}</span>
                            </div>
                        </div>
                    </div>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-foreground">{c.contact.form.name}</label>
                            <Input id="name" placeholder={c.contact.form.namePlaceholder} />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground">{c.contact.form.email}</label>
                            <Input id="email" type="email" placeholder={c.contact.form.emailPlaceholder} />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-foreground">{c.contact.form.message}</label>
                            <Textarea id="message" placeholder={c.contact.form.messagePlaceholder} rows={4}/>
                        </div>
                        <Button type="submit" size="lg" className="w-full">
                            {c.contact.form.submit} <Send className="ml-2"/>
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
