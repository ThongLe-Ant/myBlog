"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  User2,
  Briefcase,
  GraduationCap,
  Wrench,
  Sparkles,
  Layers3,
  Target,
  FolderKanban,
  CheckCircle,
  Zap,
  View,
  Cog,
  Database,
  BarChart,
  Gauge,
  ClipboardList,
  Shield,
  CreditCard,
  LayoutGrid,
  Brain,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { RadarChart as ReRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LabelList } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

/**
 * ✅ FIX: The previous document contained raw HTML in a React/TSX file, causing
 * `SyntaxError: Unexpected token (1:0)`. This rewrite provides a proper
 * React component that renders the CV UI with modern UI/UX and PDF export.
 *
 * Notes:
 * - Uses Tailwind classes for styling (available in this canvas environment).
 * - Adds subtle gradient, section icons, refined spacing, and hover accents.
 * - Includes a sticky toolbar with Export PDF (html2canvas + jsPDF).
 * - Avatar supports a transparent PNG if available (fallback to initials).
 */

// ----------------------------
// Data
// ----------------------------
const hero = {
  title: "Le Minh Thong",
  subtitle: "Senior Software Engineer | Solution Architect",
  description:
    "Software engineer with over 10 years of experience in developing ERP systems and enterprise solutions. Specializing in .NET, Golang, Cloud, and Microservices.",
  contact: {
    email: "thongproleminh@gmail.com",
    phone: "(+84) 396 870 644",
    location: "HCMC, Vietnam",
  },
};

const strengths = [
  {
    title: "Practical Project Experience",
    description:
      "Hands-on experience in designing and developing large-scale enterprise systems.",
    icon: Layers3,
    contentName: "Tech",
  },
  {
    title: "Flexible & Adaptive",
    description:
      "Quickly adapt to new tech and deliver solutions suited to many business needs.",
    icon: Sparkles,
    contentName: "Architecture",
  },
  {
    title: "Architecture Mindset",
    description:
      "Focus on scalable, maintainable, and high-performance systems.",
    icon: Wrench,
    contentName: "Architecture",
  },
  {
    title: "70% Hands-on",
    description:
      "A significant portion of my time is dedicated to hands-on development.",
    icon: Target,
    contentName: "Code",
  },
  {
    title: "Tech Enthusiast",
    description:
      "Always exploring and applying the latest trends in software development.",
    icon: FolderKanban,
    contentName: "Tech",
  },
];

const expertise = [
  "Payment Systems",
  "ERP Systems",
  "Production Management",
  "HR & Payroll",
  "Warehouse & Procurement",
  "Retail",
  "Industrial Catering"
];

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "20+", label: "Systems Deployed" },
  { value: "5+", label: "Areas of Expertise" },
];

const domainSkills = [
  { name: "System Architecture", level: "Expert" },
  { name: "ERP Solutions", level: "Expert" },
  { name: "Payment Systems", level: "Advanced" },
  { name: "Reporting & Dashboards", level: "Expert" },
  { name: "Automation", level: "Advanced" },
  { name: "Performance Tuning", level: "Expert" },
  { name: "Project Management", level: "Advanced" },
  { name: "System Security", level: "Advanced" },
];

const techStack = [
  ".NET",
  "Golang",
  "Python",
  "Java",
  "Node.js",
  "React",
  "Next.js",
  "TypeScript",
  "SQL Server",
  "PostgreSQL",
  "Oracle",
  "MySQL",
  "Kafka",
  "Redis",
  "Docker",
  "Kubernetes",
  "Azure",
  "CI/CD",
  "Microservices",
  "API Gateway",
  "AI",
  "LLM",
];

const timeline = [
  {
    org: "Asia Commercial Bank (ACB)",
    role: "Technical Analyst",
    period: "2022 - Present",
    bullets: [
      "SmartPOS - Convenient payment system",
      "International payments integrating ARP/MoneyGram/Western Union",
      "Transaction reconciliation",
      "Distribution & payment of partner commissions",
    ],
  },
  {
    org: "MoMo",
    role: "Backend Developer",
    period: "2020 - 2021",
    bullets: [
      "HR & Payroll management",
      "Internal payment management",
      "Reduced processing time by ~20%",
    ],
  },
  {
    org: "FPT Software",
    role: "Senior Software Engineer",
    period: "2018 - 2020",
    bullets: [
      "Nguyen Minh Steel – comprehensive production management",
      "Sacombank – centralized equipment/warehouse management",
      "Ehealth – hospital management system",
    ],
  },
  {
    org: "SamHo",
    role: "ERP & MES Developer",
    period: "2016 - 2018",
    bullets: [
      "Integrated HR & Payroll module",
      "Production management & product BOM",
    ],
  },
];

