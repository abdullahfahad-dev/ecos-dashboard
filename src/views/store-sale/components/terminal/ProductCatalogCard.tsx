"use client";

import React, { memo, useState } from "react";
import { Plus, ImageOff } from "lucide-react";
import Image from "next/image";
import { PosProductItem } from "../../types";

interface ProductCatalogCardProps {
  product: PosProductItem;
  quantityInCart: number;
  onAddToCart: (product: PosProductItem) => void;
}

function ProductCatalogCardComponent({
  product,
  quantityInCart,
  onAddToCart,
}: ProductCatalogCardProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      onClick={() => onAddToCart(product)}
      className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--right-surface)]/70 hover:bg-[var(--right-surface)] border border-[var(--right-border)] hover:border-[var(--primary-color)] shadow-2xs hover:shadow-xs transition-all cursor-pointer group active:scale-[0.99] select-none"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[var(--right-bg)] border border-[var(--right-border)] shrink-0 shadow-2xs flex items-center justify-center text-[var(--right-text-muted)]">
          {product.image && !hasError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="48px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setHasError(true)}
              unoptimized
            />
          ) : (
            <ImageOff className="w-4 h-4 opacity-40" />
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-[13px] sm:text-[14px] text-[var(--right-text-main)] truncate leading-tight group-hover:text-[var(--primary-color)] transition-colors">
            {product.name}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-extrabold text-[13px] sm:text-[14px] text-[var(--right-text-main)]">
              {product.price}৳
            </span>
            <span className="text-[12px] text-[var(--right-text-muted)]">
              {product.stock} left
            </span>
          </div>
        </div>
      </div>

      <div className="shrink-0 pl-2">
        {quantityInCart > 0 ? (
          <div className="flex items-center justify-center min-w-[30px] h-7.5 px-2 rounded-full bg-[var(--primary-color)] text-[var(--primary-text)] font-extrabold text-[13px] shadow-xs animate-in zoom-in-75 duration-150">
            {quantityInCart}
          </div>
        ) : (
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="flex items-center justify-center w-7.5 h-7.5 rounded-full border border-[var(--right-border)] text-[var(--right-text-muted)] group-hover:border-[var(--primary-color)] group-hover:text-[var(--primary-color)] transition-all cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(ProductCatalogCardComponent);
