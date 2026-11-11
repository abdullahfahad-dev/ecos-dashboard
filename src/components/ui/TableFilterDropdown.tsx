"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react";

export interface TableFilterDropdownProps {
  label?: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  className?: string;
  buttonClassName?: string;
}

function TableFilterDropdownComponent({
  label,
  value,
  options,
  onChange,
  className = "",
  buttonClassName = "",
}: TableFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isFiltered =
    value !== "All" &&
    value !== "All Status" &&
    value !== "All Stock" &&
    value !== "All Events" &&
    value !== "All Channels";

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && !containerRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 h-[36px] sm:h-[38px] rounded-full border text-[12px] sm:text-[13px] font-medium transition-all cursor-pointer shrink-0 shadow-2xs ${
          isFiltered
            ? "bg-[var(--primary-color)]/10 border-[var(--primary-color)] text-[var(--primary-color)] font-semibold"
            : "bg-[var(--right-surface)] border-[var(--right-border)] text-[var(--right-text-main)] hover:bg-[var(--right-border)]"
        } ${buttonClassName}`}
      >
        <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
        <span className="whitespace-nowrap">
          {isFiltered ? value : "Filter"}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[var(--right-text-muted)] shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 z-50 min-w-[180px] p-2 bg-[var(--right-bg)] border border-[var(--right-border)] rounded-2xl shadow-xl animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-1"
        >
          {label && (
            <span className="text-[10px] font-bold text-[var(--right-text-muted)] uppercase tracking-wider px-2.5 py-1">
              {label}
            </span>
          )}
          {options.map((opt) => {
            const isSelected = value === opt;
            return (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-[12px] font-semibold transition-all cursor-pointer text-left ${
                  isSelected
                    ? "bg-[var(--primary-color)] text-[var(--primary-text)] shadow-xs"
                    : "text-[var(--right-text-main)] hover:bg-[var(--right-surface)]"
                }`}
              >
                <span>{opt}</span>
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default memo(TableFilterDropdownComponent);

