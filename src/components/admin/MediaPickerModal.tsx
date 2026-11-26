"use client";

import React, { useEffect, useState } from "react";
import type { MediaAssetItem } from "@/lib/cms/types";
import {
  Film,
  Image as ImageIcon,
  Loader2,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";

interface MediaPickerModalProps {
  open: boolean;
  acceptType?: "image" | "video" | "all";
  onClose: () => void;
  onSelect: (url: string) => void;
}

export function MediaPickerModal({
  open,
  acceptType = "all",
  onClose,
  onSelect,
}: MediaPickerModalProps) {
  const [assets, setAssets] = useState<MediaAssetItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filterOverride, setFilterOverride] = useState<"all" | "image" | "video" | null>(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  const filter = filterOverride ?? acceptType;

  useEffect(() => {
    if (!open) return;
    let active = true;

    async function fetchMedia() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/cms/media");
        const json = (await res.json()) as {
          ok?: boolean;
          assets?: MediaAssetItem[];
          error?: string;
        };
        if (!active) return;
        if (!res.ok || !json.ok) {
          setError(json.error || "Failed to load media library.");
        } else {
          setAssets(json.assets ?? []);
        }
      } catch {
        if (active) setError("Network error while loading media library.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void fetchMedia();
    return () => {
      active = false;
    };
  }, [open]);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      // Request direct-upload signature (uses Cloudinary directly in browser if configured)
      const signRes = await fetch("/api/cms/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sign" }),
      });
      const signJson = (await signRes.json()) as {
        ok?: boolean;
        mode?: "cloudinary-direct" | "server-fallback";
        cloudName?: string;
        apiKey?: string;
        timestamp?: number;
        folder?: string;
        signature?: string;
      };

      for (const file of Array.from(files)) {
        if (
          signRes.ok &&
          signJson.mode === "cloudinary-direct" &&
          signJson.cloudName &&
          signJson.apiKey &&
          signJson.signature &&
          signJson.timestamp
        ) {
          const cloudForm = new FormData();
          cloudForm.append("file", file);
          cloudForm.append("api_key", signJson.apiKey);
          cloudForm.append("timestamp", String(signJson.timestamp));
          cloudForm.append("folder", signJson.folder || "wedding-flora");
          cloudForm.append("signature", signJson.signature);

          const uploadRes = await fetch(
            `https://api.cloudinary.com/v1_1/${signJson.cloudName}/auto/upload`,
            { method: "POST", body: cloudForm }
          );
          const uploadJson = (await uploadRes.json()) as {
            public_id?: string;
            secure_url?: string;
            resource_type?: "image" | "video" | "raw";
            bytes?: number;
            error?: { message?: string };
          };

          if (!uploadRes.ok || !uploadJson.secure_url) {
            setError(uploadJson.error?.message || `Failed to upload ${file.name}`);
            continue;
          }

          const optimizedUrl = uploadJson.secure_url.includes("/upload/f_auto")
            ? uploadJson.secure_url
            : uploadJson.secure_url.replace("/upload/", "/upload/f_auto,q_auto/");

          const asset: MediaAssetItem = {
            name: file.name,
            url: optimizedUrl,
            type: uploadJson.resource_type === "video" ? "video" : "image",
            source: "cloudinary",
            path: uploadJson.public_id || file.name,
            size: uploadJson.bytes ?? file.size,
          };
          setAssets((prev) => [asset, ...prev]);
        } else {
          const form = new FormData();
          form.append("file", file);
          const res = await fetch("/api/cms/media", { method: "POST", body: form });
          const json = (await res.json()) as {
            ok?: boolean;
            asset?: MediaAssetItem;
            error?: string;
          };
          if (!res.ok || !json.ok || !json.asset) {
            setError(json.error || `Failed to upload ${file.name}`);
          } else {
            setAssets((prev) => [json.asset!, ...prev]);
          }
        }
      }
    } catch {
      setError("Upload request failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (asset: MediaAssetItem) => {
    if (!confirm(`Delete "${asset.name}" permanently?`)) return;
    setError(null);
    try {
      const res = await fetch("/api/cms/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: asset.source,
          path: asset.path,
          type: asset.type,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error || "Unable to delete file.");
        return;
      }
      setAssets((prev) => prev.filter((a) => a.url !== asset.url));
    } catch {
      setError("Delete request failed.");
    }
  };

  if (!open) return null;

  const filtered = assets.filter((a) => {
    if (filter !== "all" && a.type !== filter) return false;
    if (
      search.trim() &&
      !a.name.toLowerCase().includes(search.toLowerCase()) &&
      !a.url.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FDFAF5] border border-gold/40 rounded-[3px] w-full max-w-5xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gold/20 bg-[#FAF7F2] flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
              ✦ Visual Archives
            </p>
            <h3 className="font-serif text-xl font-semibold text-[#1A1209]">
              Media Library &amp; Uploader
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-[2px] border border-gold/25 hover:border-gold text-[#1A1209]"
            aria-label="Close media picker"
          >
            <X size={16} />
          </button>
        </div>

        {/* Controls & Upload Dropzone */}
        <div className="p-4 border-b border-gold/15 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {(["all", "image", "video"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilterOverride(t)}
                className={`px-3 py-1.5 rounded-[2px] text-xs font-semibold uppercase tracking-wider transition-colors ${
                  filter === t
                    ? "bg-[#1A1209] text-white"
                    : "bg-[#FAF7F2] text-[#5C5147] border border-gold/20 hover:border-gold"
                }`}
              >
                {t === "all" ? "All Media" : t === "image" ? "Photos" : "Videos"}
              </button>
            ))}

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gold absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search filenames..."
                className="pl-8 pr-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px] focus:outline-none focus:border-gold w-48 sm:w-60"
              />
            </div>
          </div>

          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-[2px] bg-[#D4AF37] hover:bg-[#1A1209] hover:text-white text-[#1A1209] text-xs font-bold uppercase tracking-wider transition-colors">
            {uploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            <span>{uploading ? "Uploading..." : "Upload Photo / Video"}</span>
            <input
              type="file"
              multiple
              accept="image/*,video/mp4,video/webm,video/quicktime"
              className="hidden"
              onChange={(e) => void handleUpload(e.target.files)}
              disabled={uploading}
            />
          </label>
        </div>

        {error && (
          <div className="mx-4 mt-3 p-2.5 rounded-[2px] bg-red-50 border border-red-200 text-red-800 text-xs">
            {error}
          </div>
        )}

        {/* Asset Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-2 text-xs text-[#5C5147]">
              <Loader2 className="w-6 h-6 text-gold animate-spin" />
              <span>Loading media library...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-xs text-[#5C5147]">
              No matching photos or videos found. Upload a new file above.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filtered.map((asset) => {
                const canDelete =
                  asset.source === "cloudinary" ||
                  asset.source === "supabase" ||
                  asset.path.startsWith("/uploads/");
                return (
                  <div
                    key={asset.url}
                    className="group relative border border-gold/25 hover:border-gold rounded-[3px] bg-white overflow-hidden flex flex-col justify-between shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(asset.url);
                        onClose();
                      }}
                      className="block w-full text-left focus:outline-none"
                    >
                      <div className="relative aspect-[4/3] bg-[#1A1209] overflow-hidden">
                        {asset.type === "video" ? (
                          <video
                            src={asset.url}
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={asset.url}
                            alt={asset.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-[2px] bg-black/75 text-[9px] uppercase tracking-wider text-gold font-bold flex items-center gap-1">
                          {asset.type === "video" ? (
                            <Film size={10} />
                          ) : (
                            <ImageIcon size={10} />
                          )}
                          {asset.source}
                        </span>
                      </div>
                      <div className="p-2">
                        <p className="text-[11px] font-medium text-[#1A1209] truncate">
                          {asset.name}
                        </p>
                      </div>
                    </button>

                    {canDelete && (
                      <button
                        type="button"
                        onClick={() => void handleDelete(asset)}
                        title="Delete uploaded file"
                        className="absolute top-1.5 right-1.5 p-1 rounded-[2px] bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Reusable Media Input Field with Inline Thumbnail + Picker Trigger ─────── */
export function MediaField({
  label,
  value,
  onChange,
  acceptType = "image",
  placeholder = "/images/... or https://...",
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  acceptType?: "image" | "video" | "all";
  placeholder?: string;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
        {label}
      </label>
      <div className="flex items-center gap-2">
        {value && (
          <div className="w-10 h-10 rounded-[2px] border border-gold/30 overflow-hidden bg-[#1A1209] shrink-0">
            {acceptType === "video" || /\.(mp4|webm|mov)(\?|$)/i.test(value) ? (
              <video src={value} muted className="w-full h-full object-cover" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt={label} className="w-full h-full object-cover" />
            )}
          </div>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px] focus:outline-none focus:border-gold text-[#1A1209]"
        />
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="px-3 py-2 rounded-[2px] bg-white border border-gold/40 hover:bg-gold hover:text-[#1A1209] text-[#1A1209] text-[11px] font-bold uppercase tracking-wider shrink-0 transition-colors"
        >
          Browse / Upload
        </button>
      </div>

      <MediaPickerModal
        open={pickerOpen}
        acceptType={acceptType}
        onClose={() => setPickerOpen(false)}
        onSelect={(url) => onChange(url)}
      />
    </div>
  );
}

