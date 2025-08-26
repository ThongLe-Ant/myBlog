
'use server';

import { revalidatePath } from 'next/cache';
import { sql } from '@/lib/db';

export interface Post {
  slug: string;
  title: string;
  category: string;
  content: string;
  published: boolean;
  featured?: boolean;
  imageUrl?: string;
  excerpt?: string;
  createdAt?: string;
}

// A list of default local SVG images for posts that don't have one.
const defaultImages = [

    '/backgrounds/pattern-1.svg',
    '/backgrounds/pattern-2.svg',
    '/backgrounds/pattern-3.svg',
    '/backgrounds/pattern-4.svg',
    '/backgrounds/thumb-1.svg',
    '/backgrounds/thumb-2.svg',
    '/backgrounds/thumb-3.svg',
    '/backgrounds/project-1.svg',
    '/backgrounds/project-2.svg',
    '/backgrounds/project-3.svg',
    '/backgrounds/project-4.svg'
];

const createSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

export async function getPosts(): Promise<Post[]> {
  try {
    const rows = await sql`
      select
        slug,
        title,
        category,
        content,
        published,
        featured,
        image_url as "imageUrl",
        created_at as "createdAt"
      from posts
      order by created_at desc
    `;

    let allPosts: Post[] = rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      category: r.category,
      content: r.content,
      published: r.published,
      featured: Boolean(r.featured || false),
      imageUrl: r.imageUrl || undefined,
      excerpt: r.content.substring(0, 250),
      createdAt: r.createdAt,
    }));

    // Assign default images to posts without one deterministically
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
    console.error('Error fetching posts from DB:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const rows = await sql`
    select slug, title, category, content, published, featured, image_url as "imageUrl", created_at as "createdAt"
    from posts
    where slug = ${slug}
    limit 1
  `;

  const r = rows[0];
  if (!r) return undefined;
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    content: r.content,
    published: r.published,
    featured: Boolean(r.featured || false),
    imageUrl: r.imageUrl || undefined,
    excerpt: r.content.substring(0, 250),
    createdAt: r.createdAt,
  };
}

export async function savePost(post: Omit<Post, 'slug' | 'excerpt'>) {
  const { title, content, category, published, featured, imageUrl } = post;
  let newSlug = createSlug(title);

  const tryInsert = async (slugToUse: string) => {
    await sql`
      insert into posts (
        slug, title, category, content, published, featured, image_url, excerpt, created_at, updated_at
      ) values (
        ${slugToUse}, ${title}, ${category}, ${content}, ${published}, ${featured || false}, ${imageUrl || null}, ${content.substring(0, 250)}, now(), now()
      )
    `;
    return slugToUse;
  };

  try {
    try {
      await tryInsert(newSlug);
    } catch (err: any) {
      // Unique violation: append timestamp for uniqueness and retry
      if (err && err.code === '23505') {
        newSlug = `${newSlug}-${Date.now()}`;
        await tryInsert(newSlug);
      } else {
        throw err;
      }
    }

    revalidatePath('/posts');
    revalidatePath(`/posts/${newSlug}`);
    revalidatePath('/');
  } catch (error) {
    console.error('Error saving post:', error);
    throw error;
  }
}

export async function updatePost(originalSlug: string, _originalCategory: string, updatedPostData: Omit<Post, 'slug' | 'excerpt'>) {
  const { title, content, category, published, featured, imageUrl } = updatedPostData;
  const newSlug = createSlug(title);

  try {
    await sql`
      update posts set
        slug = ${newSlug},
        title = ${title},
        category = ${category},
        content = ${content},
        published = ${published},
        featured = ${featured || false},
        image_url = ${imageUrl || null},
        excerpt = ${content.substring(0, 250)},
        updated_at = now()
      where slug = ${originalSlug}
    `;

    revalidatePath('/posts');
    revalidatePath('/');
    revalidatePath(`/posts/${originalSlug}`);
    if (originalSlug !== newSlug) {
      revalidatePath(`/posts/${newSlug}`);
    }
  } catch (error: any) {
    // Handle potential slug conflict
    if (error && error.code === '23505') {
      const uniqueSlug = `${newSlug}-${Date.now()}`;
      await sql`
        update posts set
          slug = ${uniqueSlug},
          title = ${title},
          category = ${category},
          content = ${content},
          published = ${published},
          featured = ${featured || false},
          image_url = ${imageUrl || null},
          excerpt = ${content.substring(0, 250)},
          updated_at = now()
        where slug = ${originalSlug}
      `;
      revalidatePath(`/posts/${uniqueSlug}`);
    } else {
      console.error('Error updating post:', error);
      throw error;
    }
  }
}

export async function deletePost(slug: string, _category: string) {
  try {
    await sql`delete from posts where slug = ${slug}`;
    revalidatePath('/posts');
    revalidatePath('/');
    revalidatePath(`/posts/${slug}`);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}
