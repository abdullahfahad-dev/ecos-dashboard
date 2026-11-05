import React from "react";
import {
  ShoppingBag,
  ShoppingCart,
  Users,
  Percent,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";

interface StatItem {
  title: string;
  value: string;
  change: {
    value: number;
    direction: "up" | "down" | "none";
    impact: "positive" | "negative" | "normal";
  };
  comparison: string;
  icon: React.ElementType;
}

const statsData: StatItem[] = [
  {
    title: "Total Sales",
    value: "৳248,560",
    change: {
      value: 12.8,
      direction: "up",
      impact: "positive",
    },
    comparison: "vs last month",
    icon: ShoppingBag,
  },
  {
    title: "Total Orders",
    value: "1,284",
    change: {
      value: 8.2,
      direction: "up",
      impact: "positive",
    },
    comparison: "vs last month",
    icon: ShoppingCart,
  },
  {
    title: "Total Customers",
    value: "842",
    change: {
      value: 5.4,
      direction: "up",
      impact: "positive",
    },
    comparison: "vs last month",
    icon: Users,
  },
  {
    title: "Conversion Rate",
    value: "3.8%",
    change: {
      value: 0.6,
      direction: "up",
      impact: "positive",
    },
    comparison: "vs last month",
    icon: Percent,
  },
];

const impactStyles = {
  positive: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  negative: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  normal: "bg-slate-500/15 text-slate-600 dark:text-slate-400",
};

export default function StatsOverviewSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {statsData.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex items-center gap-3.5 p-4 bg-[var(--right-bg)] border border-[var(--right-border)] rounded-xl shadow-xs hover:shadow-sm"
          >
            <div
              className="flex items-center justify-center w-11 h-11 rounded-xl text-[var(--primary-color)] shrink-0"
              style={{
                backgroundColor: "color-mix(in srgb, var(--primary-color) 30%, transparent)",
              }}
            >
              <Icon className="w-5 h-5" />
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[14px] font-bold text-[var(--right-text-main)] truncate leading-tight">
                {item.title}
              </span>

              <span className="text-[22px] font-bold tracking-tight text-[var(--right-text-main)] leading-tight my-1 truncate">
                {item.value}
              </span>

              <div className="flex items-center gap-2 text-[12px] leading-tight">
                <span
                  className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded font-bold shrink-0 ${impactStyles[item.change.impact]}`}
                >
                  {item.change.direction === "up" && (
                    <ArrowUp className="w-3 h-3 stroke-[2.5]" />
                  )}
                  {item.change.direction === "down" && (
                    <ArrowDown className="w-3 h-3 stroke-[2.5]" />
                  )}
                  {item.change.direction === "none" && (
                    <Minus className="w-3 h-3 stroke-[2.5]" />
                  )}
                  <span>
                    {item.change.direction === "up" ? "+" : item.change.direction === "down" ? "-" : ""}
                    {item.change.value}%
                  </span>
                </span>
                <span className="text-[var(--right-text-muted)] truncate font-normal">
                  {item.comparison}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
