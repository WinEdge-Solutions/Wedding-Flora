import React from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AdminLoginClient } from "@/components/admin/AdminLoginClient";

export const metadata = {
  title: "Admin Studio Sign In | Wedding Flora",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <AdminLoginClient
      supabaseConfigured={isSupabaseConfigured()}
      isDevelopment={process.env.NODE_ENV === "development"}
    />
  );
}

