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


import { useState, useEffect } from "react";
import { Service } from "@/lib/db";
import * as Icons from "lucide-react";

export default function ServicesPage() {
  const { t, locale } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch('/api/services').then(res => res.json()).then(data => setServices(data));
  }, []);


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
            {services.map((s, i) => {
              const Icon = (Icons as any)[s.icon_name] || Icons.Wrench;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-maad-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-10"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-maad-50 to-maad-100 text-maad-600 transition group-hover:from-maad-500 group-hover:to-maad-600 group-hover:text-white dark:from-slate-800 dark:to-slate-800 dark:text-maad-400">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                        {locale === "ar" ? s.title_ar : s.title_en}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white dark:text-slate-400 sm:text-base">
                        {locale === "ar" ? s.description_ar : s.description_en}
                      </p>
                    </div>
                  </div>

                  <div className="absolute -end-12 -top-12 h-48 w-48 rounded-full bg-maad-50 opacity-0 blur-3xl transition group-hover:opacity-80 dark:bg-maad-900/20" />
                </motion.div>
              );
            })}
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
