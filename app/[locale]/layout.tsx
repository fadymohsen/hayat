import { LanguageProvider } from "@/components/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import type { Locale } from "@/lib/i18n";
import type { Metadata } from "next";

const locales = ["ar", "en"] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr
      ? "حياة السعودية | استثمار وتطوير عقاري"
      : "Hayat Saudi | Real Estate Development & Investment",
    description: isAr
      ? "شركة حياة السعودية للاستثمار والتطوير العقاري — حلول عقارية مبتكرة تواكب رؤية المملكة ٢٠٣٠."
      : "Hayat Saudi Investment & Real Estate Development Company — innovative real estate solutions aligned with Saudi Vision 2030.",
    openGraph: {
      title: isAr
        ? "حياة السعودية | استثمار وتطوير عقاري"
        : "Hayat Saudi | Real Estate Development & Investment",
      description: isAr
        ? "حلول عقارية مبتكرة تواكب رؤية المملكة ٢٠٣٠."
        : "Innovative real estate solutions aligned with Saudi Vision 2030.",
      images: [{ url: "/logo/logo.jpeg", width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      images: ["/logo/logo.jpeg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale: Locale = locale === "en" ? "en" : "ar";

  return (
    <ThemeProvider>
      <LanguageProvider locale={validLocale}>
        <div 
          className={cn(
            "flex min-h-screen flex-col overflow-x-hidden",
            validLocale === "ar" ? "font-arabic" : "font-english"
          )}
          dir={validLocale === "ar" ? "rtl" : "ltr"}
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
