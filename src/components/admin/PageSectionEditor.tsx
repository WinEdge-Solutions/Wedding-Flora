"use client";

import React, { useState } from "react";
import { MediaField } from "@/components/admin/MediaPickerModal";
import type {
  BuiltinSectionKind,
  CmsPageConfig,
  PageSectionConfig,
  PillarCardItem,
  SectionBgVariant,
  SectionLayoutVariant,
} from "@/lib/cms/types";
import {
  ArrowDown,
  ArrowUp,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
} from "lucide-react";

const BG_OPTIONS: { value: SectionBgVariant; label: string }[] = [
  { value: "ivory", label: "Paper Ivory (#FDFAF5)" },
  { value: "cream", label: "Warm Cream (#F7F3EC)" },
  { value: "stationery", label: "Stationery (#FAF7F2)" },
  { value: "charcoal", label: "Midnight Ink (#1A1209)" },
];

const LAYOUT_OPTIONS: { value: SectionLayoutVariant; label: string }[] = [
  { value: "default", label: "Default Editorial" },
  { value: "centered", label: "Centered" },
  { value: "left-aligned", label: "Left Aligned" },
  { value: "split-left", label: "Split (Media Left / Primary Left)" },
  { value: "split-right", label: "Split (Reversed Right)" },
  { value: "grid-2", label: "2-Column Grid" },
  { value: "grid-3", label: "3-Column Grid" },
  { value: "grid-4", label: "4-Column Grid" },
  { value: "carousel", label: "Carousel / Pinned Glide" },
];

type CustomSectionKind = Extract<
  BuiltinSectionKind,
  "custom-banner" | "custom-split" | "custom-gallery-strip" | "custom-cards"
>;

function buildCustomSection(kind: CustomSectionKind, seq: number): PageSectionConfig {
  const labels: Record<CustomSectionKind, string> = {
    "custom-banner": "Custom Editorial Banner",
    "custom-split": "Custom Photo / Video + Text",
    "custom-gallery-strip": "Custom Photo Strip",
    "custom-cards": "Custom Pillars / Cards",
  };

  return {
    id: `${kind}-${seq}`,
    kind,
    name: labels[kind],
    visible: true,
    bgVariant: "cream",
    layout:
      kind === "custom-split"
        ? "split-left"
        : kind === "custom-cards" || kind === "custom-gallery-strip"
          ? "grid-3"
          : "centered",
    columns: 3,
    content: {
      eyebrow: "Wedding Flora Atelier",
      title: "New Bespoke Section",
      subtitle: "Tailored storytelling, royal aesthetics, and timeless celebrations.",
      paragraphs:
        kind === "custom-split" || kind === "custom-banner"
          ? ["Share your bespoke wedding narrative or curated highlight here."]
          : undefined,
      imageUrl: kind === "custom-split" ? "/images/hero-royal-stage.jpg" : undefined,
      primaryCtaLabel:
        kind === "custom-banner" || kind === "custom-split" ? "Enquire Now" : undefined,
      primaryCtaHref:
        kind === "custom-banner" || kind === "custom-split" ? "/contact" : undefined,
      mediaGallery:
        kind === "custom-gallery-strip"
          ? [
              { url: "/images/service-varmala-mandap.jpg", caption: "Sacred Floral Mandap" },
              { url: "/images/service-sangeet-dance.jpg", caption: "Sangeet Gala" },
              { url: "/images/service-crystal-reception.jpg", caption: "Royal Reception" },
            ]
          : undefined,
      cards:
        kind === "custom-cards"
          ? [
              {
                icon: "crown",
                title: "Royal Architecture",
                description: "Custom palace mandaps and bespoke scenic concepts.",
              },
              {
                icon: "sparkles",
                title: "Artisanal Florals",
                description: "Lush fresh blossoms curated from dawn auctions.",
              },
              {
                icon: "heart",
                title: "Guest Hospitality",
                description: "24/7 concierge care for every attending family member.",
              },
            ]
          : undefined,
    },
  };
}

