"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import ProductCatalogPanel from "./ProductCatalogPanel";
import CurrentSalePanel from "./CurrentSalePanel";
import { PosProductItem, PosCartItem, SaleReceiptData } from "../../types";

const SaleCompleteModal = dynamic(
  () => import("./SaleCompleteModal"),
  { ssr: false }
);

export default function StoreSaleTerminalSection() {
  const [cart, setCart] = useState<PosCartItem[]>([]);
  const [activeReceipt, setActiveReceipt] = useState<SaleReceiptData | null>(null);

  const handleAddToCart = (product: PosProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is PosCartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCompleteSale = (info: {
    customer: string;
    phone: string;
    method: string;
  }) => {
    if (cart.length === 0) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const timeStr = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const total = cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    const receipt: SaleReceiptData = {
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: dateStr,
      time: timeStr,
      channel: "Store Sale",
      paymentMethod: info.method,
      customerName: info.customer,
      customerPhone: info.phone,
      storeName: "SONAR BANGLA",
      storePhone: "01907641877",
      items: [...cart],
      total,
    };

    setActiveReceipt(receipt);
    setCart([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full items-start">
      <div className="lg:col-span-7 xl:col-span-7 flex flex-col">
        <ProductCatalogPanel
          cart={cart}
          onAddToCart={handleAddToCart}
        />
      </div>

      <div className="lg:col-span-5 xl:col-span-5 flex flex-col sticky top-20">
        <CurrentSalePanel
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCompleteSale={handleCompleteSale}
        />
      </div>

      {activeReceipt && (
        <SaleCompleteModal
          receipt={activeReceipt}
          onClose={() => setActiveReceipt(null)}
          onNewSale={() => setActiveReceipt(null)}
        />
      )}
    </div>
  );
}
