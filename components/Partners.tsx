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

const clients = [
  {
    name: "MSC",
    nameAr: "MSC",
    logo: "/clients/msc.png",
  },
  {
    name: "Alshaya Enterprises",
    nameAr: "الشايع للمشاريع",
    logo: "/clients/alshaya.png",
  },
  {
    name: "The Coffee Address",
    nameAr: "عنوان القهوة",
    logo: "/clients/coffee-address.png",
  },
  {
    name: "Gloria & Mourouj Gloria Hotels & Resorts",
    nameAr: "فنادق ومنتجعات غلوريا والمروج غلوريا",
    logo: "/clients/gloria.png",
  },
];

export function Partners() {
  const { locale } = useLanguage();

  const allLogos = [...partners, ...clients];

  return (
    <section className="relative bg-slate-50 py-20 dark:bg-slate-900/50 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-maad-500">
            {locale === "ar" ? "شركاؤنا وعملاؤنا" : "Our Partners & Clients"}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {locale === "ar"
              ? "نفخر بالتعاون مع نخبة من الشركات الرائدة"
              : "Proud to Collaborate with Industry Leaders"}
          </h2>
        </motion.div>

        {/* Logo Grid */}
        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {allLogos.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex h-28 w-full items-center justify-center rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:shadow-lg hover:ring-maad-200 dark:bg-slate-800 dark:ring-slate-700 dark:hover:ring-maad-700 sm:h-32">
                <Image
                  src={item.logo}
                  alt={locale === "ar" ? item.nameAr : item.name}
                  width={160}
                  height={100}
                  className="max-h-20 w-auto object-contain grayscale transition hover:grayscale-0 sm:max-h-24"
                />
              </div>
              <p className="text-center text-xs font-medium text-slate-500 dark:text-slate-400">
                {locale === "ar" ? item.nameAr : item.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
