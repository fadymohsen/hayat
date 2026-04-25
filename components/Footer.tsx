"use client";

import Link from "next/link";
import { MapPin, Phone, MessageCircle, Mail, ShieldCheck, BadgeCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { useLanguage } from "./LanguageProvider";

import { useState, useEffect } from "react";

export function Footer() {
  const { t, locale } = useLanguage();
  const pathname = usePathname();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/settings').then(res => res.json()).then(data => setSettings(data));
  }, []);

  if (pathname.includes('/admin')) return null;
  const year = new Date().getFullYear();

  const email = settings?.contact_email || "Info@saudihayat.com";
  const phone = settings?.contact_phone || "0114741991";
  const whatsapp = settings?.contact_whatsapp || "+966 54 001 1644";
  const whatsappClean = whatsapp.replace(/\s+/g, '');

  const careersVisible = settings?.careers_visible !== 'false';

  const quick = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/services`, label: t.nav.services },
    { href: `/${locale}/gallery`, label: t.nav.gallery },
    ...(careersVisible ? [{ href: `/${locale}/careers`, label: t.nav.careers }] : []),
    { href: `/${locale}/contact`, label: t.nav.contact },
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
                  {(locale === "ar" ? settings?.address_ar : settings?.address_en) || t.contact.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-maad-50 text-maad-600 dark:bg-slate-900 dark:text-maad-400">
                  <Phone className="h-4 w-4" />
                </span>
                <a
                  href={`tel:${phone}`}
                  dir="ltr"
                  className="font-semibold text-slate-800 transition hover:text-maad-600 dark:text-slate-300 dark:hover:text-maad-500"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-maad-50 text-maad-600 dark:bg-slate-900 dark:text-maad-400">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <a
                  href={`https://wa.me/${whatsappClean}`}
                  target="_blank"
                  rel="noreferrer"
                  dir="ltr"
                  className="font-semibold text-slate-800 transition hover:text-maad-600 dark:text-slate-300 dark:hover:text-maad-500"
                >
                  {whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-maad-50 text-maad-600 dark:bg-slate-900 dark:text-maad-400">
                  <Mail className="h-4 w-4" />
                </span>
                <a
                  href={`mailto:${email}`}
                  className="font-semibold text-slate-800 transition hover:text-maad-600 dark:text-slate-300 dark:hover:text-maad-500"
                >
                  {email}
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
          <p className="font-medium text-slate-600 dark:text-slate-400">
            Powered by{" "}
            <a
              href="https://www.veliq.co/"
              target="_blank"
              rel="follow"
              className="font-bold text-maad-600 transition hover:text-maad-700 dark:text-maad-400 dark:hover:text-maad-300"
            >
              VELIQ
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
