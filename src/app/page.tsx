
import React from 'react';
import { getPosts, Post } from '@/lib/posts';
import { CategoryBrowser } from '@/components/page/home/category-browser';
import { FeaturedPosts } from '@/components/page/home/featured-posts';
import { HomeHeroBanner } from '@/components/layout/home-hero-banner';
import { CategorySection } from '@/components/page/home/category-section';
import { LatestNewsFeed } from '@/components/page/home/latest-news-feed';

export const dynamic = 'force-dynamic';

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const allPosts = await getPosts();
  const publishedPosts = allPosts.filter(p => p.published);
  
  const featuredPosts = publishedPosts.filter(p => p.featured);

  const categories = ['All', ...Array.from(new Set(publishedPosts.map(p => p.category))).sort()];
  const categoryCounts = Object.fromEntries(
    categories
      .filter(c => c !== 'All')
      .map(c => [c, publishedPosts.filter(p => p.category === c).length])
  ) as Record<string, number>;

  return (
    <div className="flex flex-col w-full">
        <HomeHeroBanner />
        
        <div className="w-full px-2 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 lg:space-y-12 pt-2 lg:pt-4">
          {/* 
            w-full: Chiếm toàn bộ chiều rộng của phần tử cha
            px-2: Padding theo chiều ngang 0.5rem (8px) ở màn hình nhỏ
            sm:px-6: Padding theo chiều ngang 1.5rem (24px) từ breakpoint sm trở lên
            lg:px-8: Padding theo chiều ngang 2rem (32px) từ breakpoint lg trở lên
            space-y-24: Khoảng cách 6rem (96px) giữa các phần tử con theo chiều dọc
            pt-8: Padding phía trên 2rem (32px) ở màn hình nhỏ
            lg:pt-12: Padding phía trên 3rem (48px) từ breakpoint lg trở lên
          */}
            <CategoryBrowser 
              categories={categories.filter(c => c !== 'All')} 
              categoryCounts={categoryCounts} 
            />
            
            <FeaturedPosts featuredPosts={featuredPosts} />

            {categories.filter(c => c !== 'All').map((category) => {
              const postsInCategory = publishedPosts.filter(p => p.category === category);
              return (
                <CategorySection 
                  key={category}
                  category={category}
                  posts={postsInCategory}
                  limit={6}
                  totalCount={postsInCategory.length}
                  showViewAll
                />
              );
            })}
        </div>
    </div>
  );
}
