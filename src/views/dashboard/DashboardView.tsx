"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardView() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col md:pl-[256px]">
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 border-b border-[#0F172A] bg-[#0A0F1D]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 md:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-white">Dashboard</h1>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto border border-dashed border-slate-800 rounded-2xl p-8 text-center text-slate-500">
            Main Content Area
          </div>
        </main>
      </div>
    </div>
  );
}

