import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/supabase/server";
import {
  getAdminCmsState,
  getPublishedCmsData,
  persistCmsConfig,
} from "@/lib/cms/server";
import { DEFAULT_CMS_DATA } from "@/lib/cms/defaults";
import { mergeCmsData } from "@/lib/cms/merge";
import type { SiteCmsData } from "@/lib/cms/types";

export async function GET(req: NextRequest) {
  const scope = req.nextUrl.searchParams.get("scope");
  if (scope === "public") {
    const published = await getPublishedCmsData();
    return NextResponse.json({ ok: true, data: published });
  }

  const session = await getAdminSession();
  if (!session.authorized) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const state = await getAdminCmsState();
  return NextResponse.json({ ok: true, session, ...state });
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session.authorized) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      action?: "publish" | "save-draft" | "reset";
      data?: unknown;
    };

    const action = body.action ?? "publish";

    if (action === "reset") {
      const resetData: SiteCmsData = {
        ...DEFAULT_CMS_DATA,
        updatedAt: new Date().toISOString(),
      };
      const saved = await persistCmsConfig("published", resetData, session.userId);
      await persistCmsConfig("draft", saved, session.userId);
      revalidateSiteRoutes();
      return NextResponse.json({ ok: true, published: saved, draft: saved });
    }

    if (!body.data) {
      return NextResponse.json(
        { ok: false, error: "Missing CMS payload." },
        { status: 400 }
      );
    }

    const merged = mergeCmsData(body.data);

    if (action === "save-draft") {
      const draft = await persistCmsConfig("draft", merged, session.userId);
      return NextResponse.json({ ok: true, draft });
    }

    // Publish live + keep draft synced
    const published = await persistCmsConfig("published", merged, session.userId);
    await persistCmsConfig("draft", published, session.userId);
    revalidateSiteRoutes();

    return NextResponse.json({ ok: true, published, draft: published });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save CMS config.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

function revalidateSiteRoutes() {
  const routes = [
    "/",
    "/about",
    "/about/director",
    "/services",
    "/services/full-service",
    "/destinations",
    "/working-process",
    "/gallery",
    "/gallery/photos",
    "/gallery/videos",
    "/celebrations",
    "/portfolio",
    "/blog",
    "/contact",
  ];
  revalidatePath("/", "layout");
  for (const r of routes) {
    revalidatePath(r);
  }
}

