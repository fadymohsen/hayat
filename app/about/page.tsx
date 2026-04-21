"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Handshake,
  HeartHandshake,
  Eye,
  Target,
  Compass,
  CheckCircle2,
  Award,
  Leaf,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/components/LanguageProvider";
import { Partners } from "@/components/Partners";

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    { icon: ShieldCheck, ...t.about.values.safety },
    { icon: Handshake, ...t.about.values.integrity },
    { icon: HeartHandshake, ...t.about.values.respect },
    { icon: Eye, ...t.about.values.transparency },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-950/50 sm:py-28">
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="absolute inset-0 bg-radial-gold" aria-hidden />
        <div className="relative mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          {/* Removed About Hero Eyebrow shape */}
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
            {t.about.title}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-white sm:text-lg">
            {t.about.subtitle}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-500 dark:text-white sm:text-base">
            {t.about.intro}
          </p>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="bg-white py-20 dark:bg-slate-950 sm:py-28">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {[
            {
              icon: Eye,
              title: t.about.visionTitle,
              text: t.about.visionText,
            },
            {
              icon: Target,
              title: t.about.missionTitle,
              text: t.about.missionText,
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Card className="relative h-full overflow-hidden border-t-4 border-t-maad-500 p-2 shadow-lg transition hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <CardContent className="p-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-maad-50 to-maad-100 text-maad-600">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-slate-600 dark:text-white">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-slate-50 py-20 dark:bg-slate-950/50 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.about.valuesTitle}
            title={t.about.valuesTitle}
            subtitle={t.about.valuesSubtitle}
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:ring-maad-200 dark:bg-slate-900 dark:ring-slate-800"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-maad-50 to-maad-100 text-maad-600 transition group-hover:from-maad-500 group-hover:to-maad-600 group-hover:text-white">
                  <v.icon className="h-8 w-8" />
                </div>
                <h4 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                  {v.title}
                </h4>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-white">
                  {v.text}
                </p>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gold-gradient opacity-0 transition group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QHSE */}
      <section className="relative overflow-hidden bg-white py-20 dark:bg-slate-950 sm:py-28">
        <div className="absolute inset-0 bg-radial-gold opacity-50" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1.1fr_1fr] md:items-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Removed QHSE Eyebrow shape */}
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {t.about.qhseTitle}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-white sm:text-lg">
              {t.about.qhseText}
            </p>
            <ul className="mt-8 space-y-4">
              {t.about.qhsePoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-maad-100 text-maad-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-relaxed text-slate-700 dark:text-white sm:text-base">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {[
              { icon: Award, label: "ISO 45001:2018", sub: "Certified" },
              { icon: ShieldCheck, label: t.about.values.safety.title, sub: "Priority" },
              { icon: Leaf, label: "Environment", sub: "Sustainable" },
              { icon: Compass, label: "Vision 2030", sub: "Aligned" },
            ].map((item) => (
              <div
                key={item.label}
                className="group flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-br from-white to-maad-50/40 p-6 text-center shadow-sm ring-1 ring-slate-100 transition hover:shadow-xl hover:ring-maad-200 dark:from-slate-900 dark:to-slate-800 dark:ring-slate-800"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-maad-600 shadow-sm ring-1 ring-maad-100">
                  <item.icon className="h-7 w-7" />
                </span>
                <div>
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    {item.label}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-maad-600">
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PARTNERS */}
      <Partners />
    </>
  );
}
