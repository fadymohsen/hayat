import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs — الأسئلة الشائعة | Hayat Saudi — حياة السعودية",
  description:
    "Frequently asked questions about our real estate services, projects, and partnerships. | الأسئلة الشائعة حول خدماتنا العقارية ومشاريعنا وشراكاتنا.",
  openGraph: {
    title: "FAQs — الأسئلة الشائعة | Hayat Saudi — حياة السعودية",
    description:
      "Key questions about our services and projects. | أبرز التساؤلات حول خدماتنا ومشاريعنا.",
    images: [{ url: "/logo/logo.jpeg", width: 1200, height: 630 }],
  },
};

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
