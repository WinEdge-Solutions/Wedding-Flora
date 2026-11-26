import { NextResponse } from "next/server";
import { isSupabaseConfigured, LOCAL_DEV_COOKIE } from "@/lib/supabase/config";

export async function POST() {
  if (process.env.NODE_ENV !== "development" || isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Local dev bypass is unavailable." },
      { status: 403 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(LOCAL_DEV_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(LOCAL_DEV_COOKIE);
  return res;
}

