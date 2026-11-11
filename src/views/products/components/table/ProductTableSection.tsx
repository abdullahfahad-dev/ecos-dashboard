"use client";

import React, { useState } from "react";
import Image from "next/image";
import DataTableCard, { ColumnDef } from "@/components/ui/DataTableCard";
import PeriodDropdown from "@/components/ui/PeriodDropdown";
import TableFilterDropdown from "@/components/ui/TableFilterDropdown";
import { Edit2, Trash2, Eye } from "lucide-react";
import { ProductData, mockProducts } from "../../data";

export default function ProductTableSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredProducts = mockProducts.filter((p) => {
    const matchesStatus = selectedStatus === "All" || p.status === selectedStatus;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: ProductData["status"]) => {
    if (status === "In Stock") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
          In Stock
        </span>
      );
    }
    if (status === "Low Stock") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 whitespace-nowrap">
          Low Stock
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 whitespace-nowrap">
        Out of Stock
      </span>
    );
  };

  const columns: ColumnDef<ProductData>[] = [
    {
      key: "product",
      header: "Product",
      align: "left",
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-[var(--right-bg)] border border-[var(--right-border)] shrink-0 shadow-2xs">
            <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="44px"
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-[var(--right-text-main)] leading-tight truncate text-[13px] sm:text-[14px]">
              {p.name}
            </span>
            <span className="text-[11px] text-[var(--right-text-muted)] mt-0.5 truncate">
              {p.category}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "sku",
      header: "SKU",
      align: "left",
      render: (p) => (
        <code className="text-[12px] font-mono text-[var(--right-text-muted)] bg-[var(--right-surface)] px-2 py-0.5 rounded border border-[var(--right-border)] whitespace-nowrap">
          {p.sku}
        </code>
      ),
    },
    {
      key: "price",
      header: "Price",
      align: "right",
      render: (p) => (
        <span className="font-extrabold text-[13px] sm:text-[14px] text-[var(--right-text-main)] whitespace-nowrap">
          {p.price}
        </span>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      align: "center",
      render: (p) => (
        <span className="whitespace-nowrap">
          <span className="font-semibold text-[var(--right-text-main)]">
            {p.stock}
          </span>
          <span className="text-[11px] text-[var(--right-text-muted)] ml-1">
            units
          </span>
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (p) => getStatusBadge(p.status),
    },
    {
      key: "sales",
      header: "Total Sales",
      align: "right",
      render: (p) => (
        <span className="font-bold text-[13px] text-[var(--right-text-main)] whitespace-nowrap">
          {p.sales}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Action",
      align: "right",
      render: (p) => (
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            aria-label={`View ${p.name}`}
            className="p-1.5 rounded-lg text-[var(--right-text-muted)] hover:text-[var(--right-text-main)] hover:bg-[var(--right-surface)] transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label={`Edit ${p.name}`}
            className="p-1.5 rounded-lg text-[var(--right-text-muted)] hover:text-[var(--primary-color)] hover:bg-[var(--right-surface)] transition-colors cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label={`Delete ${p.name}`}
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
        label="Filter by Stock"
        value={selectedStatus}
        options={["All", "In Stock", "Low Stock", "Out of Stock"]}
        onChange={setSelectedStatus}
      />
      <PeriodDropdown
        defaultValue="This Month"
        options={["This Week", "This Month", "Last 30 Days", "This Quarter"]}
        roundedFull={true}
      />
    </div>
  );

  return (
    <DataTableCard
      data={filteredProducts}
      columns={columns}
      search={searchTerm}
      onSearchChange={setSearchTerm}
      filters={filters}
    />
  );
}
