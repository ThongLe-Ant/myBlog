
'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

export interface Post {
  slug: string;
  title: string;
  category: string;
  content: string; 
}

const postsDirectory = path.join(process.cwd(), 'src/data/posts');

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

export async function getPosts(): Promise<Post[]> {
  try {
    await ensureDirectoryExists();
    const categoryFiles = await fs.readdir(postsDirectory);
    const allPosts: Post[] = [];

    for (const file of categoryFiles) {
        if (file.endsWith('.json')) {
            const filePath = path.join(postsDirectory, file);
            const data = await fs.readFile(filePath, 'utf-8');
            if (data) {
                const posts: Post[] = JSON.parse(data);
                allPosts.push(...posts);
            }
        }
    }
    // Sort posts by putting the newest first, assuming they are added to the beginning of the file
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

export async function savePost(post: Omit<Post, 'slug'>) {
    await ensureDirectoryExists();
    const filePath = getCategoryFilePath(post.category);
    let categoryPosts: Post[] = [];

    try {
        const data = await fs.readFile(filePath, 'utf-8');
        categoryPosts = JSON.parse(data);
    } catch (error) {
        // File doesn't exist, it's fine, we'll create it.
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
            throw error;
        }
    }

    const newPost: Post = {
        ...post,
        slug: post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
    };

    categoryPosts.unshift(newPost); // Add new post to the beginning

    await fs.writeFile(filePath, JSON.stringify(categoryPosts, null, 2));

    // Revalidate paths to reflect changes
    revalidatePath('/posts');
    revalidatePath(`/posts/${newPost.slug}`);
}
