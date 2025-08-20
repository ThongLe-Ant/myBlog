
'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

export interface Post {
  slug: string;
  title: string;
  category: string;
  content: string; 
  published: boolean;
  featured?: boolean;
  imageUrl?: string;
  excerpt?: string;
}

const postsDirectory = path.join(process.cwd(), 'src/data/posts');

// A list of default placeholder images for posts that don't have one.
const defaultImages = [
  'https://placehold.co/800x600/777777/FFFFFF.png?text=Blog+Post',
  'https://placehold.co/800x600/888888/FFFFFF.png?text=Article',
  'https://placehold.co/800x600/999999/FFFFFF.png?text=Insight',
  'https://placehold.co/800x600/AAAAAA/FFFFFF.png?text=Update',
  'https://placehold.co/800x600/BBBBBB/FFFFFF.png?text=Showcase',
  'https://placehold.co/800x600/CCCCCC/FFFFFF.png?text=Review',
];

// Helper to get category file path
const getCategoryFilePath = (category: string) => {
    const fileName = `${category.toLowerCase().replace(/\s+/g, '-')}.json`;
    return path.join(postsDirectory, fileName);
}

// Helper to ensure directory exists
const ensureDirectoryExists = async () => {
    try {
        await fs.access(postsDirectory);
    } catch {
        await fs.mkdir(postsDirectory, { recursive: true });
    }
}

// Helper to read posts from a specific category file
const readCategoryFile = async (filePath: string): Promise<Post[]> => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data) as Post[];
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return []; // File not found, return empty array
        }
        throw error; // Other errors
    }
};

export async function getPosts(): Promise<Post[]> {
  try {
    await ensureDirectoryExists();
    const categoryFiles = await fs.readdir(postsDirectory);
    let allPosts: Post[] = [];

    for (const file of categoryFiles) {
        if (file.endsWith('.json')) {
            const filePath = path.join(postsDirectory, file);
            const posts = await readCategoryFile(filePath);
            allPosts.push(...posts);
        }
    }
    
    // Assign default images to posts without one
    allPosts = allPosts.map((post, index) => {
        if (!post.imageUrl) {
            return {
                ...post,
                imageUrl: defaultImages[index % defaultImages.length]
            };
        }
        return post;
    });

    return allPosts;
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find(post => post.slug === slug);
}

const createSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

export async function savePost(post: Omit<Post, 'slug'>) {
    await ensureDirectoryExists();
    const filePath = getCategoryFilePath(post.category);
    const categoryPosts = await readCategoryFile(filePath);

    const newPost: Post = {
        ...post,
        slug: createSlug(post.title),
        excerpt: post.content.substring(0, 150),
        featured: post.featured || false,
        imageUrl: post.imageUrl || '',
    };

    // Check for duplicate slugs
    if (categoryPosts.some(p => p.slug === newPost.slug)) {
        // Simple strategy: append a timestamp to make it unique
        newPost.slug = `${newPost.slug}-${Date.now()}`;
    }

    categoryPosts.unshift(newPost);

    await fs.writeFile(filePath, JSON.stringify(categoryPosts, null, 2));

    revalidatePath('/posts');
    revalidatePath(`/posts/${newPost.slug}`);
    revalidatePath('/');
}

export async function updatePost(originalSlug: string, originalCategory: string, updatedPostData: Omit<Post, 'slug'>) {
    await ensureDirectoryExists();
    
    const { title, content, category, published, featured, imageUrl } = updatedPostData;
    const newSlug = createSlug(title);

    const originalFilePath = getCategoryFilePath(originalCategory);
    let originalCategoryPosts = await readCategoryFile(originalFilePath);

    const postIndex = originalCategoryPosts.findIndex(p => p.slug === originalSlug);

    if (postIndex === -1) {
        throw new Error(`Post with slug "${originalSlug}" not found in category "${originalCategory}"`);
    }

    // If category has changed
    if (originalCategory !== category) {
        // Remove post from old category
        const [postToMove] = originalCategoryPosts.splice(postIndex, 1);
        await fs.writeFile(originalFilePath, JSON.stringify(originalCategoryPosts, null, 2));
        
        // Update post details
        postToMove.title = title;
        postToMove.content = content;
        postToMove.category = category;
        postToMove.published = published;
        postToMove.featured = featured;
        postToMove.slug = newSlug;
        postToMove.imageUrl = imageUrl;
        postToMove.excerpt = content.substring(0, 150);


        // Add to new category
        const newFilePath = getCategoryFilePath(category);
        const newCategoryPosts = await readCategoryFile(newFilePath);
        newCategoryPosts.unshift(postToMove);
        await fs.writeFile(newFilePath, JSON.stringify(newCategoryPosts, null, 2));

    } else {
        // Just update the post in the same category
        originalCategoryPosts[postIndex] = {
            ...originalCategoryPosts[postIndex],
            title,
            content,
            category,
            published,
            featured,
            imageUrl,
            slug: newSlug,
            excerpt: content.substring(0, 150),
        };
        await fs.writeFile(originalFilePath, JSON.stringify(originalCategoryPosts, null, 2));
    }
    
    // Revalidate relevant paths
    revalidatePath('/posts');
    revalidatePath('/');
    revalidatePath(`/posts/${originalSlug}`);
    if (originalSlug !== newSlug) {
      revalidatePath(`/posts/${newSlug}`);
    }
}

export async function deletePost(slug: string, category: string) {
    await ensureDirectoryExists();
    const filePath = getCategoryFilePath(category);
    let categoryPosts = await readCategoryFile(filePath);

    const updatedPosts = categoryPosts.filter(p => p.slug !== slug);

    if (updatedPosts.length === categoryPosts.length) {
        throw new Error(`Post with slug "${slug}" not found in category "${category}"`);
    }

    await fs.writeFile(filePath, JSON.stringify(updatedPosts, null, 2));

    revalidatePath('/posts');
    revalidatePath('/');
    revalidatePath(`/posts/${slug}`);
}
