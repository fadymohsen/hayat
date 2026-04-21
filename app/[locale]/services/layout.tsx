import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "خدماتنا | حياة السعودية" : "Our Services | Hayat Saudi",
    description: isAr
      ? "خدمات عقارية متكاملة: التطوير العقاري، إدارة الأملاك، التسويق العقاري، والاستشارات."
      : "Integrated real estate services: development, property management, marketing, and consulting.",
    openGraph: {
      title: isAr ? "خدماتنا | حياة السعودية" : "Our Services | Hayat Saudi",
      images: [{ url: "/logo/logo.jpeg", width: 1200, height: 630 }],
    },
  };
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
