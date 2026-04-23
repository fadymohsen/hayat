"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

const partners = [
  {
    name: "Partner 1",
    logo: "/Partners/Gemini_Generated_Image_8fpph78fpph78fpp-removebg-preview.png",
  },
  {
    name: "Partner 2",
    logo: "/Partners/Gemini_Generated_Image_wvoysiwvoysiwvoy-removebg-preview.png",
  },
];

import { useState, useEffect } from "react";
import { Partner } from "@/lib/db";

export function PartnersGrid() {
  const { locale } = useLanguage();
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    fetch('/api/partners').then(res => res.json()).then(data => {
      setPartners(data.filter((p: Partner) => p.type === 'strategic'));
    });
  }, []);

  if (partners.length === 0) return null;

  return (
    <section className="bg-white py-24 dark:bg-slate-950 sm:py-32 border-t border-slate-100 dark:border-slate-900">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-maad-600 dark:text-maad-500">
            {locale === "ar" ? "شركاؤنا" : "Our Partners"}
          </p>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl">
            {locale === "ar" ? "شركاء النجاح" : "Strategic Partners"}
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex h-32 w-48 items-center justify-center rounded-[2rem] bg-slate-50 p-8 ring-1 ring-slate-100 transition hover:shadow-xl hover:ring-maad-200 dark:bg-slate-900 dark:ring-slate-800 dark:hover:ring-maad-500/30 sm:h-40 sm:w-64"
            >
              <Image
                src={partner.image_url}
                alt={partner.name}
                width={220}
                height={110}
                className="max-h-20 w-auto object-contain sm:max-h-28 transition-transform hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
