import React from "react";
import MetricsGrid from "@/components/ui/MetricsGrid";
import { MetricCardProps } from "@/components/ui/MetricCard";
import { ShoppingBag, Clock, CheckCircle2, DollarSign } from "lucide-react";

const orderStats: MetricCardProps[] = [
  {
    title: "Total Order",
    value: "1,284",
    icon: ShoppingBag,
    change: { value: 14.8, direction: "up", impact: "positive" },
    comparison: "vs last month",
  },
  {
    title: "Pending",
    value: "124",
    icon: Clock,
    change: { value: 6.2, direction: "down", impact: "negative" },
    comparison: "awaiting processing",
  },
  {
    title: "Fulfilled",
    value: "1,140",
    icon: CheckCircle2,
    change: { value: 88.7, direction: "up", impact: "positive" },
    comparison: "of total orders",
  },
  {
    title: "Order Revenue",
    value: "৳3,48,250",
    icon: DollarSign,
    change: { value: 18.5, direction: "up", impact: "positive" },
    comparison: "vs last month",
  },
];

export default function OrderStatsSection() {
  return <MetricsGrid metrics={orderStats} />;
}

