import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const jobs = await sql`SELECT * FROM jobs ORDER BY created_at DESC`;
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      title_en, title_ar, 
      department_en, department_ar, 
      location_en, location_ar, 
      type_en, type_ar 
    } = body;

    const result = await sql`
      INSERT INTO jobs (
        title_en, title_ar, 
        department_en, department_ar, 
        location_en, location_ar, 
        type_en, type_ar
      ) VALUES (${title_en}, ${title_ar}, ${department_en}, ${department_ar}, ${location_en}, ${location_ar}, ${type_en}, ${type_ar}) 
      RETURNING *`;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await sql`DELETE FROM jobs WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { 
      id,
      title_en, title_ar, 
      department_en, department_ar, 
      location_en, location_ar, 
      type_en, type_ar 
    } = body;

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const result = await sql`
      UPDATE jobs SET 
        title_en = ${title_en}, title_ar = ${title_ar}, 
        department_en = ${department_en}, department_ar = ${department_ar}, 
        location_en = ${location_en}, location_ar = ${location_ar}, 
        type_en = ${type_en}, type_ar = ${type_ar}
      WHERE id = ${id} RETURNING *`;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}
