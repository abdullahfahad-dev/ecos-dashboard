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
    <div className="min-h-screen flex bg-[var(--right-bg)]">
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
      <div className="flex-1 flex flex-col min-w-0 md:pl-[256px]">
        <div className="w-full max-w-[1600px] mx-auto flex-1 flex flex-col">
          <Header
            onMenuClick={handleOpenSidebar}
            sidebarOpen={sidebarOpen}
          />
          <div className="flex-1 flex flex-col w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
