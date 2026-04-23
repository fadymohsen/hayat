import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  console.error('Please set DATABASE_URL in .env.local');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function init() {
  console.log('Initializing database...');

  try {
    // Projects Table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title_en TEXT NOT NULL,
        title_ar TEXT NOT NULL,
        location_en TEXT NOT NULL,
        location_ar TEXT NOT NULL,
        image_url TEXT NOT NULL,
        type TEXT DEFAULT 'normal',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✓ Projects table ready');

    // Jobs Table
    await sql`
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        title_en TEXT NOT NULL,
        title_ar TEXT NOT NULL,
        department_en TEXT NOT NULL,
        department_ar TEXT NOT NULL,
        location_en TEXT NOT NULL,
        location_ar TEXT NOT NULL,
        type_en TEXT NOT NULL,
        type_ar TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✓ Jobs table ready');

    // Admin Table (Simple)
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
      )
    `;
    console.log('✓ Admin table ready');

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

init();
