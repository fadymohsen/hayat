"use client";

import { useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

const pageMeta: Record<string, { en: { title: string; description: string }; ar: { title: string; description: string } }> = {
  "/": {
    en: {
      title: "Hayat Saudi | Real Estate Development & Investment",
      description: "A leading Saudi developer shaping residential, commercial, and investment projects with over 11 years of expertise aligned with Vision 2030.",
    },
    ar: {
      title: "حياة السعودية | استثمار وتطوير عقاري",
      description: "شركة رائدة في تطوير المشاريع السكنية والتجارية والاستثمارية، تجمع بين خبرة تزيد عن ١١ عامًا وجودة عالمية تواكب رؤية المملكة ٢٠٣٠.",
    },
  },
  "/about": {
    en: {
      title: "About Us | Hayat Saudi",
      description: "Learn about Hayat Saudi Investment & Real Estate Development — our vision, mission, and values.",
    },
    ar: {
      title: "من نحن | حياة السعودية",
      description: "تعرّف على شركة حياة السعودية للاستثمار والتطوير العقاري — رؤيتنا ورسالتنا وقيمنا.",
    },
  },
  "/services": {
    en: {
      title: "Our Services | Hayat Saudi",
      description: "Integrated real estate services: development, property management, marketing, and consulting.",
    },
    ar: {
      title: "خدماتنا | حياة السعودية",
      description: "خدمات عقارية متكاملة: التطوير العقاري، إدارة الأملاك، التسويق العقاري، والاستشارات.",
    },
  },
  "/gallery": {
    en: {
      title: "Gallery | Hayat Saudi",
      description: "Explore our portfolio of residential, commercial, and investment projects.",
    },
    ar: {
      title: "معرض الأعمال | حياة السعودية",
      description: "تصفّح معرض أعمالنا من المشاريع السكنية والتجارية والاستثمارية.",
    },
  },
  "/faqs": {
    en: {
      title: "FAQs | Hayat Saudi",
      description: "Frequently asked questions about our real estate services, projects, and partnerships.",
    },
    ar: {
      title: "الأسئلة الشائعة | حياة السعودية",
      description: "الأسئلة الشائعة حول خدماتنا العقارية ومشاريعنا وشراكاتنا.",
    },
  },
  "/contact": {
    en: {
      title: "Contact Us | Hayat Saudi",
      description: "Get in touch with Hayat Saudi for real estate consultations, partnerships, and inquiries.",
    },
    ar: {
      title: "اتصل بنا | حياة السعودية",
      description: "تواصل مع حياة السعودية للاستشارات العقارية والشراكات والاستفسارات.",
    },
  },
};

export function DynamicMeta({ path }: { path: string }) {
  const { locale } = useLanguage();

  useEffect(() => {
    const meta = pageMeta[path]?.[locale];
    if (!meta) return;

    document.title = meta.title;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute("content", meta.description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", meta.description);
  }, [locale, path]);

  return null;
}
