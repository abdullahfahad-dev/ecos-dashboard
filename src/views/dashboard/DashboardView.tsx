import DashboardShell from "./DashboardShell";
import GreetingSection from "./components/greeting/GreetingSection";
import StatsOverviewSection from "./components/stats-overview/StatsOverviewSection";
import AnalyticsChartsSection from "./components/analytics-charts/AnalyticsChartsSection";
import ProductsAndStorageSection from "./components/products-storage/ProductsAndStorageSection";
import RecentOrdersSection from "./components/recent-orders/RecentOrdersSection";

export default function DashboardView() {
  return (
    <DashboardShell>
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <GreetingSection />
        <StatsOverviewSection />
        <AnalyticsChartsSection />
        <ProductsAndStorageSection />
        <RecentOrdersSection />
      </main>
    </DashboardShell>
  );
}
