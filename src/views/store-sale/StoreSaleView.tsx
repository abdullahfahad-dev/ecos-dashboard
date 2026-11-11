import React from "react";
import DashboardShell from "@/views/dashboard/DashboardShell";
import StoreSaleTerminalSection from "./components/terminal/StoreSaleTerminalSection";

export default function StoreSaleView() {
  return (
    <DashboardShell>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <StoreSaleTerminalSection />
      </main>
    </DashboardShell>
  );
}
