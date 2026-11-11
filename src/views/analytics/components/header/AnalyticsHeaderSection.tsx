"use client";

import React from "react";
import PeriodDropdown from "@/components/ui/PeriodDropdown";
import { BarChart3, Calendar, Download, ChevronDown } from "lucide-react";

export default function AnalyticsHeaderSection() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div
          className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border border-[var(--right-border)] text-[var(--primary-color)] shadow-2xs shrink-0"
          style={{
            backgroundColor: "color-mix(in srgb, var(--primary-color) 12%, transparent)",
          }}
        >
          <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        <div className="flex flex-col gap-0.5 min-w-0">
          <h1 className="text-[22px] sm:text-[28px] md:text-[30px] font-extrabold tracking-[-0.75px] text-[var(--right-text-main)] leading-tight truncate">
            Analytics
          </h1>
          <p className="text-[12px] sm:text-[14px] font-normal text-[var(--right-text-muted)] leading-tight truncate">
            Track your store performance and get detailed insights.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap sm:flex-nowrap">
        <PeriodDropdown
          defaultValue="Jan 1, 2026 – Aug 31, 2026"
          options={[
            "Today",
            "Last 7 Days",
            "Last 30 Days",
            "Last 90 Days",
            "Jan 1, 2026 – Aug 31, 2026",
            "This Year",
          ]}
          showIcon={true}
          roundedFull={true}
        />

        <button className="flex items-center gap-2 h-10 px-4 sm:px-4.5 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-[var(--primary-text)] rounded-full text-[12px] sm:text-[13px] font-semibold transition-all cursor-pointer shadow-xs">
          <Download className="w-4 h-4 shrink-0" />
          <span>Export</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-80 shrink-0 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
