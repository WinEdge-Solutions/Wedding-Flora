import type { CmsThemeConfig } from "./types";

export function buildThemeCssVars(theme: CmsThemeConfig): Record<string, string> {
  const radiusMap = {
    sharp: "2px",
    classic: "3px",
    soft: "8px",
  } as const;

  const spacingMap = {
    compact: "3rem",
    standard: "5rem",
    generous: "7rem",
  } as const;

  const displayFontMap = {
    cinzel: "var(--font-cinzel), 'Cinzel', Georgia, serif",
    cormorant: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
  } as const;

  const bodySizeMap = {
    sm: "15px",
    md: "16px",
    lg: "18px",
  } as const;

  return {
    "--wf-paper": theme.colors.paper,
    "--wf-stationery": theme.colors.stationery,
    "--wf-cream": theme.colors.cream,
    "--wf-ink": theme.colors.ivoryInk,
    "--wf-warmgrey": theme.colors.warmgrey,
    "--wf-gold": theme.colors.gold,
    "--wf-antiquegold": theme.colors.antiquegold,
    "--wf-blush": theme.colors.blush,
    "--wf-rose": theme.colors.rose,
    "--wf-sage": theme.colors.sage,
    "--color-paper": theme.colors.paper,
    "--color-stationery": theme.colors.stationery,
    "--color-cream": theme.colors.cream,
    "--color-ivory": theme.colors.ivoryInk,
    "--color-charcoal": theme.colors.ivoryInk,
    "--color-warmgrey": theme.colors.warmgrey,
    "--color-gold": theme.colors.gold,
    "--color-antiquegold": theme.colors.antiquegold,
    "--color-blush": theme.colors.blush,
    "--color-rose": theme.colors.rose,
    "--color-sage": theme.colors.sage,
    "--background": theme.colors.paper,
    "--foreground": theme.colors.ivoryInk,
    "--font-display": displayFontMap[theme.typography.displayFont],
    "--wf-radius": radiusMap[theme.radius],
    "--wf-section-py": spacingMap[theme.sectionSpacing],
    "--wf-body-size": bodySizeMap[theme.typography.bodySize],
  };
}

