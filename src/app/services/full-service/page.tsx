import React from "react";
import { DynamicSubpageView } from "@/components/cms/DynamicSubpageView";

export const metadata = {
  title: "Full-Service Wedding Planners | Wedding Flora",
  description:
    "Turnkey luxury wedding planning, palace procurement, architectural 3D floral scenography, and white-glove event management across Udaipur, Jaipur, Jodhpur, Goa, and global destinations.",
};

export default function FullServicePage() {
  return <DynamicSubpageView pageKey="services" />;
}
