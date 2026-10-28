import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { Crown, Sparkles, HeartHandshake, Compass, ArrowRight, Quote } from "lucide-react";

export const metadata = {
  title: "About the Director | Wedding Flora • Royal Wedding Planner",
  description:
    "Meet the visionary founder and director behind Wedding Flora — orchestrating royal heritage weddings, bespoke mandap scenography, and luxury celebrations across Udaipur, Jaipur, and beyond.",
};

export default function DirectorPage() {
  return (
    <main className="min-h-screen text-ivory relative z-10">
      {/* ── Director Hero ── */}
      <section className="relative py-14 sm:py-24 overflow-hidden bg-white/[0.02] backdrop-blur-[2px] border-b border-gold/20">
        <Container className="relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-3.5 sm:space-y-4">
            <div className="flex justify-center -mb-2">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 transition-transform hover:scale-105">
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
              <span>The Visionary Behind Wedding Flora</span>
              <span>✦</span>
            </p>

            <h1 className="font-display text-2xl sm:text-5xl lg:text-6xl font-bold text-ivory tracking-[0.03em] leading-[1.18]">
              A Lifelong Devotion to <br className="hidden sm:block" />
              <span className="text-gold-gradient font-serif font-normal italic">
                Regal Grandeur &amp; Floral Artistry
              </span>
            </h1>

            <Divider variant="ornamental" className="my-2.5 sm:my-3" />

            <p className="font-sans text-base sm:text-lg text-ivory/80 font-normal leading-relaxed max-w-2xl mx-auto">
              Meet the creative force curating India&apos;s most sought-after royal celebrations. Blending royal Rajasthani heritage with modern haute couture scenography, our director leads every wedding as a sacred masterpiece.
            </p>
          </div>
        </Container>
      </section>

      {/* ── The Director's Narrative & Editorial Portrait ── */}
      <Section variant="ivory">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Column / Editorial Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-gold/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
                  alt="Director and Principal Wedding Architect of Wedding Flora"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090614]/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-ivory">
                  <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                    Leadership &amp; Vision
                  </span>
                  <p className="font-serif text-xl font-semibold leading-snug">
                    {/* TODO: replace with the director's full legal name */}
                    Creative Director &amp; Founder
                  </p>
                  <p className="font-sans text-xs text-ivory/70 mt-1 uppercase tracking-wider">
                    Wedding Flora • Est. 2014
                  </p>
                </div>
              </div>

              {/* Floating Monogram Seal */}
              <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center justify-center w-24 h-24 rounded-full bg-[#090614] border-2 border-gold shadow-2xl p-2">
                <div className="relative w-full h-full">
                  <Image src="/images/logo-emblem.png" alt="Director Seal" fill className="object-contain" />
                </div>
              </div>
            </div>

            {/* Story & Vision narrative */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.32em] text-[#D4AF37] font-bold flex items-center gap-2">
                <span>✦</span>
                <span>The Director&apos;s Philosophy</span>
              </span>

              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-ivory tracking-[0.03em] leading-[1.2]">
                &ldquo;A wedding is not merely an event; it is an emotional coronation.&rdquo;
              </h2>

              <p className="font-sans text-ivory/80 text-base sm:text-lg font-medium leading-relaxed">
                With a background deeply rooted in classical Indian art, spatial architecture, and luxury event design, our Director founded Wedding Flora out of an enduring love for the royal splendor of Udaipur, Jaipur, and Jodhpur.
              </p>

              <p className="font-sans text-ivory/80 text-base sm:text-lg font-medium leading-relaxed">
                Rather than treating celebrations as commercial productions, the Director personally curates every celebration as an intimate, bespoke heirloom. From hand-sketching mandap blueprints beneath historic cenotaphs to curating dawn flower auctions for rare white lilies and scented tuberose, no detail escapes the director&apos;s personal devotion.
              </p>

              <div className="p-6 rounded-xl bg-white/[0.03] border-l-4 border-gold border-y border-r border-white/10 relative">
                <Quote className="w-6 h-6 text-gold/40 mb-2" />
                <p className="font-serif text-lg sm:text-xl text-ivory italic leading-relaxed">
                  &ldquo;When a family invites us into their sacred celebrations, we treat that honor with reverent care. Every flower garland, every chandelier, and every guest greeting must reflect the timeless dignity of their family history.&rdquo;
                </p>
                <p className="text-xs font-sans uppercase tracking-widest text-[#D4AF37] font-bold mt-3">
                  — Director, Wedding Flora
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Button href="/contact" variant="primary" size="md">
                  Book a Private Consultation
                </Button>
                <Link
                  href="/about"
                  className="inline-flex items-center text-xs uppercase tracking-widest text-ivory/90 font-semibold hover:text-gold transition-colors gap-2 self-center px-4"
                >
                  <span>Explore Company Story</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Pillars of the Director's Craft ── */}
      <Section variant="cream">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Curatorial Devotion"
            title="The Director's Four Signature Pillars"
            subtitle="The non-negotiable principles that shape every grand celebration orchestrating by Wedding Flora."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-[#090614]/70 backdrop-blur-xl border border-white/10 hover:border-gold/50 shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-ivory">
                <Crown className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-ivory">Royal Scenography</h3>
              <p className="font-sans text-xs sm:text-sm text-ivory/80 leading-relaxed font-medium">
                Deep architectural harmony with historic forts and 5-star palace courtyards, creating grand stages that honor their regal surroundings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090614]/70 backdrop-blur-xl border border-white/10 hover:border-gold/50 shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-ivory">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-ivory">Floral Sculpting</h3>
              <p className="font-sans text-xs sm:text-sm text-ivory/80 leading-relaxed font-medium">
                Pioneering botanical architecture that uses tens of thousands of natural Mogra, Rajnigandha, and exotic blooms as sculptural art.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090614]/70 backdrop-blur-xl border border-white/10 hover:border-gold/50 shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-ivory">
                <HeartHandshake className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-ivory">Direct Family Care</h3>
              <p className="font-sans text-xs sm:text-sm text-ivory/80 leading-relaxed font-medium">
                Personal involvement at every planning milestone, giving couples and families direct executive access from day one through the wedding night.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090614]/70 backdrop-blur-xl border border-white/10 hover:border-gold/50 shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-ivory">
                <Compass className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-ivory">Flawless Precision</h3>
              <p className="font-sans text-xs sm:text-sm text-ivory/80 leading-relaxed font-medium">
                Managing multi-day destination logistics with calm, military precision — ensuring hosts and guests can soak in every blissful second.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Signature Sign-Off & Call to Action ── */}
      <section className="bg-black/50 backdrop-blur-md text-ivory py-16 sm:py-20 text-center relative overflow-hidden grain-overlay border-t border-gold/20">
        <Container size="narrow" className="relative z-10 space-y-6">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
            Executive Consultation
          </p>

          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-ivory">
            Bring Your Dream Wedding to Life
          </h2>

          <p className="font-sans text-base sm:text-lg text-ivory/80 font-medium max-w-xl mx-auto leading-relaxed">
            Our Director and master production team accept only a limited number of destination weddings each season to guarantee undivided artistry and attention.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Request Director Consultation
            </Button>
            <Button href="/celebrations" variant="outline" className="border-gold text-ivory hover:bg-gold/20" size="lg">
              View Curated Portfolio
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
