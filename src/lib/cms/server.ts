import { promises as fs } from "node:fs";
import path from "node:path";
import { unstable_noStore as noStore } from "next/cache";
import { DEFAULT_CMS_DATA } from "./defaults";
import { mergeCmsData } from "./merge";
import type { SiteCmsData } from "./types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  createSupabaseAdminClient,
  createSupabaseServerClient,
} from "@/lib/supabase/server";

const LOCAL_CMS_PATH = path.join(process.cwd(), ".cms-local.json");

async function readLocalDevFile(): Promise<{ published?: unknown; draft?: unknown } | null> {
  if (process.env.NODE_ENV !== "development") return null;
  try {
    const raw = await fs.readFile(LOCAL_CMS_PATH, "utf-8");
    return JSON.parse(raw) as { published?: unknown; draft?: unknown };
  } catch {
    return null;
  }
}

async function writeLocalDevFile(key: "published" | "draft", data: SiteCmsData): Promise<void> {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("Local file persistence is disabled in production. Configure Supabase.");
  }
  const existing = (await readLocalDevFile()) ?? {};
  const next = { ...existing, [key]: data };
  await fs.writeFile(LOCAL_CMS_PATH, JSON.stringify(next, null, 2), "utf-8");
}

export async function getPublishedCmsData(): Promise<SiteCmsData> {
  noStore();

  if (isSupabaseConfigured()) {
    try {
      const supabase =
        createSupabaseAdminClient() ?? (await createSupabaseServerClient());
      if (supabase) {
        const { data, error } = await supabase
          .from("site_cms_config")
          .select("data")
          .eq("key", "published")
          .maybeSingle();

        if (!error && data?.data) {
          return mergeCmsData(data.data);
        }
      }
    } catch {
      // Fall back gracefully to defaults if DB table hasn't been initialized yet
    }
    return DEFAULT_CMS_DATA;
  }

  const local = await readLocalDevFile();
  if (local?.published) {
    return mergeCmsData(local.published);
  }

  return DEFAULT_CMS_DATA;
}

export async function getAdminCmsState(): Promise<{
  published: SiteCmsData;
  draft: SiteCmsData | null;
  storageMode: "supabase" | "local-dev" | "unconfigured";
}> {
  noStore();

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    let published = DEFAULT_CMS_DATA;
    let draft: SiteCmsData | null = null;

    if (supabase) {
      const { data } = await supabase
        .from("site_cms_config")
        .select("key, data")
        .in("key", ["published", "draft"]);

      if (data) {
        const pubRow = data.find((r) => r.key === "published");
        const draftRow = data.find((r) => r.key === "draft");
        if (pubRow?.data) published = mergeCmsData(pubRow.data);
        if (draftRow?.data) draft = mergeCmsData(draftRow.data);
      }
    }

    return { published, draft, storageMode: "supabase" };
  }

  if (process.env.NODE_ENV === "development") {
    const local = await readLocalDevFile();
    return {
      published: local?.published ? mergeCmsData(local.published) : DEFAULT_CMS_DATA,
      draft: local?.draft ? mergeCmsData(local.draft) : null,
      storageMode: "local-dev",
    };
  }

  return {
    published: DEFAULT_CMS_DATA,
    draft: null,
    storageMode: "unconfigured",
  };
}

export async function persistCmsConfig(
  key: "published" | "draft",
  data: SiteCmsData,
  userId?: string
): Promise<SiteCmsData> {
  const normalized: SiteCmsData = mergeCmsData({
    ...data,
    updatedAt: new Date().toISOString(),
  });

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      throw new Error("Supabase client unavailable.");
    }

    const { error } = await supabase.from("site_cms_config").upsert(
      {
        key,
        data: normalized,
        updated_at: normalized.updatedAt,
        updated_by: userId ?? null,
      },
      { onConflict: "key" }
    );

    if (error) {
      throw new Error(error.message);
    }

    return normalized;
  }

  await writeLocalDevFile(key, normalized);
  return normalized;
}

