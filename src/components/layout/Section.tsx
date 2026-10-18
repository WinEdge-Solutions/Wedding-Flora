import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "ivory" | "cream" | "charcoal";
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  variant = "ivory",
  ...props
}) => {
  const variantClasses = {
    ivory: "bg-ivory text-charcoal",
    cream: "bg-cream text-charcoal",
    charcoal: "bg-charcoal text-ivory",
  };

  return (
    <section
      className={`w-full relative py-16 md:py-24 lg:py-28 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};
