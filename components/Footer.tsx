"use client";

import Link from "next/link";
import { MapPin, Phone, MessageCircle, Mail, ShieldCheck, BadgeCheck } from "lucide-react";
import { Logo } from "./Logo";
import { useLanguage } from "./LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const quick = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/faqs", label: t.nav.faqs },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative border-t border-slate-200 bg-slate-50 text-slate-600 dark:text-white dark:border-slate-800 dark:bg-slate-950/50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold-gradient opacity-70" />
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <Logo />
            <p className="text-sm leading-relaxed text-slate-600 dark:text-white dark:text-slate-400">
              {t.footer.brief}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-white ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800">
                <ShieldCheck className="h-3.5 w-3.5 text-maad-500" />
                {t.footer.iso}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-white ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800">
                <BadgeCheck className="h-3.5 w-3.5 text-maad-500" />
                {t.footer.vision}
              </span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {quick.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 dark:text-white transition hover:text-maad-600 dark:text-slate-400 dark:hover:text-maad-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.footer.contact}
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-maad-50 text-maad-600 dark:bg-slate-900 dark:text-maad-400">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="leading-relaxed dark:text-slate-300">
                  {t.contact.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-maad-50 text-maad-600 dark:bg-slate-900 dark:text-maad-400">
                  <Phone className="h-4 w-4" />
                </span>
                <a
                  href="tel:0114741991"
                  dir="ltr"
                  className="font-semibold text-slate-800 transition hover:text-maad-600 dark:text-slate-300 dark:hover:text-maad-500"
                >
                  0114741991
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-maad-50 text-maad-600 dark:bg-slate-900 dark:text-maad-400">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <a
                  href="https://wa.me/966540011644"
                  target="_blank"
                  rel="noreferrer"
                  dir="ltr"
                  className="font-semibold text-slate-800 transition hover:text-maad-600 dark:text-slate-300 dark:hover:text-maad-500"
                >
                  +966 54 001 1644
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-maad-50 text-maad-600 dark:bg-slate-900 dark:text-maad-400">
                  <Mail className="h-4 w-4" />
                </span>
                <a
                  href="mailto:Info@saudihayat.com"
                  className="font-semibold text-slate-800 transition hover:text-maad-600 dark:text-slate-300 dark:hover:text-maad-500"
                >
                  Info@saudihayat.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:text-white dark:border-slate-800 sm:flex-row">
          <p>
            © {year} Hayat Saudi Investment & Real Estate Development —{" "}
            {t.footer.rights}.
          </p>
          <p className="font-semibold text-slate-600 dark:text-white dark:text-slate-400">MAAD · معاد</p>
        </div>
      </div>
    </footer>
  );
}
