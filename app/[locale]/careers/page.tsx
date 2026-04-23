"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Clock, Send, Users, TrendingUp, Heart, GraduationCap, X, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/LanguageProvider";

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
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/jobs");
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
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

  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedJob]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, jobTitle: selectedJob }),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", phone: "", email: "" });
      } else {
        setError(isAr ? "حدث خطأ، يرجى المحاولة مرة أخرى." : "Something went wrong. Please try again.");
      }
    } catch {
      setError(isAr ? "حدث خطأ، يرجى المحاولة مرة أخرى." : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setSelectedJob(null);
    setSubmitted(false);
    setError("");
    setFormData({ name: "", phone: "", email: "" });
  };

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
                  <Button
                    size="sm"
                    className="shrink-0 dark:bg-maad-500 dark:text-white dark:hover:bg-maad-400"
                    onClick={() => setSelectedJob(job.title)}
                  >
                    <Send className="h-4 w-4" />
                    {isAr ? "تقدم الآن" : "Apply Now"}
                  </Button>
                </motion.div>
              ))
            )}
          </div>

        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-900"
              dir={isAr ? "rtl" : "ltr"}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              {submitted ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {isAr ? "تم إرسال طلبك بنجاح!" : "Application Submitted!"}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {isAr ? "سنتواصل معك قريبًا." : "We'll get back to you soon."}
                  </p>
                  <Button onClick={closeModal} className="mt-6" variant="outline">
                    {isAr ? "إغلاق" : "Close"}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-maad-50 text-maad-600">
                      <Send className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {isAr ? "التقديم على وظيفة" : "Apply for Position"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{selectedJob}</p>
                  </div>

                  <form onSubmit={handleApply} className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {isAr ? "الاسم الكامل" : "Full Name"}
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isAr ? "أدخل اسمك الكامل" : "Enter your full name"}
                        className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {isAr ? "رقم الهاتف" : "Phone Number"}
                      </label>
                      <Input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={isAr ? "05xxxxxxxx" : "+966 5xxxxxxxx"}
                        className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {isAr ? "البريد الإلكتروني" : "Email Address"}
                      </label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={isAr ? "example@email.com" : "example@email.com"}
                        className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                        dir="ltr"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-500">{error}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-12 rounded-xl bg-maad-600 text-white font-bold hover:bg-maad-700"
                    >
                      {submitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          {isAr ? "إرسال الطلب" : "Submit Application"}
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
