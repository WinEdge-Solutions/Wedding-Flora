import React from "react";
import Link from "next/link";

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
}

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
  href,
  ...rest
}) => {
  const baseClasses =
    "relative inline-flex items-center justify-center font-sans tracking-wider uppercase text-xs font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-[2px] overflow-hidden";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#B79A5B] via-[#D4B87A] to-[#B79A5B] text-[#0A0509] font-bold border border-gold/50 shadow-[0_0_20px_rgba(183,154,91,0.25)] hover:shadow-[0_0_35px_rgba(183,154,91,0.5)] hover:scale-[1.02] hover:-translate-y-0.5 active:translate-y-0",
    outline:
      "shimmer-card bg-white/[0.05] backdrop-blur-md text-ivory border border-gold/70 hover:bg-gold/15 hover:border-gold hover:shadow-[0_0_25px_rgba(183,154,91,0.35)] hover:-translate-y-0.5 active:translate-y-0",
    text:
      "bg-transparent text-ivory hover:text-gold underline underline-offset-8 decoration-gold/60 p-0 border-0 overflow-visible",
  };

  const sizeClasses = {
    sm: "px-5 py-2.5 min-h-[40px]",
    md: "px-7 py-3.5 min-h-[46px]",
    lg: "px-9 py-4 min-h-[52px] text-sm",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${variant !== "text" ? sizeClasses[size] : ""} ${widthClass} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};
