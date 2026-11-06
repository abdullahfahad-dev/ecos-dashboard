import React from "react";
import ThemeIconBox from "./ThemeIconBox";
import TrendBadge, { TrendBadgeProps } from "./TrendBadge";

export interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  change: {
    value: number | string;
    direction: "up" | "down" | "none";
    impact: "positive" | "negative" | "normal";
  };
  comparison: string;
  className?: string;
}

export default function MetricCard({
  title,
  value,
  icon,
  change,
  comparison,
  className = "",
}: MetricCardProps) {
  return (
    <div
      className={`flex items-center gap-3.5 p-4 bg-[var(--right-bg)] border border-[var(--right-border)] rounded-xl shadow-xs hover:shadow-sm transition-shadow ${className}`}
    >
      <ThemeIconBox icon={icon} size="lg" />

      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-[14px] font-bold text-[var(--right-text-main)] truncate leading-tight">
          {title}
        </span>

        <span className="text-[22px] font-bold tracking-tight text-[var(--right-text-main)] leading-tight my-1 truncate">
          {value}
        </span>

        <div className="flex items-center gap-2 text-[12px] leading-tight">
          <TrendBadge
            value={change.value}
            direction={change.direction}
            impact={change.impact}
          />
          <span className="text-[var(--right-text-muted)] truncate">
            {comparison}
          </span>
        </div>
      </div>
    </div>
  );
}

