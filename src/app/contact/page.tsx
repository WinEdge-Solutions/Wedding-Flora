import React from "react";
import { DynamicSubpageView } from "@/components/cms/DynamicSubpageView";

export const metadata = {
  title: "Enquire & Contact | Wedding Flora • The Wedding Planner",
  description:
    "Schedule a personal consultation with Wedding Flora. Plan your royal Indian wedding across Udaipur, Jaipur, Jodhpur, and Delhi NCR.",
};

export default function ContactPage() {
  return <DynamicSubpageView pageKey="contact" />;
}
