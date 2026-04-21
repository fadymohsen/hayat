import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — معرض الأعمال | Hayat Saudi — حياة السعودية",
  description:
    "Explore our portfolio of residential, commercial, and investment projects. | تصفّح معرض أعمالنا من المشاريع السكنية والتجارية والاستثمارية.",
  openGraph: {
    title: "Gallery — معرض الأعمال | Hayat Saudi — حياة السعودية",
    description:
      "A curated selection of our most notable real estate projects. | مختارات من أبرز مشاريعنا العقارية.",
    images: [{ url: "/logo/logo.jpeg", width: 1200, height: 630 }],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
