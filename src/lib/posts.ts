
'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

export interface Post {
  slug: string;
  title: string;
  category: string;
  content: string; // Changed from excerpt to full content
}

const postsFilePath = path.join(process.cwd(), 'src/data/posts.json');

export async function getPosts(): Promise<Post[]> {
  try {
    const data = await fs.readFile(postsFilePath, 'utf-8');
    const posts = JSON.parse(data);
    return posts;
  } catch (error) {
    // If the file doesn't exist, return an empty array
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export async function savePost(post: Omit<Post, 'slug'>) {
  const posts = await getPosts();
  
  const newPost: Post = {
    ...post,
    slug: post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
  };

  posts.unshift(newPost); // Add to the beginning of the array

  await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2));

  // Revalidate the posts page to show the new post
  revalidatePath('/posts');
}
