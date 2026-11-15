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
    ivory: "bg-[#FDFAF5] text-[#1A1209]",
    cream: "bg-[#F7F3EC] text-[#1A1209] border-y border-[#D4AF37]/15",
    charcoal: "bg-[#1A1209] text-[#FAF7F2] border-y border-gold/20",
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
