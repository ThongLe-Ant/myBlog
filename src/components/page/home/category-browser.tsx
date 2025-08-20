
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

const categoryGradients = [
  'bg-gradient-to-br from-sky-500 to-blue-600',
  'bg-gradient-to-br from-purple-500 to-indigo-600',
  'bg-gradient-to-br from-emerald-500 to-green-600',
  'bg-gradient-to-br from-pink-500 to-rose-600',
  'bg-gradient-to-br from-amber-500 to-orange-600',
  'bg-gradient-to-br from-red-500 to-red-700',
  'bg-gradient-to-br from-violet-500 to-purple-600',
  'bg-gradient-to-br from-teal-500 to-cyan-600',
  'bg-gradient-to-br from-yellow-400 to-amber-500'
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
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{c.title}</h2>
                  <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{c.description}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {categories.map((category, index) => (
                      <Link href={`/posts?category=${encodeURIComponent(category)}`} key={category} className="group">
                        <Card className={cn(
                          'relative text-white p-6 rounded-2xl flex flex-col justify-end min-h-[120px] transition-transform duration-300 ease-smooth group-hover:scale-105 group-hover:shadow-xl overflow-hidden',
                          categoryGradients[index % categoryGradients.length]
                        )}>
                            <div 
                                className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: 'repeating-radial-gradient(circle at center, hsla(0,0%,100%,.2), hsla(0,0%,100%,.2) 1px, transparent 1px, transparent 100%)',
                                    backgroundSize: '2rem 2rem'
                                }}
                            />
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg">{category}</h3>
                                <p className="text-sm opacity-80">{`${categoryCounts[category] || 0} articles`}</p>
                            </div>
                        </Card>
                      </Link>
                  ))}
              </div>
            </div>
        </SectionReveal>
    );
}
