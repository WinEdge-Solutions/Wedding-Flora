"use client";

import React from "react";
import Image from "next/image";
import { useCms } from "@/components/cms/CmsProvider";

export const FloatingWhatsApp: React.FC = () => {
  const cms = useCms();

  return (
    <aside
      aria-label="WhatsApp Concierge"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 pointer-events-auto"
    >
      <a
        href={cms.site.contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${cms.site.name} on WhatsApp`}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-[0_6px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_32px_rgba(37,211,102,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
      >
        <Image
          src="/images/whatsapp.webp"
          alt="WhatsApp Concierge"
          width={56}
          height={56}
          className="w-full h-full object-contain select-none"
          priority
        />
      </a>
    </aside>
  );
};
