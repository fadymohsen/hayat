"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GalleryGrid } from "@/components/GalleryGrid";
import { useLanguage } from "@/components/LanguageProvider";

export default function GalleryPage() {
  const { t, locale } = useLanguage();

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900 sm:py-24">
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="absolute inset-0 bg-radial-gold" aria-hidden />
        <div className="relative mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {t.galleryPage.title}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-white dark:text-slate-400 sm:text-lg">
            {t.galleryPage.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <GalleryGrid locale={locale} />

          <div className="mt-16 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                {t.common.getInTouch}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
