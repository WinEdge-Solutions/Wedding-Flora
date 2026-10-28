import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { rajasthanDestinations } from "@/lib/content/destinations";
import { Sparkles, ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return rajasthanDestinations.map((city) => ({
    city: city.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const destination = rajasthanDestinations.find((d) => d.id === city);
  if (!destination) return { title: "Destination | Wedding Flora" };

  return {
    title: `Destination Wedding in ${destination.name} | Royal Wedding Flora`,
    description: `Plan your dream royal destination wedding in ${destination.name}, Rajasthan. Iconic palace venues, custom floral mandap scenography, and luxury hospitality.`,
  };
}

export default async function CityDestinationPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const destination = rajasthanDestinations.find((d) => d.id === city);

  if (!destination) {
    notFound();
  }

  return (
    <main className="min-h-screen text-ivory relative z-10">
      {/* ── Breadcrumb & Back Link ── */}
      <div className="bg-[#090614]/80 backdrop-blur-md border-b border-white/10 py-3">
        <Container>
          <div className="flex items-center justify-between text-xs">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-1.5 text-ivory/70 hover:text-gold transition-colors font-medium"
            >
              <ArrowLeft size={14} className="text-gold" />
              <span>All Rajasthan Destinations</span>
            </Link>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
              Rajasthan • {destination.name}
            </span>
          </div>
        </Container>
      </div>

      {/* ── City Hero ── */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-white/[0.02] backdrop-blur-[2px] border-b border-gold/20">
        <Container className="relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-3.5 sm:space-y-4">
            <p className="font-sans text-[9px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.32em] text-[#D4AF37] font-bold flex items-center justify-center gap-1.5 sm:gap-2 px-2">
              <span>✦</span>
              <span>Royal Rajasthan Destination</span>
              <span>✦</span>
            </p>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-ivory tracking-[0.03em] leading-[1.18]">
              Destination Wedding in {destination.name}
            </h1>

            <Divider variant="ornamental" className="my-2.5 sm:my-3" />

            <p className="text-sm font-sans font-bold text-gold uppercase tracking-wider">
              {destination.tagline}
            </p>

            <p className="font-sans text-sm sm:text-lg text-ivory/80 font-medium leading-relaxed max-w-2xl mx-auto">
              {destination.description}
            </p>
          </div>
        </Container>
      </section>

      {/* ── Detail Content ── */}
      <Section variant="ivory">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                <Image
                  src={destination.imageUrl}
                  alt={`${destination.name} Royal Wedding`}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090614]/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-[10px] uppercase tracking-wider text-gold font-bold flex items-center gap-1.5">
                  <Sparkles size={11} />
                  <span>{destination.vibe}</span>
                </div>
              </div>
            </div>

            {/* Inclusions & Logistics Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold block mb-1">
                  Premier Venues
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ivory">
                  Iconic Palace &amp; Heritage Estates in {destination.name}
                </h2>
              </div>

              <ul className="space-y-3">
                {destination.venues.map((venue, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-gold/20 text-[#D4AF37] flex items-center justify-center text-xs font-bold shrink-0">
                        ✓
                      </span>
                      <span className="font-serif text-base text-ivory font-medium">
                        {venue}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-gold font-semibold hidden sm:inline-block">
                      Verified Venue
                    </span>
                  </li>
                ))}
              </ul>

              <div className="p-4 rounded-xl bg-[#090614]/70 border border-gold/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-ivory/60 block font-semibold">
                    Optimal Celebration Window
                  </span>
                  <span className="font-serif text-lg font-bold text-gold">
                    {destination.bestSeason}
                  </span>
                </div>
                <Button href={`/contact?destination=${destination.id}`} variant="primary" size="sm">
                  Inquire For {destination.name}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Consultation CTA ── */}
      <section className="bg-black/50 backdrop-blur-md text-ivory py-16 text-center relative overflow-hidden border-t border-gold/20">
        <Container size="narrow" className="relative z-10 space-y-4">
          <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-ivory">
            Begin Planning Your {destination.name} Celebration
          </h3>
          <p className="font-sans text-sm sm:text-base text-ivory/80 max-w-xl mx-auto leading-relaxed">
            Our principal planners manage palace contracts, guest transfers, and bespoke decor for royal weddings in {destination.name}.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Button href={`/contact?destination=${destination.id}`} variant="primary" size="md">
              Plan in {destination.name}
            </Button>
            <Button href="/destinations" variant="outline" size="md">
              View All Destinations
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
