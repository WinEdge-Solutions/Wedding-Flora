import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  getAdminSession,
  createSupabaseServerClient,
  createSupabaseAdminClient,
} from "@/lib/supabase/server";
import { CMS_MEDIA_BUCKET, isSupabaseConfigured } from "@/lib/supabase/config";
import {
  CLOUDINARY_FOLDER,
  isCloudinaryConfigured,
  signCloudinaryParams,
  toOptimizedCloudinaryUrl,
} from "@/lib/cloudinary/config";
import type { MediaAssetItem } from "@/lib/cms/types";

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"]);
const VIDEO_EXTS = new Set([".mp4", ".webm", ".mov"]);

async function walkPublicDir(dir: string, urlPrefix: string): Promise<MediaAssetItem[]> {
  const results: MediaAssetItem[] = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const nextUrl = `${urlPrefix}/${entry.name}`;
      if (entry.isDirectory()) {
        const nested = await walkPublicDir(fullPath, nextUrl);
        results.push(...nested);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (IMAGE_EXTS.has(ext) || VIDEO_EXTS.has(ext)) {
          results.push({
            name: entry.name,
            url: nextUrl,
            type: VIDEO_EXTS.has(ext) ? "video" : "image",
            source: "public",
            path: nextUrl,
          });
        }
      }
    }
  } catch {
    // Directory may not exist
  }
  return results;
}

async function listSupabaseMedia(folder = "uploads"): Promise<MediaAssetItem[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createSupabaseAdminClient() ?? (await createSupabaseServerClient());
  if (!supabase) return [];

  const { data, error } = await supabase.storage
    .from(CMS_MEDIA_BUCKET)
    .list(folder, { limit: 200, sortBy: { column: "created_at", order: "desc" } });

  if (error || !data) return [];

  const items: MediaAssetItem[] = [];
  for (const file of data) {
    if (!file.name || file.name === ".emptyFolderPlaceholder") continue;
    const objectPath = `${folder}/${file.name}`;
    const { data: pub } = supabase.storage.from(CMS_MEDIA_BUCKET).getPublicUrl(objectPath);
    const ext = path.extname(file.name).toLowerCase();
    items.push({
      name: file.name,
      url: pub.publicUrl,
      type: VIDEO_EXTS.has(ext) ? "video" : "image",
      source: "supabase",
      path: objectPath,
      size: typeof file.metadata?.size === "number" ? file.metadata.size : undefined,
      createdAt: file.created_at ?? undefined,
    });
  }
  return items;
}

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  format?: string;
  bytes?: number;
  created_at?: string;
}

async function listCloudinaryByType(
  resourceType: "image" | "video"
): Promise<MediaAssetItem[]> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return [];

  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/resources/${resourceType}/upload?prefix=${encodeURIComponent(
    CLOUDINARY_FOLDER
  )}&max_results=100`;

  try {
    const res = await fetch(endpoint, {
      headers: { Authorization: `Basic ${auth}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { resources?: CloudinaryResource[] };
    return (json.resources ?? []).map((r) => {
      const shortName = r.public_id.split("/").pop() || r.public_id;
      return {
        name: r.format ? `${shortName}.${r.format}` : shortName,
        url: toOptimizedCloudinaryUrl(r.secure_url),
        type: resourceType,
        source: "cloudinary",
        path: r.public_id,
        size: r.bytes,
        createdAt: r.created_at,
      };
    });
  } catch {
    return [];
  }
}

