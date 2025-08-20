
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, Briefcase, Building, Calendar, CheckCircle, ChevronRight, Code, Contact, Cpu, DollarSign, ExternalLink, GanttChartSquare, Github, Linkedin, Mail, MapPin, Phone, Rocket, Send, Settings, Target, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const skills = {
  domain: [
    { name: "Kiến trúc hệ thống", level: "Chuyên gia" },
    { name: "Giải pháp ERP", level: "Chuyên gia" },
    { name: "Hệ thống thanh toán", level: "Nâng cao" },
    { name: "Báo cáo & Dashboard", level: "Chuyên gia" },
    { name: "Tự động hóa", level: "Nâng cao" },
    { name: "Tối ưu hiệu năng", level: "Chuyên gia" },
    { name: "Quản lý dự án", level: "Nâng cao" },
    { name: "Bảo mật hệ thống", level: "Nâng cao" },
  ],
  technologies: [
    ".NET", "Golang", "Python", "Java", "Node.js", "React", "Next.js",
    "SQL Server", "PostgreSQL", "MongoDB", "Kafka", "Redis",
    "Docker", "Kubernetes", "AWS", "Azure", "Git", "CI/CD"
  ]
};

const experiences = [
    {
        company: "Ngân hàng Á Châu (ACB)",
        period: "2022 - Hiện tại",
        role: "Backend Engineer",
        description: "Phát triển hệ thống Ngân hàng Số cho một trong những ngân hàng hàng đầu Việt Nam.",
        highlights: [
            "SmartPOS: Ứng dụng POS thông minh xây dựng trên nền tảng .NET Core và Docker",
            "Thanh toán quốc tế: Tích hợp các hệ thống ARP/MoneyGram/Western Union"
        ],
        achievement: "Xử lý >10.000 giao dịch/ngày"
    },
    {
        company: "MoMo",
        period: "2020 - 2021",
        role: "Backend Developer",
        description: "Phát triển hệ thống CSM & Thanh toán nội bộ cho ví điện tử hàng đầu Việt Nam.",
        highlights: ["Tối ưu hóa hệ thống giao dịch với Golang & Kafka"],
        achievement: "Giảm 20% thời gian xử lý thanh toán"
    },
    {
        company: "FPT Software",
        period: "2018 - 2020",
        role: "Technical Analyst",
        description: "Phát triển các giải pháp ERP cho các khách hàng lớn trong nước và quốc tế.",
        highlights: [
            "Nguyễn Minh Steel: Hệ thống quản lý sản xuất thép toàn diện",
            "Sacombank: Giải pháp quản lý kho thiết bị tập trung"
        ]
    },
    {
        company: "SamHo",
        period: "2016 - 2018",
        role: "ERP Developer",
        description: "Phát triển hệ thống ERP cho nhà máy với hơn 5.000 nhân viên.",
        highlights: [
            "Module Nhân sự - Tiền lương tích hợp",
            "Quản lý sản xuất & BOM sản phẩm"
        ]
    }
];

const projects = [
    {
        title: "Thanh toán không dùng tiền mặt",
        category: "Bán lẻ",
        client: "MWG",
        description: "Giải pháp tích hợp thanh toán điện tử cho chuỗi bán lẻ lớn nhất Việt Nam, xử lý hàng triệu giao dịch mỗi tháng.",
        tags: [".NET Core", "API Gateway", "MSSQL", "Docker"],
        image: "https://placehold.co/600x400.png",
        aiHint: "cashless payment"
    },
    {
        title: "Quản lý đặt hàng & tồn kho",
        category: "Suất ăn công nghiệp",
        client: "EOC",
        description: "Hệ thống quản lý chuỗi cung ứng cho nhà cung cấp suất ăn công nghiệp với hơn 50.000 suất/ngày.",
        tags: ["Python", "Java", "Node.js", "MongoDB"],
        image: "https://placehold.co/600x400.png",
        aiHint: "inventory management"
    },
    {
        title: "IoT quản lý sản xuất",
        category: "Nông nghiệp",
        client: "VCS",
        description: "Giải pháp IoT giám sát và quản lý sản xuất nông nghiệp công nghệ cao trên 500ha.",
        tags: ["Golang", "Next.js", "IoT", "PostgreSQL"],
        image: "https://placehold.co/600x400.png",
        aiHint: "iot agriculture"
    },
    {
        title: "Quản lý kho & hải quan",
        category: "Xuất nhập khẩu",
        client: "ZA VN",
        description: "Giải pháp quản lý kho, xuất nhập khẩu và hải quan cho doanh nghiệp logistics, tích hợp quy trình kiểm soát hàng hóa và chứng từ điện tử.",
        tags: ["Python", "React Native"],
        image: "https://placehold.co/600x400.png",
        aiHint: "warehouse logistics"
    }
];

