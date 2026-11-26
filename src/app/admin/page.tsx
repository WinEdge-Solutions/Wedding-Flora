import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/supabase/server";
import { getAdminCmsState } from "@/lib/cms/server";
import { AdminStudioWorkspace } from "@/components/admin/AdminStudioWorkspace";

export const metadata = {
  title: "Atelier Admin Studio | Wedding Flora",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session.authorized) {
    redirect("/admin/login");
  }

  const state = await getAdminCmsState();

  return (
    <AdminStudioWorkspace
      initialPublished={state.published}
      initialDraft={state.draft}
      storageMode={state.storageMode}
      adminEmail={session.email}
    />
  );
}

