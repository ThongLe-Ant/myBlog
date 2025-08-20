
'use client';

import React, { useEffect, useState } from 'react';
import { Post, getPosts } from '@/lib/posts';
import { HeroBanner } from '@/components/layout/hero-banner';
import { CategoryBrowser } from '@/components/page/home/category-browser';
import { FeaturedPosts } from '@/components/page/home/featured-posts';
import { CategorySection } from '@/components/page/home/category-section';

export default function HomePage() {
  const [postsByCategory, setPostsByCategory] = useState<Record<string, Post[]>>({});
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const allPosts = await getPosts();
      const publishedPosts = allPosts.filter(p => p.published);
      
      setFeaturedPosts(publishedPosts.filter(p => p.featured));
      
      const groupedPosts = publishedPosts.reduce((acc, post) => {
        const category = post.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(post);
        return acc;
      }, {} as Record<string, Post[]>);
      
      const sortedCategories = Object.keys(groupedPosts).sort((a, b) => a.localeCompare(b));
      
      const counts: Record<string, number> = {};
      for(const category of sortedCategories) {
        counts[category] = groupedPosts[category].length;
      }

      setPostsByCategory(groupedPosts);
      setCategories(sortedCategories);
      setCategoryCounts(counts);
    }
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col w-full">
        <HeroBanner showContactInfo={false} showStats={true} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-16 lg:py-24">
            <CategoryBrowser categories={categories} categoryCounts={categoryCounts} />
            
            <FeaturedPosts featuredPosts={featuredPosts} />

            {/* Posts by Category Sections */}
            {categories.map((category) => (
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
