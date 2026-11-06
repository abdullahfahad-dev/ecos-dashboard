"use client";

import React, { useState, memo } from "react";
import ThemeIconBox from "@/components/ui/ThemeIconBox";
import { TrendingUp, ChevronDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueDataPoint {
  date: string;
  amount: number;
}

const revenueData: RevenueDataPoint[] = [
  { date: "Oct 4", amount: 20000 },
  { date: "Oct 7", amount: 70000 },
  { date: "Oct 10", amount: 120000 },
  { date: "Oct 13", amount: 110000 },
  { date: "Oct 16", amount: 160000 },
  { date: "Oct 19", amount: 130000 },
  { date: "Oct 22", amount: 276400 },
  { date: "Oct 25", amount: 175000 },
  { date: "Oct 28", amount: 190000 },
  { date: "Oct 31", amount: 220000 },
  { date: "Nov 3", amount: 250000 },
];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value?: number; payload?: RevenueDataPoint }> }) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    if (!item) return null;

    return (
      <div className="flex flex-col items-center -translate-y-10 animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
        <div className="flex flex-col items-center px-3 py-1 bg-[var(--right-bg)] border border-[var(--right-border)] rounded-xl shadow-lg">
          <span className="text-[10px] font-medium text-[var(--right-text-subtle)] leading-none mb-1">
            {item.date}, 2026
          </span>
          <span className="text-[13px] font-bold text-[var(--right-text-main)] leading-tight tracking-tight">
            ৳{item.amount.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
}

function SalesRevenueChartComponent() {
  const [activeTab, setActiveTab] = useState<"Revenue" | "Orders" | "Customers">("Revenue");

  return (
    <div className="flex flex-col justify-between p-4 sm:p-5 bg-[var(--right-bg)] border border-[var(--right-border)] rounded-2xl shadow-xs w-full h-full min-h-[300px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
        <div className="flex items-center gap-3">
          <ThemeIconBox icon={TrendingUp} size="md" />
          <h3 className="text-[15px] sm:text-[16px] font-bold text-[var(--right-text-main)] leading-tight">
            Sales &amp; Revenue Overview
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center p-1 bg-[var(--right-surface)] border border-[var(--right-border)] rounded-xl flex-1 sm:flex-initial justify-between sm:justify-start">
            {(["Revenue", "Orders", "Customers"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:flex-initial text-center px-2.5 sm:px-3 py-1 text-[11px] sm:text-[12px] font-medium rounded-lg transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-[var(--primary-color)] text-[var(--primary-text)] shadow-xs"
                    : "text-[var(--right-text-muted)] hover:text-[var(--right-text-main)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 h-[34px] bg-[var(--right-bg)] border border-[var(--right-border)] rounded-xl text-[12px] font-medium text-[var(--right-text-main)] hover:bg-[var(--right-surface)] transition-colors cursor-pointer shrink-0">
            <span>Monthly</span>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--right-text-subtle)]" />
          </button>
        </div>
      </div>

      <div className="w-full h-[210px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 20, right: 12, left: -22, bottom: 0 }}>
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
              ticks={[0, 50000, 150000, 250000, 350000]}
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
                r: 3,
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
