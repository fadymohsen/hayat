import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await sql`SELECT * FROM partners ORDER BY created_at DESC`;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Partners GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, image_url, type } = await request.json();
    const result = await sql`
      INSERT INTO partners (name, image_url, type)
      VALUES (${name}, ${image_url}, ${type})
      RETURNING *
    `;
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Partners POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, image_url, type } = await request.json();
    const result = await sql`
      UPDATE partners
      SET name = ${name}, image_url = ${image_url}, type = ${type}
      WHERE id = ${id}
      RETURNING *
    `;
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Partners PUT Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await sql`DELETE FROM partners WHERE id = ${parseInt(id)}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Partners DELETE Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
