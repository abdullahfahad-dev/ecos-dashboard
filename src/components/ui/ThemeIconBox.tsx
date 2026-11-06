import React from "react";

interface ThemeIconBoxProps {
  icon: React.ElementType;
  size?: "sm" | "md" | "lg";
  className?: string;
  iconClassName?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 rounded-lg",
  md: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl",
  lg: "w-11 h-11 rounded-xl",
};

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-5 h-5",
};

export default function ThemeIconBox({
  icon: Icon,
  size = "md",
  className = "",
  iconClassName = "",
}: ThemeIconBoxProps) {
  return (
    <div
      className={`flex items-center justify-center text-[var(--primary-color)] shrink-0 ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: "color-mix(in srgb, var(--primary-color) 12%, transparent)",
      }}
    >
      <Icon className={`${iconSizes[size]} ${iconClassName}`} />
    </div>
  );
}

