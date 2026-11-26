import { DEFAULT_CMS_DATA } from "./defaults";
import type { PageKey, SiteCmsData } from "./types";

function isPlainObject(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

function deepMergeObjects<T extends Record<string, unknown>>(
  base: T,
  override: Record<string, unknown>
): T {
  const result: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    const overrideVal = override[key];
    const baseVal = result[key];
    if (overrideVal === undefined) continue;

    if (Array.isArray(overrideVal)) {
      result[key] = overrideVal;
    } else if (isPlainObject(baseVal) && isPlainObject(overrideVal)) {
      result[key] = deepMergeObjects(baseVal, overrideVal);
    } else {
      result[key] = overrideVal;
    }
  }
  return result as T;
}

/**
 * Safely merges partial persisted CMS JSON with DEFAULT_CMS_DATA so missing keys,
 * newly added pages, or schema upgrades never leave undefined sections.
 */
export function mergeCmsData(partial: unknown): SiteCmsData {
  if (!isPlainObject(partial)) {
    return DEFAULT_CMS_DATA;
  }

  const merged = deepMergeObjects(
    DEFAULT_CMS_DATA as unknown as Record<string, unknown>,
    partial
  ) as unknown as SiteCmsData;

  // Ensure every PageKey exists cleanly
  const pageKeys = Object.keys(DEFAULT_CMS_DATA.pages) as PageKey[];
  for (const pageKey of pageKeys) {
    if (!merged.pages[pageKey] || !Array.isArray(merged.pages[pageKey].sections)) {
      merged.pages[pageKey] = DEFAULT_CMS_DATA.pages[pageKey];
    }
  }

  return merged;
}

