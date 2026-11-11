"use client";

import React, { ReactNode, useState, memo } from "react";
import { Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export interface ColumnDef<T> {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  className?: string;
  render: (item: T) => ReactNode;
}

export interface DataTableCardProps<T> {
  data: (T & { id: string | number })[];
  columns: ColumnDef<T>[];

  title?: string;

  search?: string;
  onSearchChange?: (val: string) => void;

  filters?: ReactNode;
  extraFilters?: ReactNode;

  currentPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;

  serverSide?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;

  className?: string;
  minTableWidth?: string;
}

const alignClasses: Record<"left" | "center" | "right", string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const PAGE_SIZE = 10;

function DataTableCardComponent<T>({
  data,
  columns,
  title,
  search,
  onSearchChange,
  filters,
  extraFilters,
  currentPage,
  totalItems,
  onPageChange,
  serverSide = false,
  isLoading = false,
  emptyMessage = "No records found",
  className = "",
  minTableWidth = "min-w-[640px]",
}: DataTableCardProps<T>) {
  const [internalSearch, setInternalSearch] = useState("");
  const [internalPage, setInternalPage] = useState(1);

  const isSearchControlled = search !== undefined;
  const currentSearch = isSearchControlled ? search : internalSearch;

  const isPageControlled = currentPage !== undefined;
  const activePage = isPageControlled ? currentPage : internalPage;

  const handleSearchChange = (val: string) => {
    if (!isSearchControlled) {
      setInternalSearch(val);
    }
    onSearchChange?.(val);

    if (!isPageControlled) {
      setInternalPage(1);
    }
    onPageChange?.(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    if (!isPageControlled) {
      setInternalPage(newPage);
    }
    onPageChange?.(newPage);
  };

  const query = currentSearch.trim().toLowerCase();
  const filteredData =
    serverSide || !query
      ? data
      : data.filter((item) =>
        Object.values(item as Record<string, unknown>).some(
          (val) =>
            val !== null &&
            val !== undefined &&
            String(val).toLowerCase().includes(query)
        )
      );

  const effectiveTotalItems = serverSide
    ? (totalItems ?? data.length)
    : (totalItems ?? filteredData.length);

  const totalPages = Math.max(1, Math.ceil(effectiveTotalItems / PAGE_SIZE));

  const displayData = serverSide
    ? data
    : filteredData.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE);

  const startRecord =
    effectiveTotalItems === 0 ? 0 : (activePage - 1) * PAGE_SIZE + 1;
  const endRecord = Math.min(activePage * PAGE_SIZE, effectiveTotalItems);

  return (
    <div
      className={`flex flex-col border border-[var(--right-border)] rounded-2xl shadow-xs w-full bg-[var(--right-bg)] overflow-hidden ${className}`}
    >
      <div className="flex flex-col gap-3.5 p-4 sm:p-5 border-b border-[var(--right-border)]">
        {title && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-[17px] sm:text-[18px] font-bold text-[var(--right-text-main)]">
              {title}
            </h3>
            {extraFilters && (
              <div className="flex items-center gap-2 sm:ml-auto">
                {extraFilters}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex items-center flex-1 max-w-xs md:max-w-sm w-full">
            <Search className="absolute left-3 w-4 h-4 text-[var(--right-text-muted)] pointer-events-none shrink-0" />
            <input
              type="text"
              value={currentSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search..."
              className="w-full h-10 pl-9 pr-3 bg-[var(--right-surface)] border border-[var(--right-border)] rounded-xl text-[12px] sm:text-[13px] text-[var(--right-text-main)] placeholder:text-[var(--right-text-muted)] focus:outline-none focus:border-[var(--primary-color)] transition-all"
            />
          </div>

          {filters && (
            <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap md:ml-auto w-full md:w-auto">
              {filters}
            </div>
          )}
        </div>
      </div>

      <div className="relative w-full overflow-x-auto scrollbar-thin">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--right-bg)]/60 backdrop-blur-[1px]">
            <Loader2 className="w-6 h-6 animate-spin text-[var(--primary-color)]" />
          </div>
        )}

        <table
          className={`w-full ${minTableWidth} text-left border-collapse text-[12px] sm:text-[13px]`}
        >
          <thead>
            <tr className="border-b border-[var(--right-border)] bg-[var(--right-surface)]/40 text-[var(--right-text-muted)] font-semibold text-[11px] sm:text-[12px] uppercase tracking-wider">
              {columns.map((col) => {
                const alignClass = alignClasses[col.align || "left"];
                return (
                  <th
                    key={col.key}
                    className={`py-3 px-4 ${alignClass} ${col.className || ""}`}
                  >
                    {col.header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--right-border)]">
            {displayData.length > 0 ? (
              displayData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[var(--right-surface)]/50 transition-colors"
                >
                  {columns.map((col) => {
                    const alignClass = alignClasses[col.align || "left"];
                    return (
                      <td
                        key={`${item.id}-${col.key}`}
                        className={`py-4 px-4 ${alignClass} ${col.className || ""
                          }`}
                      >
                        {col.render(item)}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-10 text-center text-[var(--right-text-muted)] text-[13px]"
                >
                  {isLoading ? "Loading records..." : emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-[var(--right-border)] text-[11px] sm:text-[12px] text-[var(--right-text-muted)]">
        <span className="text-center sm:text-left">
          Showing <strong>{startRecord}-{endRecord}</strong> of{" "}
          <strong>{effectiveTotalItems}</strong> items
        </span>

        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={activePage <= 1 || isLoading}
              onClick={() => handlePageChange(activePage - 1)}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--right-border)] text-[var(--right-text-muted)] hover:bg-[var(--right-surface)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => {
                const isActive = pageNum === activePage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    disabled={isLoading}
                    onClick={() => handlePageChange(pageNum)}
                    className={`flex items-center justify-center w-8 h-8 rounded-lg text-[12px] transition-colors cursor-pointer ${isActive
                        ? "bg-[var(--primary-color)] text-[var(--primary-text)] font-semibold shadow-xs"
                        : "border border-[var(--right-border)] text-[var(--right-text-muted)] hover:bg-[var(--right-surface)]"
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              }
            )}

            <button
              type="button"
              disabled={activePage >= totalPages || isLoading}
              onClick={() => handlePageChange(activePage + 1)}
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

const DataTableCard = memo(
  DataTableCardComponent
) as typeof DataTableCardComponent;

export default DataTableCard;
