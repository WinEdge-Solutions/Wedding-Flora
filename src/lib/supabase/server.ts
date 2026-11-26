import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import {
  isSupabaseConfigured,
  isSupabaseServiceConfigured,
  LOCAL_DEV_COOKIE,
} from "./config";

export async function createSupabaseServerClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Cookie writes inside Server Components can be safely ignored
          }
        },
      },
    }
  );
}

export function createSupabaseAdminClient() {
  if (!isSupabaseServiceConfigured()) {
    return null;
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export interface AdminSessionResult {
  authorized: boolean;
  mode: "supabase" | "local-dev" | "unauthenticated";
  email?: string;
  userId?: string;
}

export async function getAdminSession(): Promise<AdminSessionResult> {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return { authorized: false, mode: "unauthenticated" };
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return { authorized: false, mode: "unauthenticated" };
    }

    // Check optional cms_admins allowlist: if empty, any authenticated user is admin
    const { data: adminRows, error: adminErr } = await supabase
      .from("cms_admins")
      .select("user_id")
      .limit(1);

    if (!adminErr && adminRows && adminRows.length > 0) {
      const { data: match } = await supabase
        .from("cms_admins")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!match) {
        return { authorized: false, mode: "unauthenticated" };
      }
    }

    return {
      authorized: true,
      mode: "supabase",
      email: user.email,
      userId: user.id,
    };
  }

  // Strictly local development convenience when Supabase env vars aren't added yet
  if (process.env.NODE_ENV === "development") {
    const cookieStore = await cookies();
    if (cookieStore.get(LOCAL_DEV_COOKIE)?.value === "1") {
      return {
        authorized: true,
        mode: "local-dev",
        email: "local-dev@weddingflora.local",
      };
    }
  }

  return { authorized: false, mode: "unauthenticated" };
}

