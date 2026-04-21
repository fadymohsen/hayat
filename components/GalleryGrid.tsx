"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  src: string;
  title: string;
  titleAr: string;
  location: string;
  locationAr: string;
  type?: "large" | "tall" | "wide" | "normal";
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/projects/project-3.jpeg",
    title: "MAAD Residential Complex",
    titleAr: "مجمع معاد السكني",
    location: "Riyadh",
    locationAr: "الرياض",
    type: "large",
  },
  {
    src: "/projects/project-2.jpeg",
    title: "Structural Development",
    titleAr: "التطوير الإنشائي",
    location: "Al Rabwa District",
    locationAr: "حي الربوة",
    type: "wide",
  },
  {
    src: "/projects/project-4.jpeg",
    title: "Premium Villa Project",
    titleAr: "مشروع فلل مميز",
    location: "Riyadh",
    locationAr: "الرياض",
  },
  {
    src: "/projects/project-5.jpeg",
    title: "Commercial Tower",
    titleAr: "برج تجاري",
    location: "Riyadh",
    locationAr: "الرياض",
    type: "tall",
  },
  {
    src: "/projects/project-6.jpeg",
    title: "Urban Development",
    titleAr: "تطوير حضري",
    location: "Riyadh",
    locationAr: "الرياض",
  },
  {
    src: "/projects/project-7.jpeg",
    title: "Infrastructure Works",
    titleAr: "أعمال البنية التحتية",
    location: "Riyadh",
    locationAr: "الرياض",
    type: "wide",
  },
  {
    src: "/projects/project-8.jpeg",
    title: "Mixed-use Development",
    titleAr: "مشروع متعدد الاستخدامات",
    location: "Riyadh",
    locationAr: "الرياض",
    type: "large",
  },
  {
    src: "/projects/project-9.jpeg",
    title: "Site Preparation",
    titleAr: "تجهيز المواقع",
    location: "Riyadh",
    locationAr: "الرياض",
  },
  {
    src: "/projects/project-10.jpeg",
    title: "Villa Compound",
    titleAr: "مجمع فلل",
    location: "Riyadh",
    locationAr: "الرياض",
    type: "tall",
  },
  {
    src: "/projects/project-11.jpeg",
    title: "Corporate Real Estate",
    titleAr: "عقارات مؤسسية",
    location: "Riyadh",
    locationAr: "الرياض",
  },
  {
    src: "/projects/project-1.jpeg",
    title: "Equipment & Machinery",
    titleAr: "الآليات والمعدات",
    location: "Riyadh",
    locationAr: "الرياض",
    type: "wide",
  },
];

export function GalleryGrid({
  items = galleryItems,
  locale,
}: {
  items?: GalleryItem[];
  locale: "ar" | "en";
}) {
  return (
    <div className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-6 hide-scrollbar md:grid md:flex-none md:snap-none md:overflow-visible md:bento-grid">
      {items.map((p, i) => (
        <motion.div
          key={p.src}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
          className={cn(
            "group relative overflow-hidden rounded-2xl bg-slate-100 shadow-sm ring-1 ring-slate-200 transition-all duration-500 hover:shadow-2xl hover:ring-maad-400",
            // Mobile Carousel Item 
            "min-w-[85vw] sm:min-w-[60vw] snap-center shrink-0 aspect-[4/5] md:aspect-auto md:w-auto md:min-w-0 md:shrink md:snap-align-none",
            p.type === "large" && "md:bento-item-large",
            p.type === "tall" && "md:bento-item-tall",
            p.type === "wide" && "md:bento-item-wide"
          )}
        >
          <div className="relative h-full w-full">
            <Image
              src={p.src}
              alt={locale === "ar" ? p.titleAr : p.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
              <div className="translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                <h4 className="text-base font-bold text-white drop-shadow-md sm:text-lg">
                  {locale === "ar" ? p.titleAr : p.title}
                </h4>
                <p className="text-xs font-medium text-white/80 sm:text-sm">
                  {locale === "ar" ? p.locationAr : p.location}
                </p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-maad-500/90 text-white shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-maad-500">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
            
            {/* Top accent */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gold-gradient scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Map the old export to keep the build working if some files still use it
export { GalleryGrid as ProjectsGrid, galleryItems as featuredProjects };
