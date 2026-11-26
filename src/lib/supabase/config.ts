export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
      anonKey &&
      !url.includes("your-project-id") &&
      !anonKey.includes("your-supabase-anon-key")
  );
}

export function isSupabaseServiceConfigured(): boolean {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(
    isSupabaseConfigured() &&
      serviceKey &&
      !serviceKey.includes("your-supabase-service-role-key")
  );
}

export const CMS_MEDIA_BUCKET = "cms-media";
export const LOCAL_DEV_COOKIE = "wf_local_dev_admin";

