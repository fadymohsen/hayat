import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  console.error('Please set DATABASE_URL in .env.local');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const projects = [
  {
    src: "/projects/Hayat Hotel-2.jpg",
    title: "Hayat Tower — Luxury Suite",
    titleAr: "برج حياة — جناح فاخر",
    location: "Riyadh",
    locationAr: "الرياض",
  },
  {
    src: "/projects/Hayat Hotel-3.jpg",
    title: "Hayat Tower — Premium Bathroom",
    titleAr: "برج حياة — حمام فاخر",
    location: "Riyadh",
    locationAr: "الرياض",
  },
  {
    src: "/projects/Infrastructure.png",
    title: "Infrastructure & Construction Works",
    titleAr: "أعمال البنية التحتية والإنشاءات",
    location: "Riyadh",
    locationAr: "الرياض",
  },
  {
    src: "/projects/Riyadh Villa-1.png",
    title: "Riyadh Luxury Villas",
    titleAr: "فلل الرياض الفاخرة",
    location: "Riyadh",
    locationAr: "الرياض",
  },
  {
    src: "/projects/Riyadh Villa-2.png",
    title: "Riyadh Villa — Stone Facade",
    titleAr: "فلل الرياض — واجهة حجرية",
    location: "Riyadh",
    locationAr: "الرياض",
  },
  {
    src: "/projects/project-3.png",
    title: "Hayat Serviced Apartments",
    titleAr: "شقق حياة الفندقية",
    location: "Riyadh",
    locationAr: "الرياض",
  },
];

async function seed() {
  console.log('Seeding existing projects into database...');

  try {
    for (const p of projects) {
      await sql`
        INSERT INTO projects (title_en, title_ar, location_en, location_ar, image_url, type)
        VALUES (${p.title}, ${p.titleAr}, ${p.location}, ${p.locationAr}, ${p.src}, 'normal')
        ON CONFLICT DO NOTHING
      `;
    }
    console.log('✓ Successfully seeded projects');
  } catch (error) {
    console.error('Error seeding projects:', error);
  }
}

seed();
