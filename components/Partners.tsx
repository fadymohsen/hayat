"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

const partners = [
  {
    name: "Saudi Al-Terais Trading & Industrial Contracting Co. Ltd",
    nameAr: "شركة الطريس السعودية للتجارة والمقاولات الصناعية المحدودة",
    logo: "/partners/al-terais.png",
  },
  {
    name: "JAL Development Co. Ltd",
    nameAr: "شركة جال التنمية",
    logo: "/partners/jal.png",
  },
];

export function Partners() {
  const { locale } = useLanguage();

  // Duplicate for seamless marquee effect
  const marqueeItems = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900/50 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-maad-500">
            {locale === "ar" ? "شركاؤنا" : "Our Partners"}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {locale === "ar"
              ? "نفخر بالتعاون مع نخبة من الشركات الرائدة"
              : "Proud to Collaborate with Industry Leaders"}
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative mt-14">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40" style={{ background: "linear-gradient(to right, rgb(248 250 252), transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40" style={{ background: "linear-gradient(to left, rgb(248 250 252), transparent)" }} />

        <div className="flex animate-marquee w-max gap-16 px-8">
          {marqueeItems.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex flex-col items-center gap-3 px-4"
            >
              <div className="flex h-28 w-44 items-center justify-center rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md dark:bg-slate-800 dark:ring-slate-700 sm:h-32 sm:w-52">
                <Image
                  src={partner.logo}
                  alt={locale === "ar" ? partner.nameAr : partner.name}
                  width={160}
                  height={100}
                  className="max-h-20 w-auto object-contain grayscale transition hover:grayscale-0 sm:max-h-24"
                />
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {locale === "ar" ? partner.nameAr : partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
