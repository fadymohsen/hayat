"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Briefcase,
  Megaphone,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/components/LanguageProvider";


export default function ServicesPage() {
  const { t, locale } = useLanguage();

  const services = [
    {
      icon: Building2,
      title: t.services.development.title,
      description: t.services.development.description,
      bullets:
        locale === "ar"
          ? [
              "مشاريع سكنية متكاملة",
              "تطوير مجمعات تجارية",
              "تنفيذ وفق أعلى المعايير",
              "إدارة كاملة لدورة المشروع",
            ]
          : [
              "Integrated residential projects",
              "Commercial complex development",
              "Execution to the highest standards",
              "End-to-end project lifecycle",
            ],
    },
    {
      icon: Briefcase,
      title: t.services.management.title,
      description: t.services.management.description,
      bullets:
        locale === "ar"
          ? [
              "إدارة احترافية للأصول",
              "صيانة دورية ووقائية",
              "تحصيل الإيجارات وإدارة العقود",
              "تقارير أداء شفافة",
            ]
          : [
              "Professional asset management",
              "Routine & preventive maintenance",
              "Rent collection & contracts",
              "Transparent performance reports",
            ],
    },
    {
      icon: Megaphone,
      title: t.services.marketing.title,
      description: t.services.marketing.description,
      bullets:
        locale === "ar"
          ? [
              "تسويق رقمي متكامل",
              "تسويق داخلي ومعارض",
              "حملات مستهدفة",
              "استراتيجيات مبيعات",
            ]
          : [
              "Integrated digital marketing",
              "On-site showrooms & events",
              "Targeted campaigns",
              "Sales strategies",
            ],
    },
    {
      icon: Lightbulb,
      title: t.services.consulting.title,
      description: t.services.consulting.description,
      bullets:
        locale === "ar"
          ? [
              "دراسات جدوى شاملة",
              "تحليل السوق العقاري",
              "توصيات استثمارية",
              "تقييمات عقارية دقيقة",
            ]
          : [
              "Comprehensive feasibility studies",
              "Real estate market analysis",
              "Investment recommendations",
              "Accurate property valuations",
            ],
    },
  ];

  return (
    <>
      
      <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900 sm:py-28">
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="absolute inset-0 bg-radial-gold" aria-hidden />
        <div className="relative mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
            {t.servicesPage.title}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-white dark:text-slate-400 sm:text-lg">
            {t.servicesPage.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-maad-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-10"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-maad-50 to-maad-100 text-maad-600 transition group-hover:from-maad-500 group-hover:to-maad-600 group-hover:text-white dark:from-slate-800 dark:to-slate-800 dark:text-maad-400">
                    <s.icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white dark:text-slate-400 sm:text-base">
                      {s.description}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-slate-700 dark:text-white dark:text-slate-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-maad-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="absolute -end-12 -top-12 h-48 w-48 rounded-full bg-maad-50 opacity-0 blur-3xl transition group-hover:opacity-80 dark:bg-maad-900/20" />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg">
              <Link href={`/${locale}/contact`}>
                {t.common.requestConsultation}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
