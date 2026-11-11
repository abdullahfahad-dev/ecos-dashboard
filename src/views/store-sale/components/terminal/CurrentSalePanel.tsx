"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Plus, Minus, Trash2, ImageOff } from "lucide-react";
import { PosCartItem } from "../../types";

interface CurrentSalePanelProps {
  cart: PosCartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCompleteSale: (info: { customer: string; phone: string; method: string }) => void;
}

export default function CurrentSalePanel({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCompleteSale,
}: CurrentSalePanelProps) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "Card" | "Mobile Banking">("Cash");

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col p-4 sm:p-5 bg-[var(--right-bg)] border border-[var(--right-border)] rounded-2xl shadow-xs w-full">
      <div className="flex flex-col pb-3.5 border-b border-[var(--right-border)]">
        <h2 className="text-[17px] sm:text-[18px] font-bold text-[var(--right-text-main)]">
          Current sale
        </h2>
        <span className="text-[12px] text-[var(--right-text-muted)] mt-0.5">
          {totalItemsCount === 0 ? "No items yet" : `${totalItemsCount} items in cart`}
        </span>
      </div>

      <div className="min-h-[220px] flex flex-col justify-center py-3">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center my-auto py-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--right-surface)] border border-[var(--right-border)] mb-3 text-[var(--right-text-muted)]">
              <ShoppingBag className="w-5 h-5 opacity-40" />
            </div>
            <h4 className="text-[15px] font-semibold text-[var(--right-text-main)]">
              Sale is empty
            </h4>
            <p className="text-[12px] text-[var(--right-text-muted)] mt-1">
              Tap a product on the left to add it here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-[var(--right-border)] max-h-[320px] overflow-y-auto scrollbar-thin pr-1">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="py-3 flex flex-col gap-2.5"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[var(--right-surface)] border border-[var(--right-border)] shrink-0 shadow-2xs flex items-center justify-center text-[var(--right-text-muted)]">
                    {item.product.image ? (
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <ImageOff className="w-4 h-4 opacity-40" />
                    )}
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-semibold text-[13px] text-[var(--right-text-main)] truncate leading-tight">
                      {item.product.name}
                    </span>
                    <span className="text-[11px] text-[var(--right-text-muted)] mt-0.5">
                      {item.product.price}৳ per unit
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pl-12.5 pt-0.5">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-[var(--right-border)] rounded-lg bg-[var(--right-surface)]">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="p-1 hover:text-[var(--right-text-main)] text-[var(--right-text-muted)] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-[12px] font-bold text-[var(--right-text-main)] min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="p-1 hover:text-[var(--right-text-main)] text-[var(--right-text-muted)] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1.5 rounded-lg text-[var(--right-text-muted)] hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-[14px] font-bold text-[var(--right-text-main)]">
                    {(item.product.price * item.quantity).toFixed(2).replace(/\.00$/, "")}৳
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-3 border-t border-[var(--right-border)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer name"
            className="w-full h-10 sm:h-11 px-3.5 bg-[var(--right-surface)] border border-[var(--right-border)] rounded-xl text-[12px] sm:text-[13px] text-[var(--right-text-main)] placeholder:text-[var(--right-text-muted)] focus:outline-none focus:border-[var(--primary-color)] transition-all"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="w-full h-10 sm:h-11 px-3.5 bg-[var(--right-surface)] border border-[var(--right-border)] rounded-xl text-[12px] sm:text-[13px] text-[var(--right-text-main)] placeholder:text-[var(--right-text-muted)] focus:outline-none focus:border-[var(--primary-color)] transition-all"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(["Cash", "Card", "Mobile Banking"] as const).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setPaymentMethod(method)}
              className={`h-10 sm:h-11 rounded-xl text-[12px] sm:text-[13px] font-semibold transition-all cursor-pointer ${
                paymentMethod === method
                  ? "bg-[var(--primary-color)] text-[var(--primary-text)] shadow-xs"
                  : "bg-[var(--right-surface)] border border-[var(--right-border)] text-[var(--right-text-muted)] hover:text-[var(--right-text-main)]"
              }`}
            >
              {method}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--right-text-muted)]">
              TOTAL
            </span>
            <span className="text-[22px] sm:text-[26px] font-extrabold text-[var(--right-text-main)] leading-none mt-0.5">
              {totalAmount.toFixed(2).replace(/\.00$/, "")}৳
            </span>
          </div>
          <span className="text-[12px] text-[var(--right-text-muted)] font-medium">
            {totalItemsCount} items
          </span>
        </div>

        <button
          type="button"
          disabled={cart.length === 0}
          onClick={() =>
            onCompleteSale({
              customer: customerName || "Walk-in Customer",
              phone,
              method: paymentMethod,
            })
          }
          className="w-full h-11 sm:h-12 mt-1 rounded-xl bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-[var(--primary-text)] font-bold text-[13px] sm:text-[14px] shadow-sm transition-all cursor-pointer active:scale-[0.99]"
        >
          Complete Sale
        </button>
      </div>
    </div>
  );
}
