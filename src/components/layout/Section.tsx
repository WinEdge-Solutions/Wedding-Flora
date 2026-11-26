import React from "react";
import type { SectionBgVariant } from "@/lib/cms/types";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  variant?: SectionBgVariant;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  variant = "ivory",
  style,
  ...props
}) => {
  const variantStyles: Record<SectionBgVariant, React.CSSProperties> = {
    ivory: {
      backgroundColor: "var(--wf-paper, #FDFAF5)",
      color: "var(--wf-ink, #1A1209)",
    },
    stationery: {
      backgroundColor: "var(--wf-stationery, #FAF7F2)",
      color: "var(--wf-ink, #1A1209)",
    },
    cream: {
      backgroundColor: "var(--wf-cream, #F7F3EC)",
      color: "var(--wf-ink, #1A1209)",
    },
    charcoal: {
      backgroundColor: "var(--wf-ink, #1A1209)",
      color: "var(--wf-stationery, #FAF7F2)",
    },
  };

  const borderClass =
    variant === "cream"
      ? "border-y border-[#D4AF37]/10"
      : variant === "charcoal"
        ? "border-y border-gold/20"
        : "";

  return (
    <section
      className={`w-full relative py-12 sm:py-[var(--wf-section-py,5rem)] ${borderClass} ${className}`}
      style={{ ...variantStyles[variant], ...style }}
      {...props}
    >
      {children}
    </section>
  );
};