const stats = [
  { value: "10+", label: "Năm kinh nghiệm" },
  { value: "20+", label: "Hệ thống" },
  { value: "5+", label: "Lĩnh vực" },
  { value: "100%", label: "Cam kết" },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center text-center bg-gray-50 dark:bg-gray-900/50">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)] dark:bg-[url('/grid-dark.svg')]"></div>
        <div className="container px-4 md:px-6 z-10 space-y-6">
          <Avatar className="w-32 h-32 mx-auto border-4 border-primary/20 shadow-lg">
            <AvatarImage src="https://placehold.co/200x200.png" alt="Avatar Lê Minh Thông" data-ai-hint="professional portrait" />
            <AvatarFallback>LMT</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground">
              Lê Minh Thông
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-primary">
              Senior Software Engineer | Solution Architect
            </h2>
          </div>
          <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
            Kỹ sư phần mềm với hơn 10 năm kinh nghiệm trong phát triển hệ thống ERP và giải pháp doanh nghiệp. Chuyên sâu về .NET, Golang, Cloud và Microservices.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#projects">
                  <Button size="lg" className="w-full sm:w-auto">
                      Xem dự án của tôi <ArrowDown className="ml-2 h-5 w-5" />
                  </Button>
              </a>
              <a href="#contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Liên hệ ngay <Send className="ml-2 h-5 w-5" />
                  </Button>
              </a>
          </div>
           <div className="flex items-center justify-center gap-x-6 gap-y-2 flex-wrap text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> thongproleminh@gmail.com
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> 0396 870 644
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> TP.HCM, Việt Nam
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1 space-y-6">
              <div className="relative">
                <Image
                  src="https://placehold.co/600x800.png"
                  alt="Lê Minh Thông"
                  width={600}
                  height={800}
                  className="rounded-lg shadow-lg object-cover"
                  data-ai-hint="full body portrait"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl">
                  <h3 className="text-2xl font-bold">Lê Minh Thông</h3>
                  <p className="text-sm opacity-90">Solution Architect & Tech Lead</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                {stats.map(stat => (
                  <div key={stat.label} className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Giới thiệu</h2>
                  <p className="text-lg text-muted-foreground">Kỹ sư phần mềm với hơn 10 năm kinh nghiệm trong phát triển hệ thống doanh nghiệp và giải pháp ERP</p>
              </div>
              <div className="space-y-4 text-foreground/80">
                  <p>Với hơn 10 năm kinh nghiệm, tôi chuyên sâu về thiết kế và triển khai các hệ thống ERP quy mô lớn cho các tập đoàn hàng đầu tại Việt Nam. Nền tảng kỹ thuật vững chắc cùng hiểu biết sâu về nghiệp vụ đa ngành.</p>
                  <p>Đã triển khai thành công 20+ hệ thống quy mô lớn cho các tập đoàn hàng đầu Việt Nam trong các lĩnh vực tài chính-ngân hàng, sản xuất và nhân sự.</p>
                  <p>Tôi luôn hướng đến việc tạo ra các giải pháp công nghệ không chỉ đáp ứng yêu cầu kỹ thuật mà còn giải quyết hiệu quả các bài toán nghiệp vụ phức tạp.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2"><GanttChartSquare className="text-primary"/>Lĩnh vực chuyên sâu</h3>
                  <ul className="space-y-2">
                    {["Hệ thống ERP", "Quản lý sản xuất", "Nhân sự & Tiền lương", "Quản lý kho & Mua hàng", "Hệ thống thanh toán"].map(item => (
                       <li key={item} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2"><Zap className="text-primary"/>Kết quả nổi bật</h3>
                  <ul className="space-y-2">
                    {["Xử lý >10.000 giao dịch/ngày", "Giảm 30% thời gian kiểm kê", "Giảm 20% thời gian xử lý", "Tự động hóa quy trình", "Tối ưu chi phí vận hành"].map(item => (
                       <li key={item} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container px-4 md:px-6">
              <div className="text-center space-y-2 mb-12">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Kỹ năng cốt lõi</h2>
                  <p className="max-w-xl mx-auto text-lg text-muted-foreground">Các công nghệ và lĩnh vực chuyên môn tạo nên giá trị khác biệt</p>
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                  <div>
                      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3"><Briefcase className="text-primary"/>Lĩnh Vực</h3>
                      <div className="space-y-4">
                          {skills.domain.map(skill => (
                              <div key={skill.name}>
                                  <div className="flex justify-between mb-1">
                                      <span className="text-base font-medium text-foreground">{skill.name}</span>
                                      <span className="text-sm font-medium text-muted-foreground">{skill.level}</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                      <div className="bg-primary h-2.5 rounded-full" style={{ width: skill.level === 'Chuyên gia' ? '95%' : '75%' }}></div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
                  <div>
                      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3"><Code className="text-primary"/>Công nghệ</h3>
                      <div className="flex flex-wrap gap-3">
                          {skills.technologies.map(tech => (
                              <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">{tech}</Badge>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
              <div className="text-center space-y-2 mb-12">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Kinh nghiệm nổi bật</h2>
                  <p className="max-w-xl mx-auto text-lg text-muted-foreground">Hành trình phát triển nghề nghiệp trong 10 năm qua</p>
              </div>
              <div className="relative">
                 <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block"></div>
                  {experiences.map((exp, index) => (
                      <div key={exp.company} className="relative mb-12 md:mb-16">
                           <div className="absolute left-1/2 top-3 w-4 h-4 bg-primary rounded-full -translate-x-1/2 border-4 border-background hidden md:block"></div>
                           <div className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                              <div className="md:w-5/12">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="flex justify-between items-start">
                                      <span>{exp.company}</span>
                                      <span className="text-sm font-normal text-muted-foreground flex items-center gap-1.5"><Calendar size={14}/> {exp.period}</span>
                                    </CardTitle>
                                    <CardDescription>{exp.role}</CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <p className="text-muted-foreground">{exp.description}</p>
                                    <ul className="space-y-1 text-sm">
                                      {exp.highlights.map(h => (
                                        <li key={h} className="flex items-start gap-2">
                                          <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0"/> <span>{h}</span>
                                        </li>
                                      ))}
                                    </ul>
                                    {exp.achievement && (
                                      <div className="pt-2">
                                        <Badge><Zap size={14} className="mr-1.5"/>{exp.achievement}</Badge>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container px-4 md:px-6">
            <div className="text-center space-y-2 mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Dự án tư vấn tiêu biểu</h2>
                <p className="max-w-xl mx-auto text-lg text-muted-foreground">Các giải pháp công nghệ đã triển khai thành công cho đối tác</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {projects.map((project) => (
                    <Card key={project.title} className="flex flex-col group overflow-hidden">
                        <div className="relative">
                           <Image src={project.image} alt={project.title} width={600} height={400} className="object-cover aspect-video group-hover:scale-105 transition-transform duration-300" data-ai-hint={project.aiHint} />
                           <div className="absolute top-2 right-2 bg-primary/80 text-primary-foreground text-xs px-2 py-1 rounded-full backdrop-blur-sm">{project.client}</div>
                        </div>
                        <CardHeader className="flex-grow">
                            <CardDescription>{project.category}</CardDescription>
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-sm text-muted-foreground mb-4 h-20 overflow-hidden">{project.description}</p>
                           <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                           </div>
                        </CardContent>
                        <CardFooter>
                           <Button variant="ghost" size="sm" className="w-full">Xem chi tiết <ChevronRight className="h-4 w-4 ml-1" /></Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      {/* Career Goals Section */}
      <section id="goals" className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center shadow-lg">
            <Target className="h-12 w-12 mx-auto mb-4"/>
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Mục tiêu nghề nghiệp</h2>
            <p className="max-w-3xl mx-auto text-lg opacity-90">
                Hướng tới vai trò Senior System Architect/Technical Product Owner, tập trung phát triển giải pháp ERP và hệ thống thanh toán quy mô doanh nghiệp.
            </p>
             <p className="max-w-3xl mx-auto text-lg opacity-90 mt-2">
                Tiếp tục nâng cao chuyên môn về kiến trúc microservices, điện toán đám mây và AI ứng dụng trong quản trị doanh nghiệp.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Liên hệ với tôi</h2>
            <p className="max-w-xl mx-auto text-lg text-muted-foreground">Luôn sẵn sàng cho các cơ hội hợp tác, dự án mới và trao đổi kiến thức chuyên môn.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
                <Card>
                  <CardHeader><CardTitle>Thông tin liên hệ</CardTitle></CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <div className="flex items-center gap-4"><Mail className="h-5 w-5 text-primary" /> <span>thongproleminh@gmail.com</span></div>
                    <div className="flex items-center gap-4"><Phone className="h-5 w-5 text-primary" /> <span>0396 870 644</span></div>
                    <div className="flex items-center gap-4"><MapPin className="h-5 w-5 text-primary" /> <span>TP.HCM, Việt Nam</span></div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Mạng xã hội</CardTitle></CardHeader>
                  <CardContent className="flex gap-4">
                      <Button variant="outline" size="icon" asChild>
                          <a href="#" aria-label="GitHub"><Github/></a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                          <a href="#" aria-label="LinkedIn"><Linkedin/></a>
                      </Button>
                  </CardContent>
                </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Gửi tin nhắn</CardTitle>
                </CardHeader>
                <CardContent>
                   <form className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Input placeholder="Họ và tên" />
                            <Input type="email" placeholder="Email" />
                        </div>
                        <Textarea placeholder="Nội dung" rows={5}/>
                        <Button type="submit" className="w-full">
                            Gửi thông điệp <Send className="ml-2 h-4 w-4"/>
                        </Button>
                    </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
