"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { DEFAULT_CMS_DATA } from "@/lib/cms/defaults";
import type { MediaAssetItem, PageKey, SiteCmsData } from "@/lib/cms/types";
import { PageSectionEditor } from "@/components/admin/PageSectionEditor";
import { CollectionsEditor } from "@/components/admin/CollectionsEditor";
import {
  GlobalSiteEditor,
  ThemeDesignEditor,
} from "@/components/admin/GlobalBrandAndThemeEditor";
import { MediaPickerModal } from "@/components/admin/MediaPickerModal";
import {
  CheckCircle2,
  Database,
  ExternalLink,
  Globe,
  Image as ImageIcon,
  Layers,
  Layout,
  Loader2,
  LogOut,
  Monitor,
  Palette,
  RotateCcw,
  Save,
  Smartphone,
  Sparkles,
  Upload,
} from "lucide-react";

type StudioTab =
  | "pages"
  | "collections"
  | "media"
  | "global"
  | "theme"
  | "setup";

interface AdminStudioWorkspaceProps {
  initialPublished: SiteCmsData;
  initialDraft: SiteCmsData | null;
  storageMode: "supabase" | "local-dev" | "unconfigured";
  adminEmail?: string;
}

const PAGE_KEYS: PageKey[] = [
  "home",
  "about",
  "director",
  "services",
  "destinations",
  "workingProcess",
  "gallery",
  "celebrations",
  "blog",
  "contact",
];

