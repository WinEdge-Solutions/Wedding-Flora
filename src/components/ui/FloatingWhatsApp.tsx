"use client";

import React from "react";
import { siteConfig } from "@/lib/site";

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside
      aria-label="WhatsApp Concierge"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 pointer-events-auto"
    >
      <a
        href={siteConfig.contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Wedding Flora on WhatsApp"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] text-white shadow-[0_6px_24px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_32px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
      >
        {/* Authentic WhatsApp SVG Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 sm:w-7 sm:h-7"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.56 20.16 9.11 19.76 7.85 19.02L7.55 18.84L4.43 19.66L5.26 16.62L5.07 16.31C4.26 15.02 3.81 13.49 3.81 11.91C3.81 7.37 7.51 3.67 12.05 3.67ZM8.93 7.32C8.72 7.32 8.38 7.4 8.1 7.7C7.81 8.01 7 8.77 7 10.31C7 11.85 8.12 13.33 8.28 13.54C8.44 13.75 10.45 16.86 13.56 18.2C14.3 18.52 14.88 18.71 15.33 18.85C16.08 19.09 16.76 19.05 17.3 18.97C17.9 18.88 19.15 18.21 19.41 17.48C19.67 16.75 19.67 16.12 19.59 15.99C19.51 15.86 19.3 15.79 18.99 15.63C18.68 15.47 17.16 14.72 16.88 14.62C16.6 14.52 16.4 14.47 16.19 14.78C15.98 15.09 15.39 15.79 15.21 15.99C15.03 16.19 14.85 16.22 14.54 16.06C14.23 15.9 13.23 15.58 12.05 14.52C11.13 13.7 10.51 12.69 10.33 12.38C10.15 12.07 10.31 11.91 10.47 11.75C10.61 11.61 10.78 11.39 10.94 11.21C11.1 11.03 11.15 10.9 11.25 10.69C11.35 10.48 11.3 10.3 11.22 10.14C11.14 9.98 10.52 8.44 10.26 7.82C10.01 7.22 9.75 7.3 9.56 7.29C9.38 7.28 9.17 7.32 8.93 7.32Z" />
        </svg>
      </a>
    </aside>
  );
};
