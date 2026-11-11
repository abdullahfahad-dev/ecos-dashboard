"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import ProductCatalogCard from "./ProductCatalogCard";
import { PosProductItem, PosCartItem } from "../../types";
import { initialPosProducts, filterBrands } from "../../data";

interface ProductCatalogPanelProps {
  cart: PosCartItem[];
  onAddToCart: (product: PosProductItem) => void;
}

export default function ProductCatalogPanel({
  cart,
  onAddToCart,
}: ProductCatalogPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");

  const filteredProducts = initialPosProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand =
      selectedBrand === "All" || p.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  const getCartQuantity = (productId: string) => {
    const found = cart.find((item) => item.product.id === productId);
    return found ? found.quantity : 0;
  };

  return (
    <div className="flex flex-col p-5 bg-[var(--right-bg)] border border-[var(--right-border)] rounded-2xl shadow-xs w-full">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-[18px] font-bold text-[var(--right-text-main)]">
          Products
        </h2>
        <span className="text-[12px] font-medium text-[var(--right-text-muted)]">
          {filteredProducts.length} products
        </span>
      </div>

      <div className="relative w-full mb-3.5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--right-text-muted)] pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search name or SKU (scanner works here)"
          className="w-full h-11 pl-10 pr-4 bg-[var(--right-surface)] border border-[var(--right-border)] rounded-xl text-[13px] text-[var(--right-text-main)] placeholder:text-[var(--right-text-muted)] focus:outline-none focus:border-[var(--primary-color)] transition-all"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-4">
        {filterBrands.map((brand) => (
          <button
            key={brand}
            type="button"
            onClick={() => setSelectedBrand(brand)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedBrand === brand
                ? "bg-[var(--primary-color)] text-[var(--primary-text)] font-semibold shadow-xs"
                : "bg-[var(--right-surface)] border border-[var(--right-border)] text-[var(--right-text-muted)] hover:text-[var(--right-text-main)]"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {filteredProducts.map((p) => (
          <ProductCatalogCard
            key={p.id}
            product={p}
            quantityInCart={getCartQuantity(p.id)}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
