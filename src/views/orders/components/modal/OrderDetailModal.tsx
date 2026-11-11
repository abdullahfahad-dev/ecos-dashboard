"use client";

import React, { memo } from "react";
import { X, User, Package, CreditCard } from "lucide-react";
import { OrderData } from "../../data";

interface OrderDetailModalProps {
  order: OrderData | null;
  onClose: () => void;
}

function OrderDetailModalComponent({ order, onClose }: OrderDetailModalProps) {
  if (!order) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[var(--right-bg)] border border-[var(--right-border)] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-[var(--right-border)] bg-[var(--right-surface)]/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--primary-color)] text-[var(--primary-text)] font-bold shadow-xs">
              ORD
            </div>
            <div className="flex flex-col">
              <h3 className="text-[17px] font-bold text-[var(--right-text-main)] leading-tight">
                {order.orderNumber}
              </h3>
              <span className="text-[12px] text-[var(--right-text-muted)] mt-0.5">
                Placed on {order.date} at {order.time}
              </span>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="p-1.5 rounded-xl text-[var(--right-text-muted)] hover:text-[var(--right-text-main)] hover:bg-[var(--right-surface)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-[13px]">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--right-surface)] border border-[var(--right-border)]">
            <span className="text-[var(--right-text-muted)] font-medium">Order Status</span>
            {getStatusBadge(order.status)}
          </div>

          <div className="space-y-2 p-3.5 rounded-xl bg-[var(--right-surface)] border border-[var(--right-border)]">
            <div className="flex items-center gap-2 text-[var(--right-text-main)] font-semibold">
              <User className="w-4 h-4 text-[var(--primary-color)]" />
              <span>Customer Information</span>
            </div>
            <div className="flex flex-col gap-0.5 pl-6 text-[12px]">
              <span className="font-medium text-[var(--right-text-main)]">
                {order.customer.name}
              </span>
              <span className="text-[var(--right-text-muted)]">
                {order.customer.email}
              </span>
            </div>
          </div>

          <div className="space-y-2 p-3.5 rounded-xl bg-[var(--right-surface)] border border-[var(--right-border)]">
            <div className="flex items-center gap-2 text-[var(--right-text-main)] font-semibold">
              <Package className="w-4 h-4 text-[var(--primary-color)]" />
              <span>Order Summary</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pl-6 text-[12px] pt-1">
              <div>
                <span className="text-[var(--right-text-muted)] block">Channel:</span>
                <span className="font-medium text-[var(--right-text-main)]">
                  {order.channel}
                </span>
              </div>
              <div>
                <span className="text-[var(--right-text-muted)] block">Total Items:</span>
                <span className="font-medium text-[var(--right-text-main)]">
                  {order.items} items
                </span>
              </div>
              <div>
                <span className="text-[var(--right-text-muted)] block">Payment Method:</span>
                <span className="font-medium text-[var(--right-text-main)] flex items-center gap-1">
                  <CreditCard className="w-3 h-3 text-[var(--right-text-muted)]" />
                  {order.paymentMethod}
                </span>
              </div>
              <div>
                <span className="text-[var(--right-text-muted)] block">Total Amount:</span>
                <span className="font-extrabold text-[var(--primary-color)] text-[14px]">
                  {order.total}
                </span>
              </div>
            </div>
          </div>

          {order.shippingAddress && (
            <div className="p-3.5 rounded-xl bg-[var(--right-surface)] border border-[var(--right-border)] text-[12px]">
              <span className="text-[var(--right-text-muted)] font-medium block mb-1">
                Delivery Address:
              </span>
              <span className="text-[var(--right-text-main)] font-medium">
                {order.shippingAddress}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end p-4 border-t border-[var(--right-border)] bg-[var(--right-surface)]/30">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-[12px] font-semibold rounded-xl bg-[var(--right-surface)] hover:bg-black/5 dark:hover:bg-white/5 border border-[var(--right-border)] text-[var(--right-text-main)] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(OrderDetailModalComponent);

