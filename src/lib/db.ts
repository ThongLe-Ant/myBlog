'use server';

import { neon } from '@neondatabase/serverless';

// Create a singleton SQL client using Neon serverless driver.
// DATABASE_URL must be defined in environment variables.
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error('DATABASE_URL is not set. Please add it to your environment.');
}

export const sql = neon(connectionString);

export type SqlClient = ReturnType<typeof neon>;


