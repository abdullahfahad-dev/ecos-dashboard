"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
} from "react";
import { ChevronDown } from "lucide-react";

export interface PeriodDropdownProps {
  value?: string;
  options?: string[];
  onChange?: (val: string) => void;
  icon?: React.ElementType;
  className?: string;
  buttonClassName?: string;
  roundedFull?: boolean;
}

const defaultOptions = ["Weekly", "Monthly", "Quarterly", "Yearly"];

function PeriodDropdownComponent({
  value,
  options = defaultOptions,
  onChange,
  icon: Icon,
  className = "",
  buttonClassName = "",
  roundedFull = false,
}: PeriodDropdownProps) {

  const [selected, setSelected] = useState<string>(
    () => value ?? options[0] ?? "Monthly"
  );

  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  const handleSelect = useCallback(
    (option: string) => {
      setSelected(option);
      onChange?.(option);
      setIsOpen(false);
    },
    [onChange]
  );

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

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const radiusClass = roundedFull ? "rounded-full" : "rounded-xl";

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-1.5 h-[34px] border border-[var(--right-border)] ${radiusClass} text-[12px] font-medium text-[var(--right-text-main)] hover:bg-[var(--right-surface)] transition-colors cursor-pointer shrink-0 shadow-2xs ${buttonClassName}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {Icon && (
          <Icon className="w-3.5 h-3.5 text-[var(--right-text-muted)] shrink-0" />
        )}

        <span className="whitespace-nowrap">{selected}</span>

        <ChevronDown
          className={`w-3.5 h-3.5 text-[var(--right-text-subtle)] shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1.5 z-40 min-w-[130px] p-1 bg-[var(--right-bg)] border border-[var(--right-border)] rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-150"
          role="listbox"
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => handleSelect(opt)}
              className={`flex items-center w-full px-3 py-1.5 text-[12px] font-medium rounded-lg transition-colors cursor-pointer text-left ${
                selected === opt
                  ? "bg-[var(--primary-color)] text-[var(--primary-text)] font-semibold"
                  : "text-[var(--right-text-muted)] hover:text-[var(--right-text-main)] hover:bg-[var(--right-surface)]"
              }`}
              role="option"
              aria-selected={selected === opt}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(PeriodDropdownComponent);
