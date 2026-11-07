"use client";

import React from "react";
import ThemeIconBox from "@/components/ui/ThemeIconBox";
import { Package, Plus } from "lucide-react";

interface ProductsHeaderSectionProps {
  onAddProduct?: () => void;
}

export default function ProductsHeaderSection({
  onAddProduct,
}: ProductsHeaderSectionProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <ThemeIconBox icon={Package} size="lg" />

        <div className="flex flex-col gap-0.5 min-w-0">
          <h1 className="text-[22px] sm:text-[28px] md:text-[30px] font-extrabold tracking-[-0.75px] text-[var(--right-text-main)] leading-tight truncate">
            Products
          </h1>
          <p className="text-[12px] sm:text-[14px] font-normal text-[var(--right-text-muted)] leading-tight truncate">
            Manage your inventory, monitor stocks, and organize product catalogs.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onAddProduct}
          className="flex items-center gap-2 h-10 px-4 sm:px-5 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-[var(--primary-text)] rounded-full text-[13px] font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>Add Product</span>
        </button>
      </div>
    </div>
  );
}

