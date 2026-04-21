"use client";

import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";

export default function FaqsPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900 sm:py-24">
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="absolute inset-0 bg-radial-gold" aria-hidden />
        <div className="relative mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          {/* Removed FAQs Hero Eyebrow shape */}
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {t.faqsPage.title}
          </h1>
          <p className="mx-auto mt-5 text-base leading-relaxed text-slate-600 dark:text-white dark:text-slate-400 sm:text-lg">
            {t.faqsPage.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950 sm:py-24">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="space-y-4">
            {t.faqsPage.items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="dark:border-slate-800">
                <AccordionTrigger className="dark:text-white dark:hover:text-maad-500">{item.q}</AccordionTrigger>
                <AccordionContent className="dark:text-slate-400">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-14 rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 via-white to-maad-50/40 p-8 text-center shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-800 sm:p-10">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              {t.home.ctaTitle}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 dark:text-white dark:text-slate-400 sm:text-base">
              {t.home.ctaSubtitle}
            </p>
            <div className="mt-6">
              <Button asChild size="lg">
                <Link href="/contact">
                  {t.common.getInTouch}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
