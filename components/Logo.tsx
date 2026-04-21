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
      className={cn("group flex items-center justify-center", className)}
      aria-label={`${t.nav.logoTitle} — Hayat`}
    >
      <span
        className="relative flex items-center justify-center transition-transform group-hover:scale-105 mix-blend-multiply dark:mix-blend-normal dark:bg-[#f4f3ed] dark:p-3 dark:rounded-2xl"
        style={{ width: 150, height: 110 }} 
      >
        <Image
          src="/logo/logo.jpeg"
          alt="Hayat Real Estate Investment & Development"
          fill
          className="object-contain"
          priority
        />
      </span>
    </Link>
  );
}

