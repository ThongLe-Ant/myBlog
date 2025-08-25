export type ProductItem = {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  category: string;
  client: string;
  tags: string[];
  aiHint?: string;
};

export type ProductsContent = {
  title: string;
  description: string;
  items: ProductItem[];
};

export const productsContent: Record<'en' | 'vi', ProductsContent> = {
  en: {
    title: 'Products',
    description: 'Selected products and boilerplates I maintain and share.',
    items: [
      {
        title: 'GoERP Admin Platform',
        client: 'Open Source',
        category: 'Web App',
        description:
          'Admin app with Page Builder, Schema Editor, and RBAC using Next.js 15, React 19, Tailwind, shadcn/ui, Refine, and Supabase.',
        tags: ['Next.js', 'React 19', 'TypeScript', 'Tailwind', 'Refine', 'Supabase'],
        slug: 'go-erp',
        imageUrl: '/backgrounds/project-1.svg',
        aiHint: 'nextjs admin rbac page builder refine supabase',
      },
      {
        title: 'Go Clean Architecture API',
        client: 'Open Source',
        category: 'Backend',
        description:
          'Go backend API with Gin, Wire DI, GORM, PostgreSQL, and Swagger UI; layered architecture with middleware, repository, and use cases.',
        tags: ['Go', 'Gin', 'GORM', 'PostgreSQL', 'Swagger'],
        slug: 'go-arc',
        imageUrl: '/backgrounds/project-2.svg',
        aiHint: 'go backend gin gorm wire swagger',
      },
      {
        title: 'FastAPI Clean Architecture',
        client: 'Open Source',
        category: 'Backend',
        description:
          'FastAPI service using Clean Architecture with SQLAlchemy, Alembic, Pydantic, Docker, and GitHub Actions.',
        tags: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'Pydantic'],
        slug: 'py-arc',
        imageUrl: '/backgrounds/project-3.svg',
        aiHint: 'fastapi clean architecture sqlalchemy alembic pydantic',
      },
    ],
  },
  vi: {
    title: 'Sản phẩm',
    description: 'Các sản phẩm/boilerplate tôi duy trì và chia sẻ.',
    items: [
      {
        title: 'Nền tảng quản trị GoERP',
        client: 'Mã nguồn mở',
        category: 'Web App',
        description:
          'Ứng dụng quản trị có Page Builder, Schema Editor và RBAC; xây dựng bằng Next.js 15, React 19, Tailwind, shadcn/ui, Refine và Supabase.',
        tags: ['Next.js', 'React 19', 'TypeScript', 'Tailwind', 'Refine', 'Supabase'],
        slug: 'go-erp',
        imageUrl: '/backgrounds/project-1.svg',
        aiHint: 'nextjs admin rbac page builder refine supabase',
      },
      {
        title: 'Go Clean Architecture API',
        client: 'Mã nguồn mở',
        category: 'Backend',
        description:
          'Backend API bằng Go dùng Gin, Wire DI, GORM, PostgreSQL và Swagger UI; kiến trúc phân lớp với middleware, repository và use case.',
        tags: ['Go', 'Gin', 'GORM', 'PostgreSQL', 'Swagger'],
        slug: 'go-arc',
        imageUrl: '/backgrounds/project-2.svg',
        aiHint: 'go backend gin gorm wire swagger',
      },
      {
        title: 'FastAPI Clean Architecture',
        client: 'Mã nguồn mở',
        category: 'Backend',
        description:
          'Dịch vụ FastAPI theo Clean Architecture với SQLAlchemy, Alembic, Pydantic, Docker và GitHub Actions.',
        tags: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'Pydantic'],
        slug: 'py-arc',
        imageUrl: '/backgrounds/project-3.svg',
        aiHint: 'fastapi clean architecture sqlalchemy alembic pydantic',
      },
    ],
  },
};