const projects = [
  {
    title: "Cashless Payment Solution",
    client: "MWG",
    description:
      "Integrated electronic payment solution for Vietnam's largest retail chain, processing millions of transactions monthly.",
    tags: [".NET Core", "API Gateway", "MSSQL", "Docker"],
    category: "Retail",
    imageUrl: "/mwg_logo.jpg",
    aiHint: "digital payment retail",
  },
  {
    title: "Order & Inventory Management",
    client: "EOC",
    description:
      "Supply chain management system for an industrial catering provider with over 50,000 meals/day.",
    tags: ["Python", "Java", "Node.js", "PostgreSQL"],
    category: "Industrial Catering",
    imageUrl: "/eoc_logo.jpg",
    aiHint: "supply chain food",
  },
  {
    title: "IoT for Production Management",
    client: "VCS",
    description:
      "IoT solution for monitoring and managing high-tech agricultural production over 500ha.",
    tags: ["Golang", "Next.js", "IoT", "PostgreSQL"],
    category: "Agriculture",
    imageUrl: "/rriv_logo.png",
    aiHint: "iot agriculture farm",
  },
  {
    title: "Warehouse & Customs Management",
    client: "ZA VN",
    description:
      "Warehouse, import/export, and customs management solution integrating goods control and e-document processes.",
    tags: ["Python", "React Native"],
    category: "Logistics",
    imageUrl: "/zavn_logo.png",
    aiHint: "warehouse logistics customs",
  },
];

const aboutData = {
  title: 'ABOUT ME',
  subtitle: 'Software engineer with over 10 years of experience in enterprise systems.',
  p1: 'With over 10 years of experience, I specialize in designing and implementing large-scale ERP systems for leading corporations in Vietnam. I have a strong technical foundation and a deep understanding of various business domains.',
  p2: 'Successfully deployed 20+ large-scale systems for top Vietnamese corporations in finance-banking, manufacturing, and HR.',
  p3: 'I always aim to create technology solutions that not only meet technical requirements but also effectively solve complex business problems.',
  stats: [
    { value: '10+', label: 'Years of Experience' },
    { value: '20+', label: 'Systems Deployed' },
    { value: '5+', label: 'Areas of Expertise' },
  ],
  expertiseAreas: { title: 'Areas of Expertise', items: ['ERP Systems', 'Production Management', 'HR & Payroll', 'Warehouse & Procurement', 'Payment Systems'] },
  keyAchievements: { title: 'Key Achievements', items: ['Handles >10,000 transactions/day', '30% reduction in inventory time', '20% reduction in processing time', 'Automated processes', 'Optimized operational costs'] },
};
const certificates = [
  {
    title: 'Design Thinking',
    description: 'Design Thinking system and business model',
  },
  {
    title: 'Agile Project Management In Bangking by IMTPM',   
    description: 'Agile Project Management In Bangking',
  },
  {
    title: 'Certificate of Money transfer by MONEYGRAM',
    description: 'Money transfer system',
  },
  {
    title: 'Analytic Data by IMIC',
    description: 'Analytic Data business intelligence',
  }
];


// Optional: Change this to point to your transparent avatar file placed in /public
const AVATAR_SRC = "/avatar_transparent.png"; // fallback to initials if not found

// ----------------------------
// Helpers & small UI
// ----------------------------
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-0.5 rounded-full border border-foreground/10 text-xs">
      {children}
    </span>
  );
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 text-[15px] font-semibold tracking-wide text-gray-800 leading-none print:leading-none align-middle">
      <Icon className="w-4 h-4 flex-none opacity-70 relative top-[1px] print:top-0" />
      <span>{children}</span>
    </div>
  );
}

// removed custom Avatar in favor of shared Avatar component

