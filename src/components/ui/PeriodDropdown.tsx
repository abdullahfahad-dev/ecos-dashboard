"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import { Calendar, ChevronDown } from "lucide-react";

export interface PeriodDropdownProps {
  defaultValue?: string;
  options?: string[];
  onChange?: (val: string) => void;
  showIcon?: boolean;
  roundedFull?: boolean;
}

const defaultOptions = ["Weekly", "Monthly", "Quarterly", "Yearly"];

function PeriodDropdownComponent({
  defaultValue,
  options = defaultOptions,
  onChange,
  showIcon = false,
  roundedFull = false,
}: PeriodDropdownProps) {
  const [selected, setSelected] = useState<string>(
    () => defaultValue ?? options[0] ?? ""
  );
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    onChange?.(option);
    setIsOpen(false);
  };

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

  const radiusClass = roundedFull ? "rounded-full" : "rounded-xl";

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Selected period: ${selected}`}
        className={`flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-1.5 h-[34px] border border-[var(--right-border)] ${radiusClass} text-[12px] font-medium text-[var(--right-text-main)] hover:bg-[var(--right-surface)] transition-colors cursor-pointer shrink-0 shadow-2xs`}
      >
        {showIcon && (
          <Calendar className="w-3.5 h-3.5 text-[var(--right-text-muted)] shrink-0" />
        )}

        <span className="whitespace-nowrap">{selected}</span>

        <ChevronDown
          className={`w-3.5 h-3.5 text-[var(--right-text-subtle)] shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && options.length > 0 && (
        <div
          role="listbox"
          aria-label="Period options"
          className="absolute right-0 top-full mt-1.5 z-40 min-w-[130px] p-1 bg-[var(--right-bg)] border border-[var(--right-border)] rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-150"
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              role="option"
              aria-selected={selected === opt}
              onClick={() => handleSelect(opt)}
              className={`flex items-center w-full px-3 py-1.5 text-[12px] font-medium rounded-lg transition-colors cursor-pointer text-left ${
                selected === opt
                  ? "bg-[var(--primary-color)] text-[var(--primary-text)] font-semibold"
                  : "text-[var(--right-text-muted)] hover:text-[var(--right-text-main)] hover:bg-[var(--right-surface)]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const PeriodDropdown = memo(
  PeriodDropdownComponent
) as typeof PeriodDropdownComponent;

export default PeriodDropdown;
