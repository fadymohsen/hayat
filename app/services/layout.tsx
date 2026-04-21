import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services — خدماتنا | Hayat Saudi — حياة السعودية",
  description:
    "Integrated real estate services: development, property management, marketing, and consulting. | خدمات عقارية متكاملة: التطوير العقاري، إدارة الأملاك، التسويق العقاري، والاستشارات.",
  openGraph: {
    title: "Our Services — خدماتنا | Hayat Saudi — حياة السعودية",
    description:
      "Real estate development, property management, marketing & consulting. | التطوير العقاري، إدارة الأملاك، التسويق والاستشارات.",
    images: [{ url: "/logo/logo.jpeg", width: 1200, height: 630 }],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
