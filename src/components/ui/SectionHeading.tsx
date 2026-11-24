import React from "react";
import { Divider } from "./Divider";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  withDivider?: boolean;
  className?: string;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  withDivider = true,
  className = "",
  light = false,
}) => {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl mb-6 sm:mb-10 lg:mb-16 ${alignClass} ${className}`}>
      {eyebrow && (
        <p className={`font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#D4AF37] font-semibold mb-2 sm:mb-3 flex items-center gap-2 ${align === "center" ? "justify-center" : "justify-start"}`}>
          <span className="opacity-60">—</span>
          <span>{eyebrow}</span>
          <span className="opacity-60">—</span>
        </p>
      )}

      <h2 className={`font-display text-2xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-[0.03em] leading-[1.2] ${light ? "text-[#FAF7F2]" : "text-[#1A1209]"}`}>
        {title}
      </h2>

      {withDivider && (
        <div className={align === "left" ? "flex justify-start" : "flex justify-center"}>
          <Divider variant="ornamental" className="my-2.5 sm:my-4" />
        </div>
      )}

      {subtitle && (
        <p className={`font-sans text-xs sm:text-base lg:text-[16px] font-normal leading-[1.75] mt-2 sm:mt-2.5 ${light ? "text-[#FAF7F2]/80" : "text-[#5C5147]"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
