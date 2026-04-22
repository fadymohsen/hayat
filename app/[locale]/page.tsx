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
  ChevronDown,
  MapPin,
  Award,
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
    { icon: CalendarCheck, value: 11, label: t.stats.years, suffix: "+" },
    { icon: LayoutGrid, value: 20, label: t.stats.projects, suffix: "+" },
    { icon: Users, value: 100, label: t.stats.manpower, suffix: "+" },
    { icon: Wrench, value: 50, label: t.stats.equipment, suffix: "+" },
  ];

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Ken Burns Background */}
        <div className="absolute inset-0 animate-kenburns">
          <Image
            src="/hero-bg.jpg"
            alt="Hayat Real Estate"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

        {/* Side Accent Line */}
        <div className="absolute start-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-maad-400/50 to-transparent hidden lg:block" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-28 pb-40 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white/90 backdrop-blur-md"
          >
            <MapPin className="h-3.5 w-3.5 text-maad-300" />
            {locale === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Kingdom of Saudi Arabia"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {t.home.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg md:text-xl"
          >
            {t.home.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="text-base px-8 py-3 shadow-lg shadow-maad-500/25">
              <Link href={`/${locale}/gallery`}>
                {t.common.exploreGallery}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base px-8 py-3 border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white hover:text-slate-900"
            >
              <Link href={`/${locale}/contact`}>{t.common.getInTouch}</Link>
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-white/50">
            {t.home.scrollDown}
          </span>
          <ChevronDown className="h-5 w-5 text-white/50 animate-scroll-bounce" />
        </motion.div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="relative z-20 -mt-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-slate-200 shadow-2xl dark:bg-slate-700 sm:grid-cols-4"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center bg-white px-6 py-8 dark:bg-slate-900 sm:py-10"
              >
                <stat.icon className="mb-3 h-6 w-6 text-maad-500" />
                <span className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                  <StatCounter to={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── ABOUT PREVIEW ─── */}
      <section className="relative bg-white py-24 dark:bg-slate-950 sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: locale === "ar" ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/projects/project-3.jpeg"
                  alt={t.home.aboutTitle}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-6 end-6 flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-xl ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maad-50 dark:bg-maad-900/30">
                  <Award className="h-6 w-6 text-maad-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">ISO 45001:2018</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.footer.iso}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, x: locale === "ar" ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-maad-500">
                {locale === "ar" ? "من نحن" : "Who We Are"}
              </p>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
                {t.home.aboutTitle}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
                {t.home.aboutText}
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="dark:bg-maad-500 dark:text-white dark:hover:bg-maad-400">
                  <Link href={`/${locale}/about`}>
                    {t.home.aboutCta}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="relative bg-slate-50 py-24 dark:bg-slate-900/50 sm:py-32">
        <div className="absolute inset-0 bg-grid" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.home.servicesTitle}
            subtitle={t.home.servicesSubtitle}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800"
              >
                {/* Top accent bar */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gold-gradient scale-x-0 transition-transform duration-500 origin-start group-hover:scale-x-100" />

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-maad-50 text-maad-600 transition-all duration-500 group-hover:bg-maad-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-maad-500/25 dark:bg-slate-700 dark:text-maad-400 dark:group-hover:bg-maad-500 dark:group-hover:text-white">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {s.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-maad-600 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:gap-2.5 dark:text-maad-400">
                  <Link href={`/${locale}/services`}>{t.common.learnMore}</Link>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section className="relative bg-white py-24 dark:bg-slate-950 sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end md:text-start">
            <div className="max-w-2xl text-center md:text-start">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-maad-500">
                {locale === "ar" ? "أعمالنا" : "Our Work"}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
                {t.home.galleryTitle}
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-400 sm:text-lg">
                {t.home.gallerySubtitle}
              </p>
            </div>
            <Button asChild variant="outline" size="lg" className="shrink-0 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200">
              <Link href={`/${locale}/gallery`}>
                {t.common.viewAll}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
          </div>

          <div className="mt-14">
            <GalleryGrid
              items={galleryItems.slice(0, 6)}
              locale={locale}
            />
          </div>
        </div>
      </section>

      {/* ─── PARTNERS ─── */}
      <Partners />

    </>
  );
}
