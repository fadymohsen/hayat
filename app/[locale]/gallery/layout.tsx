import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "معرض الأعمال | حياة السعودية" : "Gallery | Hayat Saudi",
    description: isAr
      ? "تصفّح معرض أعمالنا من المشاريع السكنية والتجارية والاستثمارية."
      : "Explore our portfolio of residential, commercial, and investment projects.",
    openGraph: {
      title: isAr ? "معرض الأعمال | حياة السعودية" : "Gallery | Hayat Saudi",
      images: [{ url: "/logo/logo.jpeg", width: 1200, height: 630 }],
    },
  };
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
