import React from "react";
import Link from "next/link";
import ThemeIconBox from "@/components/ui/ThemeIconBox";
import {
  Tag,
  ArrowRight,
  Headphones,
  Watch,
  Shirt,
  Zap,
  Briefcase,
} from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  units: number;
  revenue: string;
  icon: React.ElementType;
}

const productsData: ProductItem[] = [
  {
    id: "1",
    name: "Wireless Headphone",
    units: 312,
    revenue: "৳62,400",
    icon: Headphones,
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    units: 198,
    revenue: "৳49,500",
    icon: Watch,
  },
  {
    id: "3",
    name: "Cotton Polo T-shirt",
    units: 176,
    revenue: "৳31,680",
    icon: Shirt,
  },
  {
    id: "4",
    name: "USB-C Fast Charger",
    units: 142,
    revenue: "৳12,780",
    icon: Zap,
  },
  {
    id: "5",
    name: "Backpack (Anti Theft)",
    units: 118,
    revenue: "৳11,800",
    icon: Briefcase,
  },
];

export default function TopSellingProducts() {
  return (
    <div className="flex flex-col justify-between p-4 sm:p-5 border border-[var(--right-border)] rounded-2xl shadow-xs w-full h-full min-h-[338px]">
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-3">
          <ThemeIconBox icon={Tag} size="md" />
          <h3 className="text-[16px] font-bold text-[var(--right-text-main)] leading-tight">
            Top Selling Products
          </h3>
        </div>

        <Link
          href="/products"
          className="flex items-center gap-1 text-[12px] font-semibold text-[var(--primary-color)] hover:opacity-85 transition-opacity cursor-pointer shrink-0"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex flex-col flex-1 divide-y divide-[var(--right-border)] pt-1">
        {productsData.map((product) => {
          const Icon = product.icon;

          return (
            <div
              key={product.id}
              className="flex items-center justify-between py-2.5 px-2 hover:bg-[var(--right-surface)] rounded-xl transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--right-surface)] text-[var(--right-text-main)] shrink-0 border border-[var(--right-border)]">
                  <Icon className="w-4 h-4" />
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

