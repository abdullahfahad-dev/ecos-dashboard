import React from "react";
import MetricsGrid from "@/components/ui/MetricsGrid";
import { MetricCardProps } from "@/components/ui/MetricCard";
import { Package, CheckCircle2, AlertTriangle, Coins } from "lucide-react";

const productStats: MetricCardProps[] = [
  {
    title: "Total Product",
    value: "1,428",
    icon: Package,
    change: { value: 12.8, direction: "up", impact: "positive" },
    comparison: "vs last month",
  },
  {
    title: "Active",
    value: "1,392",
    icon: CheckCircle2,
    change: { value: 97.4, direction: "up", impact: "positive" },
    comparison: "of total products",
  },
  {
    title: "Out of Stock",
    value: "36",
    icon: AlertTriangle,
    change: { value: 2.6, direction: "down", impact: "negative" },
    comparison: "needs restock",
  },
  {
    title: "Inventory Value",
    value: "৳8,42,600",
    icon: Coins,
    change: { value: 8.5, direction: "up", impact: "positive" },
    comparison: "vs last month",
  },
];

export default function ProductStatsSection() {
  return <MetricsGrid metrics={productStats} />;
}

