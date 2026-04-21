import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "الأسئلة الشائعة | حياة السعودية" : "FAQs | Hayat Saudi",
    description: isAr
      ? "الأسئلة الشائعة حول خدماتنا العقارية ومشاريعنا وشراكاتنا."
      : "Frequently asked questions about our real estate services, projects, and partnerships.",
    openGraph: {
      title: isAr ? "الأسئلة الشائعة | حياة السعودية" : "FAQs | Hayat Saudi",
      images: [{ url: "/logo/logo.jpeg", width: 1200, height: 630 }],
    },
  };
}

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
