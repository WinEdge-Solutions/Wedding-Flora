import React from "react";
import { Divider } from "./Divider";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  withDivider?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  withDivider = true,
  className = "",
}) => {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl mb-12 lg:mb-16 ${alignClass} ${className}`}>
      {eyebrow && (
        <p className={`font-sans text-[11px] sm:text-xs uppercase tracking-[0.32em] text-[#D4AF37] font-bold mb-3 flex items-center gap-2 ${align === "center" ? "justify-center" : "justify-start"}`}>
          <span>✦</span>
          <span>{eyebrow}</span>
          <span>✦</span>
        </p>
      )}

      <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-ivory tracking-[0.03em] leading-[1.2]">
        {title}
      </h2>

      {withDivider && (
        <div className={align === "left" ? "flex justify-start" : "flex justify-center"}>
          <Divider variant="ornamental" className="my-4 sm:my-5" />
        </div>
      )}

      {subtitle && (
        <p className="font-sans text-sm sm:text-base lg:text-[16px] text-ivory/80 font-normal leading-relaxed mt-2.5">
          {subtitle}
        </p>
      )}
    </div>
  );
};
