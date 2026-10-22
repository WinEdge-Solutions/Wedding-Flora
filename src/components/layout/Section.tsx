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
    ivory: "bg-transparent text-ivory",
    cream: "bg-white/[0.02] backdrop-blur-[2px] text-ivory border-y border-white/[0.05]",
    charcoal: "bg-black/40 backdrop-blur-md text-ivory border-y border-gold/20",
  };

  return (
    <section
      className={`w-full relative py-12 sm:py-16 md:py-24 lg:py-28 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};
