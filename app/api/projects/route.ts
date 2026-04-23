import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const projects = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
    console.log(`API: Fetched ${projects.length} projects`);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title_en, title_ar, location_en, location_ar, image_url, type } = body;

    const result = await sql`
      INSERT INTO projects (title_en, title_ar, location_en, location_ar, image_url, type) 
      VALUES (${title_en}, ${title_ar}, ${location_en}, ${location_ar}, ${image_url}, ${type || 'normal'}) 
      RETURNING *`;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await sql`DELETE FROM projects WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title_en, title_ar, location_en, location_ar, image_url, type } = body;

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const result = await sql`
      UPDATE projects SET 
        title_en = ${title_en}, title_ar = ${title_ar}, 
        location_en = ${location_en}, location_ar = ${location_ar}, 
        image_url = ${image_url}, type = ${type || 'normal'} 
      WHERE id = ${id} RETURNING *`;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}
