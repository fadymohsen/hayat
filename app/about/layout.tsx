import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — من نحن | Hayat Saudi — حياة السعودية",
  description:
    "Learn about Hayat Saudi Investment & Real Estate Development — our vision, mission, and values. | تعرّف على شركة حياة السعودية للاستثمار والتطوير العقاري — رؤيتنا ورسالتنا وقيمنا.",
  openGraph: {
    title: "About Us — من نحن | Hayat Saudi — حياة السعودية",
    description:
      "Our vision, mission, and core values driving real estate excellence. | رؤيتنا ورسالتنا وقيمنا الجوهرية في التميّز العقاري.",
    images: [{ url: "/logo/logo.jpeg", width: 1200, height: 630 }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
