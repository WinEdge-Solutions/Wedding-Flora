"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { useCms } from "@/components/cms/CmsProvider";
import type { PageSectionConfig, PillarCardItem } from "@/lib/cms/types";
import { Award, Compass, Crown, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";

const PILLAR_ICONS: Record<PillarCardItem["icon"], React.ReactNode> = {
  crown: <Crown className="w-5 h-5 text-gold" />,
  sparkles: <Sparkles className="w-5 h-5 text-gold" />,
  heart: <HeartHandshake className="w-5 h-5 text-gold" />,
  compass: <Compass className="w-5 h-5 text-gold" />,
  award: <Award className="w-5 h-5 text-gold" />,
  shield: <ShieldCheck className="w-5 h-5 text-gold" />,
};

export function PageHeroBlock({ section }: { section: PageSectionConfig }) {
  const cms = useCms();
  const c = section.content;
  const isLeft = section.layout === "left-aligned";

  return (
    <section
      className="relative py-14 sm:py-24 overflow-hidden border-b border-gold/20"
      style={{
        backgroundColor:
          section.bgVariant === "charcoal"
            ? "var(--wf-ink)"
            : section.bgVariant === "cream"
              ? "var(--wf-cream)"
              : "color-mix(in srgb, var(--wf-stationery) 75%, transparent)",
        color: section.bgVariant === "charcoal" ? "var(--wf-stationery)" : "var(--wf-ink)",
      }}
    >
      <Container className={`relative z-10 ${isLeft ? "text-left" : "text-center"}`}>
        <div className={`max-w-3xl space-y-3.5 sm:space-y-4 ${isLeft ? "" : "mx-auto"}`}>
          {c.showCrest && (
            <div className={`flex -mb-2 ${isLeft ? "justify-start" : "justify-center"}`}>
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 shrink-0 transition-transform hover:scale-105">
                <Image
                  src={cms.site.logoEmblemUrl}
                  alt={`${cms.site.name} Crest`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          )}

          {c.eyebrow && (
            <p
              className={`font-sans text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.3em] text-gold font-bold flex items-center gap-2 px-1 ${
                isLeft ? "justify-start" : "justify-center"
              }`}
            >
              <span>✦</span>
              <span>{c.eyebrow}</span>
              <span>✦</span>
            </p>
          )}

          {c.title && (
            <h1 className="font-display text-2xl sm:text-5xl lg:text-6xl font-bold tracking-[0.03em] leading-[1.18]">
              {c.title}{" "}
              {c.titleHighlight && (
                <>
                  <br className="hidden sm:block" />
                  <span className="text-gold-gradient font-serif font-normal italic">
                    {c.titleHighlight}
                  </span>
                </>
              )}
              {c.titleSuffix ? ` ${c.titleSuffix}` : ""}
            </h1>
          )}

          {c.showDivider !== false && <Divider variant="ornamental" className="my-2.5 sm:my-3" />}

          {c.subtitle && (
            <p
              className={`font-sans text-sm sm:text-lg font-normal leading-relaxed max-w-2xl opacity-80 ${
                isLeft ? "" : "mx-auto"
              }`}
            >
              {c.subtitle}
            </p>
          )}

          {c.stats && c.stats.length > 0 && (
            <div
              className={`pt-4 flex flex-wrap items-center gap-3 text-xs ${
                isLeft ? "justify-start" : "justify-center"
              }`}
            >
              {c.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-full bg-white/90 border border-gold/25 text-[#1A1209] shadow-sm flex items-center gap-2"
                >
                  <span className="font-bold text-gold">{stat.value}</span>
                  <span className="opacity-80">{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export function PageCtaBlock({ section }: { section: PageSectionConfig }) {
  const c = section.content;
  const isCharcoal = section.bgVariant === "charcoal";

  return (
    <Section variant={section.bgVariant} className="text-center border-t border-gold/20">
      <Container size="narrow" className="relative z-10 space-y-5">
        {c.eyebrow && (
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold font-bold">
            {c.eyebrow}
          </p>
        )}

        {c.title && (
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold">
            {c.title}{" "}
            {c.titleHighlight && (
              <span className="text-gold italic font-normal">{c.titleHighlight}</span>
            )}
          </h2>
        )}

        {c.subtitle && (
          <p
            className={`font-sans text-base font-medium max-w-xl mx-auto leading-relaxed ${
              isCharcoal ? "text-[#FAF7F2]/80" : "text-[#5C5147]"
            }`}
          >
            {c.subtitle}
          </p>
        )}

        {(c.primaryCtaLabel || c.secondaryCtaLabel) && (
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            {c.primaryCtaLabel && c.primaryCtaHref && (
              <Button href={c.primaryCtaHref} variant="primary" size="lg">
                {c.primaryCtaLabel}
              </Button>
            )}
            {c.secondaryCtaLabel && c.secondaryCtaHref && (
              <Button
                href={c.secondaryCtaHref}
                variant="outline"
                size="lg"
                className={isCharcoal ? "border-gold text-[#FAF7F2]" : "border-gold text-ivory"}
              >
                {c.secondaryCtaLabel}
              </Button>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}

export function CustomSectionRenderer({ section }: { section: PageSectionConfig }) {
  const c = section.content;
  const isCharcoal = section.bgVariant === "charcoal";
  const cols = section.columns ?? (section.layout === "grid-4" ? 4 : section.layout === "grid-2" ? 2 : 3);
  const gridColClass =
    cols === 4
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      : cols === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-3";

  if (section.kind === "custom-banner") {
    return (
      <Section variant={section.bgVariant} className="overflow-hidden">
        <Container size="narrow" className={section.layout === "left-aligned" ? "text-left" : "text-center"}>
          <div
            className="border border-gold/25 p-8 sm:p-14 space-y-4 shadow-[0_12px_40px_rgba(26,18,9,0.06)]"
            style={{
              borderRadius: "var(--wf-radius, 3px)",
              backgroundColor: isCharcoal ? "rgba(255,255,255,0.04)" : "var(--wf-stationery)",
            }}
          >
            {c.eyebrow && (
              <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold font-semibold">
                — {c.eyebrow} —
              </p>
            )}
            {c.title && (
              <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-[0.03em]">
                {c.title}
              </h2>
            )}
            {c.showDivider !== false && <Divider variant="ornamental" className="my-3" />}
            {c.subtitle && (
              <p className="font-sans text-sm sm:text-base opacity-80 leading-relaxed max-w-2xl mx-auto">
                {c.subtitle}
              </p>
            )}
            {c.paragraphs?.map((p, idx) => (
              <p key={idx} className="font-sans text-sm sm:text-base opacity-80 leading-relaxed max-w-2xl mx-auto">
                {p}
              </p>
            ))}
            {(c.primaryCtaLabel || c.secondaryCtaLabel) && (
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                {c.primaryCtaLabel && c.primaryCtaHref && (
                  <Button href={c.primaryCtaHref} variant="primary" size="md">
                    {c.primaryCtaLabel}
                  </Button>
                )}
                {c.secondaryCtaLabel && c.secondaryCtaHref && (
                  <Button href={c.secondaryCtaHref} variant="outline" size="md">
                    {c.secondaryCtaLabel}
                  </Button>
                )}
              </div>
            )}
          </div>
        </Container>
      </Section>
    );
  }

  if (section.kind === "custom-split") {
    const mediaRight = section.layout === "split-right";
    return (
      <Section variant={section.bgVariant}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className={`lg:col-span-6 ${mediaRight ? "lg:order-2" : "lg:order-1"}`}>
              <div
                className="relative aspect-[4/3] overflow-hidden border border-gold/30 shadow-lg bg-white p-1.5"
                style={{ borderRadius: "var(--wf-radius, 3px)" }}
              >
                {c.videoUrl ? (
                  <video
                    src={c.videoUrl}
                    poster={c.imageUrl}
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : c.imageUrl ? (
                  <Image
                    src={c.imageUrl}
                    alt={c.imageAlt || c.title || "Wedding Flora Showcase"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#F7F3EC] flex items-center justify-center text-xs uppercase tracking-widest text-gold">
                    Add Image or Video in Studio
                  </div>
                )}
              </div>
            </div>

            <div className={`lg:col-span-6 space-y-4 ${mediaRight ? "lg:order-1" : "lg:order-2"}`}>
              {c.eyebrow && (
                <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-gold font-bold">
                  ✦ {c.eyebrow}
                </p>
              )}
              {c.title && (
                <h2 className="font-display text-2xl sm:text-4xl font-semibold leading-tight">
                  {c.title}
                </h2>
              )}
              {c.subtitle && <p className="font-sans text-sm sm:text-base opacity-85 leading-relaxed">{c.subtitle}</p>}
              {c.paragraphs?.map((p, idx) => (
                <p key={idx} className="font-sans text-sm sm:text-base opacity-80 leading-relaxed">
                  {p}
                </p>
              ))}
              {c.primaryCtaLabel && c.primaryCtaHref && (
                <div className="pt-2">
                  <Button href={c.primaryCtaHref} variant="primary" size="md">
                    {c.primaryCtaLabel}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  if (section.kind === "custom-gallery-strip") {
    const items = c.mediaGallery ?? [];
    return (
      <Section variant={section.bgVariant}>
        <Container>
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              {c.eyebrow && (
                <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold font-semibold">
                  — {c.eyebrow} —
                </p>
              )}
              {c.title && <h2 className="font-display text-2xl sm:text-4xl font-semibold">{c.title}</h2>}
              {c.subtitle && <p className="font-sans text-sm sm:text-base opacity-80">{c.subtitle}</p>}
            </div>

            <div className={`grid ${gridColClass} gap-5`}>
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] overflow-hidden border border-gold/25 bg-white shadow-sm group"
                  style={{ borderRadius: "var(--wf-radius, 3px)" }}
                >
                  <Image
                    src={item.url}
                    alt={item.caption || `Gallery visual ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.caption && (
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-xs font-medium">
                      {item.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  // custom-cards
  return (
    <Section variant={section.bgVariant}>
      <Container>
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            {c.eyebrow && (
              <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold font-semibold">
                — {c.eyebrow} —
              </p>
            )}
            {c.title && <h2 className="font-display text-2xl sm:text-4xl font-semibold">{c.title}</h2>}
            {c.subtitle && <p className="font-sans text-sm sm:text-base opacity-80">{c.subtitle}</p>}
          </div>

          <div className={`grid ${gridColClass} gap-6`}>
            {(c.cards ?? []).map((card, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 border border-gold/25 shadow-[0_8px_30px_rgba(26,18,9,0.06)] space-y-3 bg-white text-[#1A1209]"
                style={{ borderRadius: "var(--wf-radius, 3px)" }}
              >
                <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center">
                  {PILLAR_ICONS[card.icon] ?? PILLAR_ICONS.sparkles}
                </div>
                <h3 className="font-serif text-xl font-semibold">{card.title}</h3>
                <p className="font-sans text-sm text-[#5C5147] leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>

          {c.primaryCtaLabel && c.primaryCtaHref && (
            <div className="text-center pt-2">
              <Link
                href={c.primaryCtaHref}
                className="inline-flex items-center px-6 py-3 bg-[#1A1209] text-white text-xs uppercase tracking-widest font-semibold hover:bg-gold hover:text-[#1A1209] transition-colors"
                style={{ borderRadius: "var(--wf-radius, 2px)" }}
              >
                {c.primaryCtaLabel}
              </Link>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

