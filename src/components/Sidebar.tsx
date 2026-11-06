"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  Package,
  Layers,
  Users,
  CreditCard,
  Truck,
  Megaphone,
  Compass,
  BarChart3,
  Store,
  Boxes,
  UserCheck,
  Settings,
  ChevronRight,
  Zap,
  Crown,
  ArrowRight,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  {
    name: "Dashboard",
    icon: Home,
    href: "/",
    active: true,
  },
  {
    name: "Orders",
    icon: ShoppingBag,
    href: "/orders",
    badge: "24",
    badgeClass: "bg-[var(--primary-color)]",
  },
  {
    name: "Products",
    icon: Package,
    href: "/products",
    hasSubmenu: true,
  },
  {
    name: "Categories",
    icon: Layers,
    href: "/categories",
  },
  {
    name: "Customers",
    icon: Users,
    href: "/customers",
  },
  {
    name: "POS",
    icon: null,
    isPos: true,
    subtitle: "(Point of Sale)",
    href: "/pos",
  },
  {
    name: "Inventory",
    icon: Boxes,
    href: "/inventory",
  },
  {
    name: "Payments",
    icon: CreditCard,
    href: "/payments",
  },
  {
    name: "Couriers & Shipping",
    icon: Truck,
    href: "/shipping",
  },
  {
    name: "Marketing",
    icon: Megaphone,
    href: "/marketing",
    hasSubmenu: true,
  },
  {
    name: "AI Assistant",
    icon: Compass,
    href: "/ai-assistant",
    badge: "NEW",
    badgeClass: "bg-[var(--badge-accent)]",
  },
  {
    name: "Reports & Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    name: "Storefront",
    icon: Store,
    href: "/storefront",
    hasSubmenu: true,
  },
  {
    name: "Add-ons",
    icon: Layers,
    href: "/addons",
  },
  {
    name: "Staff & Permissions",
    icon: UserCheck,
    href: "/staff",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/settings",
    hasSubmenu: true,
  },
];

function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close navigation menu"
        tabIndex={isOpen ? 0 : -1}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      />

      <aside
        id="dashboard-sidebar"
        aria-label="Dashboard sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-[256px] h-screen bg-[var(--left-bg)] border-r border-[var(--left-border)] transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-5 pt-6 pb-4 shrink-0">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--primary-color)] text-white shadow-md shrink-0">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-[18px] font-bold leading-tight tracking-[0.45px] text-[var(--left-text-main)]">
              Fast Softun
            </span>
            <span className="text-[11px] font-medium leading-4 tracking-[-0.275px] text-[var(--left-text-muted)]">
              eCommerce & POS Platform
            </span>
          </div>
        </div>

        <nav aria-label="Main navigation" className="flex-1 overflow-y-auto px-3.5 py-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

            if (isActive) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  aria-current="page"
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[var(--primary-color)] text-[var(--primary-text)] text-[14px] font-medium shadow-xs transition-all cursor-pointer"
                >
                  {Icon && <Icon className="w-4 h-4 shrink-0" />}
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                  onClick={onClose}
                className="flex items-center justify-between px-3.5 py-2 rounded-xl text-[var(--left-text-muted)] hover:text-[var(--left-text-main)] hover:bg-white/5 transition-colors group text-[14px] cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {Icon && (
                    <Icon className="w-4 h-4 shrink-0 text-[var(--left-text-muted)] group-hover:text-[var(--left-text-main)] transition-colors" />
                  )}

                  {item.isPos && (
                    <span className="px-1 py-0.5 text-[9px] font-bold text-[var(--left-text-muted)] border border-slate-500 rounded leading-none shrink-0">
                      POS
                    </span>
                  )}

                  <span className="truncate">{item.name}</span>

                  {item.subtitle && (
                    <span className="text-[12px] text-slate-500 truncate">
                      {item.subtitle}
                    </span>
                  )}
                </div>

                {item.badge && (
                  <span
                    className={`${item.badgeClass} text-white font-semibold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 shadow-xs`}
                  >
                    {item.badge}
                  </span>
                )}

                {item.hasSubmenu && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[var(--left-text-main)] transition-colors shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3.5 pt-2 shrink-0">
          <div className="p-3.5 rounded-2xl bg-[var(--left-card-bg)] border border-[var(--left-card-border)] shadow-md flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 shadow-inner shrink-0">
                <Crown className="w-4.5 h-4.5 text-[var(--badge-warning)] fill-[var(--badge-warning)]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] font-semibold text-[var(--left-text-main)] leading-tight">
                  Pro Plan
                </span>
                <span className="text-[11px] text-[var(--left-text-muted)] leading-tight mt-0.5">
                  Valid till 30 Nov, 2026
                </span>
              </div>
            </div>

            <div className="space-y-1.5 pt-0.5">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[68.4%] bg-[var(--primary-color)] rounded-full" />
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--left-text-muted)]">Usage:</span>
                <span className="text-[var(--left-text-muted)]">
                  <strong className="text-[var(--left-text-main)] font-bold">3,420</strong> / 5,000 orders
                </span>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 w-full h-[38px] px-3 rounded-xl bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-[var(--primary-text)] text-[12px] font-medium shadow-sm transition-all cursor-pointer">
              <span>Upgrade Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default React.memo(Sidebar);
