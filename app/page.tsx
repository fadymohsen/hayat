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
import { Partners } from "@/components/Partners";

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/hero-bg.jpg"
          alt="Hayat Real Estate"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pt-28 pb-32 text-center sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-maad-300"
          >
            {locale === "ar"
              ? "حياة السعودية للاستثمار والتطوير العقاري"
              : "Saudi Hayat Real Estate Company"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t.home.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl"
          >
            {t.home.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="text-base px-8 py-3">
              <Link href="/gallery">
                {t.common.exploreGallery}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base px-8 py-3 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-slate-900"
            >
              <Link href="/contact">{t.common.getInTouch}</Link>
            </Button>
          </motion.div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="absolute inset-x-0 bottom-4 z-10 sm:bottom-6"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 rtl:divide-x-reverse rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
              {stats.map((s, i) => (
                <div key={s.label} className="flex flex-col items-center gap-1 py-5 px-4 sm:py-6">
                  <s.icon className="h-5 w-5 text-maad-300 mb-1" />
                  <span className="text-2xl font-extrabold text-white sm:text-3xl">
                    <StatCounter to={s.value} />
                  </span>
                  <span className="text-xs font-medium text-white/60 sm:text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
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

      {/* PARTNERS */}
      <Partners />

      {/* CTA */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-10 sm:p-16 text-center shadow-2xl dark:bg-slate-900 dark:ring-1 dark:ring-slate-800">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, #8B8B3E 0%, transparent 40%), radial-gradient(circle at 80% 80%, #8B8B3E 0%, transparent 40%)",
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
