import React from "react";
import DashboardShell from "@/views/dashboard/DashboardShell";
import OrdersHeaderSection from "./components/header/OrdersHeaderSection";
import OrderStatsSection from "./components/stats/OrderStatsSection";
import OrderTableSection from "./components/table/OrderTableSection";

export default function OrdersView() {
  return (
    <DashboardShell>
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <OrdersHeaderSection />
        <OrderStatsSection />
        <OrderTableSection />
      </main>
    </DashboardShell>
  );
}

