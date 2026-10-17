import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "ivory" | "cream" | "charcoal";
  spacing?: "default" | "compact" | "hero";
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  variant = "ivory",
  spacing = "default",
  ...props
}) => {
  const variantClasses = {
    ivory: "bg-ivory text-charcoal",
    cream: "bg-cream text-charcoal",
    charcoal: "bg-charcoal text-ivory",
  };

  const spacingClasses = {
    compact: "py-12 md:py-16",
    default: "py-16 md:py-24 lg:py-28",
    hero: "pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-32",
  };

  return (
    <section
      className={`w-full relative ${variantClasses[variant]} ${spacingClasses[spacing]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};
