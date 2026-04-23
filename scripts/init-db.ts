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

    // Initial Services
    const initialServices = [
      {
        title_en: "Real Estate Development",
        title_ar: "التطوير العقاري",
        description_en: "Visionary residential and commercial projects built to the highest standards.",
        description_ar: "مشاريع سكنية وتجارية طموحة مبنية وفق أعلى المعايير.",
        icon_name: "Building2"
      },
      {
        title_en: "Property Management",
        title_ar: "إدارة الأملاك",
        description_en: "Comprehensive management services to maximize your asset value.",
        description_ar: "خدمات إدارة شاملة لتعظيم قيمة أصولك.",
        icon_name: "Briefcase"
      },
      {
        title_en: "Real Estate Marketing",
        title_ar: "التسويق العقاري",
        description_en: "Strategic marketing campaigns to reach your target audience effectively.",
        description_ar: "حملات تسويقية استراتيجية للوصول إلى جمهورك المستهدف بفعالية.",
        icon_name: "Megaphone"
      }
    ];

    for (const s of initialServices) {
      await sql`
        INSERT INTO services (title_en, title_ar, description_en, description_ar, icon_name)
        VALUES (${s.title_en}, ${s.title_ar}, ${s.description_en}, ${s.description_ar}, ${s.icon_name})
      `;
    }
    console.log('✓ Initial services seeded');

    // Initial Partners
    const initialPartners = [
      { name: "Partner 1", type: "strategic", image_url: "/Partners/Gemini_Generated_Image_8fpph78fpph78fpp-removebg-preview.png" },
      { name: "Partner 2", type: "strategic", image_url: "/Partners/Gemini_Generated_Image_wvoysiwvoysiwvoy-removebg-preview.png" },
      { name: "Client 1", type: "success", image_url: "/clients/Gemini_Generated_Image_bn843sbn843sbn84-removebg-preview.png" },
      { name: "Client 2", type: "success", image_url: "/clients/Gemini_Generated_Image_hed5t4hed5t4hed5-removebg-preview.png" },
      { name: "Client 3", type: "success", image_url: "/clients/Gemini_Generated_Image_x29oukx29oukx29o.png" }
    ];

    for (const p of initialPartners) {
      await sql`
        INSERT INTO partners (name, type, image_url)
        VALUES (${p.name}, ${p.type}, ${p.image_url})
      `;
    }
    console.log('✓ Initial partners seeded');

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

init();
