"use client";

import { useState, useCallback, type ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--right-bg)] flex">
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
      <div className="flex-1 flex flex-col min-w-0 md:pl-[256px] bg-[var(--right-bg)]">
        <Header
          onMenuClick={handleOpenSidebar}
          sidebarOpen={sidebarOpen}
        />
        {children}
      </div>
    </div>
  );
}
