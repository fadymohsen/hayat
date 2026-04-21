import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "اتصل بنا | حياة السعودية" : "Contact Us | Hayat Saudi",
    description: isAr
      ? "تواصل مع حياة السعودية للاستشارات العقارية والشراكات والاستفسارات."
      : "Get in touch with Hayat Saudi for real estate consultations, partnerships, and inquiries.",
    openGraph: {
      title: isAr ? "اتصل بنا | حياة السعودية" : "Contact Us | Hayat Saudi",
      images: [{ url: "/logo/logo.jpeg", width: 1200, height: 630 }],
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
