import React from "react";
import MetricCard, { MetricCardProps } from "@/components/ui/MetricCard";
import {
  ShoppingBag,
  ShoppingCart,
  Users,
  Percent,
} from "lucide-react";

const statsData: MetricCardProps[] = [
  {
    title: "Total Sales",
    value: "৳248,560",
    change: {
      value: 12.8,
      direction: "up",
      impact: "positive",
    },
    comparison: "vs last month",
    icon: ShoppingBag,
  },
  {
    title: "Total Orders",
    value: "1,284",
    change: {
      value: 8.2,
      direction: "up",
      impact: "positive",
    },
    comparison: "vs last month",
    icon: ShoppingCart,
  },
  {
    title: "Total Customers",
    value: "842",
    change: {
      value: 5.4,
      direction: "up",
      impact: "positive",
    },
    comparison: "vs last month",
    icon: Users,
  },
  {
    title: "Conversion Rate",
    value: "3.8%",
    change: {
      value: 0.6,
      direction: "up",
      impact: "positive",
    },
    comparison: "vs last month",
    icon: Percent,
  },
];

export default function StatsOverviewSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {statsData.map((item) => (
        <MetricCard key={item.title} {...item} />
      ))}
    </div>
  );
}
