"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";

export function Logo({
  className,
  showText = true,
  size = "md",
}: {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const { t, locale } = useLanguage();
  const dim = size === "sm" ? 36 : size === "lg" ? 72 : 48;
  
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3", className)}
      aria-label={`${t.nav.logoTitle} — MAAD`}
    >
      <span
        className="relative flex items-center justify-center rounded-xl ring-1 ring-maad-100 bg-white shadow-sm transition group-hover:ring-maad-300 group-hover:shadow-md dark:ring-slate-800 dark:bg-slate-900"
        style={{ width: dim, height: dim }}
      >
        <Image
          src="/logo/maad-logo.jpeg"
          alt="MAAD logo"
          width={dim}
          height={dim}
          className="rounded-lg object-contain"
          priority
        />
      </span>
      {showText && (
        <span className={cn(
          "flex flex-col leading-tight",
          locale === "ar" ? "items-end" : "items-start"
        )}>
          <span className="text-sm font-bold tracking-wide text-slate-900 dark:text-white sm:text-base">
            {t.nav.logoTitle}
          </span>
          <span className="text-[11px] font-medium text-maad-600 sm:text-xs">
            {t.nav.logoSub}
          </span>
        </span>
      )}
    </Link>
  );
}
