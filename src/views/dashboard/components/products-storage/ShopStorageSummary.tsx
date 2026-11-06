import React from "react";
import Link from "next/link";
import ThemeIconBox from "@/components/ui/ThemeIconBox";
import {
  Store,
  ArrowRight,
  Package,
  Layers,
  Image as ImageIcon,
  FileText,
  Database,
  Grid,
} from "lucide-react";

interface StorageItem {
  name: string;
  size: string;
  icon: React.ElementType;
}

const storageList: StorageItem[] = [
  { name: "Product images", size: "42.8 GB", icon: ImageIcon },
  { name: "Documents", size: "12.6 GB", icon: FileText },
  { name: "Backups", size: "8.0 GB", icon: Database },
  { name: "Other", size: "5.0 GB", icon: Grid },
];

export default function ShopStorageSummary() {
  const usagePercentage = 68;

  return (
    <div className="flex flex-col justify-between p-4 sm:p-5 bg-[var(--right-bg)] border border-[var(--right-border)] rounded-2xl shadow-xs w-full h-full min-h-[338px]">
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2.5">
          <ThemeIconBox icon={Store} size="md" />
          <h3 className="text-[16px] font-bold text-[var(--right-text-main)] leading-tight">
            My Shop &amp; Storage
          </h3>
        </div>

        <Link
          href="/settings"
          className="flex items-center gap-1 text-[12px] font-semibold text-[var(--primary-color)] hover:opacity-85 transition-opacity cursor-pointer shrink-0"
        >
          <span>Manage Storage</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex items-center justify-between py-2 border-b border-[var(--right-border)]">
        <div className="flex items-center gap-2.5 flex-1 pr-3 border-r border-[var(--right-border)]">
          <div
            className="flex items-center justify-center w-9 h-9 rounded-xl text-[var(--primary-color)] border border-[var(--right-border)] shrink-0"
            style={{
              backgroundColor: "color-mix(in srgb, var(--primary-color) 15%, transparent)",
            }}
          >
            <Package className="w-4.5 h-4.5" />
          </div>
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-[16px] font-bold text-[var(--right-text-main)] truncate">
              1,284
            </span>
            <span className="text-[11px] font-normal text-[var(--right-text-muted)] truncate">
              products
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-1 pl-4">
          <div
            className="flex items-center justify-center w-9 h-9 rounded-xl text-[var(--primary-color)] border border-[var(--right-border)] shrink-0"
            style={{
              backgroundColor: "color-mix(in srgb, var(--primary-color) 15%, transparent)",
            }}
          >
            <Layers className="w-4.5 h-4.5" />
          </div>
          <div className="flex flex-col leading-tight min-w-0">
            <div className="flex items-baseline gap-1 truncate">
              <span className="text-[16px] font-bold text-[var(--right-text-main)]">
                68.4 GB
              </span>
              <span className="text-[11px] font-normal text-[var(--right-text-subtle)]">
                / 100 GB
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 py-3">
        <div className="flex-1 h-2 bg-[var(--right-surface)] rounded-full overflow-hidden border border-[var(--right-border)]">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${usagePercentage}%`,
              backgroundColor: "var(--primary-color)",
            }}
          />
        </div>
        <span
          className="px-2 py-0.5 text-[11px] font-bold rounded-full text-[var(--primary-color)] border border-[var(--right-border)] shrink-0"
          style={{
            backgroundColor: "color-mix(in srgb, var(--primary-color) 15%, transparent)",
          }}
        >
          {usagePercentage}%
        </span>
      </div>

      <div className="flex flex-col divide-y divide-[var(--right-border)] pt-0.5">
        {storageList.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              className="flex items-center justify-between py-2 text-[12px] leading-tight"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="flex items-center justify-center w-6 h-6 rounded-lg text-[var(--primary-color)] shrink-0"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--primary-color) 12%, transparent)",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-[var(--right-text-muted)] truncate">
                  {item.name}
                </span>
              </div>
              <span className="font-bold text-[var(--right-text-main)] shrink-0">
                {item.size}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
