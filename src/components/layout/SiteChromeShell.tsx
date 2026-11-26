"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlobalAurora } from "@/components/ui/GlobalAurora";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { useCms } from "@/components/cms/CmsProvider";

export function SiteChromeShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const cms = useCms();

  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <div className="flex-1 min-h-screen relative z-10">{children}</div>;
  }

  return (
    <>
      {cms.theme.effects.enableAurora && <GlobalAurora />}
      <Navbar />
      <div className="flex-1 relative z-10">{children}</div>
      <FloatingWhatsApp />
      <Footer />
    </>
  );
}

