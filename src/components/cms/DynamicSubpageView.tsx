"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useCms, usePageConfig } from "@/components/cms/CmsProvider";
import {
  CustomSectionRenderer,
  PageCtaBlock,
  PageHeroBlock,
} from "@/components/cms/CustomSectionRenderer";
import { InstagramShowcase } from "@/components/about/InstagramShowcase";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { FullServiceView } from "@/components/services/FullServiceView";
import { PlanningProcessSection } from "@/components/rituals/PlanningProcessSection";
import { SacredCeremoniesSection } from "@/components/rituals/SacredCeremoniesSection";
import { RitualsFaqSection } from "@/components/rituals/RitualsFaqSection";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import type { PageKey, PageSectionConfig, PillarCardItem } from "@/lib/cms/types";
import {
  ArrowRight,
  Award,
  Calendar,
  Check,
  Clock,
  Compass,
  Crown,
  ExternalLink,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const PILLAR_ICON_MAP: Record<PillarCardItem["icon"], React.ReactNode> = {
  crown: <Crown className="w-6 h-6 text-gold" />,
  sparkles: <Sparkles className="w-6 h-6 text-gold" />,
  heart: <HeartHandshake className="w-6 h-6 text-gold" />,
  compass: <Compass className="w-6 h-6 text-gold" />,
  award: <Award className="w-6 h-6 text-gold" />,
  shield: <ShieldCheck className="w-6 h-6 text-gold" />,
};

export function DynamicSubpageView({
  pageKey,
  galleryMode,
}: {
  pageKey: PageKey;
  galleryMode?: "all" | "photos" | "videos";
}) {
  const cms = useCms();
  const pageConfig = usePageConfig(pageKey);
  const visibleSections = pageConfig.sections.filter((s) => s.visible);

  return (
    <main className="min-h-screen text-ivory relative z-10">
      {visibleSections.map((section) => (
        <React.Fragment key={section.id}>
          {renderSection(section, pageKey, cms, galleryMode)}
        </React.Fragment>
      ))}
    </main>
  );
}

function renderSection(
  section: PageSectionConfig,
  pageKey: PageKey,
  cms: ReturnType<typeof useCms>,
  galleryMode?: "all" | "photos" | "videos"
) {
  const c = section.content;

  switch (section.kind) {
    case "page-hero":
      return (
        <>
          <PageHeroBlock section={section} />
          {c.showQuickJump && pageKey === "destinations" && (
            <nav
              aria-label="Rajasthan Cities"
              className="sticky top-[64px] z-30 bg-[#FDFAF5]/95 backdrop-blur-xl border-b border-gold/20 shadow-sm py-2.5 overflow-x-auto no-scrollbar"
            >
              <Container>
                <div className="flex items-center justify-start lg:justify-center gap-2 min-w-max px-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mr-1 hidden sm:inline-flex items-center gap-1">
                    <span>✦</span> RAJASTHAN:
                  </span>
                  {cms.collections.destinations.map((city) => (
                    <a
                      key={city.id}
                      href={`#${city.id}`}
                      className="px-3.5 py-1 rounded-[2px] text-xs font-semibold text-[#1A1209] bg-[#FAF7F2] border border-gold/20 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-200 whitespace-nowrap"
                    >
                      {city.name}
                    </a>
                  ))}
                </div>
              </Container>
            </nav>
          )}
          {c.showQuickJump && pageKey === "workingProcess" && (
            <nav
              aria-label="Working Process Quick Jump"
              className="sticky top-[58px] z-30 bg-[#FDFAF5]/95 backdrop-blur-xl border-b border-gold/15 py-2.5 overflow-x-auto no-scrollbar shadow-sm"
            >
              <Container>
                <div className="flex items-center justify-start sm:justify-center gap-3 min-w-max px-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mr-1 hidden sm:inline-flex items-center gap-1">
                    <span>✦</span> EXPLORE:
                  </span>
                  <a
                    href="#working-process"
                    className="px-4 py-1.5 rounded-[2px] text-xs font-semibold text-[#1A1209] bg-[#FAF7F2] border border-gold/20 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-200 whitespace-nowrap"
                  >
                    The 7-Step Working Process
                  </a>
                  <a
                    href="#sacred-ceremonies"
                    className="px-4 py-1.5 rounded-[2px] text-xs font-semibold text-[#1A1209] bg-[#FAF7F2] border border-gold/20 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-200 whitespace-nowrap"
                  >
                    Sacred Ceremonies We Curate
                  </a>
                  <a
                    href="#faqs"
                    className="px-4 py-1.5 rounded-[2px] text-xs font-semibold text-[#1A1209] bg-[#FAF7F2] border border-gold/20 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-200 whitespace-nowrap"
                  >
                    Process &amp; Timing FAQ
                  </a>
                </div>
              </Container>
            </nav>
          )}
        </>
      );

    case "about-story": {
      const textFirst = section.layout === "split-right";
      return (
        <Section variant={section.bgVariant}>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className={`lg:col-span-7 xl:col-span-8 relative ${textFirst ? "lg:order-2" : "lg:order-1"}`}>
                <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center">
                  <div className="col-span-12 sm:col-span-8 relative aspect-[4/5] rounded-[3px] overflow-hidden border border-gold/30 shadow-[0_20px_60px_rgba(0,0,0,0.15)] group bg-white p-1.5 sm:p-2">
                    <div className="relative w-full h-full overflow-hidden rounded-[2px]">
                      {c.imageUrl && (
                        <Image
                          src={c.imageUrl}
                          alt={c.imageAlt || "Royal Palace Wedding Architecture"}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          priority
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        {c.badgeText && (
                          <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                            ✦ {c.badgeText}
                          </span>
                        )}
                        {c.quoteText && (
                          <p className="font-serif text-lg sm:text-xl font-semibold leading-snug">
                            {c.quoteText}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block sm:col-span-4 space-y-3">
                    {c.secondaryImageUrl && (
                      <div className="relative aspect-[3/4] rounded-[3px] overflow-hidden border border-gold/30 shadow-md bg-white p-1.5 group">
                        <div className="relative w-full h-full overflow-hidden rounded-[2px]">
                          <Image
                            src={c.secondaryImageUrl}
                            alt={c.secondaryImageAlt || "Handcrafted Floral Mandap Detail"}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <span className="text-[10px] font-sans uppercase tracking-wider text-gold font-bold block">
                              Floral Sculpture
                            </span>
                            <p className="text-xs font-serif text-white line-clamp-1">
                              Vedic Scenography
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {c.extraNote && (
                      <div className="p-3.5 rounded-[3px] bg-[#FAF7F2] border border-gold/25 text-center">
                        <span className="font-serif text-sm font-semibold text-[#1A1209]">
                          {c.extraNote}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-5 xl:col-span-4 space-y-5 ${textFirst ? "lg:order-1" : "lg:order-2"}`}>
                {c.eyebrow && (
                  <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.32em] text-[#D4AF37] font-bold flex items-center gap-2">
                    <span>✦</span>
                    <span>{c.eyebrow}</span>
                  </span>
                )}
                {c.title && (
                  <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-ivory tracking-[0.03em] leading-[1.2]">
                    {c.title}
                  </h2>
                )}
                {(c.paragraphs ?? []).map((p, idx) => (
                  <p key={idx} className="font-sans text-ivory/80 text-base sm:text-lg font-medium leading-relaxed">
                    {p}
                  </p>
                ))}
                {c.stats && c.stats.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gold/15">
                    {c.stats.map((st, idx) => (
                      <div key={idx}>
                        <h4 className="font-serif text-3xl font-bold text-ivory">{st.value}</h4>
                        <p className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold mt-1">
                          {st.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Section>
      );
    }

    case "about-pillars":
    case "director-pillars": {
      const cols =
        section.columns ??
        (section.layout === "grid-4" ? 4 : section.layout === "grid-2" ? 2 : 3);
      const gridClass =
        cols === 4
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          : cols === 2
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-3";
      return (
        <Section variant={section.bgVariant}>
          <Container>
            <SectionHeading
              align="center"
              eyebrow={c.eyebrow}
              title={c.title || ""}
              subtitle={c.subtitle}
            />
            <div className={`grid ${gridClass} gap-6 pt-4`}>
              {(c.cards ?? []).map((card, idx) => (
                <div
                  key={idx}
                  className="p-7 rounded-[3px] bg-white border border-gold/25 shadow-[0_8px_30px_rgba(26,18,9,0.06)] hover:border-gold/50 transition-all duration-300 space-y-3"
                >
                  <div className="w-11 h-11 rounded-full bg-gold/15 flex items-center justify-center text-ivory">
                    {PILLAR_ICON_MAP[card.icon] ?? PILLAR_ICON_MAP.crown}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ivory">
                    {card.title}
                  </h3>
                  <p className="font-sans text-sm text-ivory/80 font-medium leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      );
    }

    case "about-instagram":
      return (
        <Section variant={section.bgVariant} className="relative">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-600/10 border border-gold/30">
                <InstagramIcon className="w-4 h-4 text-rose-400" />
                <span className="text-xs uppercase tracking-widest font-bold text-ivory">
                  {c.eyebrow || "Explore Our Live Instagram Profile"}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ivory">
                {c.title || `@${cms.site.contact.instagramHandle}`}
              </h2>
              {c.subtitle && (
                <p className="font-sans text-sm sm:text-base text-ivory/80 font-medium">
                  {c.subtitle}
                </p>
              )}
            </div>
            <InstagramShowcase />
          </Container>
        </Section>
      );

    case "director-narrative": {
      const portraitRight = section.layout === "split-right";
      return (
        <Section variant={section.bgVariant}>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className={`lg:col-span-5 relative ${portraitRight ? "lg:order-2" : "lg:order-1"}`}>
                <div className="relative aspect-[4/5] rounded-[3px] overflow-hidden border border-gold/30 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                  {c.imageUrl && (
                    <Image
                      src={c.imageUrl}
                      alt={c.imageAlt || "Director of Wedding Flora"}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    {c.badgeText && (
                      <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                        {c.badgeText}
                      </span>
                    )}
                    {c.extraNote && (
                      <p className="font-serif text-lg font-semibold leading-snug">{c.extraNote}</p>
                    )}
                  </div>
                </div>
                {c.showCrest !== false && (
                  <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center justify-center w-24 h-24 rounded-full bg-white border-2 border-gold shadow-xl p-2">
                    <div className="relative w-full h-full">
                      <Image
                        src={cms.site.logoEmblemUrl}
                        alt="Director Seal"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className={`lg:col-span-7 space-y-6 ${portraitRight ? "lg:order-1" : "lg:order-2"}`}>
                {c.eyebrow && (
                  <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.32em] text-[#D4AF37] font-bold flex items-center gap-2">
                    <span>✦</span>
                    <span>{c.eyebrow}</span>
                  </span>
                )}
                {c.title && (
                  <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-ivory tracking-[0.03em] leading-[1.2]">
                    {c.title}
                  </h2>
                )}
                {(c.paragraphs ?? []).map((p, idx) => (
                  <p key={idx} className="font-sans text-ivory/80 text-base sm:text-lg font-medium leading-relaxed">
                    {p}
                  </p>
                ))}
                {c.quoteText && (
                  <div className="p-6 rounded-xl bg-white/60 border-l-4 border-gold border-y border-r border-gold/20 relative">
                    <Quote className="w-6 h-6 text-gold/40 mb-2" />
                    <p className="font-serif text-lg sm:text-xl text-ivory italic leading-relaxed">
                      &ldquo;{c.quoteText}&rdquo;
                    </p>
                    {c.quoteAuthor && (
                      <p className="text-xs font-sans uppercase tracking-widest text-[#D4AF37] font-bold mt-3">
                        {c.quoteAuthor}
                      </p>
                    )}
                  </div>
                )}
                <div className="pt-2 flex flex-wrap gap-4">
                  {c.primaryCtaLabel && c.primaryCtaHref && (
                    <Button href={c.primaryCtaHref} variant="primary" size="md">
                      {c.primaryCtaLabel}
                    </Button>
                  )}
                  {c.secondaryCtaLabel && c.secondaryCtaHref && (
                    <Link
                      href={c.secondaryCtaHref}
                      className="inline-flex items-center text-xs uppercase tracking-widest text-ivory/90 font-semibold hover:text-gold transition-colors gap-2 self-center px-4"
                    >
                      <span>{c.secondaryCtaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      );
    }

    case "services-showcase":
      return <FullServiceView section={section} />;

    case "destinations-directory": {
      const isCardGrid = section.layout === "grid-2" || section.layout === "grid-3";
      return (
        <Section variant={section.bgVariant}>
          <Container>
            {isCardGrid ? (
              <div
                className={`grid grid-cols-1 ${
                  section.layout === "grid-3" ? "lg:grid-cols-3" : "lg:grid-cols-2"
                } gap-8`}
              >
                {cms.collections.destinations.map((city) => (
                  <div
                    key={city.id}
                    id={city.id}
                    className="bg-white border border-gold/25 rounded-[3px] overflow-hidden shadow-sm flex flex-col justify-between scroll-mt-32"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={city.imageUrl}
                        alt={city.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between">
                        <h2 className="font-serif text-2xl font-semibold">{city.name}</h2>
                        <span className="text-xs font-bold text-gold">{city.hotels.length} Venues</span>
                      </div>
                    </div>
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-gold">
                          {city.tagline}
                        </p>
                        <p className="text-sm text-[#5C5147] leading-relaxed">{city.description}</p>
                      </div>
                      <div className="pt-3 flex flex-wrap gap-3">
                        <Button href={`/destinations/${city.id}`} variant="primary" size="sm">
                          Explore {city.hotels.length} Venues
                        </Button>
                        <Button href={`/contact?destination=${city.id}`} variant="outline" size="sm">
                          Plan In {city.name}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-20 lg:space-y-28">
                {cms.collections.destinations.map((city, index) => {
                  const isEven =
                    section.layout === "split-right" ? index % 2 === 0 : index % 2 === 1;
                  return (
                    <div
                      key={city.id}
                      id={city.id}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center scroll-mt-32"
                    >
                      <div className={`lg:col-span-7 xl:col-span-8 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                        <div className="relative aspect-[16/10] rounded-[3px] overflow-hidden border border-gold/30 shadow-[0_16px_45px_rgba(26,18,9,0.08)] bg-white p-1.5 sm:p-2 group">
                          <Image
                            src={city.imageUrl}
                            alt={`${city.name} Destination Wedding by Wedding Flora`}
                            fill
                            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-[10px] uppercase tracking-wider text-gold font-bold flex items-center gap-1.5">
                            <Sparkles size={11} />
                            <span>{city.vibe}</span>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white font-medium">
                            <span className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                              <Calendar size={12} className="text-gold" />
                              <span>Ideal: {city.bestSeason}</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                              <MapPin size={12} className="text-gold" />
                              <span>{city.region}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={`lg:col-span-5 xl:col-span-4 space-y-4 sm:space-y-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                        <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] font-bold block">
                          Destination 0{index + 1} • {city.region}
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
            )}
          </Container>
        </Section>
      );
    }

    case "process-steps":
      return (
        <section id="working-process" className="scroll-mt-32">
          <Section variant={section.bgVariant}>
            <Container>
              <PlanningProcessSection section={section} />
            </Container>
          </Section>
        </section>
      );

    case "process-rituals":
      return (
        <section id="sacred-ceremonies" className="scroll-mt-32">
          <Section variant={section.bgVariant}>
            <Container>
              <SacredCeremoniesSection section={section} />
            </Container>
          </Section>
        </section>
      );

    case "process-faqs":
      return (
        <section id="faqs" className="scroll-mt-32">
          <Section variant={section.bgVariant}>
            <Container>
              <RitualsFaqSection section={section} />
            </Container>
          </Section>
        </section>
      );

    case "gallery-grid": {
      const cols =
        section.columns ??
        (section.layout === "grid-4" ? 4 : section.layout === "grid-2" ? 2 : 3);
      return (
        <Section variant={section.bgVariant}>
          <Container>
            <Suspense
              fallback={
                <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
                  <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
                  <p className="text-xs uppercase tracking-widest text-gold font-bold">
                    Loading Royal Archives...
                  </p>
                </div>
              }
            >
              <GalleryGrid mode={galleryMode ?? "all"} columns={cols} />
            </Suspense>
          </Container>
        </Section>
      );
    }

    case "celebrations-stories":
      return (
        <Section variant={section.bgVariant}>
          <Container>
            <SectionHeading
              align="left"
              eyebrow={c.eyebrow || "Featured Heirlooms"}
              title={c.title || "Real Royal Wedding Stories"}
              subtitle={c.subtitle}
            />
            <div className="space-y-16 sm:space-y-24 pt-4">
              {cms.collections.celebrations.map((story) => (
                <article
                  key={story.id}
                  id={story.slug}
                  className="rounded-[3px] bg-white border border-gold/25 p-5 sm:p-10 lg:p-12 shadow-[0_12px_40px_rgba(26,18,9,0.08)] space-y-8 sm:space-y-10"
                >
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
                    <div className="lg:col-span-5">
                      <div className="relative aspect-[4/5] rounded-[3px] overflow-hidden border border-gold/30 shadow-md group">
                        <Image
                          src={story.coverImage}
                          alt={story.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                          <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                            Royal Destination
                          </span>
                          <p className="font-serif text-2xl font-bold leading-snug">{story.couple}</p>
                          <p className="text-xs text-white/80 font-sans mt-0.5">{story.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 rounded-[3px] bg-[#FAF7F2] border border-gold/20">
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
                  {story.gallery.length > 0 && (
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
                            <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                              <p className="text-xs text-white font-medium leading-tight">{photo.caption}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="p-6 sm:p-8 rounded-[3px] bg-[#FAF7F2] border-l-4 border-gold border-y border-r border-gold/25 shadow-sm relative">
                    <Quote className="w-8 h-8 text-gold/40 mb-2" />
                    <blockquote className="font-serif text-lg sm:text-xl font-semibold text-[#1A1209] italic leading-relaxed">
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
      );

    case "celebrations-reels": {
      const limit = section.itemLimit ?? 3;
      const cols = section.columns ?? (section.layout === "grid-2" ? 2 : 3);
      return (
        <Section variant={section.bgVariant} className="border-t border-b border-gold/20">
          <Container>
            <SectionHeading
              align="center"
              eyebrow={c.eyebrow || "Cinematic Celebrations"}
              title={c.title || "The Living Video Archives"}
              subtitle={c.subtitle}
            />
            <div className={`grid grid-cols-1 ${cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3"} gap-8 pt-4`}>
              {cms.collections.gallery.slice(0, limit).map((item) => (
                <div
                  key={item.id}
                  className="rounded-[3px] overflow-hidden bg-white border border-gold/25 shadow-[0_10px_30px_rgba(26,18,9,0.08)] group"
                >
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
                    <h4 className="font-serif text-lg font-semibold text-ivory">{item.title}</h4>
                    <p className="text-xs font-sans text-ivory/80 font-medium">
                      {item.location} • {item.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      );
    }

    case "blog-grid":
      return (
        <Section variant={section.bgVariant}>
          <Container>
            <BlogGrid columns={section.layout === "grid-2" ? 2 : 3} />
          </Container>
        </Section>
      );

    case "contact-main": {
      const formRight = section.layout === "split-right";
      return (
        <Section variant={section.bgVariant}>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              <div className={`lg:col-span-7 ${formRight ? "lg:order-2" : "lg:order-1"}`}>
                <Suspense
                  fallback={
                    <div className="p-12 text-center text-ivory/80 font-medium">
                      Loading enquiry form...
                    </div>
                  }
                >
                  <EnquiryForm />
                </Suspense>
              </div>

              <div className={`lg:col-span-5 space-y-6 ${formRight ? "lg:order-1" : "lg:order-2"}`}>
                <div className="p-6 sm:p-7 rounded-[3px] bg-white border border-gold/20 shadow-[0_8px_30px_rgba(26,18,9,0.06)] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                      <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block">
                        {c.badgeText || "Fastest Response"}
                      </span>
                      <h4 className="font-serif text-xl font-bold text-ivory">
                        {c.title || "Instant WhatsApp Concierge"}
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs text-ivory/80 font-medium leading-relaxed">
                    {c.subtitle}
                  </p>
                  <a
                    href={cms.site.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[2px] bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp ({cms.site.contact.phone})</span>
                  </a>
                </div>

                <div className="p-6 sm:p-7 rounded-[3px] bg-white border border-gold/15 shadow-[0_8px_30px_rgba(26,18,9,0.06)] space-y-5">
                  <h4 className="font-serif text-2xl font-semibold text-ivory pb-2 border-b border-gold/15">
                    Studios &amp; Direct Lines
                  </h4>
                  <div className="space-y-4 text-sm font-medium text-ivory/80">
                    <div className="flex items-start gap-3.5">
                      <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold block">
                          Head Office &amp; Planning Studio
                        </span>
                        <p className="text-ivory leading-relaxed text-xs sm:text-sm">
                          {cms.site.contact.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold block">
                          Direct Phone Line
                        </span>
                        <a
                          href={`tel:${cms.site.contact.phone.replace(/[^0-9+]/g, "")}`}
                          className="hover:text-gold transition-colors font-bold text-ivory text-xs sm:text-sm"
                        >
                          {cms.site.contact.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold block">
                          Official Enquiries
                        </span>
                        <a
                          href={`mailto:${cms.site.contact.email}`}
                          className="hover:text-gold transition-colors font-bold text-ivory text-xs sm:text-sm"
                        >
                          {cms.site.contact.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <InstagramIcon className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold block">
                          Official Instagram
                        </span>
                        <a
                          href={cms.site.contact.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gold transition-colors font-bold text-ivory text-xs sm:text-sm"
                        >
                          @{cms.site.contact.instagramHandle}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold block">
                          Consultation Hours
                        </span>
                        <p className="text-xs sm:text-sm">{cms.site.contact.consultationHours}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {cms.site.contact.mapsEmbedUrl && (
                  <div className="p-6 rounded-[3px] bg-white border border-gold/30 shadow-md space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">
                        <Navigation className="w-4 h-4 text-gold" />
                        <span>Studio Location</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-[2px]">
                        Open for Appointments
                      </span>
                    </div>
                    <div className="overflow-hidden rounded-[2px] border border-gold/20 relative">
                      <iframe
                        title="Wedding Flora Office Map"
                        src={cms.site.contact.mapsEmbedUrl}
                        width="100%"
                        height="190"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-48"
                      />
                    </div>
                    <div className="pt-1">
                      <a
                        href={cms.site.contact.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[2px] bg-[#FAF7F2] hover:bg-gold hover:text-black text-[#1A1209] text-xs uppercase tracking-wider font-bold transition-all border border-gold/30 hover:border-gold shadow-sm"
                      >
                        <span>Get Directions on Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}

                {c.extraNote && (
                  <div className="p-5 rounded-[3px] bg-white border border-gold/25 shadow-[0_8px_30px_rgba(26,18,9,0.06)] flex items-center gap-3.5">
                    <ShieldCheck className="w-7 h-7 text-gold shrink-0" />
                    <p className="text-xs text-ivory/80 font-medium leading-relaxed">{c.extraNote}</p>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Section>
      );
    }

    case "page-cta":
      return <PageCtaBlock section={section} />;

    default:
      return <CustomSectionRenderer section={section} />;
  }
}

