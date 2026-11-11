import React from "react";
import DashboardShell from "@/views/dashboard/DashboardShell";
import EventsHeaderSection from "./components/header/EventsHeaderSection";
import EventStatsSection from "./components/stats/EventStatsSection";
import EventTableSection from "./components/table/EventTableSection";

export default function EventsView() {
  return (
    <DashboardShell>
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <EventsHeaderSection />
        <EventStatsSection />
        <EventTableSection />
      </main>
    </DashboardShell>
  );
}

