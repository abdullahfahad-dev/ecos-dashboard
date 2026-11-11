"use client";

import React from "react";
import PeriodDropdown from "@/components/ui/PeriodDropdown";
import { Calendar, ChevronDown, Plus } from "lucide-react";

export default function GreetingSection() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-2 w-full">
      <div className="flex flex-col gap-1">
        <h2 className="flex items-center gap-2 text-[22px] sm:text-[24px] font-bold tracking-[-0.6px] text-[var(--right-text-main)] leading-tight">
          <span>Good afternoon, Rahat!</span>
          <span className="text-[20px] select-none" role="img" aria-label="wave">
            👋
          </span>
        </h2>
        <p className="text-[12px] font-normal text-[var(--right-text-muted)] leading-4">
          Here&apos;s your store performance and business overview.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <PeriodDropdown
          defaultValue="Last 30 days"
          options={["Today", "Last 7 days", "Last 30 days", "This Month", "Last 90 days"]}
          showIcon={true}
        />

        <button className="flex items-center gap-2 h-[34px] px-4 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-[var(--primary-text)] rounded-xl shadow-xs cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          <span className="text-[12px] font-semibold">Quick Action</span>
          <ChevronDown className="w-3 h-3 opacity-80" />
        </button>
      </div>
    </div>
  );
}
