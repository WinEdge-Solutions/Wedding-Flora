"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Lock, Mail, ArrowRight, Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";

interface AdminLoginClientProps {
  supabaseConfigured: boolean;
  isDevelopment: boolean;
}

export function AdminLoginClient({
  supabaseConfigured,
  isDevelopment,
}: AdminLoginClientProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSupabaseAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        setError("Supabase environment variables are not configured yet.");
        setLoading(false);
        return;
      }

      if (mode === "signin") {
        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInErr) {
          setError(signInErr.message);
          setLoading(false);
          return;
        }
        router.push("/admin");
        router.refresh();
      } else {
        const { error: signUpErr } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpErr) {
          setError(signUpErr.message);
          setLoading(false);
          return;
        }
        setNotice(
          "Account created. If email confirmation is enabled in Supabase, confirm your inbox or sign in now."
        );
        setMode("signin");
        setLoading(false);
      }
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
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-4 sm:p-6 text-[#1A1209]">
      <div className="w-full max-w-md bg-white border border-gold/30 rounded-[3px] shadow-[0_20px_60px_rgba(26,18,9,0.08)] p-7 sm:p-10 space-y-6">
        <div className="text-center space-y-2.5">
          <div className="relative w-14 h-14 mx-auto">
            <Image
              src="/images/logo-emblem.png"
              alt="Wedding Flora Crest"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#D4AF37] font-bold">
            ✦ Atelier Content Studio ✦
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#1A1209]">
            Wedding Flora Admin
          </h1>
          <p className="font-sans text-xs text-[#5C5147] leading-relaxed">
            Customize pages, copy, media archives, layouts, navigation, and royal theme tokens.
          </p>
        </div>

        {/* Connection status banner */}
        <div
          className={`p-3 rounded-[2px] border text-xs flex items-start gap-2.5 ${
            supabaseConfigured
              ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
              : "bg-amber-50/80 border-amber-200 text-amber-900"
          }`}
        >
          {supabaseConfigured ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          )}
          <div className="space-y-0.5">
            <p className="font-semibold">
              {supabaseConfigured
                ? "Supabase Auth & Storage Connected"
                : "Supabase Not Configured Yet"}
            </p>
            {!supabaseConfigured && (
              <p className="text-[11px] opacity-90">
                Add <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
                <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, and{" "}
                <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code> &amp; Vercel, and run{" "}
                <code>supabase/schema.sql</code>.
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-[2px] bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
            {error}
          </div>
        )}

        {notice && (
          <div className="p-3 rounded-[2px] bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            {notice}
          </div>
        )}

        {supabaseConfigured ? (
          <form onSubmit={handleSupabaseAuth} className="space-y-4">
            <div className="flex border border-gold/25 rounded-[2px] p-0.5 bg-[#FAF7F2]">
              <button
                type="button"
                onClick={() => setMode("signin")}
                className={`flex-1 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors ${
                  mode === "signin"
                    ? "bg-[#1A1209] text-white"
                    : "text-[#5C5147] hover:text-[#1A1209]"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors ${
                  mode === "signup"
                    ? "bg-[#1A1209] text-white"
                    : "text-[#5C5147] hover:text-[#1A1209]"
                }`}
              >
                Create Account
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gold absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="director@weddingflora.com"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#FAF7F2] border border-gold/25 rounded-[2px] focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gold absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#FAF7F2] border border-gold/25 rounded-[2px] focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-[2px] bg-[#1A1209] hover:bg-gold hover:text-[#1A1209] text-white text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>
                {loading
                  ? "Authenticating..."
                  : mode === "signin"
                    ? "Sign In to Atelier Studio"
                    : "Create Admin Account"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : isDevelopment ? (
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleLocalDevEnter}
              disabled={loading}
              className="w-full py-3 px-4 rounded-[2px] bg-[#1A1209] hover:bg-gold hover:text-[#1A1209] text-white text-xs font-bold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span>{loading ? "Opening Studio..." : "Open Local Dev Studio"}</span>
            </button>
            <p className="text-[11px] text-[#5C5147] text-center leading-relaxed">
              Edits save locally to <code>.cms-local.json</code> during development until you connect Supabase for Vercel production persistence.
            </p>
          </div>
        ) : (
          <div className="text-xs text-[#5C5147] text-center py-2">
            Configure Supabase environment variables in Vercel project settings to enable admin sign-in.
          </div>
        )}

        <div className="pt-2 border-t border-gold/15 text-center">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-wider text-[#5C5147] hover:text-gold transition-colors"
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