export function AdminStudioWorkspace({
  initialPublished,
  initialDraft,
  storageMode,
  adminEmail,
}: AdminStudioWorkspaceProps) {
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [cms, setCms] = useState<SiteCmsData>(initialDraft ?? initialPublished);
  const [publishedSnapshot, setPublishedSnapshot] = useState<SiteCmsData>(initialPublished);
  const [activeTab, setActiveTab] = useState<StudioTab>("pages");
  const [activePage, setActivePage] = useState<PageKey>("home");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [showPreview, setShowPreview] = useState(true);
  const [previewReady, setPreviewReady] = useState(false);
  const [saving, setSaving] = useState<"draft" | "publish" | "reset" | null>(null);
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  // Sync live draft data to the preview iframe whenever cms updates
  useEffect(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win || !previewReady) return;
    win.postMessage(
      { type: "WF_CMS_PREVIEW_UPDATE", data: cms },
      window.location.origin
    );
  }, [cms, previewReady]);

  // Listen for iframe ready ping
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const payload = e.data as { type?: string } | null;
      if (payload?.type === "WF_CMS_PREVIEW_READY") {
        setPreviewReady(true);
        iframeRef.current?.contentWindow?.postMessage(
          { type: "WF_CMS_PREVIEW_UPDATE", data: cms },
          window.location.origin
        );
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [cms]);

  const showNotice = (type: "ok" | "err", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSave = async (action: "save-draft" | "publish") => {
    setSaving(action === "save-draft" ? "draft" : "publish");
    try {
      const res = await fetch("/api/cms/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, data: cms }),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        published?: SiteCmsData;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        showNotice("err", json.error || "Unable to save changes.");
        return;
      }
      if (action === "publish" && json.published) {
        setPublishedSnapshot(json.published);
        showNotice("ok", "Published live across all website routes.");
      } else {
        showNotice("ok", "Draft saved securely.");
      }
    } catch {
      showNotice("err", "Network error while saving.");
    } finally {
      setSaving(null);
    }
  };

  const handleReset = async () => {
    if (
      !confirm(
        "Reset all pages, collections, navigation, and theme colors back to Wedding Flora factory defaults?"
      )
    ) {
      return;
    }
    setSaving("reset");
    try {
      const res = await fetch("/api/cms/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        published?: SiteCmsData;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        showNotice("err", json.error || "Unable to reset defaults.");
        return;
      }
      const next = json.published ?? DEFAULT_CMS_DATA;
      setCms(next);
      setPublishedSnapshot(next);
      showNotice("ok", "Restored default Wedding Flora configuration.");
    } catch {
      showNotice("err", "Network error while resetting.");
    } finally {
      setSaving(null);
    }
  };

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    await fetch("/api/cms/auth/local-dev", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  const previewRoute =
    activeTab === "pages"
      ? cms.pages[activePage].route
      : activeTab === "collections"
        ? "/"
        : "/";

  const hasUnsavedChanges = JSON.stringify(cms) !== JSON.stringify(publishedSnapshot);

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#1A1209] flex flex-col">
      {/* ── Top Studio Toolbar ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#FDFAF5]/95 backdrop-blur-xl border-b border-gold/30 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 shrink-0">
              <Image
                src={cms.site.logoEmblemUrl || "/images/logo-emblem.png"}
                alt="Wedding Flora Crest"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-display text-sm font-bold tracking-wider text-[#1A1209] block leading-none">
                Atelier Studio
              </span>
              <span className="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-widest">
                {storageMode === "supabase" ? "Supabase Live" : "Local Dev Mode"}
                {adminEmail ? ` • ${adminEmail}` : ""}
              </span>
            </div>
          </Link>

          {hasUnsavedChanges && (
            <span className="px-2 py-0.5 rounded-[2px] bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
              Unpublished Edits
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Device Preview Switcher */}
          <div className="hidden xl:flex items-center border border-gold/30 rounded-[2px] bg-white p-0.5">
            <button
              type="button"
              onClick={() => {
                setShowPreview(true);
                setPreviewDevice("desktop");
              }}
              className={`px-2 py-1 rounded-[2px] text-xs flex items-center gap-1 ${
                showPreview && previewDevice === "desktop"
                  ? "bg-[#1A1209] text-white"
                  : "text-[#5C5147]"
              }`}
            >
              <Monitor size={13} />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setShowPreview(true);
                setPreviewDevice("mobile");
              }}
              className={`px-2 py-1 rounded-[2px] text-xs flex items-center gap-1 ${
                showPreview && previewDevice === "mobile"
                  ? "bg-[#1A1209] text-white"
                  : "text-[#5C5147]"
              }`}
            >
              <Smartphone size={13} />
              <span>Mobile</span>
            </button>
            <button
              type="button"
              onClick={() => setShowPreview((prev) => !prev)}
              className="px-2 py-1 rounded-[2px] text-[11px] font-semibold text-[#5C5147] hover:text-[#1A1209]"
            >
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
          </div>

          <a
            href={previewRoute}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-[2px] bg-white border border-gold/30 hover:border-gold text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <span>Open Live Page</span>
            <ExternalLink size={12} className="text-gold" />
          </a>

          <button
            type="button"
            onClick={() => void handleReset()}
            disabled={saving !== null}
            className="px-3 py-1.5 rounded-[2px] bg-white border border-gold/30 hover:border-red-400 hover:text-red-700 text-xs font-semibold inline-flex items-center gap-1.5 disabled:opacity-50"
          >
            <RotateCcw size={12} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={() => void handleSave("save-draft")}
            disabled={saving !== null}
            className="px-3 py-1.5 rounded-[2px] bg-white border border-gold/40 hover:border-gold text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 disabled:opacity-50"
          >
            {saving === "draft" ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Save size={13} className="text-gold" />
            )}
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => void handleSave("publish")}
            disabled={saving !== null}
            className="px-4 py-1.5 rounded-[2px] bg-[#1A1209] hover:bg-[#D4AF37] hover:text-[#1A1209] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            {saving === "publish" ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Sparkles size={13} />
            )}
            <span>Publish Live</span>
          </button>

          <button
            type="button"
            onClick={() => void handleSignOut()}
            title="Sign Out"
            className="p-2 rounded-[2px] bg-white border border-gold/30 hover:border-red-400 hover:text-red-700"
          >
            <LogOut size={14} />
          </button>
        </div>
      </header>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-[3px] shadow-xl border text-xs font-semibold flex items-center gap-2 ${
            toast.type === "ok"
              ? "bg-[#1A1209] text-[#FAF7F2] border-gold"
              : "bg-red-700 text-white border-red-900"
          }`}
        >
          <CheckCircle2 size={15} className="text-gold shrink-0" />
          <span>{toast.msg}</span>
        </div>
      )}

      {/* ── Main Studio Split Body ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Left Navigation Rail */}
        <aside className="lg:w-56 bg-[#FDFAF5] border-b lg:border-b-0 lg:border-r border-gold/25 p-3 flex lg:flex-col gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {(
            [
              { id: "pages", label: "Pages & Layouts", icon: <Layout size={15} /> },
              { id: "collections", label: "Collections & Lists", icon: <Layers size={15} /> },
              { id: "media", label: "Media Library", icon: <ImageIcon size={15} /> },
              { id: "global", label: "Brand, Nav & Footer", icon: <Globe size={15} /> },
              { id: "theme", label: "Theme & Design", icon: <Palette size={15} /> },
              { id: "setup", label: "Supabase & Setup", icon: <Database size={15} /> },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-2.5 rounded-[2px] text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-colors text-left ${
                activeTab === item.id
                  ? "bg-[#1A1209] text-white shadow-sm"
                  : "text-[#5C5147] hover:bg-[#F7F3EC] hover:text-[#1A1209]"
              }`}
            >
              <span className={activeTab === item.id ? "text-gold" : "text-gold/80"}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}

          {/* Page Sub-list when in Pages & Layouts */}
          {activeTab === "pages" && (
            <div className="hidden lg:block pt-3 mt-2 border-t border-gold/20 space-y-1">
              <p className="px-2 text-[10px] uppercase tracking-widest text-gold font-bold">
                Select Page
              </p>
              {PAGE_KEYS.map((key) => {
                const pg = cms.pages[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActivePage(key)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-[2px] text-xs transition-colors flex items-center justify-between ${
                      activePage === key
                        ? "bg-gold/15 text-[#1A1209] font-bold border-l-2 border-gold"
                        : "text-[#5C5147] hover:text-[#1A1209] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <span className="truncate">{pg.label}</span>
                    <span className="text-[10px] opacity-60">{pg.sections.length}</span>
                  </button>
                );
              })}
            </div>
          )}
        </aside>

        {/* Center Editor Column */}
        <section
          className={`flex-1 overflow-y-auto p-4 sm:p-6 ${
            showPreview ? "xl:max-w-[54%]" : ""
          }`}
        >
          {/* Mobile/Tablet page switcher when on pages tab */}
          {activeTab === "pages" && (
            <div className="lg:hidden mb-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {PAGE_KEYS.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActivePage(key)}
                  className={`px-3 py-1.5 rounded-[2px] text-xs font-semibold whitespace-nowrap ${
                    activePage === key
                      ? "bg-[#1A1209] text-white"
                      : "bg-white border border-gold/25 text-[#5C5147]"
                  }`}
                >
                  {cms.pages[key].label}
                </button>
              ))}
            </div>
          )}

          {activeTab === "pages" && (
            <PageSectionEditor
              page={cms.pages[activePage]}
              onChange={(updatedPage) =>
                setCms((prev) => ({
                  ...prev,
                  pages: { ...prev.pages, [activePage]: updatedPage },
                }))
              }
            />
          )}

          {activeTab === "collections" && (
            <CollectionsEditor
              collections={cms.collections}
              onChange={(nextCollections) =>
                setCms((prev) => ({ ...prev, collections: nextCollections }))
              }
            />
          )}

          {activeTab === "media" && (
            <div className="bg-white border border-gold/25 rounded-[3px] p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/15 pb-3">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1A1209]">
                    Media Library &amp; Cloud Storage
                  </h3>
                  <p className="text-xs text-[#5C5147]">
                    Upload new photography and 4K wedding reels or copy any URL for use across pages.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMediaModalOpen(true)}
                  className="px-4 py-2 rounded-[2px] bg-[#1A1209] hover:bg-gold hover:text-[#1A1209] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
                >
                  <Upload size={14} />
                  <span>Open Media Browser &amp; Uploader</span>
                </button>
              </div>
              <MediaQuickGallery />
            </div>
          )}

          {activeTab === "global" && (
            <GlobalSiteEditor
              site={cms.site}
              onChange={(nextSite) => setCms((prev) => ({ ...prev, site: nextSite }))}
            />
          )}

          {activeTab === "theme" && (
            <ThemeDesignEditor
              theme={cms.theme}
              onChange={(nextTheme) => setCms((prev) => ({ ...prev, theme: nextTheme }))}
            />
          )}

          {activeTab === "setup" && <SupabaseSetupPanel storageMode={storageMode} />}
        </section>

        {/* Right Live Split-Screen Preview Column */}
        {showPreview && (
          <aside className="hidden xl:flex flex-col flex-1 border-l border-gold/25 bg-[#EAE3D5] p-4 items-center justify-start">
            <div className="w-full flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#5C5147]">
                Live Preview: {previewRoute} ({previewDevice})
              </span>
              <span className="text-[10px] font-semibold text-emerald-800">
                {previewReady ? "● Synced" : "Loading preview..."}
              </span>
            </div>
            <div
              className={`bg-white border border-gold/40 shadow-2xl overflow-hidden transition-all duration-300 h-[calc(100vh-115px)] ${
                previewDevice === "mobile"
                  ? "w-[390px] rounded-[20px] border-4 border-[#1A1209]"
                  : "w-full rounded-[3px]"
              }`}
            >
              <iframe
                ref={iframeRef}
                key={previewRoute}
                src={`${previewRoute}?cmsPreview=1`}
                title="Wedding Flora Live Preview"
                className="w-full h-full border-0"
              />
            </div>
          </aside>
        )}
      </div>

      <MediaPickerModal
        open={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => {
          if (typeof navigator !== "undefined" && navigator.clipboard) {
            void navigator.clipboard.writeText(url);
            showNotice("ok", `Copied URL to clipboard: ${url}`);
          }
        }}
      />
    </div>
  );
}

