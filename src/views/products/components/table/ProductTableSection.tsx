"use client";

import React, { useState } from "react";
import Image from "next/image";
import DataTableCard, { ColumnDef } from "@/components/ui/DataTableCard";
import PeriodDropdown from "@/components/ui/PeriodDropdown";
import { SlidersHorizontal, Edit2, Trash2, Eye } from "lucide-react";

export interface ProductData {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  image: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  sales: string;
}

const mockProducts: ProductData[] = [
  {
    id: "1",
    name: "Wireless Noise Canceling Headphones",
    sku: "WNH-001",
    category: "Electronics",
    price: "৳4,800",
    stock: 142,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&auto=format&fit=crop&q=80",
    status: "In Stock",
    sales: "৳68,400",
  },
  {
    id: "2",
    name: "Smart Fitness Watch Pro Edition",
    sku: "SWP-002",
    category: "Electronics",
    price: "৳3,600",
    stock: 84,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&auto=format&fit=crop&q=80",
    status: "In Stock",
    sales: "৳58,200",
  },
  {
    id: "3",
    name: "Premium Cotton Polo T-Shirt",
    sku: "CPT-003",
    category: "Fashion & Apparel",
    price: "৳1,250",
    stock: 215,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=120&auto=format&fit=crop&q=80",
    status: "In Stock",
    sales: "৳48,600",
  },
  {
    id: "4",
    name: "65W USB-C GaN Fast Charger",
    sku: "UFC-004",
    category: "Electronics",
    price: "৳1,850",
    stock: 18,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=120&auto=format&fit=crop&q=80",
    status: "Low Stock",
    sales: "৳38,400",
  },
  {
    id: "5",
    name: "Anti-Theft Travel Waterproof Backpack",
    sku: "ATB-005",
    category: "Fashion & Apparel",
    price: "৳2,450",
    stock: 0,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&auto=format&fit=crop&q=80",
    status: "Out of Stock",
    sales: "৳33,600",
  },
  {
    id: "6",
    name: "Ceramic Minimalist Coffee Mug Set",
    sku: "CMS-006",
    category: "Home & Living",
    price: "৳950",
    stock: 64,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=120&auto=format&fit=crop&q=80",
    status: "In Stock",
    sales: "৳24,500",
  },
  {
    id: "7",
    name: "Organic Hydrating Face Serum 50ml",
    sku: "HFS-007",
    category: "Health & Beauty",
    price: "৳1,600",
    stock: 0,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=120&auto=format&fit=crop&q=80",
    status: "Out of Stock",
    sales: "৳21,200",
  },
  {
    id: "8",
    name: "Stainless Steel Insulated Water Bottle",
    sku: "SWB-008",
    category: "Sports & Fitness",
    price: "৳1,100",
    stock: 45,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=120&auto=format&fit=crop&q=80",
    status: "In Stock",
    sales: "৳18,700",
  },
];

export default function ProductTableSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = mockProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All Status" || p.status === selectedStatus;
    return matchesSearch && matchesStatus;
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
            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[var(--right-text-muted)]">
              <span>SKU: {p.sku}</span>
              <span>•</span>
              <span className="text-[var(--primary-color)] font-medium">
                {p.category}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      align: "center",
      render: (p) => (
        <span className="font-semibold text-[var(--right-text-main)] whitespace-nowrap">
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
          <span
            className={`font-semibold ${
              p.stock === 0 ? "text-rose-500" : "text-[var(--right-text-main)]"
            }`}
          >
            {p.stock}
          </span>
          <span className="text-[11px] text-[var(--right-text-muted)] ml-1">
            units
          </span>
        </span>
      ),
    },
    {
      key: "sales",
      header: "Total Sales",
      align: "center",
      render: (p) => (
        <span className="font-bold text-[var(--right-text-main)] whitespace-nowrap">
          {p.sales}
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
      key: "actions",
      header: "Actions",
      align: "right",
      render: () => (
        <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
          <button
            type="button"
            aria-label="View product"
            className="p-1.5 rounded-lg text-[var(--right-text-muted)] hover:text-[var(--right-text-main)] hover:bg-[var(--right-bg)] transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Edit product"
            className="p-1.5 rounded-lg text-[var(--right-text-muted)] hover:text-[var(--primary-color)] hover:bg-[var(--right-bg)] transition-colors cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Delete product"
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
      data={filteredProducts}
      columns={columns}
      keyExtractor={(item) => item.id}
      searchPlaceholder="Search products by name, SKU, category..."
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      currentPage={currentPage}
      totalPages={3}
      totalItems={mockProducts.length}
      onPageChange={setCurrentPage}
      minTableWidth="min-w-[680px]"
      filters={
        <>
          <PeriodDropdown
            value={selectedStatus}
            options={["All Status", "In Stock", "Low Stock", "Out of Stock"]}
            onChange={setSelectedStatus}
            icon={SlidersHorizontal}
            className="flex-1 sm:flex-initial"
            buttonClassName="w-full sm:w-auto h-10 text-[12px] sm:text-[13px]"
          />

          <PeriodDropdown
            value="Sort by: Sales"
            options={["Sort by: Sales", "Sort by: Price", "Sort by: Stock"]}
            className="flex-1 sm:flex-initial"
            buttonClassName="w-full sm:w-auto h-10 text-[12px] sm:text-[13px]"
          />
        </>
      }
    />
  );
}

