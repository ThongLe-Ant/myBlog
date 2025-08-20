
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
} from 'lucide-react';
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
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Autoplay from "embla-carousel-autoplay"
import { useLanguage } from '@/context/language-context';
import { HeroHighlight } from '@/components/motion/hero-highlight';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HeroBanner } from '@/components/layout/hero-banner';

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
            type: 'thumbnails',
            items: [
              { title: 'Cashless Payment', image: 'https://placehold.co/300x200.png', hint: 'payment gateway' },
              { title: 'Order Management', image: 'https://placehold.co/300x200.png', hint: 'inventory system' },
              { title: 'IoT for Production', image: 'https://placehold.co/300x200.png', hint: 'iot dashboard' },
            ]
          }
        },
        {
          title: "Flexible & Adaptive",
          description: "Ability to quickly adapt to new technologies and deliver solutions suitable for various business needs.",
          type: "side",
          content: {
            type: 'image',
            url: 'https://placehold.co/600x800.png',
            hint: 'team brainstorming'
          }
        },
        {
          title: "Architecture Mindset",
          description: "Focus on building scalable, maintainable, and high-performance systems.",
          type: "small",
          content: {
            type: 'icon',
            name: 'Architecture'
          }
        },
        {
          title: "70% Hands-on",
          description: "A significant portion of my time is dedicated to hands-on development and project implementation.",
          type: "small",
           content: {
            type: 'icon',
            name: 'Code'
          }
        },
        {
          title: "Tech Enthusiast",
          description: "Always exploring and applying the latest trends in software development.",
          type: "small",
           content: {
            type: 'icon',
            name: 'Tech'
          }
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
            'SQL Server', 'PostgreSQL', 'MongoDB', 'Kafka', 'Redis', 'Docker', 'Kubernetes',
            'AWS', 'Azure', 'CI/CD', 'Microservices', 'API Gateway'
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
                description: 'Developing Digital Banking systems for one of the leading banks in Vietnam.',
            },
            {
                company: 'MoMo',
                period: '2020 - 2021',
                role: 'Backend Developer',
                description: 'Developed CSM & Internal Payment systems for Vietnam\'s leading e-wallet.',
            },
            {
                company: 'FPT Software',
                period: '2018 - 2020',
                role: 'Technical Analyst',
                description: 'Developed ERP solutions for major domestic and international clients.',
            },
            {
                company: 'SamHo',
                period: '2016 - 2018',
                role: 'ERP Developer',
                description: 'Developed an ERP system for a factory with over 5,000 employees.',
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
            type: 'thumbnails',
            items: [
              { title: 'Thanh toán không tiền mặt', image: 'https://placehold.co/300x200.png', hint: 'payment gateway' },
              { title: 'Quản lý đơn hàng', image: 'https://placehold.co/300x200.png', hint: 'inventory system' },
              { title: 'IoT trong sản xuất', image: 'https://placehold.co/300x200.png', hint: 'iot dashboard' },
            ]
          }
        },
        {
          title: "Linh hoạt & Thích ứng",
          description: "Khả năng thích ứng nhanh với công nghệ mới và cung cấp các giải pháp phù hợp với nhu cầu kinh doanh đa dạng.",
          type: "side",
          content: {
            type: 'image',
            url: 'https://placehold.co/600x800.png',
            hint: 'team brainstorming'
          }
        },
        {
          title: "Tư duy kiến trúc sư",
          description: "Tập trung vào việc xây dựng các hệ thống có khả năng mở rộng, dễ bảo trì và hiệu năng cao.",
          type: "small",
           content: {
            type: 'icon',
            name: 'Architecture'
          }
        },
        {
          title: "70% Thực hành",
          description: "Phần lớn thời gian của tôi dành cho việc phát triển và triển khai dự án thực tế.",
          type: "small",
           content: {
            type: 'icon',
            name: 'Code'
          }
        },
        {
          title: "Đam mê công nghệ",
          description: "Luôn khám phá và áp dụng các xu hướng mới nhất trong phát triển phần mềm.",
          type: "small",
           content: {
            type: 'icon',
            name: 'Tech'
          }
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
            { name: 'Tối ưu hóa hiệu năng', level: 'Chuyên gia' },
            { name: 'Quản lý dự án', level: 'Nâng cao' },
            { name: 'Bảo mật hệ thống', level: 'Nâng cao' },
        ]
      },
      tech: {
        title: "Công nghệ",
        items: [
            '.NET', 'Golang', 'Python', 'Java', 'Node.js', 'React', 'Next.js', 'TypeScript',
            'SQL Server', 'PostgreSQL', 'MongoDB', 'Kafka', 'Redis', 'Docker', 'Kubernetes',
            'AWS', 'Azure', 'CI/CD', 'Microservices', 'API Gateway'
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
                description: 'Phát triển hệ thống Ngân hàng số cho một trong những ngân hàng hàng đầu Việt Nam.',
            },
            {
                company: 'MoMo',
                period: '2020 - 2021',
                role: 'Lập trình viên Backend',
                description: 'Phát triển hệ thống CSM & Thanh toán nội bộ cho ví điện tử hàng đầu Việt Nam.',
            },
            {
                company: 'FPT Software',
                period: '2018 - 2020',
                role: 'Chuyên viên Phân tích Kỹ thuật',
                description: 'Phát triển các giải pháp ERP cho các khách hàng lớn trong và ngoài nước.',
            },
            {
                company: 'SamHo',
                period: '2016 - 2018',
                role: 'Lập trình viên ERP',
                description: 'Phát triển hệ thống ERP cho nhà máy có hơn 5,000 nhân viên.',
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
                imageUrl: 'https://placehold.co/600x400.png',
                aiHint: 'digital payment retail'
            },
            {
                title: 'Quản lý đơn hàng & tồn kho',
                client: 'EOC',
                category: 'Suất ăn công nghiệp',
                description: 'Hệ thống quản lý chuỗi cung ứng cho nhà cung cấp suất ăn công nghiệp với hơn 50,000 bữa ăn/ngày.',
                tags: ['Python', 'Java', 'Node.js', 'MongoDB'],
                imageUrl: 'https://placehold.co/600x400.png',
                aiHint: 'supply chain food'
            },
            {
                title: 'IoT trong quản lý sản xuất',
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
                category: 'Logistics',
                description: 'Giải pháp quản lý kho, xuất nhập khẩu và hải quan cho công ty logistics, tích hợp kiểm soát hàng hóa và quy trình chứng từ điện tử.',
                tags: ['Python', 'React Native'],
                imageUrl: 'https://placehold.co/600x400.png',
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

  const autoplay = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  const handleDownloadCV = () => {
    if (cvContentRef.current) {
      const backgroundColor = window.getComputedStyle(document.body).getPropertyValue('--background').trim();
      html2canvas(cvContentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: `hsl(${backgroundColor})`,
        // Exclude the download button from the canvas
        ignoreElements: (element) => element.id === 'download-cv-btn',
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
    <div ref={cvContentRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <HeroBanner showContactInfo={true} onDownloadCV={handleDownloadCV} />
      </div>

      {/* Strengths Carousel Section */}
      <section className="w-full bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-foreground">{c.strengths.title}</h2>
            <Carousel 
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[autoplay.current]}
              className="w-full"
            >
              <CarouselContent>
                {c.strengths.items.map((card, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <CardInteractive
                          title={card.title}
                          description={card.description}
                          content={card.content}
                          className="h-full"
                        />
                      </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Projects Section */}
        <section id="projects" className="scroll-mt-24 py-24">
          <div className="w-full">
              <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{c.projects.title}</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                  {c.projects.description}
              </p>
              </div>
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-12">
                  {c.projects.items.map((project, index) => (
                      <SectionReveal key={project.title} options={{ delay: index * 0.1 }}>
                          <Card className="bg-surface h-full flex flex-col">
                              <CardContent className="p-4 flex flex-col flex-grow">
                                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden mb-4">
                                    <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={project.aiHint}
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground flex-grow">{project.description}</p>
                              </CardContent>
                          </Card>
                      </SectionReveal>
                  ))}
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
                  <div>
                      <h3 className="text-2xl font-bold text-foreground mb-6">{c.skills.domain.title}</h3>
                      <div className="space-y-4">
                          {c.skills.domain.items.map(skill => (
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
                      <h3 className="text-2xl font-bold text-foreground mb-6">{c.skills.tech.title}</h3>
                      <div className="flex flex-wrap gap-3">
                          {c.skills.tech.items.map(tech => (
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
