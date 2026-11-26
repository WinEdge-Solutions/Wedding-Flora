import type { NavItem } from "@/lib/site";
import type { ServiceItem, OperationalPillar } from "@/lib/content/services";
import type { GalleryItem } from "@/lib/content/gallery";
import type { CelebrationStory } from "@/lib/content/celebrations";
import type { DestinationCity } from "@/lib/content/destinations";
import type { TestimonialItem } from "@/lib/content/testimonials";
import type { BlogPost } from "@/lib/content/blog";
import type { ProcessStep, SacredRitual, RitualFaq } from "@/lib/content/rituals";
import type { PackageTier } from "@/lib/content/packages";

/* ── Global Design & Theme Tokens ─────────────────────────────────────────── */
export type RadiusPreset = "sharp" | "classic" | "soft";
export type SpacingPreset = "compact" | "standard" | "generous";
export type DisplayFontPreset = "cinzel" | "cormorant";

export interface CmsThemeConfig {
  colors: {
    paper: string;        // #FDFAF5
    stationery: string;   // #FAF7F2
    cream: string;        // #F7F3EC
    ivoryInk: string;     // #1A1209
    warmgrey: string;     // #7A6B59
    gold: string;         // #D4AF37
    antiquegold: string;  // #AB9178
    blush: string;        // #F1DCE1
    rose: string;         // #E5B8C3
    sage: string;         // #9DB49B
  };
  typography: {
    displayFont: DisplayFontPreset;
    headingScale: "compact" | "standard" | "grand";
    bodySize: "sm" | "md" | "lg";
  };
  radius: RadiusPreset;
  sectionSpacing: SpacingPreset;
  effects: {
    enableParticles: boolean;
    enableAurora: boolean;
    enableParallax: boolean;
  };
}

/* ── Global Brand, Navigation & Footer ────────────────────────────────────── */
export interface CmsNavbarSettings {
  showBrandTextMobile: boolean;
  showBrandTextDesktop: boolean;
  showEnquireCta: boolean;
  enquireLabel: string;
  enquireHref: string;
  items: (NavItem & { visible?: boolean })[];
}

export interface CmsFooterSettings {
  brandSubtitle: string;
  brandDescription: string;
  citiesLabel: string;
  copyrightText: string;
  showQuickLinks: boolean;
  showSocialLinks: boolean;
}

export interface CmsSiteConfig {
  name: string;
  tagline: string;
  description: string;
  logoEmblemUrl: string;
  logoFullUrl: string;
  contact: {
    email: string;
    phone: string;
    address: string;
    mapsUrl: string;
    mapsEmbedUrl: string;
    instagram: string;
    instagramHandle: string;
    pinterest: string;
    whatsapp: string;
    whatsappDefaultMessage: string;
    consultationHours: string;
  };
  navbar: CmsNavbarSettings;
  footer: CmsFooterSettings;
}

/* ── Page Section Studio Architecture ─────────────────────────────────────── */
export type SectionBgVariant = "ivory" | "cream" | "stationery" | "charcoal";

export type BuiltinSectionKind =
  | "home-hero"
  | "home-services"
  | "home-featured-work"
  | "home-horizontal-gallery"
  | "home-testimonials"
  | "home-cta"
  | "page-hero"
  | "about-story"
  | "about-pillars"
  | "about-instagram"
  | "director-narrative"
  | "director-pillars"
  | "services-showcase"
  | "destinations-directory"
  | "process-steps"
  | "process-rituals"
  | "process-faqs"
  | "gallery-grid"
  | "celebrations-stories"
  | "celebrations-reels"
  | "blog-grid"
  | "contact-main"
  | "page-cta"
  | "custom-banner"
  | "custom-split"
  | "custom-gallery-strip"
  | "custom-cards";

export type SectionLayoutVariant =
  | "default"
  | "centered"
  | "left-aligned"
  | "split-left"
  | "split-right"
  | "grid-2"
  | "grid-3"
  | "grid-4"
  | "carousel"
  | "masonry"
  | "stacked"
  | "compact";

export interface StatItem {
  value: string;
  label: string;
}

export interface PillarCardItem {
  title: string;
  description: string;
  icon: "crown" | "sparkles" | "heart" | "compass" | "award" | "shield";
}

export interface PageSectionConfig {
  id: string;
  kind: BuiltinSectionKind;
  name: string;
  visible: boolean;
  bgVariant: SectionBgVariant;
  layout: SectionLayoutVariant;
  columns?: 2 | 3 | 4;
  itemLimit?: number;
  content: {
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    titleSuffix?: string;
    subtitle?: string;
    paragraphs?: string[];
    primaryCtaLabel?: string;
    primaryCtaHref?: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
    imageUrl?: string;
    imageAlt?: string;
    secondaryImageUrl?: string;
    secondaryImageAlt?: string;
    videoUrl?: string;
    badgeText?: string;
    quoteText?: string;
    quoteAuthor?: string;
    showCrest?: boolean;
    showDivider?: boolean;
    showQuickJump?: boolean;
    overlayOpacity?: number;
    stats?: StatItem[];
    cards?: PillarCardItem[];
    mediaGallery?: { url: string; caption: string }[];
    extraNote?: string;
  };
}

export type PageKey =
  | "home"
  | "about"
  | "director"
  | "services"
  | "destinations"
  | "workingProcess"
  | "gallery"
  | "celebrations"
  | "blog"
  | "contact";

export interface CmsPageConfig {
  key: PageKey;
  label: string;
  route: string;
  seoTitle: string;
  seoDescription: string;
  sections: PageSectionConfig[];
}

/* ── Repeatable Collections ───────────────────────────────────────────────── */
export interface CmsEditorialSlide {
  image: string;
  title: string;
  subtitle: string;
  venue: string;
}

export interface CmsCollections {
  services: ServiceItem[];
  operationalPillars: OperationalPillar[];
  editorialSlides: CmsEditorialSlide[];
  gallery: GalleryItem[];
  celebrations: CelebrationStory[];
  destinations: DestinationCity[];
  testimonials: TestimonialItem[];
  blogPosts: BlogPost[];
  processSteps: ProcessStep[];
  sacredRituals: SacredRitual[];
  ritualFaqs: RitualFaq[];
  packages: PackageTier[];
}

/* ── Root CMS Document ────────────────────────────────────────────────────── */
export interface SiteCmsData {
  version: number;
  updatedAt: string;
  theme: CmsThemeConfig;
  site: CmsSiteConfig;
  pages: Record<PageKey, CmsPageConfig>;
  collections: CmsCollections;
}

export interface MediaAssetItem {
  name: string;
  url: string;
  type: "image" | "video";
  source: "public" | "supabase" | "cloudinary";
  path: string;
  size?: number;
  createdAt?: string;
}

