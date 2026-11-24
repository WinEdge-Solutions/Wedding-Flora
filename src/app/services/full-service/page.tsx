import React from "react";
import { FullServiceView } from "@/components/services/FullServiceView";

export const metadata = {
  title: "Full-Service Wedding Planners | Wedding Flora",
  description:
    "Turnkey luxury wedding planning, palace procurement, architectural 3D floral scenography, and white-glove event management across Udaipur, Jaipur, Jodhpur, Goa, and global destinations.",
};

export default function FullServicePage() {
  return (
    <main className="min-h-screen text-[#1A1209] relative z-10">
      <FullServiceView />
    </main>
  );
}

