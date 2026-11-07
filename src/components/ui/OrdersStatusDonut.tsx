"use client";

import React, { memo, useMemo } from "react";
import ThemeIconBox from "@/components/ui/ThemeIconBox";
import PeriodDropdown from "@/components/ui/PeriodDropdown";
import { PieChart as PieIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export interface CategoryStatusItem {
  label: string;
  count?: number;
  percentage?: string;
  color: string;
}

export type OrderStatus = CategoryStatusItem;

export interface OrdersStatusDonutProps {
  title?: string;
  data: CategoryStatusItem[];
  centerLabel?: string;
  centerValue?: string;
  periodLabel?: string;
  icon?: React.ElementType;
  className?: string;
}

interface NormalizedStatusItem {
  label: string;
  value: number;
  color: string;
  countDisplay?: string;
  percentageDisplay: string;
}

function normalizeChartData(
  data: CategoryStatusItem[]
): { normalized: NormalizedStatusItem[]; totalSum: number } {
  let rawSum = 0;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (typeof item.count === "number") {
      rawSum += item.count;
    } else if (item.percentage) {
      rawSum += parseFloat(item.percentage) || 0;
    }
  }

  const normalized: NormalizedStatusItem[] = data.map((item) => {
    let numericValue = 0;
    let percentageText = item.percentage || "";

    if (typeof item.count === "number") {
      numericValue = item.count;
      if (!percentageText && rawSum > 0) {
        percentageText = `${((item.count / rawSum) * 100).toFixed(1)}%`;
      }
    } else if (item.percentage) {
      numericValue = parseFloat(item.percentage) || 0;
    }

    return {
      label: item.label,
      value: numericValue,
      color: item.color,
      countDisplay: typeof item.count === "number" ? item.count.toLocaleString() : undefined,
      percentageDisplay: percentageText || "0.0%",
    };
  });

  return { normalized, totalSum: rawSum };
}

function OrdersStatusDonutComponent({
  title = "Orders by Status",
  data,
  centerLabel = "Orders",
  centerValue,
  periodLabel,
  icon: Icon = PieIcon,
  className = "",
}: OrdersStatusDonutProps) {
  const { normalized, totalSum } = useMemo(() => normalizeChartData(data), [data]);

  const displayCenterValue = centerValue ?? (totalSum > 0 ? totalSum.toLocaleString() : "0");

  return (
    <div
      className={`flex flex-col justify-between p-4 sm:p-5 border border-[var(--right-border)] rounded-2xl shadow-xs w-full h-full min-h-[330px] ${className}`}
      role="region"
      aria-label={title}
    >
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <ThemeIconBox icon={Icon} size="md" />
          <h3 className="text-[16px] font-bold text-[var(--right-text-main)] leading-tight">
            {title}
          </h3>
        </div>

        {periodLabel && (
          <PeriodDropdown
            value={periodLabel}
            options={["Last 7 Days", "Last 30 Days", "Last 90 Days", "This Year"]}
          />
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-4 flex-1 py-1">
        <div className="relative w-[150px] h-[150px] sm:w-[160px] sm:h-[160px] shrink-0 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={normalized}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={72}
                paddingAngle={4}
                stroke="none"
                isAnimationActive={true}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {normalized.map((item) => (
                  <Cell
                    key={item.label}
                    fill={item.color}
                    className="cursor-pointer transition-opacity duration-200 hover:opacity-85 outline-none"
                    tabIndex={-1}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <span className="text-[20px] font-extrabold tracking-tight text-[var(--right-text-main)] leading-none">
              {displayCenterValue}
            </span>
            <span className="text-[10px] font-medium text-[var(--right-text-subtle)] mt-1">
              {centerLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 w-full sm:w-auto flex-1 max-w-[220px]">
          {normalized.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-[13px] leading-tight"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <span className="font-medium text-[var(--right-text-muted)] truncate">
                  {item.label}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.countDisplay && (
                  <span className="font-bold text-[var(--right-text-main)]">
                    {item.countDisplay}
                  </span>
                )}
                <span className="font-bold text-[var(--right-text-main)] min-w-[42px] text-right">
                  {item.percentageDisplay}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(OrdersStatusDonutComponent);
