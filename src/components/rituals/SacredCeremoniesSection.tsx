import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sacredRitualsList } from "@/lib/content/rituals";
import { Clock, Palette, ArrowRight } from "lucide-react";

export const SacredCeremoniesSection: React.FC = () => {
  return (
    <div className="space-y-12 sm:space-y-16">
      {/* ── Section Header ── */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold flex items-center justify-center gap-2">
          <span>✦</span>
          <span>Sacred Traditions &amp; Celebrations</span>
          <span>✦</span>
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ivory tracking-tight leading-tight">
          The Sacred Ceremonies We Curate
        </h2>
        <p className="font-sans text-sm sm:text-base text-ivory/80 font-medium leading-relaxed">
          Each ritual in an Indian wedding carries centuries of spiritual blessings and emotional depth. We design and coordinate every ceremony with reverence, authenticity, and palatial elegance.
        </p>
      </div>

      {/* ── Ceremonies Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {sacredRitualsList.map((ritual, idx) => {
          return (
            <div
              key={ritual.id}
              className="group flex flex-col justify-between bg-[#090614]/80 backdrop-blur-xl border border-white/10 hover:border-gold/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_15px_35px_rgba(212,175,55,0.15)] hover:-translate-y-1"
            >
              <div>
                {/* Visual Image */}
                <div className="relative aspect-[16/11] overflow-hidden bg-white/5">
                  <Image
                    src={ritual.image}
                    alt={`${ritual.title} - Indian Wedding Ceremony`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090614] via-[#090614]/30 to-transparent" />

                  {/* Ritual Number Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-midnight/90 backdrop-blur-md text-gold border border-gold/30">
                      Ceremony 0{idx + 1}
                    </span>
                  </div>

                  {/* Hindi Subtitle */}
                  <div className="absolute bottom-3 left-3 right-3 text-xs text-gold font-serif tracking-wider font-semibold">
                    {ritual.hindiTitle}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3.5">
                  <h3 className="font-serif text-xl font-bold text-ivory group-hover:text-gold transition-colors leading-snug">
                    {ritual.title}
                  </h3>

                  <p className="text-xs text-gold/90 font-medium italic">
                    &ldquo;{ritual.significance}&rdquo;
                  </p>

                  <p className="text-xs text-ivory/70 line-clamp-3 leading-relaxed">
                    {ritual.description}
                  </p>

                  {/* Decor Vibe & Duration */}
                  <div className="space-y-2 pt-2 border-t border-white/5 text-[11px]">
                    <div className="flex items-start gap-2 text-ivory/80">
                      <Palette className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                      <span className="line-clamp-2">
                        <strong className="text-ivory">Atmosphere:</strong> {ritual.decorVibe}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-ivory/80">
                      <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>
                        <strong className="text-ivory">Typical Timing:</strong> {ritual.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0 border-t border-white/5 mt-4">
                <Link
                  href={`/contact?package=custom-bespoke&ritual=${ritual.id}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-[2px] bg-white/[0.04] hover:bg-gold hover:text-midnight text-ivory text-xs uppercase tracking-wider font-bold transition-all border border-white/10 hover:border-gold"
                >
                  <span>Curate This Ceremony</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
