import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, jobTitle } = await req.json();

    if (!name || !phone || !email || !jobTitle) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const { data, error: sendError } = await resend.emails.send({
      from: "Hayat Careers <onboarding@resend.dev>",
      to: "Info@saudihayat.com",
      replyTo: email,
      subject: `New Job Application: ${jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: rtl;">
          <h2 style="color: #b8860b; border-bottom: 2px solid #b8860b; padding-bottom: 10px;">طلب توظيف جديد</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #555; width: 130px;">الوظيفة:</td>
              <td style="padding: 12px;">${jobTitle}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 12px; font-weight: bold; color: #555;">الاسم:</td>
              <td style="padding: 12px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #555;">الهاتف:</td>
              <td style="padding: 12px;" dir="ltr">${phone}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 12px; font-weight: bold; color: #555;">البريد الإلكتروني:</td>
              <td style="padding: 12px;">${email}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      return NextResponse.json({ error: "Failed to send", details: sendError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Apply error:", error);
    return NextResponse.json({ error: "Failed to send application" }, { status: 500 });
  }
}
