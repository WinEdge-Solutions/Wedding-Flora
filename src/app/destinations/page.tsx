import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { rajasthanDestinations } from "@/lib/content/destinations";
import { MapPin, Calendar, Sparkles, ArrowRight, Check } from "lucide-react";

export const metadata = {
  title: "Royal Rajasthan Wedding Destinations | Wedding Flora",
  description:
    "Explore iconic royal wedding destinations across Rajasthan: Jaipur, Udaipur, Jodhpur, Bikaner, Pushkar, Ranthambore, Jaisalmer, and Jhunjhunu.",
};

export default function DestinationsPage() {
  return (
    <main className="min-h-screen text-ivory relative z-10">
      {/* ── Destinations Hero ── */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-white/[0.02] backdrop-blur-[2px] border-b border-gold/20">
        <Container className="relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-3.5 sm:space-y-4">
            <p className="font-sans text-[9px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.32em] text-[#D4AF37] font-bold flex items-center justify-center gap-1.5 sm:gap-2 px-2">
              <span>✦</span>
              <span>Royal Indian Wedding Destinations</span>
              <span>✦</span>
            </p>

            <h1 className="font-display text-2xl sm:text-5xl lg:text-6xl font-bold text-ivory tracking-[0.03em] leading-[1.18]">
              Rajasthan&apos;s Grandest Wedding Sanctuaries
            </h1>

            <Divider variant="ornamental" className="my-2.5 sm:my-3" />

            <p className="font-sans text-sm sm:text-lg text-ivory/80 font-medium leading-relaxed max-w-2xl mx-auto">
              From the shimmering fairytale lake palaces of Udaipur to the pink sandstone fortresses of Jaipur and golden sands of Jaisalmer, immerse your celebration in timeless regal heritage.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Quick City Jump Bar ── */}
      <nav
        aria-label="Rajasthan Cities"
        className="sticky top-[68px] z-30 bg-[#090614]/90 backdrop-blur-xl border-b border-gold/20 py-2.5 overflow-x-auto no-scrollbar shadow-lg"
      >
        <Container>
          <div className="flex items-center justify-start lg:justify-center gap-2 min-w-max px-2">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mr-1 hidden sm:inline-flex items-center gap-1">
              <span>✦</span> RAJASTHAN:
            </span>
            {rajasthanDestinations.map((city) => (
              <a
                key={city.id}
                href={`#${city.id}`}
                className="px-3.5 py-1 rounded-full text-xs font-semibold text-ivory/85 bg-white/[0.04] border border-white/10 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-200 whitespace-nowrap"
              >
                {city.name}
              </a>
            ))}
          </div>
        </Container>
      </nav>

      {/* ── Detailed City Showcase ── */}
      <Section variant="ivory">
        <Container>
          <div className="space-y-20 lg:space-y-28">
            {rajasthanDestinations.map((city, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={city.id}
                  id={city.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center scroll-mt-32 ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                      <Image
                        src={city.imageUrl}
                        alt={`${city.name} Destination Wedding by Wedding Flora`}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090614]/85 via-transparent to-transparent" />
                      
                      {/* Vibe Badge Overlay */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-[10px] uppercase tracking-wider text-gold font-bold flex items-center gap-1.5">
                        <Sparkles size={11} />
                        <span>{city.vibe}</span>
                      </div>

                      {/* Best Season Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-ivory/90 font-medium">
                        <span className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                          <Calendar size={12} className="text-gold" />
                          <span>Ideal: {city.bestSeason}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                          <MapPin size={12} className="text-gold" />
                          <span>Rajasthan</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className={`lg:col-span-6 space-y-4 sm:space-y-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] font-bold block">
                      Destination 0{index + 1} • Rajasthan
                    </span>

                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ivory tracking-tight leading-tight flex flex-wrap items-center gap-3">
                      <span>{city.name}</span>
                      <span className="text-xs font-sans font-bold px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30">
                        {city.hotels.length} Venues
                      </span>
                    </h2>

                    <p className="text-xs sm:text-sm font-sans font-bold text-gold uppercase tracking-wider">
                      {city.tagline}
                    </p>

                    <p className="text-sm sm:text-base text-ivory/80 font-medium leading-relaxed">
                      {city.description}
                    </p>

                    {/* Iconic Venues List */}
                    <div className="space-y-2 pt-2">
                      <p className="text-xs uppercase tracking-wider text-ivory font-bold flex items-center gap-1.5">
                        <span className="text-gold">✦</span> Iconic Palace &amp; Heritage Venues:
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {city.venues.map((venue, vIdx) => (
                          <li key={vIdx} className="flex items-start gap-2 text-xs text-ivory/75 font-medium">
                            <span className="mt-0.5 p-0.5 rounded-full bg-gold/20 text-[#D4AF37] shrink-0">
                              <Check className="w-3 h-3 text-[#D4AF37]" />
                            </span>
                            <span>{venue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTAs */}
                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <Button href={`/destinations/${city.id}`} variant="primary" size="sm">
                        Explore All {city.hotels.length} Venues
                      </Button>
                      <Button href={`/contact?destination=${city.id}`} variant="outline" size="sm">
                        Plan In {city.name}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── Destination Consultation CTA ── */}
      <section className="bg-black/50 backdrop-blur-md text-ivory py-16 text-center relative overflow-hidden border-t border-gold/20">
        <Container size="narrow" className="relative z-10 space-y-5">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
            Bespoke Destination Planning
          </p>

          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-ivory">
            Planning a Royal Destination Wedding?
          </h2>

          <p className="font-sans text-base text-ivory/80 font-medium max-w-xl mx-auto leading-relaxed">
            Our destination scouting concierges arrange private palace inspections, preferential room tariffs, and customized multi-day itineraries across Rajasthan.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Book Destination Consultation
            </Button>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-ivory hover:text-gold transition-colors py-3 px-6"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
