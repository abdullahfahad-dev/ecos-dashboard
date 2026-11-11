"use client";

import React, { useState, memo } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SidebarSubItem } from "./sidebarData";

interface SidebarGroupSectionProps {
  title: string;
  items: SidebarSubItem[];
  defaultOpen?: boolean;
  pathname: string;
  onClose?: () => void;
}

function SidebarGroupSectionComponent({
  title,
  items,
  defaultOpen = true,
  pathname,
  onClose,
}: SidebarGroupSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col mb-1 pt-0.5">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full pl-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--left-text-muted)] hover:text-[var(--left-text-main)] transition-colors cursor-pointer"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 shrink-0 origin-center ${
            isOpen ? "" : "rotate-180"
          }`}
        />
      </button>

      {isOpen && (
        <div className="flex flex-col space-y-1 mt-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
          {items.map((sub) => {
            const SubIcon = sub.icon;
            const isCurrent =
              sub.href === "/"
                ? pathname === "/"
                : pathname === sub.href || pathname.startsWith(`${sub.href}/`);

            if (isCurrent) {
              return (
                <Link
                  key={sub.name}
                  href={sub.href}
                  onClick={onClose}
                  aria-current="page"
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-[var(--primary-color)] text-[var(--primary-text)] text-[14px] font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <SubIcon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{sub.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {sub.badge && (
                      <span
                        className={`${sub.badgeClass} text-white font-semibold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 shadow-xs`}
                      >
                        {sub.badge}
                      </span>
                    )}
                    {sub.hasSubmenu && (
                      <ChevronRight className="w-3.5 h-3.5 opacity-80 shrink-0" />
                    )}
                  </div>
                </Link>
              );
            }

            return (
              <Link
                key={sub.name}
                href={sub.href}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-[var(--left-text-muted)] hover:text-[var(--left-text-main)] hover:bg-white/5 transition-colors text-[14px] cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <SubIcon className="w-4 h-4 shrink-0 text-[var(--left-text-muted)]" />
                  <span className="truncate">{sub.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {sub.badge && (
                    <span
                      className={`${sub.badgeClass} text-white font-semibold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 shadow-xs`}
                    >
                      {sub.badge}
                    </span>
                  )}
                  {sub.hasSubmenu && (
                    <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default memo(SidebarGroupSectionComponent);

