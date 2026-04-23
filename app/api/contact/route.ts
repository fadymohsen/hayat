import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_EMAIL || "Info@saudihayat.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "Hayat Contact <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const { name, email, phone, service, subject, message } = await req.json();

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: rtl;">
          <h2 style="color: #b8860b; border-bottom: 2px solid #b8860b; padding-bottom: 10px;">رسالة جديدة من نموذج التواصل</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #555; width: 130px;">الاسم:</td>
              <td style="padding: 12px;">${name}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 12px; font-weight: bold; color: #555;">البريد الإلكتروني:</td>
              <td style="padding: 12px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #555;">الهاتف:</td>
              <td style="padding: 12px;" dir="ltr">${phone}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 12px; font-weight: bold; color: #555;">الخدمة:</td>
              <td style="padding: 12px;">${service || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #555;">الموضوع:</td>
              <td style="padding: 12px;">${subject}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 12px; font-weight: bold; color: #555;">الرسالة:</td>
              <td style="padding: 12px; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send", details: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
