"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Clock, Send, Users, TrendingUp, Heart, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import Link from "next/link";

const benefits = {
  en: [
    { icon: TrendingUp, title: "Career Growth", text: "Clear pathways for advancement and professional development." },
    { icon: Users, title: "Team Culture", text: "A collaborative and supportive work environment." },
    { icon: Heart, title: "Health & Wellbeing", text: "Comprehensive health insurance and wellness programs." },
    { icon: GraduationCap, title: "Continuous Learning", text: "Training programs and skill development opportunities." },
  ],
  ar: [
    { icon: TrendingUp, title: "التطور المهني", text: "مسارات واضحة للتقدم والتطوير المهني." },
    { icon: Users, title: "بيئة العمل", text: "بيئة عمل تعاونية وداعمة." },
    { icon: Heart, title: "الصحة والرفاهية", text: "تأمين صحي شامل وبرامج رفاهية." },
    { icon: GraduationCap, title: "التعلم المستمر", text: "برامج تدريبية وفرص لتطوير المهارات." },
  ],
};

const openings = {
  en: [
    { title: "Site Engineer", department: "Construction", location: "Riyadh", type: "Full-time" },
    { title: "Project Manager", department: "Operations", location: "Riyadh", type: "Full-time" },
    { title: "Interior Designer", department: "Design", location: "Riyadh", type: "Full-time" },
    { title: "Marketing Specialist", department: "Marketing", location: "Riyadh", type: "Full-time" },
  ],
  ar: [
    { title: "مهندس موقع", department: "الإنشاءات", location: "الرياض", type: "دوام كامل" },
    { title: "مدير مشروع", department: "العمليات", location: "الرياض", type: "دوام كامل" },
    { title: "مصمم داخلي", department: "التصميم", location: "الرياض", type: "دوام كامل" },
    { title: "أخصائي تسويق", department: "التسويق", location: "الرياض", type: "دوام كامل" },
  ],
};

export default function CareersPage() {
  const { t, locale } = useLanguage();
  const isAr = locale === "ar";
  
  const [activeOpenings, setActiveOpenings] = useState<any[]>(openings[locale]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/jobs");
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            // Map DB fields to current structure
            const mappedJobs = data.map((j: any) => ({
              title: isAr ? j.title_ar : j.title_en,
              department: isAr ? j.department_ar : j.department_en,
              location: isAr ? j.location_ar : j.location_en,
              type: isAr ? j.type_ar : j.type_en
            }));
            setActiveOpenings(mappedJobs);
          }
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [isAr]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-950/50 sm:py-28">
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="absolute inset-0 bg-radial-gold" aria-hidden />
        <div className="relative mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
            {isAr ? "انضم إلى فريقنا" : "Join Our Team"}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            {isAr
              ? "كن جزءًا من فريق حياة السعودية وساهم في بناء مشاريع تُشكّل مستقبل التطوير العقاري في المملكة."
              : "Be part of Hayat Saudi's team and contribute to building projects that shape the future of real estate development in the Kingdom."}
          </p>
        </div>
      </section>

      {/* WHY JOIN US */}
      <section className="bg-white py-20 dark:bg-slate-950 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-maad-500">
              {isAr ? "لماذا حياة؟" : "Why Hayat?"}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {isAr ? "مزايا العمل معنا" : "Benefits of Working With Us"}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits[locale].map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl bg-slate-50 p-8 text-center ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:ring-maad-200 dark:bg-slate-900 dark:ring-slate-800 dark:hover:ring-maad-500/30"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-maad-50 to-maad-100 text-maad-600 transition group-hover:from-maad-500 group-hover:to-maad-600 group-hover:text-white">
                  <b.icon className="h-8 w-8" />
                </div>
                <h4 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{b.title}</h4>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900/50 sm:py-28">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-maad-500">
              {isAr ? "الوظائف المتاحة" : "Open Positions"}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {isAr ? "فرص العمل الحالية" : "Current Openings"}
            </h2>
          </div>
          <div className="space-y-4">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-24 w-full animate-pulse rounded-2xl bg-white dark:bg-slate-900" />
              ))
            ) : (
              activeOpenings.map((job, i) => (
                <motion.div
                  key={job.title + i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group flex flex-col gap-4 rounded-2xl bg-white p-6 ring-1 ring-slate-100 transition hover:shadow-lg hover:ring-maad-200 dark:bg-slate-900 dark:ring-slate-800 dark:hover:ring-maad-500/30 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{job.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Button asChild size="sm" className="shrink-0 dark:bg-maad-500 dark:text-white dark:hover:bg-maad-400">
                    <a href="mailto:Info@saudihayat.com">
                      <Send className="h-4 w-4" />
                      {isAr ? "تقدم الآن" : "Apply Now"}
                    </a>
                  </Button>
                </motion.div>
              ))
            )}
          </div>

          {/* General Application */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 rounded-2xl bg-gradient-to-br from-maad-500 to-maad-700 p-8 text-center text-white sm:p-12"
          >
            <h3 className="text-2xl font-bold sm:text-3xl">
              {isAr ? "لم تجد الوظيفة المناسبة؟" : "Don't see the right role?"}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-base text-white/80">
              {isAr
                ? "أرسل سيرتك الذاتية وسنتواصل معك عندما تتوفر فرصة مناسبة."
                : "Send us your CV and we'll reach out when a matching opportunity arises."}
            </p>
            <div className="mt-6">
              <Button asChild size="lg" className="bg-white text-maad-700 hover:bg-white/90">
                <a href="mailto:Info@saudihayat.com">
                  {isAr ? "أرسل سيرتك الذاتية" : "Submit Your CV"}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
