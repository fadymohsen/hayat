import type { Metadata } from "next";
import { Tajawal, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hayat Saudi — حياة السعودية | Real Estate Development",
  description:
    "Hayat Saudi Investment & Real Estate Development Company — innovative real estate solutions aligned with Saudi Vision 2030.",
  icons: {
    icon: "/logo/logo.jpeg",
  },
  openGraph: {
    title: "Hayat Saudi — حياة السعودية | Real Estate Development",
    description:
      "Hayat Saudi Investment & Real Estate Development Company — innovative real estate solutions aligned with Saudi Vision 2030.",
    images: [{ url: "/logo/logo.jpeg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo/logo.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${tajawal.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 transition-colors duration-300 antialiased dark:bg-slate-950 dark:text-slate-50">
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
