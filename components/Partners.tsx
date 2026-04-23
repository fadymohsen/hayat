"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

const clients = [
  {
    name: "Client 1",
    logo: "/clients/Gemini_Generated_Image_bn843sbn843sbn84-removebg-preview.png",
  },
  {
    name: "Client 2",
    logo: "/clients/Gemini_Generated_Image_hed5t4hed5t4hed5-removebg-preview.png",
  },
  {
    name: "Client 3",
    logo: "/clients/Gemini_Generated_Image_x29oukx29oukx29o.png",
  },
  {
    name: "Client 4",
    logo: "/clients/Gemini_Generated_Image_9ega9u9ega9u9ega-removebg-preview.png",
  },
  {
    name: "Client 5",
    logo: "/clients/Gemini_Generated_Image_tf6vurtf6vurtf6v-removebg-preview.png",
  },
];

export function Partners() {
  const { locale } = useLanguage();

  return (
    <section className="bg-slate-50 py-24 dark:bg-slate-950 sm:py-32 overflow-hidden border-t border-slate-100 dark:border-slate-900">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-maad-600 dark:text-maad-500">
            {locale === "ar" ? "عملائنا الكرام" : "Valued Clients"}
          </p>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl">
            {locale === "ar"
              ? "نعتز بثقتهم"
              : "Partners in Success"}
          </h2>
        </div>

        {/* ULTRA-SMOOTH CONTINUOUS MARQUEE (NO-JS DEPENDENCY) */}
        <div className="group relative flex overflow-hidden py-10">
          {/* Left/Right Fades for premium feel */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-950 sm:w-48" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-950 sm:w-48" />

          {/* Marquee Wrapper */}
          <div className="flex w-fit animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
            {/* 
              We use 4 sets to ensure perfect continuity even on ultra-wide screens.
              The animation moves from 0 to -25% (since we have 4 sets) 
              Wait, simpler: 2 sets and -50%.
            */}
            {[...clients, ...clients, ...clients, ...clients].map((item, i) => (
              <div 
                key={i} 
                className="mx-8 flex shrink-0 items-center justify-center w-[160px] sm:w-[220px] transition-all duration-500 hover:scale-110"
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={220}
                  height={110}
                  priority
                  className="max-h-16 w-auto object-contain sm:max-h-24"
                />
              </div>
            ))}
          </div>
          
          {/* Duplicate set for seamless looping */}
          <div className="flex w-fit animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]" aria-hidden="true">
            {[...clients, ...clients, ...clients, ...clients].map((item, i) => (
              <div 
                key={`dup-${i}`} 
                className="mx-8 flex shrink-0 items-center justify-center w-[160px] sm:w-[220px] grayscale opacity-50 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:scale-110"
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={220}
                  height={110}
                  priority
                  className="max-h-16 w-auto object-contain sm:max-h-24"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        [dir="rtl"] .animate-marquee {
          animation: marquee-rtl 50s linear infinite;
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
