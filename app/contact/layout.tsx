import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — اتصل بنا | Hayat Saudi — حياة السعودية",
  description:
    "Get in touch with Hayat Saudi for real estate consultations, partnerships, and inquiries. | تواصل مع حياة السعودية للاستشارات العقارية والشراكات والاستفسارات.",
  openGraph: {
    title: "Contact Us — اتصل بنا | Hayat Saudi — حياة السعودية",
    description:
      "Reach out for consultations and inquiries. | تواصل معنا للاستشارات والاستفسارات.",
    images: [{ url: "/logo/logo.jpeg", width: 1200, height: 630 }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