async function listCloudinaryMedia(): Promise<MediaAssetItem[]> {
  if (!isCloudinaryConfigured()) return [];
  const [images, videos] = await Promise.all([
    listCloudinaryByType("image"),
    listCloudinaryByType("video"),
  ]);
  return [...videos, ...images].sort((a, b) =>
    (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
  );
}

export async function GET() {
  const session = await getAdminSession();
  if (!session.authorized) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const publicDir = path.join(process.cwd(), "public");
  const [cloudinaryItems, supabaseItems, publicImages, publicVideos, publicUploads] =
    await Promise.all([
      listCloudinaryMedia(),
      listSupabaseMedia("uploads"),
      walkPublicDir(path.join(publicDir, "images"), "/images"),
      walkPublicDir(path.join(publicDir, "videos"), "/videos"),
      walkPublicDir(path.join(publicDir, "uploads"), "/uploads"),
    ]);

  return NextResponse.json({
    ok: true,
    cloudinaryConfigured: isCloudinaryConfigured(),
    assets: [
      ...cloudinaryItems,
      ...supabaseItems,
      ...publicUploads,
      ...publicImages,
      ...publicVideos,
    ],
  });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session.authorized) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const contentType = req.headers.get("content-type") ?? "";

  // Signed direct-to-Cloudinary upload handshake (bypasses serverless 4.5 MB limit)
  if (contentType.includes("application/json")) {
    try {
      const body = (await req.json()) as { action?: string; folder?: string };
      if (body.action === "sign") {
        if (!isCloudinaryConfigured()) {
          return NextResponse.json({ ok: true, mode: "server-fallback" });
        }

        const timestamp = Math.floor(Date.now() / 1000);
        const folder = body.folder || CLOUDINARY_FOLDER;
        const signature = signCloudinaryParams({ folder, timestamp });

        return NextResponse.json({
          ok: true,
          mode: "cloudinary-direct",
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
          timestamp,
          folder,
          signature,
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid request.";
      return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }
  }

  // Fallback multipart FormData server upload
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "No file provided." }, { status: 400 });
    }

    const ext = path.extname(file.name).toLowerCase();
    if (!IMAGE_EXTS.has(ext) && !VIDEO_EXTS.has(ext)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Unsupported file format. Upload JPG, PNG, WEBP, AVIF, SVG, MP4, WEBM, or MOV.",
        },
        { status: 400 }
      );
    }

    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, "-")
      .slice(0, 48);
    const safeName = `${Date.now()}-${baseName || "asset"}${ext}`;
    const isVideo = VIDEO_EXTS.has(ext);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (isCloudinaryConfigured()) {
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = signCloudinaryParams({
        folder: CLOUDINARY_FOLDER,
        timestamp,
      });

      const uploadForm = new FormData();
      uploadForm.append("file", new Blob([buffer], { type: file.type }), file.name);
      uploadForm.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      uploadForm.append("timestamp", String(timestamp));
      uploadForm.append("folder", CLOUDINARY_FOLDER);
      uploadForm.append("signature", signature);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        { method: "POST", body: uploadForm }
      );
      const json = (await res.json()) as {
        public_id?: string;
        secure_url?: string;
        error?: { message?: string };
      };
      if (!res.ok || !json.secure_url) {
        return NextResponse.json(
          { ok: false, error: json.error?.message || "Cloudinary upload failed." },
          { status: 500 }
        );
      }

      const asset: MediaAssetItem = {
        name: file.name,
        url: toOptimizedCloudinaryUrl(json.secure_url),
        type: isVideo ? "video" : "image",
        source: "cloudinary",
        path: json.public_id || file.name,
        size: file.size,
      };
      return NextResponse.json({ ok: true, asset });
    }

    if (isSupabaseConfigured()) {
      const supabase =
        createSupabaseAdminClient() ?? (await createSupabaseServerClient());
      if (!supabase) {
        return NextResponse.json(
          { ok: false, error: "Supabase client unavailable." },
          { status: 500 }
        );
      }

      const objectPath = `uploads/${safeName}`;
      const { error } = await supabase.storage
        .from(CMS_MEDIA_BUCKET)
        .upload(objectPath, buffer, {
          contentType: file.type || (isVideo ? "video/mp4" : "image/jpeg"),
          upsert: false,
        });

      if (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      }

      const { data: pub } = supabase.storage.from(CMS_MEDIA_BUCKET).getPublicUrl(objectPath);
      const asset: MediaAssetItem = {
        name: safeName,
        url: pub.publicUrl,
        type: isVideo ? "video" : "image",
        source: "supabase",
        path: objectPath,
        size: file.size,
      };
      return NextResponse.json({ ok: true, asset });
    }

    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json(
        { ok: false, error: "Configure Cloudinary or Supabase Storage for production uploads." },
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.writeFile(path.join(uploadsDir, safeName), buffer);

    const asset: MediaAssetItem = {
      name: safeName,
      url: `/uploads/${safeName}`,
      type: isVideo ? "video" : "image",
      source: "public",
      path: `/uploads/${safeName}`,
      size: file.size,
    };

    return NextResponse.json({ ok: true, asset });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session.authorized) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      source?: string;
      path?: string;
      type?: "image" | "video";
    };
    if (!body.path) {
      return NextResponse.json({ ok: false, error: "Missing asset path." }, { status: 400 });
    }

    if (body.source === "cloudinary" && isCloudinaryConfigured()) {
      const resourceType = body.type === "video" ? "video" : "image";
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = signCloudinaryParams({
        public_id: body.path,
        timestamp,
      });

      const form = new FormData();
      form.append("public_id", body.path);
      form.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      form.append("timestamp", String(timestamp));
      form.append("signature", signature);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/destroy`,
        { method: "POST", body: form }
      );
      const json = (await res.json()) as { result?: string; error?: { message?: string } };
      if (!res.ok || (json.result !== "ok" && json.result !== "not found")) {
        return NextResponse.json(
          { ok: false, error: json.error?.message || "Cloudinary delete failed." },
          { status: 500 }
        );
      }
      return NextResponse.json({ ok: true });
    }

    if (body.source === "supabase" && isSupabaseConfigured()) {
      const supabase =
        createSupabaseAdminClient() ?? (await createSupabaseServerClient());
      if (!supabase) {
        return NextResponse.json({ ok: false, error: "Supabase unavailable." }, { status: 500 });
      }
      const { error } = await supabase.storage.from(CMS_MEDIA_BUCKET).remove([body.path]);
      if (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      }
      return NextResponse.json({ ok: true });
    }

    if (process.env.NODE_ENV === "development" && body.path.startsWith("/uploads/")) {
      const fileName = path.basename(body.path);
      await fs.unlink(path.join(process.cwd(), "public", "uploads", fileName));
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { ok: false, error: "Built-in repository assets cannot be deleted from here." },
      { status: 400 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
