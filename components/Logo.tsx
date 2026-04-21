"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";

export function Logo({
  className,
  white = false,
}: {
  className?: string;
  white?: boolean;
}) {
  const { t, locale } = useLanguage();

  return (
    <Link
      href={`/${locale}`}
      className={cn("group flex items-center justify-start", className)}
      aria-label={`${t.nav.logoTitle} — Hayat`}
    >
      <span
        className={cn(
          "relative flex items-center justify-start transition-transform group-hover:scale-105",
          white ? "brightness-0 invert" : ""
        )}
        style={{ width: 145, height: 60 }}
      >
        <Image
          src="/logo/logo-transperent.png"
          alt="Hayat Real Estate Investment & Development"
          fill
          className={cn("object-contain", locale === "ar" ? "object-right" : "object-left")}
          priority
        />
      </span>
    </Link>
  );
}
