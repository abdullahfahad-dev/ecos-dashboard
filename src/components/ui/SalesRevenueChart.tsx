"use client";

import React, { useState, memo } from "react";
import ThemeIconBox from "@/components/ui/ThemeIconBox";
import PeriodDropdown from "@/components/ui/PeriodDropdown";
import { TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface RevenueDataPoint {
  date: string;
  amount: number;
  orders?: number;
}

export interface SalesRevenueChartProps {
  title?: string;
  subtitle?: string;
  data: RevenueDataPoint[];
  tabs?: readonly string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  periodLabel?: string;
  periodOptions?: string[];
  onPeriodChange?: (period: string) => void;
  showLegend?: boolean;
  className?: string;
}

const defaultPeriods = ["Weekly", "Monthly", "Quarterly", "Yearly"];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value?: number; payload?: RevenueDataPoint }> }) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    if (!item) return null;

    return (
      <div className="flex flex-col items-center -translate-y-12 animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
        <div className="flex flex-col items-center px-3.5 py-1.5 bg-[var(--right-bg)] border border-[var(--right-border)] rounded-xl shadow-xl">
          <span className="text-[10px] font-bold text-[var(--right-text-subtle)] uppercase tracking-wider mb-0.5">
            {item.date}
          </span>
          <span className="text-[14px] font-extrabold text-[var(--right-text-main)] leading-tight tracking-tight">
            ৳{item.amount.toLocaleString()}
          </span>
          {typeof item.orders === "number" && (
            <span className="text-[10px] font-medium text-[var(--right-text-muted)] mt-0.5">
              {item.orders.toLocaleString()} orders
            </span>
          )}
        </div>
      </div>
    );
  }
  return null;
}

function SalesRevenueChartComponent({
  title = "Sales & Revenue Overview",
  subtitle,
  data,
  tabs,
  periodLabel = "Monthly",
  periodOptions = defaultPeriods,
  onPeriodChange,
  showLegend = false,
  className = "",
}: SalesRevenueChartProps) {
  const [activeTabState, setActiveTabState] = useState<string>(tabs ? tabs[0] : "");

  return (
    <div className={`flex flex-col justify-between p-4 sm:p-5 border border-[var(--right-border)] rounded-2xl shadow-xs w-full h-full min-h-[330px] ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
        <div className="flex items-center gap-3">
          <ThemeIconBox icon={TrendingUp} size="md" />
          <div className="flex flex-col">
            <h3 className="text-[16px] font-bold text-[var(--right-text-main)] leading-tight">
              {title}
            </h3>
            {subtitle && (
              <span className="text-[12px] font-normal text-[var(--right-text-muted)] mt-0.5">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {tabs && tabs.length > 0 && (
            <div className="flex items-center p-1 bg-[var(--right-surface)] border border-[var(--right-border)] rounded-xl flex-1 sm:flex-initial justify-between sm:justify-start">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTabState(tab)}
                  className={`flex-1 sm:flex-initial text-center px-2.5 sm:px-3 py-1 text-[11px] sm:text-[12px] font-medium rounded-lg transition-all cursor-pointer ${
                    activeTabState === tab
                      ? "bg-[var(--primary-color)] text-[var(--primary-text)] shadow-xs"
                      : "text-[var(--right-text-muted)] hover:text-[var(--right-text-main)]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}

          <PeriodDropdown
            value={periodLabel}
            options={periodOptions}
            onChange={onPeriodChange}
          />
        </div>
      </div>

      {showLegend && (
        <div className="flex items-center justify-end gap-4 py-1 text-[12px] font-medium text-[var(--right-text-muted)]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary-color)]" />
            <span>Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-300 dark:bg-indigo-400" />
            <span>Orders</span>
          </div>
        </div>
      )}

      <div className="w-full h-[220px] pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 12, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary-color)" stopOpacity={0.35} />
                <stop offset="70%" stopColor="var(--primary-color)" stopOpacity={0.08} />
                <stop offset="100%" stopColor="var(--primary-color)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="var(--right-border)" strokeOpacity={0.6} vertical={false} />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--right-text-subtle)", fontSize: 11, fontWeight: 500 }}
              dy={6}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              ticks={[0, 50000, 100000, 150000, 200000]}
              tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}K`)}
              tick={{ fill: "var(--right-text-subtle)", fontSize: 11, fontWeight: 500 }}
            />

            <Tooltip
              content={<CustomTooltip />}
              offset={-40}
              cursor={{
                stroke: "var(--primary-color)",
                strokeDasharray: "4 4",
                strokeWidth: 1.5,
              }}
            />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="var(--primary-color)"
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              dot={{
                r: 3.5,
                fill: "var(--right-bg)",
                stroke: "var(--primary-color)",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "var(--primary-color)",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default memo(SalesRevenueChartComponent);
