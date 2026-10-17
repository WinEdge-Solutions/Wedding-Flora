import React from "react";
import Link from "next/link";

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: "primary" | "sage" | "outline" | "text";
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
    "inline-flex items-center justify-center font-sans tracking-wider uppercase text-xs transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-[2px]";

  const variantClasses = {
    primary:
      "bg-charcoal text-ivory hover:bg-black active:bg-charcoal/90 border border-charcoal",
    sage:
      "bg-sage text-ivory hover:bg-[#6b7b69] active:bg-sage/90 border border-sage",
    outline:
      "bg-transparent text-charcoal border border-gold hover:bg-gold/10 active:bg-gold/20",
    text:
      "bg-transparent text-charcoal hover:text-gold underline underline-offset-8 decoration-gold/60 p-0 border-0",
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
