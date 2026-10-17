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
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-gradient font-medium mb-3">
          {eyebrow}
        </p>
      )}

      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-charcoal tracking-tight leading-tight">
        {title}
      </h2>

      {withDivider && (
        <div className={align === "left" ? "flex justify-start" : "flex justify-center"}>
          <Divider variant="ornamental" className="my-5" />
        </div>
      )}

      {subtitle && (
        <p className="font-sans text-base sm:text-lg text-warmgrey font-light leading-relaxed mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};
