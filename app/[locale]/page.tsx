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
  MapPin,
  ChevronDown,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCounter } from "@/components/StatCounter";
import { GalleryGrid, galleryItems } from "@/components/GalleryGrid";
import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";
import { Partners } from "@/components/Partners";
import { PartnersGrid } from "@/components/PartnersGrid";

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
      
      {/* 100vh VIDEO HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="/hero-poster.png"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/hero/Cinematic_Riyadh_Real_Estate_Promo.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-950/90" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8 pt-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {locale === "ar" ? (
              <span className="flex flex-col gap-2 sm:gap-4">
                <span>نبني الغد،</span>
                <span className="text-transparent bg-clip-text bg-gold-gradient py-2">لكل الأجيال.</span>
              </span>
            ) : (
              <span className="flex flex-col gap-2 sm:gap-4">
                <span>Building Tomorrow,</span>
                <span className="text-transparent bg-clip-text bg-gold-gradient py-2">For Every Generation.</span>
              </span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl"
          >
            {locale === "ar" 
              ? "رؤية تستشرف المستقبل، ومساحات مصممة بعناية لتناسب جميع الأعمار. بيئة عقارية راقية تندمج مع احتياجات العائلة بالكامل لبناء حياة سعيدة ومستدامة."
              : "Visionary planning predicting optimal futures. Spaces tailored for all generations—providing a premium real estate environment embracing the entire family for a happy, sustainable life."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="text-base px-10 py-4 bg-maad-600 hover:bg-maad-700 text-white shadow-xl shadow-maad-500/20 rounded-full"
            >
              <Link href={`/${locale}/contact`}>{t.common.getInTouch}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="relative z-20 bg-white py-16 dark:bg-slate-950 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-px overflow-hidden rounded-[2.5rem] bg-slate-200 shadow-2xl dark:bg-slate-800 sm:grid-cols-2 lg:grid-cols-4 ring-1 ring-slate-200 dark:ring-white/10"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center bg-slate-50 px-6 py-12 dark:bg-slate-900 sm:py-16 transition-all duration-300 hover:bg-white dark:hover:bg-slate-800/40 group"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-maad-50 text-maad-600 transition-transform dark:bg-white/5 dark:text-maad-400 group-hover:scale-110 group-hover:rotate-3">
                  <stat.icon className="h-8 w-8" />
                </div>
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gold-gradient sm:text-6xl">
                  <StatCounter to={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-4 text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ACTIVE DEVELOPMENT: HAYAT TOWER */}
      <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900/50 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
            
            {/* Left Column: Text */}
            <div className="flex-1 w-full max-w-2xl lg:max-w-none">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
                <span className="block text-maad-600 dark:text-maad-500 mb-2 font-medium text-lg md:text-xl tracking-wider uppercase">
                  {locale === "ar" ? "تطوير نشط" : "Active Development"}
                </span>
                {locale === "ar" ? "برج الحياة" : "Hayat Tower"}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
                {locale === "ar" 
                  ? "يجسد برج الحياة التزامنا بالتميز. مشروع قيد الإنشاء حالياً، مصمم بأحدث المعايير الهندسية ليكون أيقونة معمارية تجمع بين الفخامة والعملية، ويخدم تطلعات المستقبل في قلب العاصمة."
                  : "Hayat Tower embodies our commitment to excellence. Currently under construction, this project is designed with the latest engineering standards to be an architectural icon combining luxury and practicality, serving future aspirations in the heart of the capital."}
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  locale === "ar" ? "هندسة معمارية حديثة ومستدامة" : "Modern and sustainable architecture",
                  locale === "ar" ? "مرافق متكاملة تخدم كافة أفراد الأسرة" : "Integrated facilities serving all family members",
                  locale === "ar" ? "موقع استراتيجي وحيوي" : "Strategic and dynamic location"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <div className="flex shrink-0 h-6 w-6 items-center justify-center rounded-full bg-maad-100 text-maad-600 dark:bg-maad-900/50 dark:text-maad-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Tower Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative shrink-0 mx-auto w-full max-w-sm lg:mx-0"
            >
              <div className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-200 dark:ring-slate-800">
                <Image
                  src="/hero/hayat-tower.jpeg"
                  alt="Hayat Tower active construction"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Floating Decorative element */}
              <div className="absolute -z-10 -bottom-10 -right-10 h-[200px] w-[200px] rounded-full bg-maad-500/20 blur-3xl dark:bg-maad-600/20" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="relative bg-white py-24 dark:bg-slate-950 sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, x: locale === "ar" ? 40 : -40 }}
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

            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: locale === "ar" ? -40 : 40 }}
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
          </div>
        </div>
      </section>

      {/* SERVICES */}
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

      {/* PARTNERS */}
      <PartnersGrid />

      {/* FEATURED PROJECTS */}
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
          </div>

          <div className="mt-14">
            <GalleryGrid
              items={galleryItems.slice(0, 6)}
              locale={locale}
            />
          </div>

          <div className="mt-16 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="group relative h-14 px-12 rounded-full bg-slate-900 text-white hover:bg-maad-600 transition-all duration-300 shadow-xl hover:shadow-maad-500/20 dark:bg-white dark:text-slate-900 dark:hover:bg-maad-500 dark:hover:text-white"
              >
                <Link href={`/${locale}/gallery`}>
                  <span className="relative z-10 flex items-center gap-2 text-base font-bold">
                    {t.common.viewAll}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <Partners />

    </>
  );
}
