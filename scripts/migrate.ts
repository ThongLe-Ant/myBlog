import 'dotenv/config';
import { sql } from '@/lib/db';

async function main() {
	// Create posts table if not exists
	await sql`
	  create table if not exists posts (
	    id serial primary key,
	    slug text unique not null,
	    title text not null,
	    category text not null,
	    content text not null,
	    published boolean not null default true,
	    featured boolean not null default false,
	    image_url text,
	    excerpt text,
	    created_at timestamptz not null default now(),
	    updated_at timestamptz not null default now()
	  )
	`;

	console.log('Migration completed.');
}

main().then(() => process.exit(0)).catch((err) => {
	console.error(err);
	process.exit(1);
});


