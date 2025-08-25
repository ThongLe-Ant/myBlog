export type ProjectItem = {
  title: string;
  client: string;
  category: string;
  description: string;
  tags: string[];
  slug: string;
  imageUrl: string;
  aiHint?: string;
};

export type ProjectsContent = {
  title: string;
  description: string;
  items: ProjectItem[];
};

export const projectsContent: Record<'en' | 'vi', ProjectsContent> = {
  en: {
    title: 'Featured Consulting Projects',
    description: 'Successfully implemented technology solutions for partners.',
    items: [
      {
        title: 'Cashless Payment Solution',
        client: 'MWG',
        category: 'Retail',
        description:
          "Integrated electronic payment solution for Vietnam's largest retail chain, processing millions of transactions monthly.",
        tags: ['.NET Core', 'API Gateway', 'MSSQL', 'Docker'],
        slug: 'cashless-payment-mwg',
        imageUrl: '/mwg_logo.jpg',
        aiHint: 'digital payment retail',
      },
      {
        title: 'Order & Inventory Management',
        client: 'EOC',
        category: 'Industrial Catering',
        description:
          'Supply chain management system for an industrial catering provider with over 50,000 meals/day.',
        tags: ['Python', 'Java', 'Node.js', 'PostgreSQL'],
        slug: 'order-inventory-eoc',
        imageUrl: '/eoc_logo.jpg',
        aiHint: 'supply chain food',
      },
      {
        title: 'IoT for Production Management',
        client: 'VCS',
        category: 'Agriculture',
        description:
          'IoT solution for monitoring and managing high-tech agricultural production over 500ha.',
        tags: ['Golang', 'Next.js', 'IoT', 'PostgreSQL'],
        slug: 'iot-production-vcs',
        imageUrl: '/rriv_logo.png',
        aiHint: 'iot agriculture farm',
      },
      {
        title: 'Warehouse & Customs Management',
        client: 'ZA VN',
        category: 'Logistics',
        description:
          'Warehouse, import/export, and customs management solution for a logistics company, integrating goods control and e-document processes.',
        tags: ['Python', 'React Native'],
        slug: 'warehouse-customs-zavn',
        imageUrl: '/zavn_logo.png',
        aiHint: 'warehouse logistics customs',
      },
    ],
  },
  vi: {
    title: 'Dự án tư vấn tiêu biểu',
    description: 'Triển khai thành công các giải pháp công nghệ cho đối tác.',
    items: [
      {
        title: 'Giải pháp thanh toán không dùng tiền mặt',
        client: 'MWG',
        category: 'Bán lẻ',
        description:
          'Giải pháp thanh toán điện tử tích hợp cho chuỗi bán lẻ lớn nhất Việt Nam, xử lý hàng triệu giao dịch mỗi tháng.',
        tags: ['.NET Core', 'API Gateway', 'MSSQL', 'Docker'],
        slug: 'cashless-payment-mwg',
        imageUrl: '/mwg_logo.jpg',
        aiHint: 'digital payment retail',
      },
      {
        title: 'Quản lý đơn hàng & tồn kho',
        client: 'EOC',
        category: 'Suất ăn công nghiệp',
        description:
          'Hệ thống quản lý chuỗi cung ứng cho nhà cung cấp suất ăn công nghiệp với hơn 50,000 bữa ăn/ngày.',
        tags: ['Python', 'Java', 'Node.js', 'PostgreSQL'],
        slug: 'order-inventory-eoc',
        imageUrl: '/eoc_logo.jpg',
        aiHint: 'supply chain food',
      },
      {
        title: 'IoT trong quản lý sản xuất',
        client: 'VCS',
        category: 'Nông nghiệp',
        description:
          'Giải pháp IoT giám sát và quản lý sản xuất nông nghiệp công nghệ cao trên 500ha.',
        tags: ['Golang', 'Next.js', 'IoT', 'PostgreSQL'],
        slug: 'iot-production-vcs',
        imageUrl: '/rriv_logo.png',
        aiHint: 'iot agriculture farm',
      },
      {
        title: 'Quản lý kho & hải quan',
        client: 'ZA VN',
        category: 'Logistics',
        description:
          'Giải pháp quản lý kho, xuất nhập khẩu và hải quan cho công ty logistics, tích hợp kiểm soát hàng hóa và quy trình chứng từ điện tử.',
        tags: ['Python', 'React Native'],
        slug: 'warehouse-customs-zavn',
        imageUrl: '/zavn_logo.png',
        aiHint: 'warehouse logistics customs',
      },
    ],
  },
};

export type LanguageKey = keyof ProjectsContent;


