import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { HotelDirectory } from "@/components/destinations/HotelDirectory";
import { rajasthanDestinations } from "@/lib/content/destinations";
import { Sparkles, ArrowLeft, Calendar, Building2, Crown } from "lucide-react";

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
    title: `Destination Wedding in ${destination.name} (${destination.hotels.length} Luxury Palaces & Venues) | Wedding Flora`,
    description: `Explore ${destination.hotels.length} premier wedding venues and heritage palaces in ${destination.name}, Rajasthan. Room inventories, guest capacities, and royal wedding planning by Wedding Flora.`,
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
              Rajasthan • {destination.name} ({destination.hotels.length} Venues)
            </span>
          </div>
        </Container>
      </div>

      {/* ── City Hero ── */}
      <section className="relative py-14 sm:py-20 overflow-hidden bg-white/[0.02] backdrop-blur-[2px] border-b border-gold/20">
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

            {/* Quick stats pills */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
              <div className="px-4 py-2 rounded-full bg-white/[0.04] border border-gold/30 text-ivory flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gold" />
                <span className="font-bold text-gold">{destination.hotels.length}</span>
                <span className="text-ivory/80">Signature Venues Listed</span>
              </div>

              <div className="px-4 py-2 rounded-full bg-white/[0.04] border border-gold/30 text-ivory flex items-center gap-2">
                <Crown className="w-4 h-4 text-gold" />
                <span className="text-ivory/80">{destination.vibe}</span>
              </div>

              <div className="px-4 py-2 rounded-full bg-white/[0.04] border border-gold/30 text-ivory flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold" />
                <span className="text-ivory/80">Best Season:</span>
                <span className="font-bold text-gold">{destination.bestSeason}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── City Overview & Logistics ── */}
      <Section variant="ivory" className="border-b border-white/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                <Image
                  src={destination.imageUrl}
                  alt={`${destination.name} Royal Wedding Celebration`}
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

            {/* Strategic Overview */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold block">
                  Bespoke Planning in {destination.name}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ivory">
                  From Royal Palaces to Desert Fortresses
                </h2>
              </div>

              <p className="font-sans text-sm sm:text-base text-ivory/80 leading-relaxed font-medium">
                Our in-house production, hospitality, and decor teams coordinate every aspect of royal celebrations across {destination.name}. Whether you are envisioning a multi-day buyout of an ancient Maharaja’s palace or a contemporary luxury resort with sweeping courtyards, our direct relationships guarantee unmatched privilege and exclusivity.
              </p>

              <div className="p-4 rounded-xl bg-[#090614]/70 border border-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-ivory/60 block font-semibold">
                    Have Preferred Dates for {destination.name}?
                  </span>
                  <span className="font-serif text-base font-bold text-gold">
                    Check Palace Availability &amp; Get Custom Estimate
                  </span>
                </div>
                <Button href={`/contact?destination=${destination.id}`} variant="primary" size="sm" className="shrink-0">
                  Plan in {destination.name}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Complete Hotels & Venues Directory ── */}
      <Section variant="charcoal">
        <Container>
          <HotelDirectory
            cityName={destination.name}
            hotels={destination.hotels}
          />
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
