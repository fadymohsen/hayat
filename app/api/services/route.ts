import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await sql`SELECT * FROM services ORDER BY created_at ASC`;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Services GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title_en, title_ar, description_en, description_ar, icon_name } = await request.json();
    const result = await sql`
      INSERT INTO services (title_en, title_ar, description_en, description_ar, icon_name)
      VALUES (${title_en}, ${title_ar}, ${description_en}, ${description_ar}, ${icon_name})
      RETURNING *
    `;
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Services POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title_en, title_ar, description_en, description_ar, icon_name } = await request.json();
    const result = await sql`
      UPDATE services
      SET title_en = ${title_en}, title_ar = ${title_ar}, 
          description_en = ${description_en}, description_ar = ${description_ar}, 
          icon_name = ${icon_name}
      WHERE id = ${id}
      RETURNING *
    `;
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Services PUT Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await sql`DELETE FROM services WHERE id = ${parseInt(id)}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Services DELETE Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
