"use client";

import React from "react";
import { MediaField } from "@/components/admin/MediaPickerModal";
import { DEFAULT_CMS_DATA } from "@/lib/cms/defaults";
import type {
  CmsSiteConfig,
  CmsThemeConfig,
  DisplayFontPreset,
  RadiusPreset,
  SpacingPreset,
} from "@/lib/cms/types";
import { ArrowDown, ArrowUp, Eye, EyeOff, Plus, RotateCcw, Trash2 } from "lucide-react";

export function GlobalSiteEditor({
  site,
  onChange,
}: {
  site: CmsSiteConfig;
  onChange: (next: CmsSiteConfig) => void;
}) {
  const navItems = site.navbar.items;

  const moveNav = (idx: number, delta: -1 | 1) => {
    const target = idx + delta;
    if (target < 0 || target >= navItems.length) return;
    const copy = [...navItems];
    const [moved] = copy.splice(idx, 1);
    copy.splice(target, 0, moved);
    onChange({ ...site, navbar: { ...site.navbar, items: copy } });
  };

  return (
    <div className="space-y-5">
      {/* Brand Identity */}
      <div className="bg-white border border-gold/25 rounded-[3px] p-4 space-y-3">
        <h3 className="font-serif text-base font-bold text-[#1A1209] border-b border-gold/15 pb-2">
          Brand Identity &amp; Logos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InputRow
            label="Brand Name"
            value={site.name}
            onChange={(val) => onChange({ ...site, name: val })}
          />
          <InputRow
            label="Brand Tagline"
            value={site.tagline}
            onChange={(val) => onChange({ ...site, tagline: val })}
          />
        </div>
        <MediaField
          label="Center Crest Emblem Logo"
          value={site.logoEmblemUrl}
          onChange={(val) => onChange({ ...site, logoEmblemUrl: val })}
        />
        <MediaField
          label="Full Crest & Wordmark Logo"
          value={site.logoFullUrl}
          onChange={(val) => onChange({ ...site, logoFullUrl: val })}
        />
      </div>

      {/* Contact & Social Details */}
      <div className="bg-white border border-gold/25 rounded-[3px] p-4 space-y-3">
        <h3 className="font-serif text-base font-bold text-[#1A1209] border-b border-gold/15 pb-2">
          Contact Details, WhatsApp &amp; Maps
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InputRow
            label="Enquiry Email"
            value={site.contact.email}
            onChange={(val) =>
              onChange({ ...site, contact: { ...site.contact, email: val } })
            }
          />
          <InputRow
            label="Phone Number"
            value={site.contact.phone}
            onChange={(val) =>
              onChange({ ...site, contact: { ...site.contact, phone: val } })
            }
          />
          <InputRow
            label="WhatsApp Link (wa.me/...)"
            value={site.contact.whatsapp}
            onChange={(val) =>
              onChange({ ...site, contact: { ...site.contact, whatsapp: val } })
            }
          />
          <InputRow
            label="Instagram Handle"
            value={site.contact.instagramHandle}
            onChange={(val) =>
              onChange({
                ...site,
                contact: { ...site.contact, instagramHandle: val },
              })
            }
          />
          <InputRow
            label="Instagram URL"
            value={site.contact.instagram}
            onChange={(val) =>
              onChange({ ...site, contact: { ...site.contact, instagram: val } })
            }
          />
          <InputRow
            label="Consultation Hours"
            value={site.contact.consultationHours}
            onChange={(val) =>
              onChange({
                ...site,
                contact: { ...site.contact, consultationHours: val },
              })
            }
          />
        </div>
        <InputRow
          label="Studio Street Address"
          value={site.contact.address}
          onChange={(val) =>
            onChange({ ...site, contact: { ...site.contact, address: val } })
          }
        />
        <InputRow
          label="Google Maps Share Link"
          value={site.contact.mapsUrl}
          onChange={(val) =>
            onChange({ ...site, contact: { ...site.contact, mapsUrl: val } })
          }
        />
        <InputRow
          label="Google Maps Embed Iframe URL"
          value={site.contact.mapsEmbedUrl}
          onChange={(val) =>
            onChange({ ...site, contact: { ...site.contact, mapsEmbedUrl: val } })
          }
        />
      </div>

      {/* Navigation Bar Controls */}
      <div className="bg-white border border-gold/25 rounded-[3px] p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-gold/15 pb-2">
          <h3 className="font-serif text-base font-bold text-[#1A1209]">
            Navigation Bar &amp; Links
          </h3>
          <button
            type="button"
            onClick={() =>
              onChange({
                ...site,
                navbar: {
                  ...site.navbar,
                  items: [
                    ...navItems,
                    { label: "New Link", href: "/services", visible: true },
                  ],
                },
              })
            }
            className="px-2.5 py-1 rounded-[2px] bg-[#FAF7F2] border border-gold/30 text-[10px] font-bold uppercase tracking-wider hover:bg-gold inline-flex items-center gap-1"
          >
            <Plus size={11} />
            <span>Add Link</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-4 text-xs">
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={site.navbar.showBrandTextMobile}
              onChange={(e) =>
                onChange({
                  ...site,
                  navbar: { ...site.navbar, showBrandTextMobile: e.target.checked },
                })
              }
            />
            <span>Brand Text on Mobile</span>
          </label>
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={site.navbar.showBrandTextDesktop}
              onChange={(e) =>
                onChange({
                  ...site,
                  navbar: { ...site.navbar, showBrandTextDesktop: e.target.checked },
                })
              }
            />
            <span>Brand Text on Desktop</span>
          </label>
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={site.navbar.showEnquireCta}
              onChange={(e) =>
                onChange({
                  ...site,
                  navbar: { ...site.navbar, showEnquireCta: e.target.checked },
                })
              }
            />
            <span>Show Right CTA Button</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InputRow
            label="CTA Button Label"
            value={site.navbar.enquireLabel}
            onChange={(val) =>
              onChange({ ...site, navbar: { ...site.navbar, enquireLabel: val } })
            }
          />
          <InputRow
            label="CTA Button Link"
            value={site.navbar.enquireHref}
            onChange={(val) =>
              onChange({ ...site, navbar: { ...site.navbar, enquireHref: val } })
            }
          />
        </div>

        <div className="space-y-1.5">
          {navItems.map((item, idx) => (
            <div
              key={`${item.href}-${idx}`}
              className="flex items-center gap-2 p-2 rounded-[2px] bg-[#FAF7F2] border border-gold/20"
            >
              <input
                type="text"
                value={item.label}
                onChange={(e) => {
                  const next = navItems.map((it, i) =>
                    i === idx ? { ...it, label: e.target.value } : it
                  );
                  onChange({ ...site, navbar: { ...site.navbar, items: next } });
                }}
                className="w-36 px-2 py-1 text-xs font-semibold bg-white border border-gold/25 rounded-[2px]"
              />
              <input
                type="text"
                value={item.href}
                onChange={(e) => {
                  const next = navItems.map((it, i) =>
                    i === idx ? { ...it, href: e.target.value } : it
                  );
                  onChange({ ...site, navbar: { ...site.navbar, items: next } });
                }}
                className="flex-1 px-2 py-1 text-xs bg-white border border-gold/25 rounded-[2px]"
              />
              <button
                type="button"
                onClick={() => moveNav(idx, -1)}
                disabled={idx === 0}
                className="p-1 disabled:opacity-30"
              >
                <ArrowUp size={13} />
              </button>
              <button
                type="button"
                onClick={() => moveNav(idx, 1)}
                disabled={idx === navItems.length - 1}
                className="p-1 disabled:opacity-30"
              >
                <ArrowDown size={13} />
              </button>
              <button
                type="button"
                onClick={() => {
                  const next = navItems.map((it, i) =>
                    i === idx ? { ...it, visible: it.visible === false } : it
                  );
                  onChange({ ...site, navbar: { ...site.navbar, items: next } });
                }}
                className={`p-1 rounded ${
                  item.visible !== false ? "text-[#1A1209]" : "text-amber-600 bg-amber-50"
                }`}
              >
                {item.visible !== false ? <Eye size={13} /> : <EyeOff size={13} />}
              </button>
              <button
                type="button"
                onClick={() => {
                  const next = navItems.filter((_, i) => i !== idx);
                  onChange({ ...site, navbar: { ...site.navbar, items: next } });
                }}
                className="p-1 text-red-600"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Settings */}
      <div className="bg-white border border-gold/25 rounded-[3px] p-4 space-y-3">
        <h3 className="font-serif text-base font-bold text-[#1A1209] border-b border-gold/15 pb-2">
          Footer Copy &amp; Visibility
        </h3>
        <InputRow
          label="Brand Subtitle"
          value={site.footer.brandSubtitle}
          onChange={(val) =>
            onChange({ ...site, footer: { ...site.footer, brandSubtitle: val } })
          }
        />
        <div className="space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
            Footer Description
          </label>
          <textarea
            rows={2}
            value={site.footer.brandDescription}
            onChange={(e) =>
              onChange({
                ...site,
                footer: { ...site.footer, brandDescription: e.target.value },
              })
            }
            className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InputRow
            label="Cities Strip"
            value={site.footer.citiesLabel}
            onChange={(val) =>
              onChange({ ...site, footer: { ...site.footer, citiesLabel: val } })
            }
          />
          <InputRow
            label="Copyright Text"
            value={site.footer.copyrightText}
            onChange={(val) =>
              onChange({ ...site, footer: { ...site.footer, copyrightText: val } })
            }
          />
        </div>
        <div className="flex flex-wrap gap-4 text-xs pt-1">
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={site.footer.showQuickLinks}
              onChange={(e) =>
                onChange({
                  ...site,
                  footer: { ...site.footer, showQuickLinks: e.target.checked },
                })
              }
            />
            <span>Show Quick Links Column</span>
          </label>
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={site.footer.showSocialLinks}
              onChange={(e) =>
                onChange({
                  ...site,
                  footer: { ...site.footer, showSocialLinks: e.target.checked },
                })
              }
            />
            <span>Show Social Icons</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export function ThemeDesignEditor({
  theme,
  onChange,
}: {
  theme: CmsThemeConfig;
  onChange: (next: CmsThemeConfig) => void;
}) {
  const colorFields: { key: keyof CmsThemeConfig["colors"]; label: string }[] = [
    { key: "paper", label: "Primary Canvas (Paper)" },
    { key: "stationery", label: "Stationery Surface" },
    { key: "cream", label: "Warm Cream Alternate" },
    { key: "ivoryInk", label: "Ink & Charcoal" },
    { key: "warmgrey", label: "Warm Grey Secondary" },
    { key: "gold", label: "Radiant Gold Accent" },
    { key: "antiquegold", label: "Antique Bronze Gold" },
    { key: "blush", label: "Blossom Blush" },
    { key: "rose", label: "Petal Rose" },
    { key: "sage", label: "Botanical Sage" },
  ];

  return (
    <div className="space-y-5">
      {/* Colors */}
      <div className="bg-white border border-gold/25 rounded-[3px] p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-gold/15 pb-2">
          <h3 className="font-serif text-base font-bold text-[#1A1209]">
            Royal Palette &amp; Colour Tokens
          </h3>
          <button
            type="button"
            onClick={() => onChange(DEFAULT_CMS_DATA.theme)}
            className="text-[10px] font-bold uppercase tracking-wider text-gold hover:text-[#1A1209] inline-flex items-center gap-1"
          >
            <RotateCcw size={11} />
            <span>Reset Palette</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {colorFields.map(({ key, label }) => (
            <div
              key={key}
              className="flex items-center justify-between gap-2 p-2 rounded-[2px] bg-[#FAF7F2] border border-gold/20"
            >
              <span className="text-xs font-medium text-[#1A1209]">{label}</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={theme.colors[key]}
                  onChange={(e) =>
                    onChange({
                      ...theme,
                      colors: { ...theme.colors, [key]: e.target.value },
                    })
                  }
                  className="w-7 h-7 rounded border border-gold/30 cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={theme.colors[key]}
                  onChange={(e) =>
                    onChange({
                      ...theme,
                      colors: { ...theme.colors, [key]: e.target.value },
                    })
                  }
                  className="w-20 px-1.5 py-1 text-[11px] font-mono bg-white border border-gold/25 rounded-[2px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography & Spacing */}
      <div className="bg-white border border-gold/25 rounded-[3px] p-4 space-y-4">
        <h3 className="font-serif text-base font-bold text-[#1A1209] border-b border-gold/15 pb-2">
          Typography, Corners &amp; Spacing Rhythm
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
              Display Heading Font
            </label>
            <select
              value={theme.typography.displayFont}
              onChange={(e) =>
                onChange({
                  ...theme,
                  typography: {
                    ...theme.typography,
                    displayFont: e.target.value as DisplayFontPreset,
                  },
                })
              }
              className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
            >
              <option value="cinzel">Cinzel (Royal Carved Display)</option>
              <option value="cormorant">Cormorant Garamond (Editorial Italic/Serif)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
              Base Body Font Size
            </label>
            <select
              value={theme.typography.bodySize}
              onChange={(e) =>
                onChange({
                  ...theme,
                  typography: {
                    ...theme.typography,
                    bodySize: e.target.value as "sm" | "md" | "lg",
                  },
                })
              }
              className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
            >
              <option value="sm">Refined Compact (15px)</option>
              <option value="md">Classic Editorial (16px)</option>
              <option value="lg">Generous Print (18px)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
              Card &amp; Button Corners
            </label>
            <select
              value={theme.radius}
              onChange={(e) =>
                onChange({ ...theme, radius: e.target.value as RadiusPreset })
              }
              className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
            >
              <option value="sharp">Sharp Stationery (2px)</option>
              <option value="classic">Classic Fine Edge (3px)</option>
              <option value="soft">Soft Editorial (8px)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
              Section Vertical Spacing
            </label>
            <select
              value={theme.sectionSpacing}
              onChange={(e) =>
                onChange({
                  ...theme,
                  sectionSpacing: e.target.value as SpacingPreset,
                })
              }
              className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
            >
              <option value="compact">Compact (48px)</option>
              <option value="standard">Balanced Luxury (80px)</option>
              <option value="generous">Ultra-Airy Estate (112px)</option>
            </select>
          </div>
        </div>

        {/* Motion Effects */}
        <div className="pt-2 border-t border-gold/15 flex flex-wrap gap-5 text-xs">
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={theme.effects.enableParticles}
              onChange={(e) =>
                onChange({
                  ...theme,
                  effects: { ...theme.effects, enableParticles: e.target.checked },
                })
              }
            />
            <span>Hero Floating Gold Bokeh Particles</span>
          </label>
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={theme.effects.enableAurora}
              onChange={(e) =>
                onChange({
                  ...theme,
                  effects: { ...theme.effects, enableAurora: e.target.checked },
                })
              }
            />
            <span>Subtle Ambient Ivory Aurora</span>
          </label>
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={theme.effects.enableParallax}
              onChange={(e) =>
                onChange({
                  ...theme,
                  effects: { ...theme.effects, enableParallax: e.target.checked },
                })
              }
            />
            <span>Hero Scroll Parallax</span>
          </label>
        </div>
      </div>
    </div>
  );
}

function InputRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px] focus:outline-none focus:border-gold"
      />
    </div>
  );
}

