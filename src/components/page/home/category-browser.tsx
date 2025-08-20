
'use client';

import { useLanguage } from '@/context/language-context';
import { SectionReveal } from '@/components/motion/section-reveal';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const content = {
  en: {
    title: "Browse by Topic",
    description: "Explore content by your area of interest."
  },
  vi: {
    title: "Khám phá theo chủ đề",
    description: "Chọn lọc nội dung theo lĩnh vực bạn quan tâm."
  }
};

const categoryColors = [
  'bg-blue-500/80', 'bg-purple-500/80', 'bg-green-500/80',
  'bg-pink-500/80', 'bg-orange-500/80', 'bg-red-500/80',
  'bg-indigo-500/80', 'bg-teal-500/80', 'bg-yellow-500/80'
];

interface CategoryBrowserProps {
    categories: string[];
    categoryCounts: Record<string, number>;
}

export function CategoryBrowser({ categories, categoryCounts }: CategoryBrowserProps) {
    const { language } = useLanguage();
    const c = content[language];
    
    if (categories.length === 0) {
        return null;
    }

    return (
        <SectionReveal>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{c.title}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{c.description}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {categories.map((category, index) => (
                    <Link href={`/posts?category=${encodeURIComponent(category)}`} key={category} className="group">
                       <Card className={cn(
                         'text-white p-6 rounded-2xl flex flex-col justify-end min-h-[120px] transition-transform duration-300 ease-smooth group-hover:scale-105 group-hover:shadow-xl',
                         categoryColors[index % categoryColors.length]
                       )}>
                           <h3 className="font-bold text-lg">{category}</h3>
                           <p className="text-sm opacity-80">{`${categoryCounts[category] || 0} articles`}</p>
                       </Card>
                    </Link>
                ))}
            </div>
        </SectionReveal>
    );
}
