import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  size = "default",
  ...props
}) => {
  const sizeClasses = {
    narrow: "max-w-3xl",
    default: "max-w-[1200px]",
    wide: "max-w-7xl",
  };

  return (
    <div
      className={`w-full mx-auto px-6 sm:px-8 lg:px-12 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
