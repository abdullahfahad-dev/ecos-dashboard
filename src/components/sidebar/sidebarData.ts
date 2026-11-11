import React from "react";
import {
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
  LayoutGrid,
  CalendarDays,
  ClipboardList,
  Store as StoreIcon,
  Share2,
} from "lucide-react";

export interface SidebarSubItem {
  name: string;
  icon: React.ElementType;
  href: string;
  badge?: string;
  badgeClass?: string;
  hasSubmenu?: boolean;
}

export interface SidebarGroup {
  title: string;
  items: SidebarSubItem[];
  defaultOpen?: boolean;
}

export const sidebarGroups: SidebarGroup[] = [
  {
    title: "OVERVIEW",
    defaultOpen: true,
    items: [
      { name: "Dashboard", icon: LayoutGrid, href: "/" },
      { name: "Analytics", icon: BarChart3, href: "/analytics" },
    ],
  },
  {
    title: "CATALOG",
    defaultOpen: true,
    items: [
      { name: "Categories", icon: Layers, href: "/categories" },
      { name: "Products", icon: Package, href: "/products" },
      {
        name: "Events",
        icon: CalendarDays,
        href: "/events",
        badge: "New",
        badgeClass: "bg-[var(--badge-accent)]",
      },
    ],
  },
  {
    title: "SALES",
    defaultOpen: true,
    items: [
      {
        name: "Orders",
        icon: ClipboardList,
        href: "/orders",
      },
      {
        name: "Store Sale",
        icon: StoreIcon,
        href: "/store-sale",
        badge: "New",
        badgeClass: "bg-[var(--badge-accent)]",
      },
      { name: "Customers", icon: Users, href: "/customers" },
      {
        name: "Dropship",
        icon: Share2,
        href: "/dropship",
        badge: "Soon",
        badgeClass: "bg-[var(--badge-accent)]",
        hasSubmenu: true,
      },
    ],
  },
];

export interface NavItemConfig {
  name: string;
  icon: React.ElementType | null;
  href: string;
  isPos?: boolean;
  subtitle?: string;
  badge?: string;
  badgeClass?: string;
  hasSubmenu?: boolean;
}

export const navItems: NavItemConfig[] = [
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
];

