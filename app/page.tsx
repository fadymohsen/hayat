"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Briefcase,
  Megaphone,
  Lightbulb,
  Users,
  Wrench,
  CalendarCheck,
  LayoutGrid,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCounter } from "@/components/StatCounter";
import { GalleryGrid, galleryItems } from "@/components/GalleryGrid";
import { useLanguage } from "@/components/LanguageProvider";

export default function HomePage() {
  const { t, locale } = useLanguage();

  const services = [
    {
      icon: Building2,
      title: t.services.development.title,
      description: t.services.development.description,
    },
    {
      icon: Briefcase,
      title: t.services.management.title,
      description: t.services.management.description,
    },
    {
      icon: Megaphone,
      title: t.services.marketing.title,
      description: t.services.marketing.description,
    },
    {
      icon: Lightbulb,
      title: t.services.consulting.title,
      description: t.services.consulting.description,
    },
  ];

  const stats = [
    { icon: CalendarCheck, value: 11, label: t.stats.years },
    { icon: LayoutGrid, value: 20, label: t.stats.projects },
    { icon: Users, value: 100, label: t.stats.manpower },
    { icon: Wrench, value: 50, label: t.stats.equipment },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <div className="absolute inset-0 bg-radial-gold" aria-hidden />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:flex-row lg:py-32 lg:px-8">
          <div className="flex-1 space-y-7 text-center lg:text-start">
            {/* Removed Hero Eyebrow shape */}

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-6xl"
            >
              {t.home.heroTitle.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="gold-text">
                {t.home.heroTitle.split(" ").slice(-2).join(" ")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 dark:text-white dark:text-white sm:text-lg lg:mx-0"
            >
              {t.home.heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <Button asChild size="lg">
                <Link href="/gallery">
                  {t.common.exploreGallery}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200">
                <Link href="/contact">{t.common.getInTouch}</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4 lg:justify-start"
            >
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-white dark:text-slate-400">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-maad-50 text-maad-600 dark:bg-slate-900 dark:text-maad-400">
                  <Phone className="h-4 w-4" />
                </span>
                <div className="flex flex-col text-start">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white dark:text-slate-500 dark:text-white">
                    {t.common.callNow}
                  </span>
                  <a
                    href="tel:0114741991"
                    dir="ltr"
                    className="text-sm font-bold text-slate-800 transition hover:text-maad-600 dark:text-slate-200 dark:hover:text-maad-500"
                  >
                    0114741991
                  </a>
                </div>
              </div>
              <span className="hidden h-10 w-px bg-slate-200 dark:bg-slate-800 sm:block" />
              <div className="text-xs text-slate-500 dark:text-white dark:text-slate-400">
                <div className="text-[10px] uppercase tracking-wider">
                  {t.footer.iso}
                </div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  {t.footer.vision}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex-1 w-full shrink-0"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-2xl ring-1 ring-slate-200 dark:ring-slate-800">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="MAAD featured project"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
              <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur dark:bg-slate-900/95">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-maad-50 text-maad-600 dark:bg-slate-800 dark:text-maad-400">
                    <Building2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-maad-600">
                      MAAD · معاد
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {locale === "ar"
                        ? "مشاريع سكنية وتجارية راقية"
                        : "Premium Residential & Commercial"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -end-4 -top-4 hidden h-24 w-24 rounded-3xl bg-gold-gradient opacity-90 shadow-xl lg:block dark:opacity-50" />
            <div className="absolute -start-6 -bottom-6 hidden h-32 w-32 rounded-full border-[3px] border-maad-200 lg:block dark:border-maad-900/50" />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative border-y border-slate-100 bg-white py-20 dark:border-slate-800 dark:bg-slate-950/50 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.home.statsTitle}
            subtitle={t.home.statsSubtitle}
          />
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-maad-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-maad-50 text-maad-600 transition group-hover:bg-maad-500 group-hover:text-white dark:bg-slate-800 dark:text-maad-400">
                  <s.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
                  <StatCounter to={s.value} />
                </div>
                <p className="mt-2 text-sm font-medium text-slate-600 dark:text-white dark:text-slate-400 sm:text-base">
                  {s.label}
                </p>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gold-gradient opacity-0 transition group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative bg-white py-20 dark:bg-slate-950 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.home.servicesTitle}
            subtitle={t.home.servicesSubtitle}
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-maad-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-maad-50 to-maad-100 text-maad-600 transition group-hover:from-maad-500 group-hover:to-maad-600 group-hover:text-white dark:from-slate-800 dark:to-slate-800 dark:text-maad-400">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-white dark:text-slate-400">
                  {s.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-maad-600 transition group-hover:gap-2.5 dark:text-maad-500">
                  <Link href="/services">{t.common.learnMore}</Link>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </div>
                <div className="absolute -end-8 -top-8 h-32 w-32 rounded-full bg-maad-50 opacity-0 blur-2xl transition group-hover:opacity-80 dark:bg-maad-900/20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="relative bg-white py-20 dark:bg-slate-950/50 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end md:text-start">
            <div className="max-w-2xl text-center md:text-start">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
                {t.home.galleryTitle}
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-white dark:text-slate-400 sm:text-lg">
                {t.home.gallerySubtitle}
              </p>
            </div>
          </div>

          <div className="mt-14">
            <GalleryGrid
              items={galleryItems.slice(0, 6)}
              locale={locale}
            />
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" className="shrink-0 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200">
              <Link href="/gallery">
                {t.common.viewAll}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-10 sm:p-16 text-center shadow-2xl dark:bg-slate-900 dark:ring-1 dark:ring-slate-800">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, #CAA048 0%, transparent 40%), radial-gradient(circle at 80% 80%, #CAA048 0%, transparent 40%)",
              }}
              aria-hidden
            />
            <div className="relative mx-auto max-w-3xl">
              <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                {t.home.ctaTitle}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                {t.home.ctaSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact">
                    {t.common.requestConsultation}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/30 text-white hover:bg-white hover:text-slate-900"
                >
                  <a href="tel:0114741991" dir="ltr">
                    <Phone className="h-4 w-4" />
                    0114741991
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
