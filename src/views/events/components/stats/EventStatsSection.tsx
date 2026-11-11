import React from "react";
import MetricsGrid from "@/components/ui/MetricsGrid";
import { MetricCardProps } from "@/components/ui/MetricCard";
import { CalendarDays, Zap, Clock, MessageSquare } from "lucide-react";

const eventStats: MetricCardProps[] = [
  {
    title: "Total Events",
    value: "16",
    icon: CalendarDays,
    change: { value: 14.2, direction: "up", impact: "positive" },
    comparison: "vs last month",
  },
  {
    title: "Active Events",
    value: "5",
    icon: Zap,
    change: { value: 31.2, direction: "up", impact: "positive" },
    comparison: "currently running",
  },
  {
    title: "Upcoming",
    value: "7",
    icon: Clock,
    change: { value: 43.8, direction: "up", impact: "positive" },
    comparison: "scheduled events",
  },
  {
    title: "Active Popups",
    value: "3",
    icon: MessageSquare,
    change: { value: 60.0, direction: "up", impact: "positive" },
    comparison: "live on storefront",
  },
];

export default function EventStatsSection() {
  return <MetricsGrid metrics={eventStats} />;
}

