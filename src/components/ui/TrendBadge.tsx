import React from "react";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

export interface TrendBadgeProps {
  value: number | string;
  direction?: "up" | "down" | "none";
  impact?: "positive" | "negative" | "normal";
  className?: string;
}

const impactStyles = {
  positive: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  negative: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  normal: "bg-slate-500/15 text-slate-600 dark:text-slate-400",
};

export default function TrendBadge({
  value,
  direction = "none",
  impact = "positive",
  className = "",
}: TrendBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-bold shrink-0 text-[11px] sm:text-[12px] leading-tight ${impactStyles[impact]} ${className}`}
    >
      {direction === "up" && <ArrowUp className="w-3 h-3 stroke-[2.5]" />}
      {direction === "down" && <ArrowDown className="w-3 h-3 stroke-[2.5]" />}
      {direction === "none" && <Minus className="w-3 h-3 stroke-[2.5]" />}
      <span>{value}%</span>
    </span>
  );
}
