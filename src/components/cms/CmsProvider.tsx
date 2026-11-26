"use client";

import React, { useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { DEFAULT_CMS_DATA } from "@/lib/cms/defaults";
import { mergeCmsData } from "@/lib/cms/merge";
import { buildThemeCssVars } from "@/lib/cms/theme";
import type { CmsPageConfig, PageKey, SiteCmsData } from "@/lib/cms/types";

interface CmsContextValue {
  cms: SiteCmsData;
  isPreview: boolean;
}

const CmsContext = React.createContext<CmsContextValue>({
  cms: DEFAULT_CMS_DATA,
  isPreview: false,
});

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
