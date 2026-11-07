"use client";

import React, { memo, useSyncExternalStore, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import {
  Search,
  Store,
  ChevronDown,
  Bell,
  HelpCircle,
  Menu,
  Sun,
  Moon,
  Zap,
} from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
  sidebarOpen?: boolean;
}

const subscribe = () => () => {};
const getMountedSnapshot = () => true;
const getServerSnapshot = () => false;

function HeaderComponent({ onMenuClick, sidebarOpen = false }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getMountedSnapshot, getServerSnapshot);
  const isTransitioningRef = useRef(false);

  const isDark = mounted && theme === "dark";

  const toggleTheme = useCallback(() => {
    if (isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    setTheme(isDark ? "light" : "dark");

    window.setTimeout(() => {
      isTransitioningRef.current = false;
    }, 250);
  }, [isDark, setTheme]);

  return (
    <header className="sticky top-0 z-30 w-full bg-[var(--right-bg)] border-b border-[var(--right-border)] flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 max-w-[384px]">
        <button
          onClick={onMenuClick}
          className="p-1.5 text-[var(--right-text-muted)] hover:bg-black/5 dark:hover:bg-white/5 rounded-lg md:hidden shrink-0 cursor-pointer"
          aria-label="Open menu"
          aria-controls="dashboard-sidebar"
          aria-expanded={sidebarOpen}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 md:hidden min-w-0">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--primary-color)] text-white shadow-xs shrink-0">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <span className="text-[15px] font-bold text-[var(--right-text-main)] truncate leading-tight tracking-tight">
            Fast Softun
          </span>
        </div>

        <div className="relative hidden md:flex items-center w-full min-w-0">
          <Search className="absolute left-3 w-3.5 h-3.5 text-[var(--right-text-subtle)] pointer-events-none shrink-0" />
          <input
            type="text"
            placeholder="Search orders, products, customers..."
            className="w-full h-[34px] pl-9 pr-14 bg-[var(--right-surface)] border border-[var(--right-border)] rounded-xl text-[12px] text-[var(--right-text-main)] placeholder:text-[var(--right-text-subtle)] focus:outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]"
          />
          <div className="absolute right-2 flex items-center px-1.5 py-0.5 border border-[var(--right-border)] rounded text-[10px] font-mono font-semibold text-[var(--right-text-subtle)] pointer-events-none shadow-2xs">
            Ctrl K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3.5 shrink-0 pl-2">
        <button className="hidden sm:flex items-center gap-2 h-[30px] px-3 bg-[var(--right-surface)] border border-[var(--right-border)] rounded-xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
          <Store className="w-3.5 h-3.5 text-[var(--right-text-muted)]" />
          <span className="text-[12px] font-semibold text-[var(--right-text-main)]">
            Rahat Store
          </span>
          <ChevronDown className="w-2.5 h-2.5 text-[var(--right-text-subtle)]" />
        </button>

        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-[var(--right-surface)] border border-[var(--right-border)] rounded-xl text-[var(--right-text-muted)] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-[var(--badge-warning)]" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>

        <div className="relative">
          <button
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-[var(--right-surface)] border border-[var(--right-border)] rounded-xl text-[var(--right-text-muted)] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-3.5 h-3.5" />
          </button>
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-[18px] px-1 bg-[var(--badge-danger)] border-2 border-[var(--right-bg)] rounded-full text-[9px] font-bold text-white leading-none">
            3
          </span>
        </div>

        <button
          className="hidden sm:flex items-center justify-center w-9 h-9 bg-[var(--right-surface)] border border-[var(--right-border)] rounded-xl text-[var(--right-text-muted)] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
          aria-label="Help"
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>

        <button className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-[var(--right-border)] hover:opacity-90 cursor-pointer">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--primary-color)] text-[var(--primary-text)] text-[12px] font-bold shadow-xs shrink-0">
            R
          </div>
          <div className="hidden sm:flex flex-col items-start leading-tight text-left">
            <span className="text-[12px] font-semibold text-[var(--right-text-main)]">
              Rahat Hossain
            </span>
            <span className="text-[10px] font-medium text-[var(--right-text-subtle)]">
              Admin
            </span>
          </div>
          <ChevronDown className="w-2.5 h-2.5 text-[var(--right-text-subtle)] shrink-0" />
        </button>
      </div>
    </header>
  );
}

export default memo(HeaderComponent);
