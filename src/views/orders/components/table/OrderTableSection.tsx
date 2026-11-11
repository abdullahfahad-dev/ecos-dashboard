"use client";

import React, { useState } from "react";
import DataTableCard, { ColumnDef } from "@/components/ui/DataTableCard";
import PeriodDropdown from "@/components/ui/PeriodDropdown";
import TableFilterDropdown from "@/components/ui/TableFilterDropdown";
import { Eye, Globe, Store, Share2 } from "lucide-react";
import { OrderData, mockOrders } from "../../data";
import OrderDetailModal from "../modal/OrderDetailModal";

export default function OrderTableSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<string>("All");
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  const filteredOrders = mockOrders.filter((ord) => {
    const matchesChannel = selectedChannel === "All" || ord.channel === selectedChannel;
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  const getStatusBadge = (status: OrderData["status"]) => {
    if (status === "Fulfilled") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
          Fulfilled
        </span>
      );
    }
    if (status === "Processing") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 whitespace-nowrap">
          Processing
        </span>
      );
    }
    if (status === "Pending") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 whitespace-nowrap">
          Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 whitespace-nowrap">
        Cancelled
      </span>
    );
  };

  const getChannelBadge = (channel: OrderData["channel"]) => {
    if (channel === "Online Store") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-[var(--right-surface)] text-[var(--right-text-main)] border border-[var(--right-border)] whitespace-nowrap">
          <Globe className="w-3 h-3 text-[var(--primary-color)]" />
          <span>Online Store</span>
        </span>
      );
    }
    if (channel === "POS") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-[var(--right-surface)] text-[var(--right-text-main)] border border-[var(--right-border)] whitespace-nowrap">
          <Store className="w-3 h-3 text-emerald-500" />
          <span>POS</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-[var(--right-surface)] text-[var(--right-text-main)] border border-[var(--right-border)] whitespace-nowrap">
        <Share2 className="w-3 h-3 text-violet-500" />
        <span>Dropship</span>
      </span>
    );
  };

  const columns: ColumnDef<OrderData>[] = [
    {
      key: "order",
      header: "Order",
      align: "left",
      render: (ord) => (
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-[var(--right-text-main)] text-[13px] sm:text-[14px] leading-tight">
            {ord.orderNumber}
          </span>
          <span className="text-[11px] text-[var(--primary-color)] font-medium mt-0.5">
            ID: #{ord.id}
          </span>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      align: "left",
      render: (ord) => (
        <div className="flex flex-col min-w-0 whitespace-nowrap">
          <span className="font-semibold text-[var(--right-text-main)] text-[12px] leading-tight">
            {ord.date}
          </span>
          <span className="text-[11px] text-[var(--right-text-muted)] mt-0.5">
            {ord.time}
          </span>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      align: "left",
      render: (ord) => (
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-[var(--right-text-main)] truncate leading-tight text-[13px]">
            {ord.customer.name}
          </span>
          <span className="text-[11px] text-[var(--right-text-muted)] truncate mt-0.5">
            {ord.customer.email}
          </span>
        </div>
      ),
    },
    {
      key: "items",
      header: "Items",
      align: "center",
      render: (ord) => (
        <span className="whitespace-nowrap">
          <span className="font-semibold text-[var(--right-text-main)]">
            {ord.items}
          </span>
          <span className="text-[11px] text-[var(--right-text-muted)] ml-1">
            items
          </span>
        </span>
      ),
    },
    {
      key: "channel",
      header: "Channel",
      align: "center",
      render: (ord) => getChannelBadge(ord.channel),
    },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (ord) => getStatusBadge(ord.status),
    },
    {
      key: "total",
      header: "Total",
      align: "right",
      render: (ord) => (
        <span className="font-extrabold text-[13px] sm:text-[14px] text-[var(--right-text-main)] whitespace-nowrap">
          {ord.total}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Action",
      align: "right",
      render: (ord) => (
        <button
          type="button"
          onClick={() => setSelectedOrder(ord)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--right-surface)] hover:bg-[var(--primary-color)] text-[var(--right-text-main)] hover:text-white border border-[var(--right-border)] hover:border-[var(--primary-color)] text-[12px] font-semibold transition-all cursor-pointer shadow-2xs group"
        >
          <Eye className="w-3.5 h-3.5 text-[var(--right-text-muted)] group-hover:text-white transition-colors" />
          <span>Details</span>
        </button>
      ),
    },
  ];

  const filters = (
    <div className="flex items-center gap-2">
      <TableFilterDropdown
        label="Filter by Channel"
        value={selectedChannel}
        options={["All", "Online Store", "POS", "Dropship"]}
        onChange={setSelectedChannel}
      />
      <PeriodDropdown
        defaultValue="Last 30 Days"
        options={["Today", "Last 7 Days", "Last 30 Days", "This Quarter", "This Year"]}
        roundedFull={true}
      />
    </div>
  );

  return (
    <>
      <DataTableCard
        data={filteredOrders}
        columns={columns}
        search={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
      />

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}
