"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Globe, Instagram, Facebook, Linkedin, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { useLanguage } from "./LanguageProvider";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const { t, locale, toggle } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const nav = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/faqs", label: t.nav.faqs },
    { href: "/contact", label: t.nav.contact },
  ];

  // On home: transparent floating pill over hero
  // On home + scrolled: solid white pill
  // On other pages: white background
  const isTransparent = isHome && !scrolled;

  return (
    <>
    <header
      className={cn(
        "fixed top-0 z-50 w-full px-4 sm:px-6 transition-all duration-300",
        locale === "ar" ? "font-arabic" : "font-english"
      )}
    >
      <div className={cn(
        "mx-auto mt-4 flex h-16 w-full max-w-6xl items-center justify-between gap-4 rounded-full px-5 transition-all duration-300 sm:px-8",
        isTransparent
          ? "bg-black/30 backdrop-blur-md border border-white/15 shadow-lg"
          : "bg-white/95 backdrop-blur-md border border-slate-200 shadow-md dark:bg-slate-950/95 dark:border-slate-800"
      )}>
        <Logo white={isTransparent} />

        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  active
                    ? isTransparent
                      ? "bg-white/20 text-white backdrop-blur-sm"
                      : "bg-maad-500 text-white"
                    : isTransparent
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-slate-600 hover:text-maad-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-maad-500 dark:hover:bg-slate-800"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className={cn(
              "hidden h-9 items-center gap-1.5 rounded-full px-4 text-xs font-bold transition sm:inline-flex",
              isTransparent
                ? "border border-white/25 text-white hover:bg-white/15"
                : "border border-slate-200 text-slate-700 hover:border-maad-400 hover:text-maad-600 dark:border-slate-600 dark:text-white dark:hover:border-maad-500"
            )}
            aria-label="Toggle language"
          >
            <span>{locale === "ar" ? "English" : "العربية"}</span>
            <Globe className="h-3.5 w-3.5" />
          </button>

          <ThemeToggle />

          <button
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full transition lg:hidden",
              isTransparent
                ? "text-white hover:bg-white/15"
                : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            )}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col bg-white dark:bg-slate-950 lg:hidden"
          >
            <div className="flex h-20 items-center justify-between border-b border-slate-100/50 px-4 dark:border-slate-800/50 sm:px-6">
              <Logo />
              <div className="flex items-center gap-3">
                 <button
                  onClick={toggle}
                  className="flex h-10 items-center gap-2 rounded-full bg-slate-100 px-4 text-sm font-bold text-slate-900 transition dark:bg-slate-900 dark:text-white"
                >
                  <Globe className="h-4 w-4" />
                  {locale === "ar" ? "EN" : "AR"}
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition active:scale-95 dark:bg-white dark:text-slate-900"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center px-8 sm:px-12">
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                  closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } }
                }}
                className="flex flex-col gap-6"
              >
                {nav.map((item) => {
                  const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  return (
                    <div key={item.href} className="overflow-hidden py-1">
                      <motion.div
                        variants={{
                          closed: { y: "120%", opacity: 0 },
                          open: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "group flex items-center justify-between text-5xl font-black tracking-tighter transition-transform active:scale-95",
                            active ? "gold-text" : "text-slate-900 dark:text-white"
                          )}
                        >
                          <span>{item.label}</span>
                          {active && (
                            <motion.span
                              layoutId="mobileActive"
                              className="h-3 w-3 rounded-full bg-gold-gradient"
                            />
                          )}
                        </Link>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-auto flex flex-col gap-3 p-6 sm:p-8"
            >
              <div className="grid grid-cols-2 gap-3">
                <a href="tel:0114741991" className="flex flex-col justify-center rounded-2xl bg-slate-50 p-4 transition-colors hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800">
                  <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-maad-600 shadow-sm dark:bg-slate-950 dark:text-maad-400">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Call Us</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white" dir="ltr">011474 1991</span>
                </a>
                <a href="mailto:Info@saudihayat.com" className="flex flex-col justify-center rounded-2xl bg-slate-50 p-4 transition-colors hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800">
                  <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-maad-600 shadow-sm dark:bg-slate-950 dark:text-maad-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email</span>
                  <span className="truncate text-sm font-bold text-slate-900 dark:text-white">Info@saudihayat...</span>
                </a>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-6 py-4 dark:bg-slate-900">
                <div className="flex gap-4">
                  {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="text-slate-400 transition hover:text-maad-600 dark:text-slate-500 dark:hover:text-maad-400">
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
                <ThemeToggle />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