// ----------------------------
// Main Component
// ----------------------------
export default function CVCanvas() {
  const cvRef = React.useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (!cvRef.current) return;
    const element = cvRef.current;

    html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      scrollX: 0,
      scrollY: -window.scrollY,
      ignoreElements: (el) => el.id === "download-cv-btn",
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("Le-Minh-Thong-CV.pdf");
    });
  };

  return (
    <div ref={cvRef} className="relative bg-white theme-blue">
      {/* Solid white background layer for clean export */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-white" />

      {/* Toolbar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur print:hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-end">
          <button
            id="download-cv-btn"
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl border border-blue-500 bg-blue-500 text-white shadow-sm hover:bg-blue-600 hover:shadow transition dark:bg-blue-600 dark:border-blue-700 dark:hover:bg-blue-700 dark:text-white dark:shadow-blue-900/20"
          >
            <Download className="w-4 h-4" /> Download CV
          </button>
        </div>
      </div>

      {/* Page */}
      <main className="w-full px-4 sm:px-6 lg:px-8 print:px-0 py-2 print:py-0 grid grid-cols-1 md:grid-cols-3 gap-3 print:gap-2">
        {/* Sidebar */}
        <aside className="bg-surface/60 backdrop-blur rounded-2xl border border-border/50 p-4 print:p-3 md:col-span-1">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 rounded-2xl">
              <AvatarImage src="/avatar.jpg" alt="Le Minh Thong" />
              <AvatarFallback>LT</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold leading-tight">{hero.title}</h1>
              <p className="text-sm text-gray-600">{hero.subtitle}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2"><Mail className="w-4 h-4"/> {hero.contact.email}</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4"/> {hero.contact.phone}</div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4"/> {hero.contact.location}</div>
          </div>

         
          

          {/* Expertise */}
          <section className="mt-4 space-y-2 print:space-y-1">
            <SectionTitle icon={Layers3}>AREAS OF EXPERTISE</SectionTitle>
            <ul className="mt-1 space-y-1 text-sm list-disc list-inside">
              {expertise.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          

          {/* Stats */}
          <section className="mt-4 grid grid-cols-3 gap-2 print:gap-1">
            {stats.map((s) => (
              <div key={s.label} className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-3 text-center border border-black/5">
                <div className="text-xl font-bold text-gray-900">{s.value}</div>
                <div className="text-[11px] text-gray-600">{s.label}</div>
              </div>
            ))}
          </section>

          {/* Domain Skills */}
          <section className="mt-4 space-y-2 print:space-y-1">  
            <SectionTitle icon={Brain}>DOMAIN SKILLS</SectionTitle>
            <div className="mt-2 grid grid-cols-2 gap-2 print:gap-1">
              {domainSkills.map((d) => (
                <div key={d.name} className="flex items-start gap-2 text-muted-foreground">
                  <div>
                    <div className="text-sm font-semibold text-foreground flex items-center gap-1">
                      {d.name === "System Architecture" && <LayoutGrid className="w-3 h-3" />}
                      {d.name === "ERP Solutions" && <Database className="w-3 h-3" />}
                      {d.name === "Payment Systems" && <CreditCard className="w-3 h-3" />}
                      {d.name === "Reporting & Dashboards" && <BarChart className="w-3 h-3" />}
                      {d.name === "Automation" && <Cog className="w-3 h-3" />}
                      {d.name === "Performance Tuning" && <Gauge className="w-3 h-3" />}
                      {d.name === "Project Management" && <ClipboardList className="w-3 h-3" />}
                      {d.name === "System Security" && <Shield className="w-3 h-3" />}
                      {d.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Certificates */}
         
          <div className="bg-surface/60 backdrop-blur rounded-2xl border border-border/50 p-4 print:p-3 mt-4">
            <SectionTitle icon={GraduationCap}>CERTIFICATES</SectionTitle>
            <ul className="mt-2 space-y-2 print:space-y-1">
              {certificates.map((cert: { title: string; description: string }) => (
                <li key={cert.title} className="inline-flex items-center gap-2 align-middle leading-none text-muted-foreground">
                  <GraduationCap className="w-4 h-4 text-primary relative top-[1px] print:top-0" />
                  <span className="text-sm font-semibold text-foreground leading-none">{cert.title}</span>
                  {/* <span className="text-xs">— {cert.description}</span> */}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <section className="mt-4 space-y-2 print:space-y-1">
            <SectionTitle icon={Wrench}>TECHNOLOGIES</SectionTitle>
            <div className="mt-1 flex flex-wrap gap-1">
              {techStack.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </section>
          <section className="mt-4 space-y-2 print:space-y-1">
             {/* Technology Radar */}
            <div className="flex justify-center">
              <ChartContainer
                config={{ skill: { label: "Skill", color: "hsl(var(--primary))" } }}
                className="aspect-square w-full max-w-[320px] print:max-w-[260px]"
              >
                <ReRadarChart
                  data={[
                    { label: ".NET", value: 75 },
                    { label: "Go", value: 65 },
                    { label: "Python", value: 65 },
                    { label: "Node", value: 70 },
                    { label: "React", value: 85 },
                    { label: "SQL", value: 90 },
                    { label: "Docker", value: 75 },
                    { label: "Cloud", value: 57 },
                  ]}
                  outerRadius="75%"
                  margin={{ top: 28, right: 28, bottom: 28, left: 28 }}
                >
                  <PolarGrid />
                  <PolarAngleAxis
                    dataKey="label"
                    radius={105}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false}
                  />
                  <Radar
                    dataKey="value"
                    stroke="var(--color-skill)"
                    fill="var(--color-skill)"
                    fillOpacity={0.3}
                    dot={{ r: 3 }}
                    strokeWidth={2}
                  >
                    <LabelList dataKey="value" position="top" fill="hsl(var(--foreground))" fontSize={11} />
                  </Radar>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </ReRadarChart>
              </ChartContainer>
           
          </div>
          </section>
          
          {/* Blog QR Image */}
          <div className="mt-4 print:hidden">
            <div className="flex flex-col items-center mb-2">
              <div className="flex justify-center">
                <SectionTitle icon={View}>VIEW MY BLOG</SectionTitle>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/my_blog.png"
                  alt="Scan to view my blog"
                  width={1024}
                  height={1024}
                  className="object-contain w-full h-auto max-w-[320px] print:max-w-[260px]"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
          
        </aside>

        {/* Main column */}
        <section className="md:col-span-2 space-y-3 print:space-y-2">
              {/* About */}
          <div className="bg-surface/60 backdrop-blur rounded-2xl border border-border/50 p-4 print:p-3">
            {/* <SectionTitle  icon={User2}>{aboutData.title}</SectionTitle>
            <h3 className="mt-1 text-base font-semibold text-foreground">{aboutData.subtitle}</h3> */}
            <h5 className="text-xl font-bold tracking-tight text-primary sm:text-xl">{aboutData.title}</h5>
            <h6 className="mt-2 text-sm font-semibold text-foreground">{aboutData.subtitle}</h6>
            <p className="mt-3 text-sm text-muted-foreground">{aboutData.p1}</p>
            <p className="mt-2 text-sm text-muted-foreground">{aboutData.p2}</p>
            <p className="mt-2 text-sm text-muted-foreground">{aboutData.p3}</p>
            <div className="mt-4 grid grid-cols-3 gap-3 print:gap-2 text-center">
              {aboutData.stats.map((s) => (
                <div key={s.label} className="bg-background p-4 rounded-lg border border-border/50">
                  <p className="text-2xl font-bold text-primary">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6 print:gap-4">
              <div>
                <div className="font-bold text-foreground">{aboutData.expertiseAreas.title}</div>
                <ul className="mt-3 space-y-2">
                  {aboutData.expertiseAreas.items.map((area) => (
                    <li key={area} className="inline-flex items-center gap-2 align-middle leading-none text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary relative top-[1px] print:top-0" />
                      <span className="leading-none">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-bold text-foreground">{aboutData.keyAchievements.title}</div>
                <ul className="mt-3 space-y-2">
                  {aboutData.keyAchievements.items.map((result) => (
                    <li key={result} className="inline-flex items-center gap-2 align-middle leading-none text-muted-foreground">
                      <Zap className="w-4 h-4 text-primary relative top-[1px] print:top-0" />
                      <span className="leading-none">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Strengths (simple version) */}
          <div className="bg-surface/60 backdrop-blur rounded-2xl border border-border/50 p-4 print:p-3">
            {/* <SectionTitle icon={Sparkles}>WHAT MAKES MY WORK DIFFERENT?</SectionTitle> */}
            <h5 className="text-xl font-bold tracking-tight text-primary sm:text-xl print:text-base">WHAT MAKES MY WORK DIFFERENT?</h5>
            <div className="mt-2 grid sm:grid-cols-2 gap-2 print:gap-2">
              {strengths.map((s) => (
                <div key={s.title} className="rounded-xl border border-black/5 p-3 print:p-2 hover:shadow-sm transition">
                  <div className="inline-flex items-center gap-2 leading-none print:leading-none align-middle">
                    <s.icon className="w-4 h-4 flex-none opacity-70 relative top-[1px] print:top-0" />
                    <div className="leading-tight print:leading-tight align-middle">
                      <div className="font-medium align-middle">{s.title}</div>
                      <p className="text-sm print:text-xs text-gray-700 mt-0.5 leading-snug">{s.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        

          {/* Experience */}
          <div className="bg-surface/60 backdrop-blur rounded-2xl border border-border/50 p-4 print:p-3">
            {/* <SectionTitle icon={Briefcase}>PROFESSIONAL EXPERIENCE</SectionTitle> */}
            <h5 className="text-xl font-bold tracking-tight text-primary sm:text-xl print:text-base">PROFESSIONAL EXPERIENCE</h5>
            <div className="mt-2 space-y-4 print:space-y-3">
              {timeline.map((t) => (
                <div key={t.org} className="relative pl-5">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-gray-800" />
                  <div className="flex flex-wrap items-center gap-2 font-semibold">
                    <span>{t.role}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-700">{t.org}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{t.period}</span>
                  </div>
                  <ul className="mt-1 list-disc list-inside text-sm space-y-1">
                    {t.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

         

          {/* Projects (simple version) */}
          <div className="bg-surface/60 backdrop-blur rounded-2xl border border-border/50 p-4 print:p-3">
            {/* <SectionTitle icon={FolderKanban}>FEATURED PROJECTS</SectionTitle> */}
            <h5 className="text-xl font-bold tracking-tight text-primary sm:text-xl print:text-base">FEATURED PROJECTS</h5>
            <div className="mt-2 grid md:grid-cols-2 gap-2 print:gap-2">
              {projects.map((p) => (
                <div key={p.title} className="border rounded-xl p-3 print:p-2 hover:shadow-sm transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10">
                      <Image src={p.imageUrl} alt={p.title} width={40} height={40} className="object-contain w-10 h-10" unoptimized />
                    </div>
                    <div>
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-sm text-gray-600">{p.client}</div>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">{p.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
                    {p.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div className="bg-white rounded-2xl shadow p-4 print:p-3 border border-black/5">
            {/* <SectionTitle icon={Target}>CAREER GOALS</SectionTitle> */}
            <h5 className="text-xl font-bold tracking-tight text-primary sm:text-xl print:text-base">CAREER GOALS</h5>
            <p className="mt-1 text-sm text-gray-700">
              Aiming for a Senior System Architect/Technical Product Owner role, focusing on
              developing enterprise-scale ERP and payment solutions. Continuously enhancing
              expertise in microservices architecture, cloud computing, and AI applications in
              business management.
            </p>
          </div>
        </section>
      </main>

      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          .print\\:border { border: 1px solid #e5e7eb !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          @page { margin: 10mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}

// ----------------------------
// Simple runtime tests (smoke)
// ----------------------------
if (typeof window !== "undefined") {
  const tests: Array<[string, boolean]> = [
    ["expertise not empty", Array.isArray(expertise) && expertise.length > 0],
    ["timeline has 4 entries", Array.isArray(timeline) && timeline.length === 4],
    ["projects >= 4", Array.isArray(projects) && projects.length >= 4],
    ["tech stack has Docker", techStack.includes("Docker")],
  ];
  const failed = tests.filter(([, ok]) => !ok);
  if (failed.length) {
    // eslint-disable-next-line no-console
    console.warn("CV Canvas self-tests failed:", failed.map(([name]) => name));
  } else {
    // eslint-disable-next-line no-console
    console.log("CV Canvas self-tests passed ✅");
  }
}
