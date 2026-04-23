import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await sql`SELECT * FROM settings`;
    // Convert array of {key, value} to an object
    const settings = data.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Settings GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    // Body is an object of {key: value}
    for (const [key, value] of Object.entries(body)) {
      await sql`
        INSERT INTO settings (key, value)
        VALUES (${key}, ${value as string})
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
      `;
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Settings PUT Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
