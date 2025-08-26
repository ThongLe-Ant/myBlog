"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Printer,
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
// removed unused Card imports
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
  "Warehouse",
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

type TimelineItem = {
  org: string;
  role: string;
  period: string;
  bullets: string[];
  logo?: string;
  accentColor?: string;
};

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

const timeline: TimelineItem[] = [
  {
    org: "Asia Commercial Bank (ACB)",
    role: "Technical Analyst",
    period: "2021 - Present",
    bullets: [
      "SmartPOS - Convenient payment system",
      "International payments integrating ARP/MoneyGram/Western Union",
      "Transaction reconciliation",
      "Distribution & payment of partner commissions",
    ],
    logo: "/logo/acb_logo.svg",
    accentColor: "#1f419b",
  },
  {
    org: "MoMo",
    role: "Backend",
    period: "2020 - 2021",
    bullets: [
      "HR & Payroll management",
      "Internal payment management",
      "Reduced processing time by ~20%",
    ],
    logo: "/logo/momo_logo.png",
    accentColor: "#a50064",
  },
  {
    org: "FPT Software",
    role: "Senior Software Engineer",
    period: "2016 - 2020",
    bullets: [
      "Nguyen Minh Steel – comprehensive production management",
      "Sacombank – centralized equipment/warehouse management",
      "Ehealth – hospital management system",
    ],
    logo: "/logo/fpt_logo.svg",
    accentColor: "#1169b0",
  },
  {
    org: "SamHo",
    role: "ERP & MES Developer",
    period: "2012 - 2016",
    bullets: [
      "Integrated HR & Payroll module",
      "Production management & product BOM",
    ],
    logo: "/logo/samho_logo.png",
    accentColor: "#cc0000",
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
  expertiseAreas: { title: 'Areas of Expertise', items: ['ERP Systems', 'Production Management', 'HR & Payroll', 'Warehouse', 'Payment Systems'] },
  keyAchievements: { title: 'Key Achievements', items: ['Handles >10,000 transactions/day', '30% reduction in inventory time', '20% reduction in processing time', 'Automated processes'] },
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

// Impact highlights (promoted summary bullets)
const impactHighlights: string[] = [
  '-20% processing time @MoMo',
  '>10,000 tx/day @Banking',
  '-30% inventory time @Manufacturing',
  'Automated key operational workflows',
  'Optimized operational costs across projects',
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
    <div className="inline-flex items-center gap-2 text-[15px] font-semibold tracking-wide text-gray-800">
      <Icon className="w-4 h-4 flex-none text-primary" />
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
      const imgData = canvas.toDataURL("image/jpeg", 0.9);
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "SLOW");
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "SLOW");
        heightLeft -= pdfHeight;
      }

      pdf.save("Le-Minh-Thong-CV.pdf");
    });
  };

  const handlePrint = () => {
    // Delay to ensure print styles apply and temporarily clear title
    const previousTitle = document.title;
    document.title = " ";
    setTimeout(() => {
      window.print();
      // Restore title after print opens
      setTimeout(() => {
        document.title = previousTitle;
      }, 500);
    }, 50);
  };

  return (
    <div ref={cvRef} id="cv-root" className="relative theme-blue">
      {/* Removed solid white background layer to allow transparent page background */}

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
          <button
            onClick={handlePrint}
            className="ml-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 hover:shadow transition"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
        </div>
      </div>

      {/* Page */}
      <main className="w-full px-4 sm:px-6 lg:px-8 print:px-0 py-2 print:py-0 grid grid-cols-1 md:grid-cols-3 gap-3 print:gap-2">
        {/* Sidebar */}
        <aside className="bg-white rounded-2xl border border-border/50 p-4 print:p-3 md:col-span-1">
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
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4"/>
              <span>{hero.contact.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4"/>
              <span>{hero.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4"/>
              <span>{hero.contact.location}</span>
            </div>
          </div>

         
          

          {/* Skills (consolidated) */}
          <section className="mt-4 space-y-3 print:space-y-2">
            <SectionTitle icon={Layers3}>SKILLS</SectionTitle>
            <div>
              <div className="text-xs font-semibold text-muted-foreground">Domain</div>
              <div className="mt-1 flex flex-wrap gap-1">
                {expertise.map((item) => (
                  <span key={item} className="text-xs border rounded px-2 py-0.5 bg-white">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-muted-foreground">Platforms & Tools</div>
              <div className="mt-1 flex flex-wrap gap-1">
                {techStack.slice(0, 12).map((t) => (
                  <span key={t} className="text-xs border rounded px-2 py-0.5 bg-white">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-muted-foreground">Practices</div>
              <ul className="mt-1 space-y-1 text-sm">
                {domainSkills.map((d) => (
                  <li key={d.name} className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>{d.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          

          {/* Stats */}
          <section className="mt-4 grid grid-cols-3 gap-2 print:gap-1">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-3 text-center border border-black/5">
                <div className="text-xl font-bold text-gray-900">{s.value}</div>
                <div className="text-[11px] text-gray-600">{s.label}</div>
              </div>
            ))}
          </section>

          {/* Removed separate Domain Skills (merged into Skills) */}
          {/* Certificates */}
         
          <div className="bg-white rounded-2xl border border-border/50 p-4 print:p-3 mt-4">
            <SectionTitle icon={GraduationCap}>CERTIFICATES</SectionTitle>
            <ul className="mt-2 space-y-2 print:space-y-1">
              {certificates.map((cert: { title: string; description: string }) => (
                <li key={cert.title} className="inline-flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">{cert.title}</span>
                  {/* <span className="text-xs">— {cert.description}</span> */}
                </li>
              ))}
            </ul>
          </div>

          {/* Radar (web-only) */}
          <section className="mt-4 space-y-2 print:space-y-1 print:hidden">
            <div className="flex justify-center">
              <ChartContainer
                config={{ skill: { label: "Skill", color: "hsl(var(--primary))" } }}
                className="aspect-square w-full max-w-[320px]"
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
              <div className="flex justify-center mt-2">
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
          {/* About (trimmed) */}
          <div className="bg-white rounded-2xl border border-border/50 p-4 print:p-3">
            <h5 className="text-xl font-bold tracking-tight text-primary sm:text-xl">{aboutData.title}</h5>
            <h6 className="mt-2 text-sm font-semibold text-foreground">{aboutData.subtitle}</h6>
            <p className="mt-3 text-sm text-muted-foreground">{aboutData.p1}</p>
            <p className="mt-2 text-sm text-muted-foreground">{aboutData.p2}</p>
          </div>

          {/* Impact Highlights */}
          <div className="bg-white rounded-2xl border border-border/50 p-4 print:p-3">
            <h5 className="text-xl font-bold tracking-tight text-primary sm:text-xl print:text-base">IMPACT HIGHLIGHTS</h5>
            <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {impactHighlights.map((item) => (
                <li key={item} className="inline-flex items-center gap-2 items-center text-muted-foreground">
                  <Zap className="w-4 h-4 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-2xl border border-border/50 p-4 print:p-3">
            <h5 className="text-xl font-bold tracking-tight text-primary sm:text-xl print:text-base">PROFESSIONAL EXPERIENCE</h5>
            <div className="mt-2 space-y-4 print:space-y-3">
              {timeline.map((t) => (
                <div key={t.org} className="relative pl-5 print:break-inside-avoid">
                  <div
                    className="absolute left-0 top-1.5 w-2 h-2 rounded-full"
                    style={{ backgroundColor: t.accentColor || 'var(--foreground)' }}
                  />
                  <div className="flex flex-wrap items-center gap-2 font-semibold">
                    <span className="inline-flex items-center gap-2 text-gray-700">
                      {t.logo && (
                        <Image src={t.logo} alt={`${t.org} logo`} width={20} height={20} className="object-contain w-5 h-5" unoptimized />
                      )}
                      <span>{t.org}</span>
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="inline-flex items-center text-primary font-semibold">{t.role}</span>
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

          {/* Projects */}
          <div className="bg-white rounded-2xl border border-border/50 p-4 print:p-3">
            <h5 className="text-xl font-bold tracking-tight text-primary sm:text-xl print:text-base">FEATURED PROJECTS</h5>
            <div className="mt-2 grid md:grid-cols-2 gap-2 print:gap-2">
              {projects.map((p) => (
                <div key={p.title} className="border rounded-xl p-3 print:p-2 hover:shadow-sm transition print:break-inside-avoid">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10">
                      <Image src={p.imageUrl} alt={p.title} width={40} height={40} className="object-contain w-10 h-10" unoptimized />
                    </div>
                    <div>
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-sm text-gray-700">{p.client}</div>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-800">{p.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
                    {p.tags.map((tag) => (
                      <span key={tag} className="border rounded px-2 py-0.5 bg-white">
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
          @page { size: A4 portrait; margin: 5mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          svg { vertical-align: middle !important; }
          .inline-flex svg { vertical-align: middle !important; }
          .inline-flex { align-items: center !important; }
          .text-sm, .text-xs, .text-[11px] { line-height: 1.25rem !important; }
          header, footer, nav, .print-hidden-global { display: none !important; }
          #cv-root { transform: scale(0.96); transform-origin: top left; }
          #cv-root main { display: grid !important; grid-template-columns: 1fr 2fr !important; gap: 5px !important; padding: 0 !important; }
          #cv-root main > aside { grid-column: auto !important; }
          #cv-root main > section { grid-column: auto !important; }
          /* Tighten common spacings */
          #cv-root .p-4 { padding: 0.5rem !important; }
          #cv-root .py-2 { padding-top: 0.25rem !important; padding-bottom: 0.25rem !important; }
          #cv-root .mt-4 { margin-top: 0.5rem !important; }
          #cv-root .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.5rem !important; }
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
