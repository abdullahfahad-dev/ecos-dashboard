import React from "react";
import DashboardShell from "@/views/dashboard/DashboardShell";
import CategoriesHeaderSection from "./components/header/CategoriesHeaderSection";
import CategoryStatsSection from "./components/stats/CategoryStatsSection";
import CategoryTableSection from "./components/table/CategoryTableSection";

export default function CategoriesView() {
  return (
    <DashboardShell>
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <CategoriesHeaderSection />
        <CategoryStatsSection />
        <CategoryTableSection />
      </main>
    </DashboardShell>
  );
}

