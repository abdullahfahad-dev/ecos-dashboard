"use client";

import React, { ReactNode, memo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export interface ColumnDef<T> {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  className?: string;
  render: (item: T) => ReactNode;
}

export interface DataTableCardProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (item: T) => string;
  searchPlaceholder?: string;
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
  filters?: ReactNode;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  className?: string;
  minTableWidth?: string;
}

function DataTableCardComponent<T>({
  data,
  columns,
  keyExtractor,
  searchPlaceholder = "Search...",
  searchTerm,
  onSearchChange,
  filters,
  currentPage = 1,
  totalPages = 1,
  totalItems,
  onPageChange,
  className = "",
  minTableWidth = "min-w-[640px]",
}: DataTableCardProps<T>) {
  return (
    <div
      className={`flex flex-col border border-[var(--right-border)] rounded-2xl shadow-xs w-full bg-[var(--right-bg)] overflow-hidden ${className}`}
    >
      {(onSearchChange || filters) && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 sm:p-5 border-b border-[var(--right-border)]">
          {onSearchChange && (
            <div className="relative flex items-center flex-1 max-w-md w-full">
              <Search className="absolute left-3 w-4 h-4 text-[var(--right-text-muted)] pointer-events-none shrink-0" />
              <input
                type="text"
                value={searchTerm ?? ""}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full h-10 pl-9 pr-3 bg-[var(--right-surface)] border border-[var(--right-border)] rounded-xl text-[12px] sm:text-[13px] text-[var(--right-text-main)] placeholder:text-[var(--right-text-muted)] focus:outline-none focus:border-[var(--primary-color)] transition-all"
              />
            </div>
          )}

          {filters && (
            <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap w-full md:w-auto">
              {filters}
            </div>
          )}
        </div>
      )}

      <div className="w-full overflow-x-auto scrollbar-thin p-3 sm:p-4">
        <table
          className={`w-full ${minTableWidth} text-left border-separate border-spacing-y-2 text-[12px] sm:text-[13px]`}
        >
          <thead>
            <tr className="text-[var(--right-text-muted)] font-semibold text-[11px] sm:text-[12px] uppercase tracking-wider">
              {columns.map((col) => {
                const alignClass =
                  col.align === "center"
                    ? "text-center"
                    : col.align === "right"
                    ? "text-right"
                    : "text-left";

                return (
                  <th
                    key={col.key}
                    className={`py-2 px-4 font-semibold ${alignClass} whitespace-nowrap ${
                      col.className || ""
                    }`}
                  >
                    {col.header}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {data.map((item) => {
              const rowKey = keyExtractor(item);

              return (
                <tr
                  key={rowKey}
                  className="bg-[var(--right-surface)]/50 hover:bg-[var(--right-surface)] transition-all border border-[var(--right-border)] rounded-xl shadow-2xs group"
                >
                  {columns.map((col, index) => {
                    const isFirst = index === 0;
                    const isLast = index === columns.length - 1;
                    const alignClass =
                      col.align === "center"
                        ? "text-center"
                        : col.align === "right"
                        ? "text-right"
                        : "text-left";

                    const cornerClass = isFirst
                      ? "rounded-l-xl border-l"
                      : isLast
                      ? "rounded-r-xl border-r"
                      : "";

                    return (
                      <td
                        key={col.key}
                        className={`py-3.5 px-4 border-y border-[var(--right-border)] ${cornerClass} ${alignClass} ${
                          col.className || ""
                        }`}
                      >
                        {col.render(item)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-[var(--right-border)] text-[11px] sm:text-[12px] text-[var(--right-text-muted)]">
        <span className="text-center sm:text-left">
          Showing <strong>1-{data.length}</strong> of{" "}
          <strong>{totalItems ?? data.length}</strong> items
        </span>

        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange?.(currentPage - 1)}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--right-border)] text-[var(--right-text-muted)] hover:bg-[var(--right-surface)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const isActive = page === currentPage;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => onPageChange?.(page)}
                  className={`flex items-center justify-center w-8 h-8 rounded-lg text-[12px] transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[var(--primary-color)] text-[var(--primary-text)] font-semibold shadow-xs"
                      : "border border-[var(--right-border)] text-[var(--right-text-muted)] hover:bg-[var(--right-surface)]"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange?.(currentPage + 1)}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--right-border)] text-[var(--right-text-muted)] hover:bg-[var(--right-surface)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(DataTableCardComponent) as typeof DataTableCardComponent;

