import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isSupabaseConfigured, LOCAL_DEV_COOKIE } from "@/lib/supabase/config";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  if (isSupabaseConfigured()) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user && pathname !== "/admin/login") {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }

    if (user && pathname === "/admin/login") {
      const adminUrl = request.nextUrl.clone();
      adminUrl.pathname = "/admin";
      return NextResponse.redirect(adminUrl);
    }

    return response;
  }

  // Local dev convenience check when Supabase env vars are not configured yet
  if (process.env.NODE_ENV === "development") {
    const hasLocalDev = request.cookies.get(LOCAL_DEV_COOKIE)?.value === "1";
    if (!hasLocalDev && pathname !== "/admin/login") {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
    if (hasLocalDev && pathname === "/admin/login") {
      const adminUrl = request.nextUrl.clone();
      adminUrl.pathname = "/admin";
      return NextResponse.redirect(adminUrl);
    }
    return response;
  }

  // Production without Supabase env vars: always redirect /admin to /admin/login setup notice
  if (pathname !== "/admin/login") {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};

