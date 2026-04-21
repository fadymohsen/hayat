"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
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
  const { t, locale } = useLanguage();

  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-950/50 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={locale === "ar" ? "شركاؤنا" : "Our Partners"}
          subtitle={
            locale === "ar"
              ? "نفخر بالتعاون مع نخبة من الشركات الرائدة في قطاعات متعددة."
              : "We are proud to collaborate with leading companies across various sectors."
          }
        />
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col items-center gap-4"
            >
              <div className="flex h-32 w-48 items-center justify-center p-4 sm:h-40 sm:w-56">
                <Image
                  src={partner.logo}
                  alt={locale === "ar" ? partner.nameAr : partner.name}
                  width={180}
                  height={120}
                  className="max-h-24 w-auto object-contain sm:max-h-28"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
