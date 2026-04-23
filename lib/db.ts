import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL IS MISSING IN DB.TS');
  throw new Error('DATABASE_URL is not set');
}

console.log('DB: Initializing with URL length:', process.env.DATABASE_URL.length);
export const sql = neon(process.env.DATABASE_URL);

// Types for our data
export type Project = {
  id: number;
  title_en: string;
  title_ar: string;
  location_en: string;
  location_ar: string;
  image_url: string;
  type?: string;
  created_at: Date;
};

export type Job = {
  id: number;
  title_en: string;
  title_ar: string;
  department_en: string;
  department_ar: string;
  location_en: string;
  location_ar: string;
  type_en: string;
  type_ar: string;
  created_at: Date;
};
