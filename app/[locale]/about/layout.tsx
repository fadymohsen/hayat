import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "من نحن | حياة السعودية" : "About Us | Hayat Saudi",
    description: isAr
      ? "تعرّف على شركة حياة السعودية للاستثمار والتطوير العقاري — رؤيتنا ورسالتنا وقيمنا."
      : "Learn about Hayat Saudi Investment & Real Estate Development — our vision, mission, and values.",
    openGraph: {
      title: isAr ? "من نحن | حياة السعودية" : "About Us | Hayat Saudi",
      images: [{ url: "/logo/logo.jpeg", width: 1200, height: 630 }],
    },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
