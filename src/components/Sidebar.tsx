import React from "react";
import Link from "next/link";
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
    badgeColor: "bg-[#7C3AED]",
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
    badgeColor: "bg-[#8B5CF6]",
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

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      />

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-[256px] h-screen bg-[#0A0F1D] border-r border-[#0F172A] transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-5 pt-6 pb-4 shrink-0">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1] via-[#9333EA] to-[#4338CA] shadow-[0_10px_15px_-3px_rgba(79,70,229,0.3),0_4px_6px_-4px_rgba(79,70,229,0.3)] shrink-0">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[18px] font-bold leading-tight tracking-[0.45px] text-white">
              Fast Softun
            </span>
            <span className="text-[11px] font-medium leading-4 tracking-[-0.275px] text-[#94A3B8]">
              eCommerce & POS Platform
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3.5 py-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;

            if (item.active) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#7C3AED] text-white shadow-[0_4px_6px_-1px_rgba(99,102,241,0.2),0_2px_4px_-2px_rgba(99,102,241,0.2)] text-[14px] font-medium transition-all"
                >
                  {Icon && <Icon className="w-4 h-4 shrink-0 text-white" />}
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center justify-between px-3.5 py-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors group text-[14px]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {Icon && (
                    <Icon className="w-4 h-4 shrink-0 text-[#94A3B8] group-hover:text-white transition-colors" />
                  )}

                  {item.isPos && (
                    <span className="px-1 py-0.5 text-[9px] font-bold text-[#94A3B8] border border-[#64748B] rounded leading-none shrink-0">
                      POS
                    </span>
                  )}

                  <span className="truncate">{item.name}</span>

                  {item.subtitle && (
                    <span className="text-[12px] text-[#64748B] truncate">
                      {item.subtitle}
                    </span>
                  )}
                </div>

                {item.badge && (
                  <span
                    className={`${item.badgeColor} text-white font-semibold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 shadow-sm`}
                  >
                    {item.badge}
                  </span>
                )}

                {item.hasSubmenu && (
                  <ChevronRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-white transition-colors shrink-0" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="p-3.5 pt-2 shrink-0">
          <div className="p-3.5 rounded-2xl bg-[#121927] border border-[#1E293B]/80 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#1E2538] shadow-inner shrink-0">
                <Crown className="w-4.5 h-4.5 text-[#FBBF24] fill-[#FBBF24]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] font-semibold text-white leading-tight">
                  Pro Plan
                </span>
                <span className="text-[11px] text-[#94A3B8] leading-tight mt-0.5">
                  Valid till 30 Nov, 2026
                </span>
              </div>
            </div>

            <div className="space-y-1.5 pt-0.5">
              <div className="w-full h-1.5 bg-[#242E45] rounded-full overflow-hidden">
                <div className="h-full w-[68.4%] bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-full" />
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#94A3B8]">Usage:</span>
                <span className="text-[#94A3B8]">
                  <strong className="text-white font-bold">3,420</strong> / 5,000 orders
                </span>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 w-full h-[38px] px-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#7C3AED] text-white text-[12px] font-medium shadow-[0_4px_6px_-1px_rgba(79,70,229,0.25),0_2px_4px_-2px_rgba(79,70,229,0.25)] hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer">
              <span>Upgrade Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

