"use client";

import React, { useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { DEFAULT_CMS_DATA } from "@/lib/cms/defaults";
import { mergeCmsData } from "@/lib/cms/merge";
import type { CmsPageConfig, CmsThemeConfig, PageKey, SiteCmsData } from "@/lib/cms/types";

interface CmsContextValue {
  cms: SiteCmsData;
  isPreview: boolean;
}

const CmsContext = React.createContext<CmsContextValue>({
  cms: DEFAULT_CMS_DATA,
  isPreview: false,
});

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

function subscribeNoop() {
  return () => {};
}

function getPreviewQuerySnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("cmsPreview") === "1";
}

function getPreviewServerSnapshot(): boolean {
  return false;
}

export function CmsProvider({
  initialData,
  children,
}: {
  initialData: SiteCmsData;
  children: React.ReactNode;
}) {
  const [previewData, setPreviewData] = useState<SiteCmsData | null>(null);
  const isPreview = useSyncExternalStore(
    subscribeNoop,
    getPreviewQuerySnapshot,
    getPreviewServerSnapshot
  );

  const cms = isPreview && previewData ? previewData : initialData;

  // Listen for live split-screen preview messages from /admin Studio iframe parent
  useEffect(() => {
    if (isPreview && window.parent !== window) {
      window.parent.postMessage({ type: "WF_CMS_PREVIEW_READY" }, window.location.origin);
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const payload = event.data as { type?: string; data?: unknown } | null;
      if (payload?.type === "WF_CMS_PREVIEW_UPDATE" && payload.data) {
        setPreviewData(mergeCmsData(payload.data));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isPreview]);

  // Apply dynamic theme CSS variables directly on <html>
  useEffect(() => {
    const vars = buildThemeCssVars(cms.theme);
    const root = document.documentElement;
    for (const [key, val] of Object.entries(vars)) {
      root.style.setProperty(key, val);
    }
    root.dataset.wfHeadingScale = cms.theme.typography.headingScale;
  }, [cms.theme]);

  const value = useMemo(() => ({ cms, isPreview }), [cms, isPreview]);

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms(): SiteCmsData {
  return useContext(CmsContext).cms;
}

export function useCmsState(): CmsContextValue {
  return useContext(CmsContext);
}

export function usePageConfig(pageKey: PageKey): CmsPageConfig {
  const cms = useCms();
  return cms.pages[pageKey] ?? DEFAULT_CMS_DATA.pages[pageKey];
}
