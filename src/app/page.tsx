
import React from 'react';
import { getPosts, Post } from '@/lib/posts';
import { CategoryBrowser } from '@/components/page/home/category-browser';
import { FeaturedPosts } from '@/components/page/home/featured-posts';
import { CategorySection } from '@/components/page/home/category-section';
import { HomeHeroBanner } from '@/components/layout/home-hero-banner';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const allPosts = await getPosts();
  const publishedPosts = allPosts.filter(p => p.published);
  
  const featuredPosts = publishedPosts.filter(p => p.featured);
  
  const postsByCategory = publishedPosts.reduce((acc, post) => {
    const category = post.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(post);
    return acc;
  }, {} as Record<string, Post[]>);
  
  const sortedCategories = Object.keys(postsByCategory).sort((a, b) => a.localeCompare(b));
  
  const categoryCounts: Record<string, number> = {};
  for(const category of sortedCategories) {
    categoryCounts[category] = postsByCategory[category].length;
  }

  return (
    <div className="flex flex-col w-full">
        <HomeHeroBanner />
        
        <div className="w-full px-2 sm:px-6 lg:px-8 space-y-24 pt-4 lg:pt-4">
          {/* 
            w-full: Chiếm toàn bộ chiều rộng của phần tử cha
            px-2: Padding theo chiều ngang 0.5rem (8px) ở màn hình nhỏ
            sm:px-6: Padding theo chiều ngang 1.5rem (24px) từ breakpoint sm trở lên
            lg:px-8: Padding theo chiều ngang 2rem (32px) từ breakpoint lg trở lên
            space-y-24: Khoảng cách 6rem (96px) giữa các phần tử con theo chiều dọc
            pt-8: Padding phía trên 2rem (32px) ở màn hình nhỏ
            lg:pt-12: Padding phía trên 3rem (48px) từ breakpoint lg trở lên
          */}
            <CategoryBrowser categories={sortedCategories} categoryCounts={categoryCounts} />
            
            <FeaturedPosts featuredPosts={featuredPosts} />

            {/* Posts by Category Sections */}
            {sortedCategories.map((category) => (
                <CategorySection
                    key={category}
                    category={category}
                    posts={postsByCategory[category] || []}
                />
            ))}
        </div>
    </div>
  );
}
