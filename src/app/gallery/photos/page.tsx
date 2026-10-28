import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Sparkles, ArrowRight, Camera, Video, Flower2 } from "lucide-react";

export const metadata = {
  title: "Photo Gallery | Royal Wedding Decor & Mandaps | Wedding Flora",
  description:
    "Explore Wedding Flora's royal photo gallery. High-resolution photography of opulent Vedic mandaps, palace florals, grand Sangeet stages, and regal celebrations across Rajasthan.",
};

export default function PhotoGalleryPage() {
  return (
    <main className="min-h-screen text-ivory relative z-10">
      {/* ── Photo Gallery Hero ── */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-white/[0.02] backdrop-blur-[2px] border-b border-gold/20">
        <Container className="relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-3.5 sm:space-y-4">
            <div className="flex justify-center -mb-2">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 transition-transform hover:scale-105">
                <Image
                  src="/images/logo-emblem.png"
                  alt="Wedding Flora Crest"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <p className="font-sans text-[9px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.32em] text-[#D4AF37] font-bold flex items-center justify-center gap-1.5 sm:gap-2 px-2">
              <span>✦</span>
              <span>Visual Masterpieces &amp; Floral Scenography</span>
              <span>✦</span>
            </p>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-ivory tracking-[0.03em] leading-[1.18]">
              Royal Photo Gallery
            </h1>

            <Divider variant="ornamental" className="my-2.5 sm:my-3" />

            <p className="font-sans text-sm sm:text-lg text-ivory/80 font-medium leading-relaxed max-w-2xl mx-auto">
              High-resolution visual archives of bespoke mandaps, crystal palace stages, and sacred Vedic ceremonies crafted across Udaipur, Jaipur, Jodhpur, and heritage Rajasthan.
            </p>

            {/* Quick Stat Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
              <div className="px-4 py-2 rounded-full bg-white/[0.04] border border-gold/30 text-ivory flex items-center gap-2">
                <Camera className="w-4 h-4 text-gold" />
                <span className="font-bold text-gold">13+</span>
                <span className="text-ivory/80">Curated Palace Sets</span>
              </div>

              <div className="px-4 py-2 rounded-full bg-white/[0.04] border border-gold/30 text-ivory flex items-center gap-2">
                <Flower2 className="w-4 h-4 text-gold" />
                <span className="text-ivory/80">Handcrafted Floral Mandaps</span>
              </div>

              <Link
                href="/gallery/videos"
                className="px-4 py-2 rounded-full bg-gold/10 hover:bg-gold hover:text-midnight border border-gold/40 text-gold font-bold transition-all flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                <span>Switch to Video Gallery (4K Reels) →</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Main Photo Gallery Grid Section ── */}
      <Section variant="charcoal">
        <Container>
          <Suspense
            fallback={
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
                <p className="text-xs uppercase tracking-widest text-gold font-bold">
                  Loading Photo Gallery...
                </p>
              </div>
            }
          >
            <GalleryGrid mode="photos" />
          </Suspense>
        </Container>
      </Section>

      {/* ── Consultation CTA ── */}
      <section className="bg-black/60 backdrop-blur-md text-ivory py-16 sm:py-20 text-center relative overflow-hidden border-t border-gold/20">
        <Container size="narrow" className="relative z-10 space-y-5">
          <div className="flex items-center justify-center gap-1.5 text-gold text-xs font-bold uppercase tracking-[0.25em]">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Inspired by Our Floral &amp; Palace Decor?</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-ivory">
            Bring Your Royal Vision to Life
          </h2>

          <p className="font-sans text-sm sm:text-base text-ivory/80 font-medium max-w-xl mx-auto leading-relaxed">
            Every set and floral arch in our photo gallery was custom-designed for the venue and couple. Connect with our artistic directors to begin crafting yours.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              <span>Book Private Consultation</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-ivory hover:text-gold transition-colors py-3 px-6"
            >
              <span>Explore All Archives</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
