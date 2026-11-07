import React from "react";
import DashboardShell from "@/views/dashboard/DashboardShell";
import AnalyticsHeaderSection from "./components/header/AnalyticsHeaderSection";
import AnalyticsChartsOverviewSection from "./components/charts/AnalyticsChartsOverviewSection";
import AnalyticsProductsAndReportSection from "./components/reports/AnalyticsProductsAndReportSection";

export default function AnalyticsView() {
  return (
    <DashboardShell>
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <AnalyticsHeaderSection />
        <AnalyticsChartsOverviewSection />
        <AnalyticsProductsAndReportSection />
      </main>
    </DashboardShell>
  );
}