export function PageSectionEditor({
  page,
  onChange,
}: {
  page: CmsPageConfig;
  onChange: (updated: CmsPageConfig) => void;
}) {
  const [selectedId, setSelectedId] = useState<string>(page.sections[0]?.id ?? "");
  const seqRef = React.useRef(1);

  const activeSection =
    page.sections.find((s) => s.id === selectedId) ?? page.sections[0];

  const updateSections = (nextSections: PageSectionConfig[]) => {
    onChange({ ...page, sections: nextSections });
  };

  const updateActiveSection = (patch: Partial<PageSectionConfig>) => {
    if (!activeSection) return;
    updateSections(
      page.sections.map((s) => (s.id === activeSection.id ? { ...s, ...patch } : s))
    );
  };

  const updateContent = (patch: Partial<PageSectionConfig["content"]>) => {
    if (!activeSection) return;
    updateActiveSection({
      content: { ...activeSection.content, ...patch },
    });
  };

  const moveSection = (index: number, delta: -1 | 1) => {
    const target = index + delta;
    if (target < 0 || target >= page.sections.length) return;
    const copy = [...page.sections];
    const [moved] = copy.splice(index, 1);
    copy.splice(target, 0, moved);
    updateSections(copy);
  };

  const duplicateSection = (sec: PageSectionConfig) => {
    seqRef.current += 1;
    const newId = `${sec.kind}-copy-${seqRef.current}`;
    const clone: PageSectionConfig = {
      ...JSON.parse(JSON.stringify(sec)),
      id: newId,
      name: `${sec.name} (Copy)`,
    };
    const idx = page.sections.findIndex((s) => s.id === sec.id);
    const next = [...page.sections];
    next.splice(idx + 1, 0, clone);
    updateSections(next);
    setSelectedId(newId);
  };

  const addCustomSection = (kind: CustomSectionKind) => {
    seqRef.current += 1;
    const newSection = buildCustomSection(kind, seqRef.current + page.sections.length);
    updateSections([...page.sections, newSection]);
    setSelectedId(newSection.id);
  };

  const removeSection = (id: string) => {
    if (page.sections.length <= 1) return;
    const next = page.sections.filter((s) => s.id !== id);
    updateSections(next);
    if (selectedId === id) {
      setSelectedId(next[0]?.id ?? "");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page SEO Metadata Card */}
      <div className="bg-white border border-gold/25 rounded-[3px] p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-gold/15 pb-2">
          <h3 className="font-serif text-base font-bold text-[#1A1209]">
            {page.label} — SEO &amp; Route ({page.route})
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
              Page SEO Title
            </label>
            <input
              type="text"
              value={page.seoTitle}
              onChange={(e) => onChange({ ...page, seoTitle: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px] focus:outline-none focus:border-gold"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
              Meta Description
            </label>
            <textarea
              rows={2}
              value={page.seoDescription}
              onChange={(e) => onChange({ ...page, seoDescription: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px] focus:outline-none focus:border-gold"
            />
          </div>
        </div>
      </div>

      {/* Section Order Stack */}
      <div className="bg-white border border-gold/25 rounded-[3px] p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/15 pb-2">
          <h3 className="font-serif text-base font-bold text-[#1A1209]">
            Sections &amp; Order ({page.sections.length})
          </h3>
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                ["custom-banner", "+ Banner"],
                ["custom-split", "+ Image/Text"],
                ["custom-cards", "+ Cards"],
                ["custom-gallery-strip", "+ Photo Strip"],
              ] as const
            ).map(([kind, btnLabel]) => (
              <button
                key={kind}
                type="button"
                onClick={() => addCustomSection(kind)}
                className="px-2.5 py-1 rounded-[2px] bg-[#FAF7F2] hover:bg-gold hover:text-[#1A1209] border border-gold/30 text-[10px] font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
              >
                <Plus size={11} />
                <span>{btnLabel.replace("+ ", "")}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          {page.sections.map((sec, idx) => {
            const isSelected = activeSection?.id === sec.id;
            return (
              <div
                key={sec.id}
                className={`flex items-center justify-between gap-2 px-3 py-2 rounded-[2px] border transition-colors ${
                  isSelected
                    ? "bg-[#FAF7F2] border-gold shadow-sm"
                    : "bg-white border-gold/15 hover:border-gold/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedId(sec.id)}
                  className="flex-1 text-left min-w-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gold shrink-0">
                      0{idx + 1}
                    </span>
                    <span
                      className={`text-xs font-semibold truncate ${
                        sec.visible ? "text-[#1A1209]" : "text-[#5C5147]/50 line-through"
                      }`}
                    >
                      {sec.name}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] bg-white border border-gold/20 text-[#5C5147] shrink-0">
                      {sec.bgVariant} · {sec.layout}
                    </span>
                  </div>
                </button>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => moveSection(idx, -1)}
                    disabled={idx === 0}
                    title="Move Up"
                    className="p-1 rounded hover:bg-gold/15 disabled:opacity-30"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSection(idx, 1)}
                    disabled={idx === page.sections.length - 1}
                    title="Move Down"
                    className="p-1 rounded hover:bg-gold/15 disabled:opacity-30"
                  >
                    <ArrowDown size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateSections(
                        page.sections.map((s) =>
                          s.id === sec.id ? { ...s, visible: !s.visible } : s
                        )
                      )
                    }
                    title={sec.visible ? "Hide Section" : "Show Section"}
                    className={`p-1 rounded ${
                      sec.visible ? "text-[#1A1209] hover:bg-gold/15" : "text-amber-600 bg-amber-50"
                    }`}
                  >
                    {sec.visible ? <Eye size={13} /> : <EyeOff size={13} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => duplicateSection(sec)}
                    title="Duplicate Section"
                    className="p-1 rounded hover:bg-gold/15"
                  >
                    <Copy size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSection(sec.id)}
                    disabled={page.sections.length <= 1}
                    title="Delete Section"
                    className="p-1 rounded hover:bg-red-50 text-red-600 disabled:opacity-30"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Section Inspector */}
      {activeSection && (
        <div className="bg-white border border-gold/30 rounded-[3px] p-4 space-y-4 shadow-sm">
          <div className="border-b border-gold/15 pb-2 flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold block">
                Editing Section ({activeSection.kind})
              </span>
              <h4 className="font-serif text-lg font-semibold text-[#1A1209]">
                {activeSection.name}
              </h4>
            </div>
          </div>

          {/* Layout & Visual Style Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-[2px] bg-[#FAF7F2] border border-gold/20">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                Section Label (Studio)
              </label>
              <input
                type="text"
                value={activeSection.name}
                onChange={(e) => updateActiveSection({ name: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-gold/25 rounded-[2px]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                Background Surface
              </label>
              <select
                value={activeSection.bgVariant}
                onChange={(e) =>
                  updateActiveSection({ bgVariant: e.target.value as SectionBgVariant })
                }
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-gold/25 rounded-[2px]"
              >
                {BG_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                Layout Variant
              </label>
              <select
                value={activeSection.layout}
                onChange={(e) =>
                  updateActiveSection({ layout: e.target.value as SectionLayoutVariant })
                }
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-gold/25 rounded-[2px]"
              >
                {LAYOUT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                  Columns
                </label>
                <select
                  value={activeSection.columns ?? 3}
                  onChange={(e) =>
                    updateActiveSection({
                      columns: Number(e.target.value) as 2 | 3 | 4,
                    })
                  }
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-gold/25 rounded-[2px]"
                >
                  <option value={2}>2 Columns</option>
                  <option value={3}>3 Columns</option>
                  <option value={4}>4 Columns</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                  Item Limit
                </label>
                <input
                  type="number"
                  min={1}
                  max={24}
                  value={activeSection.itemLimit ?? ""}
                  placeholder="All"
                  onChange={(e) =>
                    updateActiveSection({
                      itemLimit: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-gold/25 rounded-[2px]"
                />
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-4 text-xs">
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={activeSection.content.showCrest ?? false}
                onChange={(e) => updateContent({ showCrest: e.target.checked })}
              />
              <span>Show Brand Crest</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={activeSection.content.showDivider !== false}
                onChange={(e) => updateContent({ showDivider: e.target.checked })}
              />
              <span>Show Ornamental Divider</span>
            </label>
            {(page.key === "destinations" || page.key === "workingProcess") &&
              activeSection.kind === "page-hero" && (
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeSection.content.showQuickJump !== false}
                    onChange={(e) => updateContent({ showQuickJump: e.target.checked })}
                  />
                  <span>Show Sticky Quick-Jump Bar</span>
                </label>
              )}
          </div>

          {/* Text Copy Fields */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                  Eyebrow Label
                </label>
                <input
                  type="text"
                  value={activeSection.content.eyebrow ?? ""}
                  onChange={(e) => updateContent({ eyebrow: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                  Badge / Tag Text
                </label>
                <input
                  type="text"
                  value={activeSection.content.badgeText ?? ""}
                  onChange={(e) => updateContent({ badgeText: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1 sm:col-span-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={activeSection.content.title ?? ""}
                  onChange={(e) => updateContent({ title: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                  Gold Highlight Word
                </label>
                <input
                  type="text"
                  value={activeSection.content.titleHighlight ?? ""}
                  onChange={(e) => updateContent({ titleHighlight: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                  Heading Suffix
                </label>
                <input
                  type="text"
                  value={activeSection.content.titleSuffix ?? ""}
                  onChange={(e) => updateContent({ titleSuffix: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                Subtitle / Lead Copy
              </label>
              <textarea
                rows={2}
                value={activeSection.content.subtitle ?? ""}
                onChange={(e) => updateContent({ subtitle: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
              />
            </div>

            {/* Paragraphs Array */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147]">
                  Body Paragraphs ({(activeSection.content.paragraphs ?? []).length})
                </label>
                <button
                  type="button"
                  onClick={() =>
                    updateContent({
                      paragraphs: [...(activeSection.content.paragraphs ?? []), ""],
                    })
                  }
                  className="text-[10px] font-bold uppercase tracking-wider text-gold hover:text-[#1A1209]"
                >
                  + Add Paragraph
                </button>
              </div>
              {(activeSection.content.paragraphs ?? []).map((p, pIdx) => (
                <div key={pIdx} className="flex items-start gap-2">
                  <textarea
                    rows={2}
                    value={p}
                    onChange={(e) => {
                      const next = [...(activeSection.content.paragraphs ?? [])];
                      next[pIdx] = e.target.value;
                      updateContent({ paragraphs: next });
                    }}
                    className="flex-1 px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const next = (activeSection.content.paragraphs ?? []).filter(
                        (_, i) => i !== pIdx
                      );
                      updateContent({ paragraphs: next });
                    }}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            {/* Pull Quote & Extra Note */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                  Pull Quote / Tagline
                </label>
                <input
                  type="text"
                  value={activeSection.content.quoteText ?? ""}
                  onChange={(e) => updateContent({ quoteText: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                  Quote Attribution / Extra Note
                </label>
                <input
                  type="text"
                  value={activeSection.content.extraNote ?? activeSection.content.quoteAuthor ?? ""}
                  onChange={(e) =>
                    updateContent({
                      extraNote: e.target.value,
                      quoteAuthor: e.target.value,
                    })
                  }
                  className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
                />
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-gold/10">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={activeSection.content.primaryCtaLabel ?? ""}
                  onChange={(e) => updateContent({ primaryCtaLabel: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                  Primary Button Link
                </label>
                <input
                  type="text"
                  value={activeSection.content.primaryCtaHref ?? ""}
                  onChange={(e) => updateContent({ primaryCtaHref: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={activeSection.content.secondaryCtaLabel ?? ""}
                  onChange={(e) => updateContent({ secondaryCtaLabel: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                  Secondary Button Link
                </label>
                <input
                  type="text"
                  value={activeSection.content.secondaryCtaHref ?? ""}
                  onChange={(e) => updateContent({ secondaryCtaHref: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
                />
              </div>
            </div>

            {/* Media Fields */}
            <div className="space-y-3 pt-2 border-t border-gold/10">
              <MediaField
                label="Primary Image / Poster"
                value={activeSection.content.imageUrl ?? ""}
                onChange={(val) => updateContent({ imageUrl: val })}
                acceptType="image"
              />
              <MediaField
                label="Secondary Image"
                value={activeSection.content.secondaryImageUrl ?? ""}
                onChange={(val) => updateContent({ secondaryImageUrl: val })}
                acceptType="image"
              />
              <MediaField
                label="Background / Feature Video (MP4/WEBM)"
                value={activeSection.content.videoUrl ?? ""}
                onChange={(val) => updateContent({ videoUrl: val })}
                acceptType="video"
              />
              {activeSection.kind === "home-hero" && (
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                    Video Scrim Overlay Opacity ({activeSection.content.overlayOpacity ?? 30}%)
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={80}
                    value={activeSection.content.overlayOpacity ?? 30}
                    onChange={(e) =>
                      updateContent({ overlayOpacity: Number(e.target.value) })
                    }
                    className="w-full accent-[#D4AF37]"
                  />
                </div>
              )}
            </div>

            {/* Stats List (if present or hero stats) */}
            {(activeSection.content.stats || activeSection.kind === "about-story" || activeSection.kind === "page-hero") && (
              <div className="space-y-2 pt-2 border-t border-gold/10">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147]">
                    Stats / Highlight Pills ({(activeSection.content.stats ?? []).length})
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      updateContent({
                        stats: [
                          ...(activeSection.content.stats ?? []),
                          { value: "New", label: "Highlight" },
                        ],
                      })
                    }
                    className="text-[10px] font-bold uppercase tracking-wider text-gold hover:text-[#1A1209]"
                  >
                    + Add Stat
                  </button>
                </div>
                {(activeSection.content.stats ?? []).map((st, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={st.value}
                      onChange={(e) => {
                        const next = [...(activeSection.content.stats ?? [])];
                        next[idx] = { ...next[idx], value: e.target.value };
                        updateContent({ stats: next });
                      }}
                      placeholder="Value"
                      className="w-24 px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
                    />
                    <input
                      type="text"
                      value={st.label}
                      onChange={(e) => {
                        const next = [...(activeSection.content.stats ?? [])];
                        next[idx] = { ...next[idx], label: e.target.value };
                        updateContent({ stats: next });
                      }}
                      placeholder="Label"
                      className="flex-1 px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateContent({
                          stats: (activeSection.content.stats ?? []).filter(
                            (_, i) => i !== idx
                          ),
                        })
                      }
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Pillar / Feature Cards */}
            {(activeSection.content.cards ||
              activeSection.kind === "about-pillars" ||
              activeSection.kind === "director-pillars" ||
              activeSection.kind === "custom-cards") && (
              <div className="space-y-2 pt-2 border-t border-gold/10">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147]">
                    Cards ({(activeSection.content.cards ?? []).length})
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      updateContent({
                        cards: [
                          ...(activeSection.content.cards ?? []),
                          {
                            icon: "sparkles",
                            title: "New Pillar",
                            description: "Describe this signature craft.",
                          },
                        ],
                      })
                    }
                    className="text-[10px] font-bold uppercase tracking-wider text-gold hover:text-[#1A1209]"
                  >
                    + Add Card
                  </button>
                </div>
                {(activeSection.content.cards ?? []).map((card, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-[2px] bg-[#FAF7F2] border border-gold/20 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <select
                        value={card.icon}
                        onChange={(e) => {
                          const next = [...(activeSection.content.cards ?? [])];
                          next[idx] = {
                            ...next[idx],
                            icon: e.target.value as PillarCardItem["icon"],
                          };
                          updateContent({ cards: next });
                        }}
                        className="px-2 py-1 text-xs bg-white border border-gold/25 rounded-[2px]"
                      >
                        <option value="crown">Crown</option>
                        <option value="sparkles">Sparkles</option>
                        <option value="heart">Heart</option>
                        <option value="compass">Compass</option>
                        <option value="award">Award</option>
                        <option value="shield">Shield</option>
                      </select>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const next = [...(activeSection.content.cards ?? [])];
                          next[idx] = { ...next[idx], title: e.target.value };
                          updateContent({ cards: next });
                        }}
                        className="flex-1 px-2.5 py-1 text-xs bg-white border border-gold/25 rounded-[2px]"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateContent({
                            cards: (activeSection.content.cards ?? []).filter(
                              (_, i) => i !== idx
                            ),
                          })
                        }
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={card.description}
                      onChange={(e) => {
                        const next = [...(activeSection.content.cards ?? [])];
                        next[idx] = { ...next[idx], description: e.target.value };
                        updateContent({ cards: next });
                      }}
                      className="w-full px-2.5 py-1 text-xs bg-white border border-gold/25 rounded-[2px]"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Custom Gallery Strip Items */}
            {(activeSection.content.mediaGallery ||
              activeSection.kind === "custom-gallery-strip") && (
              <div className="space-y-2 pt-2 border-t border-gold/10">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147]">
                    Photo Strip Items ({(activeSection.content.mediaGallery ?? []).length})
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      updateContent({
                        mediaGallery: [
                          ...(activeSection.content.mediaGallery ?? []),
                          { url: "/images/hero-bg.jpg", caption: "Royal Celebration" },
                        ],
                      })
                    }
                    className="text-[10px] font-bold uppercase tracking-wider text-gold hover:text-[#1A1209]"
                  >
                    + Add Photo
                  </button>
                </div>
                {(activeSection.content.mediaGallery ?? []).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-[2px] bg-[#FAF7F2] border border-gold/20 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-gold">
                        Photo #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateContent({
                            mediaGallery: (activeSection.content.mediaGallery ?? []).filter(
                              (_, i) => i !== idx
                            ),
                          })
                        }
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <MediaField
                      label="Image"
                      value={item.url}
                      onChange={(val) => {
                        const next = [...(activeSection.content.mediaGallery ?? [])];
                        next[idx] = { ...next[idx], url: val };
                        updateContent({ mediaGallery: next });
                      }}
                    />
                    <input
                      type="text"
                      value={item.caption}
                      placeholder="Caption"
                      onChange={(e) => {
                        const next = [...(activeSection.content.mediaGallery ?? [])];
                        next[idx] = { ...next[idx], caption: e.target.value };
                        updateContent({ mediaGallery: next });
                      }}
                      className="w-full px-2.5 py-1 text-xs bg-white border border-gold/25 rounded-[2px]"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

