import 'dotenv/config';
import { sql } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';

type JsonPost = {
	slug?: string;
	title: string;
	category: string;
	content: string;
	published: boolean;
	featured?: boolean;
	imageUrl?: string;
};

const postsDirectory = path.join(process.cwd(), 'src/data/posts');

const createSlug = (title: string) =>
	title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

async function readCategoryFile(filePath: string): Promise<JsonPost[]> {
	try {
		const data = await fs.readFile(filePath, 'utf-8');
		return JSON.parse(data) as JsonPost[];
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
			return [];
		}
		throw error;
	}
}

async function importPosts() {
	const categoryFiles = await fs.readdir(postsDirectory);
	for (const file of categoryFiles) {
		if (!file.endsWith('.json')) continue;
		const filePath = path.join(postsDirectory, file);
		const posts = await readCategoryFile(filePath);
		for (const post of posts) {
			const slug = post.slug || createSlug(post.title);
			try {
				await sql`
					insert into posts (slug, title, category, content, published, featured, image_url, excerpt, created_at, updated_at)
					values (${slug}, ${post.title}, ${post.category}, ${post.content}, ${post.published}, ${post.featured || false}, ${post.imageUrl || null}, ${post.content.substring(0, 250)}, now(), now())
					on conflict (slug) do update set
					  title = excluded.title,
					  category = excluded.category,
					  content = excluded.content,
					  published = excluded.published,
					  featured = excluded.featured,
					  image_url = excluded.image_url,
					  excerpt = excluded.excerpt,
					  updated_at = now()
				`;
				console.log(`Imported: ${slug}`);
			} catch (err) {
				console.error(`Failed to import ${slug}:`, err);
			}
		}
	}
}

async function main() {
	await importPosts();
	console.log('Import completed.');
}

main().then(() => process.exit(0)).catch((err) => {
	console.error(err);
	process.exit(1);
});


