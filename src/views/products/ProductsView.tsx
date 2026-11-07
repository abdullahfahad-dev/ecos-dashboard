import React from "react";
import DashboardShell from "@/views/dashboard/DashboardShell";
import ProductsHeaderSection from "./components/header/ProductsHeaderSection";
import ProductStatsSection from "./components/stats/ProductStatsSection";
import ProductTableSection from "./components/table/ProductTableSection";

export default function ProductsView() {
  return (
    <DashboardShell>
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <ProductsHeaderSection />
        <ProductStatsSection />
        <ProductTableSection />
      </main>
    </DashboardShell>
  );
}

