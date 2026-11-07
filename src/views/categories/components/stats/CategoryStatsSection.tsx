import React from "react";
import MetricsGrid from "@/components/ui/MetricsGrid";
import { MetricCardProps } from "@/components/ui/MetricCard";
import { Layers, CheckCircle2, XCircle, Package } from "lucide-react";

const categoryStats: MetricCardProps[] = [
  {
    title: "Total Category",
    value: "24",
    icon: Layers,
    change: { value: 12.5, direction: "up", impact: "positive" },
    comparison: "vs last month",
  },
  {
    title: "Active",
    value: "20",
    icon: CheckCircle2,
    change: { value: 83.3, direction: "up", impact: "positive" },
    comparison: "of total categories",
  },
  {
    title: "Inactive",
    value: "4",
    icon: XCircle,
    change: { value: 16.7, direction: "down", impact: "negative" },
    comparison: "needs attention",
  },
  {
    title: "Listed Products",
    value: "1,428",
    icon: Package,
    change: { value: 15.4, direction: "up", impact: "positive" },
    comparison: "across all categories",
  },
];

export default function CategoryStatsSection() {
  return <MetricsGrid metrics={categoryStats} />;
}