function MediaQuickGallery() {
  const [assets, setAssets] = useState<MediaAssetItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cms/media")
      .then((r) => r.json())
      .then((json: { assets?: MediaAssetItem[] }) => {
        setAssets(json.assets ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-xs text-[#5C5147] py-6">Loading media assets...</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {assets.slice(0, 24).map((asset) => (
        <div
          key={asset.url}
          className="border border-gold/20 rounded-[2px] overflow-hidden bg-[#FAF7F2]"
        >
          <div className="relative aspect-[4/3] bg-[#1A1209]">
            {asset.type === "video" ? (
              <video src={asset.url} muted className="w-full h-full object-cover" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
            )}
          </div>
          <div className="p-2">
            <p className="text-[11px] font-medium truncate">{asset.name}</p>
            <p className="text-[10px] text-[#5C5147] truncate">{asset.url}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SupabaseSetupPanel({
  storageMode,
}: {
  storageMode: "supabase" | "local-dev" | "unconfigured";
}) {
  const cloudinaryReady = Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

  return (
    <div className="bg-white border border-gold/25 rounded-[3px] p-6 space-y-4 text-xs leading-relaxed">
      <h3 className="font-serif text-xl font-bold text-[#1A1209] border-b border-gold/15 pb-2">
        Supabase &amp; Cloudinary Production Setup
      </h3>
      <div className="flex flex-wrap gap-4">
        <p>
          CMS Database / Auth:{" "}
          <strong className="uppercase text-[#D4AF37]">{storageMode}</strong>
        </p>
        <p>
          Media Storage (Photos &amp; 4K Reels):{" "}
          <strong className="uppercase text-[#D4AF37]">
            {cloudinaryReady ? "Cloudinary Direct CDN" : "Supabase / Local Fallback"}
          </strong>
        </p>
      </div>
      <ol className="list-decimal pl-5 space-y-2 text-[#5C5147]">
        <li>
          Open your Supabase project <strong>SQL Editor</strong>, paste{" "}
          <code>supabase/schema.sql</code>, and click <strong>Run</strong>.
        </li>
        <li>
          Ensure <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, <code>SUPABASE_SERVICE_ROLE_KEY</code>,{" "}
          <code>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code>,{" "}
          <code>NEXT_PUBLIC_CLOUDINARY_API_KEY</code>, and{" "}
          <code>CLOUDINARY_API_SECRET</code> are configured in your hosting Environment Variables.
        </li>
        <li>
          Create your admin account at <code>/admin/login</code> or in Supabase Authentication.
        </li>
      </ol>
    </div>
  );
}

