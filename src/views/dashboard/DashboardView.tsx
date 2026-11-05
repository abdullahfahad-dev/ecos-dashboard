import DashboardShell from "./DashboardShell";
import GreetingSection from "./components/GreetingSection";
import StatsOverviewSection from "./components/StatsOverviewSection";
import AnalyticsChartsSection from "./components/AnalyticsChartsSection";

export default function DashboardView() {
  return (
    <DashboardShell>
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 bg-[var(--right-bg)]">
        <GreetingSection />
        <StatsOverviewSection />
        <AnalyticsChartsSection />

        <div className="border border-dashed border-[var(--right-border)] rounded-2xl p-8 text-center text-[var(--right-text-muted)] bg-[var(--right-surface)]">
          Next Sections Area
        </div>
      </main>
    </DashboardShell>
  );
}
