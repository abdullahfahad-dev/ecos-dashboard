"use client";

import React, { useState } from "react";
import Image from "next/image";
import DataTableCard, { ColumnDef } from "@/components/ui/DataTableCard";
import PeriodDropdown from "@/components/ui/PeriodDropdown";
import TableFilterDropdown from "@/components/ui/TableFilterDropdown";
import { Edit2, Trash2, Eye } from "lucide-react";

export interface CategoryData {
  id: string;
  name: string;
  image: string;
  productsCount: number;
  totalSales: string;
  status: "Active" | "Inactive";
  featured: boolean;
}

const mockCategories: CategoryData[] = [
  {
    id: "1",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=120&auto=format&fit=crop&q=80",
    productsCount: 342,
    totalSales: "৳1,84,200",
    status: "Active",
    featured: true,
  },
  {
    id: "2",
    name: "Fashion & Apparel",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=120&auto=format&fit=crop&q=80",
    productsCount: 512,
    totalSales: "৳1,42,800",
    status: "Active",
    featured: true,
  },
  {
    id: "3",
    name: "Home & Living",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=120&auto=format&fit=crop&q=80",
    productsCount: 198,
    totalSales: "৳92,400",
    status: "Active",
    featured: false,
  },
  {
    id: "4",
    name: "Health & Beauty",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=120&auto=format&fit=crop&q=80",
    productsCount: 145,
    totalSales: "৳64,300",
    status: "Active",
    featured: false,
  },
  {
    id: "5",
    name: "Groceries & Food",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&auto=format&fit=crop&q=80",
    productsCount: 88,
    totalSales: "৳45,200",
    status: "Active",
    featured: false,
  },
  {
    id: "6",
    name: "Sports & Fitness",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=120&auto=format&fit=crop&q=80",
    productsCount: 64,
    totalSales: "৳32,100",
    status: "Inactive",
    featured: false,
  },
  {
    id: "7",
    name: "Books & Stationery",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=120&auto=format&fit=crop&q=80",
    productsCount: 52,
    totalSales: "৳21,400",
    status: "Inactive",
    featured: false,
  },
  {
    id: "8",
    name: "Luxury & Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&auto=format&fit=crop&q=80",
    productsCount: 27,
    totalSales: "৳18,900",
    status: "Inactive",
    featured: false,
  },
];

export default function CategoryTableSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCategories = mockCategories.filter((cat) => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All Status" || cat.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: CategoryData["status"]) => {
    if (status === "Active") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 whitespace-nowrap">
        Inactive
      </span>
    );
  };

  const columns: ColumnDef<CategoryData>[] = [
    {
      key: "category",
      header: "Category",
      align: "left",
      render: (cat) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-[var(--right-bg)] border border-[var(--right-border)] shrink-0 shadow-2xs">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes="44px"
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-[var(--right-text-main)] leading-tight truncate text-[13px] sm:text-[14px]">
              {cat.name}
            </span>
            {cat.featured && (
              <span className="text-[10px] font-semibold text-[var(--primary-color)] mt-0.5">
                ★ Featured
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "products",
      header: "Products",
      align: "center",
      render: (cat) => (
        <span className="whitespace-nowrap">
          <span className="font-semibold text-[var(--right-text-main)]">
            {cat.productsCount}
          </span>
          <span className="text-[11px] text-[var(--right-text-muted)] ml-1">
            items
          </span>
        </span>
      ),
    },
    {
      key: "sales",
      header: "Total Sales",
      align: "center",
      render: (cat) => (
        <span className="font-bold text-[var(--right-text-main)] whitespace-nowrap">
          {cat.totalSales}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (cat) => getStatusBadge(cat.status),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: () => (
        <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
          <button
            type="button"
            aria-label="View category"
            className="p-1.5 rounded-lg text-[var(--right-text-muted)] hover:text-[var(--right-text-main)] hover:bg-[var(--right-bg)] transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Edit category"
            className="p-1.5 rounded-lg text-[var(--right-text-muted)] hover:text-[var(--primary-color)] hover:bg-[var(--right-bg)] transition-colors cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Delete category"
            className="p-1.5 rounded-lg text-[var(--right-text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTableCard
      data={filteredCategories}
      columns={columns}
      search={searchTerm}
      onSearchChange={setSearchTerm}
      currentPage={currentPage}
      totalItems={mockCategories.length}
      onPageChange={setCurrentPage}
      minTableWidth="min-w-[640px]"
      filters={
        <>
          <TableFilterDropdown
            label="Filter by Status"
            value={selectedStatus}
            options={["All Status", "Active", "Inactive"]}
            onChange={setSelectedStatus}
          />

          <PeriodDropdown
            defaultValue="Sort by: Name"
            options={["Sort by: Name", "Sort by: Products", "Sort by: Sales"]}
            roundedFull={true}
          />
        </>
      }
    />
  );
}
