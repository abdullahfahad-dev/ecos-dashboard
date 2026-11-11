import React, { memo } from "react";
import ThemeIconBox from "@/components/ui/ThemeIconBox";
import PeriodDropdown from "@/components/ui/PeriodDropdown";
import { FileText, ChevronLeft, ChevronRight, Download } from "lucide-react";

export interface SalesReportItem {
  id: string;
  period: string;
  orders: number;
  customers: number;
  revenue: string;
  refunds: number;
  netSales: string;
}

export interface SalesReportCardProps {
  title?: string;
  data: SalesReportItem[];
  periodLabel?: string;
  className?: string;
}

function SalesReportCardComponent({
  title = "Sales Report",
  data,
  periodLabel = "Last 26 Weeks",
  className = "",
}: SalesReportCardProps) {
  return (
    <div
      className={`flex flex-col justify-between p-4 sm:p-6 border border-[var(--right-border)] rounded-2xl shadow-xs w-full h-full min-h-[467px] ${className}`}
      role="region"
      aria-label={title}
    >
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <ThemeIconBox icon={FileText} size="md" />
          <h3 className="text-[18px] font-bold text-[var(--right-text-main)] leading-tight tracking-[-0.45px]">
            {title}
          </h3>
        </div>

        <PeriodDropdown
          defaultValue={periodLabel}
          options={["Last 7 Days", "Last 4 Weeks", "Last 26 Weeks", "This Year"]}
          roundedFull={true}
        />
      </div>

      <div className="w-full overflow-x-auto scrollbar-thin flex-1">
        <table className="w-full min-w-[500px] text-left border-collapse text-[12px]">
          <thead>
            <tr className="border-b border-[var(--right-border)] text-[var(--right-text-subtle)] font-semibold">
              <th className="py-2.5 px-2 font-semibold text-left">Period</th>
              <th className="py-2.5 px-2 font-semibold text-center">Orders</th>
              <th className="py-2.5 px-2 font-semibold text-center">Customers</th>
              <th className="py-2.5 px-2 font-semibold text-center">Revenue</th>
              <th className="py-2.5 px-2 font-semibold text-center">Refunds</th>
              <th className="py-2.5 px-2 font-semibold text-right">Net Sales</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--right-border)]">
            {data.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[var(--right-surface)] transition-colors cursor-pointer"
              >
                <td className="py-3 px-2 font-medium text-[var(--right-text-muted)] whitespace-nowrap">
                  {row.period}
                </td>
                <td className="py-3 px-2 font-medium text-[var(--right-text-muted)] text-center whitespace-nowrap">
                  {row.orders}
                </td>
                <td className="py-3 px-2 font-medium text-[var(--right-text-muted)] text-center whitespace-nowrap">
                  {row.customers}
                </td>
                <td className="py-3 px-2 font-bold text-[var(--right-text-main)] text-center whitespace-nowrap">
                  {row.revenue}
                </td>
                <td className="py-3 px-2 font-medium text-[var(--right-text-muted)] text-center whitespace-nowrap">
                  {row.refunds}
                </td>
                <td className="py-3 px-2 font-bold text-[var(--right-text-main)] text-right whitespace-nowrap">
                  {row.netSales}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--right-border)] mt-2">
        <div className="flex items-center gap-1.5" aria-label="Pagination">
          <button
            type="button"
            className="flex items-center justify-center w-7 h-7 rounded-lg border border-[var(--right-border)] text-[var(--right-text-subtle)] hover:text-[var(--right-text-main)] hover:bg-[var(--right-surface)] transition-colors cursor-pointer"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--primary-color)] text-[var(--primary-text)] font-semibold text-[12px] shadow-2xs cursor-pointer"
            aria-current="page"
          >
            1
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-7 h-7 rounded-lg text-[var(--right-text-muted)] hover:bg-[var(--right-surface)] text-[12px] font-medium transition-colors cursor-pointer"
          >
            2
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-7 h-7 rounded-lg text-[var(--right-text-muted)] hover:bg-[var(--right-surface)] text-[12px] font-medium transition-colors cursor-pointer"
          >
            3
          </button>
          <span className="text-[12px] text-[var(--right-text-subtle)] px-1">...</span>
          <button
            type="button"
            className="flex items-center justify-center w-7 h-7 rounded-lg text-[var(--right-text-muted)] hover:bg-[var(--right-surface)] text-[12px] font-medium transition-colors cursor-pointer"
          >
            6
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-7 h-7 rounded-lg border border-[var(--right-border)] text-[var(--right-text-subtle)] hover:text-[var(--right-text-main)] hover:bg-[var(--right-surface)] transition-colors cursor-pointer"
            aria-label="Next page"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 h-8 rounded-xl border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-all text-[12px] font-semibold cursor-pointer shadow-2xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download CSV</span>
        </button>
      </div>
    </div>
  );
}

export default memo(SalesReportCardComponent);

