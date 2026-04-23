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

    // Services Table
    await sql`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title_en TEXT NOT NULL,
        title_ar TEXT NOT NULL,
        description_en TEXT NOT NULL,
        description_ar TEXT NOT NULL,
        icon_name TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✓ Services table ready');

    // Partners Table
    await sql`
      CREATE TABLE IF NOT EXISTS partners (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        image_url TEXT NOT NULL,
        type TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✓ Partners table ready');

    // Settings Table
    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )
    `;
    console.log('✓ Settings table ready');

    // Initial Settings
    const initialSettings = [
      { key: 'contact_email', value: 'Info@saudihayat.com' },
      { key: 'contact_phone', value: '0114741991' },
      { key: 'contact_whatsapp', value: '+966 54 001 1644' },
      { key: 'home_who_we_are_image', value: '/projects/Riyadh Villa-1.png' },
      { key: 'home_active_development_image', value: '/projects/Hayat Hotel-1.jpg' },
    ];

    for (const s of initialSettings) {
      await sql`
        INSERT INTO settings (key, value)
        VALUES (${s.key}, ${s.value})
        ON CONFLICT (key) DO NOTHING
      `;
    }
    console.log('✓ Initial settings seeded');

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

init();
