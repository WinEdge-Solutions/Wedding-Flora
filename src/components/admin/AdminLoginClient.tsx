"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Divider } from "@/components/ui/Divider";
import {
  AlertTriangle,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface AdminLoginClientProps {
  supabaseConfigured: boolean;
  isDevelopment: boolean;
}

export function AdminLoginClient({
  supabaseConfigured,
  isDevelopment,
}: AdminLoginClientProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSupabaseSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        setError("Authentication service is currently unavailable.");
        setLoading(false);
        return;
      }

      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInErr) {
        setError(signInErr.message);
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
      setLoading(false);
    }
  };

  const handleLocalDevEnter = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/cms/auth/local-dev", { method: "POST" });
      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        setError(body.error || "Unable to open local dev studio.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Failed to start local studio session.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1209] relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Subtle stationery ambient background accents */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, #F1DCE1 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Main Stationery Login Card */}
        <div className="relative bg-[#FDFAF5] border border-[#D4AF37]/35 rounded-[3px] shadow-[0_24px_70px_rgba(26,18,9,0.09)] p-7 sm:p-10 space-y-6">
          {/* Fine hairline gold corner accents */}
          <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t border-l border-[#D4AF37]/50 pointer-events-none" />
          <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t border-r border-[#D4AF37]/50 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b border-l border-[#D4AF37]/50 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b border-r border-[#D4AF37]/50 pointer-events-none" />

          {/* Header & Crest */}
          <div className="text-center space-y-2.5">
            <div className="relative w-16 h-16 mx-auto drop-shadow-[0_4px_14px_rgba(212,175,55,0.3)]">
              <Image
                src="/images/logo-emblem.png"
                alt="Wedding Flora Crest"
                fill
                className="object-contain"
                priority
              />
            </div>

            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#AB9178] font-bold">
              ✦ Wedding Flora Atelier ✦
            </p>

            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#1A1209] tracking-[0.03em]">
              Studio Sign In
            </h1>

            <Divider variant="ornamental" className="my-2" />

            <p className="font-sans text-xs sm:text-[13px] text-[#5C5147] leading-relaxed max-w-xs mx-auto">
              Access the private content &amp; layout studio for Wedding Flora.
            </p>
          </div>

          {!supabaseConfigured && (
            <div className="p-3 rounded-[2px] bg-amber-50/90 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                Supabase environment variables are not configured yet. Add{" "}
                <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
                <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, and{" "}
                <code>SUPABASE_SERVICE_ROLE_KEY</code> to enable cloud login.
              </p>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="p-3 rounded-[2px] bg-red-50 border border-red-200 text-red-800 text-xs font-medium text-center"
            >
              {error}
            </div>
          )}

          {supabaseConfigured ? (
            <form onSubmit={handleSupabaseSignIn} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="admin-email"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C5147] block"
                >
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#AB9178] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="admin-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin.weddingflora@gmail.com"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D7D3CF] focus:border-[#D4AF37] rounded-[2px] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/40 text-[#1A1209] placeholder-[#7A6B59]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="admin-password"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C5147] block"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#AB9178] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="admin-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-[#D7D3CF] focus:border-[#D4AF37] rounded-[2px] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/40 text-[#1A1209] placeholder-[#7A6B59]/50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-[#7A6B59] hover:text-[#1A1209] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded-[2px]"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-[2px] bg-[#1A1209] hover:bg-[#D4AF37] text-[#FAF7F2] hover:text-[#1A1209] text-xs font-bold uppercase tracking-[0.22em] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(26,18,9,0.12)] disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Studio</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : isDevelopment ? (
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleLocalDevEnter}
                disabled={loading}
                className="w-full py-3 px-4 rounded-[2px] bg-[#1A1209] hover:bg-[#D4AF37] hover:text-[#1A1209] text-white text-xs font-bold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>{loading ? "Opening Studio..." : "Open Local Dev Studio"}</span>
              </button>
            </div>
          ) : (
            <p className="text-xs text-[#5C5147] text-center py-2">
              Admin sign-in is disabled until cloud credentials are configured.
            </p>
          )}

          {/* Security Footer Note */}
          <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between text-[11px] text-[#7A6B59]">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Authorized Team Only</span>
            </span>
            <Link
              href="/"
              className="font-semibold uppercase tracking-wider hover:text-[#D4AF37] transition-colors"
            >
              ← Return to Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
