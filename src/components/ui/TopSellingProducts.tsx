import React, { memo } from "react";
import Link from "next/link";
import ThemeIconBox from "@/components/ui/ThemeIconBox";
import { Tag, ArrowRight } from "lucide-react";

export interface ProductItem {
  id: string;
  name: string;
  units: number;
  revenue: string;
  icon: React.ElementType;
}

export interface TopSellingProductsProps {
  title?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  products: ProductItem[];
  icon?: React.ElementType;
  className?: string;
}

function TopSellingProductsComponent({
  title = "Top Selling Products",
  viewAllHref = "/products",
  viewAllLabel = "View All",
  products,
  icon: HeaderIcon = Tag,
  className = "",
}: TopSellingProductsProps) {
  return (
    <div
      className={`flex flex-col justify-between p-4 sm:p-5 border border-[var(--right-border)] rounded-2xl shadow-xs w-full h-full min-h-[338px] ${className}`}
      role="region"
      aria-label={title}
    >
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-3">
          <ThemeIconBox icon={HeaderIcon} size="md" />
          <h3 className="text-[16px] font-bold text-[var(--right-text-main)] leading-tight">
            {title}
          </h3>
        </div>

        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="flex items-center gap-1 text-[12px] font-semibold text-[var(--primary-color)] hover:opacity-85 transition-opacity cursor-pointer shrink-0"
          >
            <span>{viewAllLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      <div className="flex flex-col flex-1 divide-y divide-[var(--right-border)] pt-1">
        {products.map((product) => {
          const ProductIcon = product.icon;

          return (
            <div
              key={product.id}
              className="flex items-center justify-between py-2.5 px-2 hover:bg-[var(--right-surface)] rounded-xl transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--right-surface)] text-[var(--right-text-main)] shrink-0 border border-[var(--right-border)]">
                  <ProductIcon className="w-4 h-4" />
                </div>
                <span className="text-[13px] sm:text-[14px] font-semibold text-[var(--right-text-main)] truncate">
                  {product.name}
                </span>
              </div>

              <div className="flex items-center gap-6 sm:gap-12 shrink-0">
                <span className="text-[12px] font-medium text-[var(--right-text-muted)] text-right">
                  {product.units} units
                </span>
                <span className="text-[13px] sm:text-[14px] font-bold text-[var(--right-text-main)] min-w-[70px] text-right">
                  {product.revenue}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(TopSellingProductsComponent);

