"use client";

import React from "react";
import ThemeIconBox from "@/components/ui/ThemeIconBox";
import { Layers, Plus } from "lucide-react";

interface CategoriesHeaderSectionProps {
  onAddCategory?: () => void;
}

export default function CategoriesHeaderSection({
  onAddCategory,
}: CategoriesHeaderSectionProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <ThemeIconBox icon={Layers} size="lg" />

        <div className="flex flex-col gap-0.5 min-w-0">
          <h1 className="text-[22px] sm:text-[28px] md:text-[30px] font-extrabold tracking-[-0.75px] text-[var(--right-text-main)] leading-tight truncate">
            Categories
          </h1>
          <p className="text-[12px] sm:text-[14px] font-normal text-[var(--right-text-muted)] leading-tight truncate">
            Manage your product categories, organize products, and keep your store structured.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onAddCategory}
          className="flex items-center gap-2 h-10 px-4 sm:px-5 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-[var(--primary-text)] rounded-full text-[13px] font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>Add Category</span>
        </button>
      </div>
    </div>
  );
}

