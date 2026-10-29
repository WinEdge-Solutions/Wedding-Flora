import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { celebrationStories } from "@/lib/content/celebrations";
import { galleryData } from "@/lib/content/gallery";
import { MapPin, Calendar, Users, Sparkles, Quote } from "lucide-react";

export const metadata = {
  title: "Celebrations & Royal Wedding Stories | Wedding Flora",
  description:
    "Explore sample stories, real royal weddings, opulent floral mandaps, and grand Sangeet productions curated by Wedding Flora across palaces in India.",
};

export default function CelebrationsPage() {
  return (
    <main className="min-h-screen text-ivory relative z-10">
      {/* ── Celebrations Hero ── */}
      <section className="relative py-14 sm:py-24 overflow-hidden bg-white/[0.02] backdrop-blur-[2px] border-b border-gold/20">
        <Container className="relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-3.5 sm:space-y-4">
            <p className="font-sans text-[9px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.32em] text-[#D4AF37] font-bold flex items-center justify-center gap-1.5 sm:gap-2 px-2">
              <span>✦</span>
              <span>Real Royal Wedding Stories &amp; Visual Archives</span>
              <span>✦</span>
            </p>

            <h1 className="font-display text-2xl sm:text-5xl lg:text-6xl font-bold text-ivory tracking-[0.03em] leading-[1.18]">
              Love Celebrated in Regal Grandeur
            </h1>

            <Divider variant="ornamental" className="my-2.5 sm:my-3" />

            <p className="font-sans text-sm sm:text-lg text-ivory/80 font-medium leading-relaxed max-w-2xl mx-auto">
              Step inside our world of regal palace celebrations across Udaipur, Jaipur, Jodhpur, and coastal sanctuaries. Explore sample stories, sacred rituals, and bespoke floral architecture.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Real Wedding Stories (Detailed Showcase) ── */}
      <Section variant="ivory">
        <Container>
          <SectionHeading
            align="left"
            eyebrow="Featured Heirlooms"
            title="Real Royal Wedding Stories"
            subtitle="Explore how we curated three days of unforgettable palace ceremonies for each of our distinguished couples."
          />

          <div className="space-y-16 sm:space-y-24 pt-4">
            {celebrationStories.map((story) => (
              <article
                key={story.id}
                id={story.slug}
                className="rounded-[3px] bg-[#090614]/70 backdrop-blur-xl border border-white/10 p-5 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)] space-y-8 sm:space-y-10"
              >
                {/* Story Header */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#D4AF37] font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gold" />
                        {story.venue} • {story.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        {story.season}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-gold" />
                        {story.guestCount}
                      </span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ivory leading-tight">
                      {story.title}
                    </h2>

                    <p className="font-sans text-sm sm:text-base text-gold font-bold uppercase tracking-wider">
                      {story.couple} — {story.tagline}
                    </p>

                    <div className="space-y-3 pt-2 text-ivory/80 font-medium text-sm sm:text-base leading-relaxed">
                      {story.narrative.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {/* Main Cover Visual */}
                  <div className="lg:col-span-5">
                    <div className="relative aspect-[4/5] rounded-[3px] overflow-hidden border border-gold/30 shadow-md group">
                      <Image
                        src={story.coverImage}
                        alt={story.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090614]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6 text-ivory">
                        <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                          Royal Destination
                        </span>
                        <p className="font-serif text-2xl font-bold leading-snug">
                          {story.couple}
                        </p>
                        <p className="text-xs text-ivory/80 font-sans mt-0.5">
                          {story.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Highlights Bar */}
                <div className="p-6 rounded-[3px] bg-[#06040e]/80 border border-white/10">
                  <h4 className="text-xs uppercase tracking-wider text-ivory font-bold mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span>Ceremony &amp; Scenography Highlights</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {story.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="text-xs text-ivory/80 font-medium flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photo Gallery Grid */}
                <div>
                  <h4 className="font-serif text-xl font-semibold text-ivory mb-4">
                    Photo Archive • {story.couple}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {story.gallery.map((photo, gIdx) => (
                      <div key={gIdx} className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-gold/20 shadow-sm">
                        <Image
                          src={photo.url}
                          alt={photo.caption}
                          fill
                          sizes="(max-width: 640px) 100vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[#090614]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                          <p className="text-xs text-ivory font-medium leading-tight">
                            {photo.caption}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Couple Quote */}
                <div className="p-6 sm:p-8 rounded-[3px] bg-[#06040e]/60 border-l-4 border-gold border-y border-r border-white/10 relative">
                  <Quote className="w-8 h-8 text-gold/40 mb-2" />
                  <blockquote className="font-serif text-lg sm:text-xl font-semibold text-ivory italic leading-relaxed">
                    &ldquo;{story.quote.text}&rdquo;
                  </blockquote>
                  <p className="text-xs font-sans uppercase tracking-wider text-gold font-bold mt-3">
                    — {story.quote.author}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Sample Video Reels & Moments ── */}
      <Section variant="cream" className="border-t border-b border-gold/20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Cinematic Celebrations"
            title="The Living Video Archives"
            subtitle="Glimpses into our live Sangeet concerts, Mandap flower falls, and regal palace processions across India."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {galleryData.slice(0, 3).map((item) => (
              <div key={item.id} className="rounded-[3px] overflow-hidden bg-[#090614]/70 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)] group">
                <div className="relative aspect-[9/16] max-h-[460px] w-full overflow-hidden bg-[#030308]">
                  {item.videoUrl ? (
                    <video
                      src={item.videoUrl}
                      poster={item.imageUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                  )}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 text-[10px] font-bold uppercase tracking-wider text-gold backdrop-blur-md">
                    {item.category}
                  </div>
                </div>

                <div className="p-5 space-y-1">
                  <h4 className="font-serif text-lg font-semibold text-ivory">
                    {item.title}
                  </h4>
                  <p className="text-xs font-sans text-ivory/80 font-medium">
                    {item.location} • {item.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Bottom CTA ── */}
      <section className="bg-black/50 backdrop-blur-md text-ivory py-16 text-center relative overflow-hidden grain-overlay border-t border-gold/20">
        <Container size="narrow" className="relative z-10 space-y-5">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
            Create Your Own Story
          </p>

          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-ivory">
            Begin Your Celebration With Wedding Flora
          </h2>

          <p className="font-sans text-base text-ivory/80 font-medium max-w-xl mx-auto leading-relaxed">
            Let us craft an immortal celebration in Rajasthan, Delhi NCR, or scenic Goa with bespoke floral architecture and unforgettable hospitality.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Plan Your Celebration
            </Button>
            <Button href="/packages" variant="outline" size="lg" className="border-gold text-ivory hover:bg-gold/20">
              View Packages &amp; Services
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
