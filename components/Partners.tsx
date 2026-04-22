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
    name: "UNIMAC",
    nameAr: "يونيماك",
    logo: "/clients/client-1.jpeg",
  },
  {
    name: "MSC",
    nameAr: "MSC",
    logo: "/clients/client-2.jpeg",
  },
  {
    name: "Alshaya Enterprises",
    nameAr: "الشايع للمشاريع",
    logo: "/clients/client-3.jpeg",
  },
  {
    name: "The Coffee Address",
    nameAr: "عنوان القهوة",
    logo: "/clients/client-4.jpeg",
  },
  {
    name: "Gloria & Mourouj Gloria Hotels & Resorts",
    nameAr: "فنادق ومنتجعات غلوريا والمروج غلوريا",
    logo: "/clients/client-5.jpeg",
  },
];

function LogoGrid({ items, delay = 0 }: { items: typeof partners; delay?: number }) {
  const { locale } = useLanguage();

  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
      {items.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: delay + i * 0.08 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex h-24 w-40 items-center justify-center rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition hover:shadow-lg hover:ring-maad-200 dark:bg-slate-800 dark:ring-slate-700 dark:hover:ring-maad-700 sm:h-28 sm:w-48">
            <Image
              src={item.logo}
              alt={locale === "ar" ? item.nameAr : item.name}
              width={150}
              height={90}
              className="max-h-16 w-auto object-contain grayscale transition hover:grayscale-0 sm:max-h-20"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function Partners() {
  const { locale } = useLanguage();

  return (
    <>
      {/* ─── CLIENTS ─── */}
      <section className="relative bg-white py-20 dark:bg-slate-950 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-maad-500">
              {locale === "ar" ? "عملاؤنا" : "Our Clients"}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {locale === "ar"
                ? "ثقة عملائنا هي أعظم إنجازاتنا"
                : "Our Clients' Trust Is Our Greatest Achievement"}
            </h2>
          </motion.div>
          <LogoGrid items={clients} />
        </div>
      </section>

      {/* ─── PARTNERS ─── */}
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
              {locale === "ar" ? "شركاؤنا" : "Our Partners"}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {locale === "ar"
                ? "نفخر بالتعاون مع نخبة من الشركات الرائدة"
                : "Proud to Collaborate with Industry Leaders"}
            </h2>
          </motion.div>
          <LogoGrid items={partners} delay={0.2} />
        </div>
      </section>
    </>
  );
}
