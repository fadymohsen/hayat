"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
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
    src: "/projects/Hayat Hotel-1.jpg",
    title: "Hayat Tower — Exterior View",
    titleAr: "برج حياة — المظهر الخارجي",
    location: "Riyadh",
    locationAr: "الرياض",
  },
  {
    src: "/projects/Hayat Hotel-2.jpg",
    title: "Hayat Tower — Luxury Suite",
    titleAr: "برج حياة — جناح فاخر",
    location: "Riyadh",
    locationAr: "الرياض",
  },
  {
    src: "/projects/Hayat Hotel-3.jpg",
    title: "Hayat Tower — Premium Bathroom",
    titleAr: "برج حياة — حمام فاخر",
    location: "Riyadh",
    locationAr: "الرياض",
  },
  {
    src: "/projects/Infrastructure.png",
    title: "Infrastructure & Construction Works",
    titleAr: "أعمال البنية التحتية والإنشاءات",
    location: "Riyadh",
    locationAr: "الرياض",
  },
  {
    src: "/projects/Riyadh Villa-1.png",
    title: "Riyadh Luxury Villas",
    titleAr: "فلل الرياض الفاخرة",
    location: "Riyadh",
    locationAr: "الرياض",
  },
  {
    src: "/projects/project-3.png",
    title: "Hayat Serviced Apartments",
    titleAr: "شقق حياة الفندقية",
    location: "Riyadh",
    locationAr: "الرياض",
  },
];

function Lightbox({
  items,
  index,
  locale,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  locale: "ar" | "en";
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const item = items[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") locale === "ar" ? onNext() : onPrev();
      if (e.key === "ArrowRight") locale === "ar" ? onPrev() : onNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext, locale]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const minSwipe = 50;
    if (Math.abs(distance) >= minSwipe) {
      if (distance > 0) onNext();
      else onPrev();
    }
    touchStart.current = null;
    touchEnd.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Counter */}
      <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
        {index + 1} / {items.length}
      </div>

      {/* Prev button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      {/* Image */}
      <div
        className="relative mx-16 flex max-h-[85vh] max-w-[90vw] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={item.src}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <Image
              src={item.src}
              alt={locale === "ar" ? item.titleAr : item.title}
              width={1200}
              height={800}
              className="max-h-[75vh] w-auto rounded-xl object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold text-white">
            {locale === "ar" ? item.titleAr : item.title}
          </h3>
          <p className="text-sm text-white/60">
            {locale === "ar" ? item.locationAr : item.location}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function GalleryGrid({
  items = galleryItems,
  locale,
}: {
  items?: GalleryItem[];
  locale: "ar" | "en";
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i - 1 + items.length) % items.length : null)),
    [items.length]
  );
  const goNext = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i + 1) % items.length : null)),
    [items.length]
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <motion.div
            key={p.src}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-100 shadow-sm ring-1 ring-slate-200 transition-all duration-500 hover:shadow-2xl hover:ring-maad-400 aspect-[4/3]"
            onClick={() => setLightboxIndex(i)}
          >
            <div className="relative h-full w-full">
              <Image
                src={p.src}
                alt={locale === "ar" ? p.titleAr : p.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-110"
              />
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

              <div className="absolute inset-x-0 top-0 h-1 bg-gold-gradient scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={items}
            index={lightboxIndex}
            locale={locale}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Map the old export to keep the build working if some files still use it
export { GalleryGrid as ProjectsGrid, galleryItems as featuredProjects };
