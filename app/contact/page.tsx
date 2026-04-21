"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Send,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Textarea, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { DynamicMeta } from "@/components/DynamicMeta";

export default function ContactPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSubmitted(false), 6000);
    }, 800);
  };

  const contactCards = [
    {
      icon: Phone,
      label: t.common.callNow,
      value: "0114741991",
      href: "tel:0114741991",
      dir: "ltr" as const,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+966 54 001 1644",
      href: "https://wa.me/966540011644",
      dir: "ltr" as const,
    },
    {
      icon: Mail,
      label: "Email",
      value: "Info@saudihayat.com",
      href: "mailto:Info@saudihayat.com",
      dir: "ltr" as const,
    },
  ];

  return (
    <>
      <DynamicMeta path="/contact" />
      <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900 sm:py-24">
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="absolute inset-0 bg-radial-gold" aria-hidden />
        <div className="relative mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          {/* Removed Contact Hero Eyebrow shape */}
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
            {t.contact.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-white dark:text-slate-400 sm:text-lg">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            {/* INFO */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                {t.contact.infoTitle}
              </h2>

              <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 dark:bg-slate-900">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-maad-600 shadow-sm ring-1 ring-maad-100 dark:bg-slate-800 dark:ring-slate-700 dark:text-maad-400">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-maad-600">
                    Address
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-white dark:text-slate-300 sm:text-base">
                    {t.contact.address}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {contactCards.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-maad-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-maad-500"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-maad-50 text-maad-600 transition group-hover:bg-maad-500 group-hover:text-white dark:bg-slate-800 dark:text-maad-400">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white dark:text-slate-400">
                      {c.label}
                    </p>
                    <p
                      dir={c.dir}
                      className="text-sm font-bold text-slate-900 group-hover:text-maad-600 dark:text-white dark:group-hover:text-maad-500"
                    >
                      {c.value}
                    </p>
                  </a>
                ))}
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm dark:border-slate-800">
                <iframe
                  title="Hayat Saudi location on map"
                  src="https://www.google.com/maps?q=Al+Rabwa+District,+Riyadh,+Saudi+Arabia&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="aspect-video w-full border-0 grayscale dark:invert"
                />
              </div>
            </motion.div>

            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <CardContent className="p-6 sm:p-10">
                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {t.contact.form.name}
                        </label>
                        <Input required name="name" className="dark:bg-slate-950 dark:border-slate-800" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {t.contact.form.email}
                        </label>
                        <Input required type="email" name="email" className="dark:bg-slate-950 dark:border-slate-800" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {t.contact.form.phone}
                        </label>
                        <Input required name="phone" dir="ltr" className="dark:bg-slate-950 dark:border-slate-800" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {t.contact.form.serviceLabel}
                        </label>
                        <Select required name="service" defaultValue="" className="dark:bg-slate-950 dark:border-slate-800">
                          <option value="" disabled>
                            —
                          </option>
                          {t.contact.form.services.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {t.contact.form.subject}
                      </label>
                      <Input required name="subject" className="dark:bg-slate-950 dark:border-slate-800" />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {t.contact.form.message}
                      </label>
                      <Textarea required name="message" rows={5} className="dark:bg-slate-950 dark:border-slate-800" />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        "..."
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          {t.contact.form.submit}
                        </>
                      )}
                    </Button>

                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:ring-emerald-900/50"
                      >
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                        <span>{t.contact.form.success}</span>
                      </motion.div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
