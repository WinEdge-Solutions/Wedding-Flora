"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryData, GalleryItem } from "@/lib/content/gallery";
import { Sparkles, MapPin, Play, X, ArrowRight, Eye, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const GalleryGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: "ALL", label: "All Works" },
    { id: "MANDAP & DECOR", label: "Mandap & Sacred Decor" },
    { id: "SANGEET", label: "Sangeet Spectaculars" },
    { id: "MEHENDI & HALDI", label: "Mehendi & Haldi" },
    { id: "ROYAL BARAAT", label: "Royal Baraat" },
    { id: "RECEPTION", label: "Grand Reception" },
    { id: "CINEMATIC REELS", label: "Cinematic Reels" },
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === "ALL") return galleryData;
    return galleryData.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* ── Category Filter Pills ── */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {categories.map((cat) => {
          const count =
            cat.id === "ALL"
              ? galleryData.length
              : galleryData.filter((i) => i.category === cat.id).length;
          const active = activeCategory === cat.id;

          if (cat.id !== "ALL" && count === 0) return null;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                active
                  ? "bg-gold text-midnight font-extrabold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  : "bg-white/[0.04] text-ivory/80 hover:text-ivory hover:bg-white/[0.08] border border-white/10"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  active ? "bg-midnight/20 text-midnight" : "bg-white/10 text-gold"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Gallery Grid ── */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <AnimatePresence>
          {filteredItems.map((item) => {
            const isVideo = Boolean(item.videoUrl);

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-[#090614]/80 backdrop-blur-xl border border-white/10 hover:border-gold/60 shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                onClick={() => setActiveItem(item)}
              >
                {/* Media Container */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-white/5">
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090614] via-[#090614]/25 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-midnight/90 backdrop-blur-md text-gold border border-gold/30">
                      {item.category}
                    </span>
                  </div>

                  {/* Play Icon / View Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-ivory group-hover:text-gold group-hover:scale-110 transition-all">
                    {isVideo ? <Play size={14} className="fill-current ml-0.5" /> : <Eye size={14} />}
                  </div>

                  {/* Location strip */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-ivory/90">
                    <div className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Content info */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-ivory/50">
                    <span className="font-bold text-gold uppercase tracking-wider">
                      ✦ Royal Celebration
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} className="text-gold" />
                      <span>{item.year}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-ivory group-hover:text-gold transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {item.caption && (
                    <p className="text-xs text-ivory/70 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                </div>

                {/* View Details Prompt */}
                <div className="px-5 pb-5 pt-0">
                  <div className="w-full inline-flex items-center justify-between text-xs text-gold font-bold uppercase tracking-wider group-hover:text-white transition-colors pt-2 border-t border-white/5">
                    <span>{isVideo ? "Watch Cinematic Reel" : "Expand High-Res Photo"}</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* ── Modal Lightbox ── */}
      <AnimatePresence>
        {activeItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full bg-[#090614] border border-gold/40 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/80 hover:bg-gold text-ivory hover:text-midnight border border-white/20 flex items-center justify-center transition-colors shadow-lg"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Media Player / Full Photo */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[60vh] bg-black">
                {activeItem.videoUrl ? (
                  <video
                    src={activeItem.videoUrl}
                    poster={activeItem.imageUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={activeItem.imageUrl}
                    alt={activeItem.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                )}
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-4 bg-gradient-to-b from-[#090614] to-[#04020a]">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold block">
                      {activeItem.category} • {activeItem.year}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
                      {activeItem.title}
                    </h3>
                  </div>

                  <Link
                    href={`/contact?inspiration=${encodeURIComponent(activeItem.title)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] bg-gold hover:bg-[#b8972e] text-midnight font-sans text-xs uppercase tracking-wider font-extrabold transition-all shadow-md"
                  >
                    <span>Plan Wedding Like This</span>
                    <Sparkles size={13} />
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-ivory/80">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-gold" />
                    <span>{activeItem.location}</span>
                  </div>
                </div>

                {activeItem.caption && (
                  <p className="text-sm text-ivory/80 leading-relaxed font-medium">
                    {activeItem.caption}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
