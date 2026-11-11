"use client";

import React, { useState } from "react";
import Image from "next/image";
import DataTableCard, { ColumnDef } from "@/components/ui/DataTableCard";
import PeriodDropdown from "@/components/ui/PeriodDropdown";
import TableFilterDropdown from "@/components/ui/TableFilterDropdown";
import { Edit2, Trash2, Eye, Tag } from "lucide-react";
import { EventData, mockEvents } from "../../data";

export default function EventTableSection() {
  const [events, setEvents] = useState<EventData[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const togglePopup = (id: string) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, hasPopup: !ev.hasPopup } : ev))
    );
  };

  const filteredEvents = events.filter((ev) => {
    const matchesStatus = selectedStatus === "All" || ev.status === selectedStatus;
    const matchesSearch =
      ev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: EventData["status"]) => {
    if (status === "Active") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
          Active
        </span>
      );
    }
    if (status === "Upcoming") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 whitespace-nowrap">
          Upcoming
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20 whitespace-nowrap">
        Expired
      </span>
    );
  };

  const columns: ColumnDef<EventData>[] = [
    {
      key: "event",
      header: "Event",
      align: "left",
      render: (ev) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-[var(--right-bg)] border border-[var(--right-border)] shrink-0 shadow-2xs">
            <Image
              src={ev.image}
              alt={ev.name}
              fill
              sizes="44px"
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-[var(--right-text-main)] leading-tight truncate text-[13px] sm:text-[14px]">
              {ev.name}
            </span>
            <span className="text-[11px] text-[var(--right-text-muted)] mt-0.5 truncate">
              {ev.subtitle}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "discount",
      header: "Discount",
      align: "center",
      render: (ev) => (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[12px] font-bold text-[var(--primary-color)] bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/20 whitespace-nowrap">
          <Tag className="w-3 h-3" />
          {ev.discount}
        </span>
      ),
    },
    {
      key: "products",
      header: "Products",
      align: "center",
      render: (ev) => (
        <span className="whitespace-nowrap">
          <span className="font-semibold text-[var(--right-text-main)]">
            {ev.productsCount}
          </span>
          <span className="text-[11px] text-[var(--right-text-muted)] ml-1">
            items
          </span>
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (ev) => getStatusBadge(ev.status),
    },
    {
      key: "popup",
      header: "Popup Notification",
      align: "center",
      render: (ev) => (
        <button
          type="button"
          onClick={() => togglePopup(ev.id)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
            ev.hasPopup ? "bg-[var(--primary-color)]" : "bg-slate-300 dark:bg-slate-700"
          }`}
          aria-label={`Toggle popup for ${ev.name}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-xs ${
              ev.hasPopup ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      ),
    },
    {
      key: "actions",
      header: "Action",
      align: "right",
      render: (ev) => (
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            aria-label={`View ${ev.name}`}
            className="p-1.5 rounded-lg text-[var(--right-text-muted)] hover:text-[var(--right-text-main)] hover:bg-[var(--right-surface)] transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label={`Edit ${ev.name}`}
            className="p-1.5 rounded-lg text-[var(--right-text-muted)] hover:text-[var(--primary-color)] hover:bg-[var(--right-surface)] transition-colors cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label={`Delete ${ev.name}`}
            className="p-1.5 rounded-lg text-[var(--right-text-muted)] hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const filters = (
    <div className="flex items-center gap-2">
      <TableFilterDropdown
        label="Filter by Status"
        value={selectedStatus}
        options={["All", "Active", "Upcoming", "Expired"]}
        onChange={setSelectedStatus}
      />
      <PeriodDropdown
        defaultValue="This Year"
        options={["This Month", "Next Month", "This Quarter", "This Year"]}
        roundedFull={true}
      />
    </div>
  );

  return (
    <DataTableCard
      data={filteredEvents}
      columns={columns}
      search={searchTerm}
      onSearchChange={setSearchTerm}
      filters={filters}
    />
  );
}
