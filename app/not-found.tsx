"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";

export default function NotFound() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="absolute inset-0 bg-radial-gold" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-2xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 w-28"
        >
          <Image
            src="/logo/logo-transperent.png"
            alt="Hayat"
            width={112}
            height={80}
            className="mx-auto object-contain"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-8xl font-extrabold tracking-tight gold-text sm:text-9xl"
        >
          404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl"
        >
          {isAr ? "الصفحة غير موجودة" : "Page Not Found"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-3 max-w-md text-base text-slate-600 dark:text-slate-400"
        >
          {isAr
            ? "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
            : "Sorry, the page you're looking for doesn't exist or has been moved."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg">
            <Link href="/">
              <Home className="h-4 w-4" />
              {isAr ? "العودة للرئيسية" : "Back to Home"}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200">
            <Link href="/contact">
              {isAr ? "تواصل معنا" : "Contact Us"}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
