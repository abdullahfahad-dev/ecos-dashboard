import React from "react";
import MetricCard, { MetricCardProps } from "@/components/ui/MetricCard";
import {
  DollarSign,
  ShoppingBag,
  CreditCard,
  RotateCcw,
  Users,
  TrendingUp,
  Percent,
} from "lucide-react";

const analyticsStats: MetricCardProps[] = [
  {
    title: "Total Revenue",
    value: "৳2,48,560",
    icon: DollarSign,
    change: { value: 16.8, direction: "up", impact: "positive" },
    comparison: "vs last period",
  },
  {
    title: "Orders",
    value: "1,284",
    icon: ShoppingBag,
    change: { value: 12.4, direction: "up", impact: "positive" },
    comparison: "total orders",
  },
  {
    title: "Avg. Order Value",
    value: "৳1,935",
    icon: CreditCard,
    change: { value: 4.2, direction: "up", impact: "positive" },
    comparison: "per customer cart",
  },
  {
    title: "Refund Rate",
    value: "1.2%",
    icon: RotateCcw,
    change: { value: 0.3, direction: "down", impact: "positive" },
    comparison: "lower than avg",
  },
  {
    title: "Visitors",
    value: "48,250",
    icon: Users,
    change: { value: 22.5, direction: "up", impact: "positive" },
    comparison: "store traffic",
  },
  {
    title: "Conversion Rate",
    value: "3.84%",
    icon: Percent,
    change: { value: 0.6, direction: "up", impact: "positive" },
    comparison: "traffic to sales",
  },
  {
    title: "Profit",
    value: "৳92,400",
    icon: TrendingUp,
    change: { value: 18.2, direction: "up", impact: "positive" },
    comparison: "net margin: 37.1%",
  },
];

export default function AnalyticsStatsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {analyticsStats.map((stat) => (
        <MetricCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          change={stat.change}
          comparison={stat.comparison}
        />
      ))}
    </div>
  );
}
