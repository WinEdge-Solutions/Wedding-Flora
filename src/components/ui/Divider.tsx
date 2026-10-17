import React from "react";

interface DividerProps {
  className?: string;
  variant?: "gold" | "ornamental";
}

export const Divider: React.FC<DividerProps> = ({
  className = "",
  variant = "ornamental",
}) => {
  if (variant === "gold") {
    return <hr className={`border-t border-gold/40 my-8 ${className}`} />;
  }

  // Ornamental floral/diamond delicate stationery divider
  return (
    <div
      className={`flex items-center justify-center space-x-4 my-8 text-gold/70 ${className}`}
      role="separator"
      aria-orientation="horizontal"
    >
      <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-gold/50" />
      <span className="text-xs tracking-widest text-gold select-none">✦</span>
      <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-gold/50" />
    </div>
  );
};
