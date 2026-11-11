"use client";

import React, { memo, useState } from "react";
import { CheckCircle2, X, Printer, Loader2 } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import PosThermalPdfDocument from "./PosThermalPdfDocument";
import { SaleReceiptData } from "../../types";

interface SaleCompleteModalProps {
  receipt: SaleReceiptData;
  onClose: () => void;
  onNewSale: () => void;
}

function formatPrice(val: number): string {
  return val.toLocaleString("en-US", {
    minimumFractionDigits: val % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

function SaleCompleteModalComponent({
  receipt,
  onClose,
  onNewSale,
}: SaleCompleteModalProps) {
  const [isPrinting, setIsPrinting] = useState(false);

  const totalQuantity = receipt.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handlePrint = async () => {
    try {
      setIsPrinting(true);
      const blob = await pdf(<PosThermalPdfDocument receipt={receipt} />).toBlob();
      const url = URL.createObjectURL(blob);
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.left = "-9999px";
      iframe.style.top = "-9999px";
      iframe.style.width = "0px";
      iframe.style.height = "0px";
      iframe.style.border = "0";
      iframe.src = url;
      document.body.appendChild(iframe);
      iframe.onload = () => {
        setTimeout(() => {
          try {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
          } catch {
            window.open(url, "_blank")?.print();
          }
        }, 150);
      };
    } catch {
      window.print();
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-[400px] bg-[var(--right-surface)] border border-[var(--right-border)] rounded-2xl shadow-2xl p-5 flex flex-col text-[var(--right-text-main)] animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 stroke-[2.5]" />
            <h3 className="text-[17px] font-bold text-[var(--right-text-main)] tracking-tight">
              Sale complete
            </h3>
          </div>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--right-text-muted)] hover:text-[var(--right-text-main)] hover:bg-[var(--right-bg)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          id="pos-thermal-receipt"
          className="w-full bg-white text-slate-900 rounded-lg p-5 font-mono text-[12px] shadow-inner select-none border border-slate-200"
        >
          <div className="text-center pb-2">
            <h2 className="text-[17px] font-black tracking-wider uppercase">
              {receipt.storeName || "SONAR BANGLA"}
            </h2>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Tel: {receipt.storePhone || "01907641877"}
            </p>
          </div>

          <div className="border-t border-dashed border-slate-300 my-2.5" />

          <div className="space-y-1 text-[11px] text-slate-700 py-1">
            <div className="flex justify-between">
              <span>Date</span>
              <span className="font-semibold text-slate-900">{receipt.date}</span>
            </div>
            <div className="flex justify-between">
              <span>Time</span>
              <span className="font-semibold text-slate-900">{receipt.time}</span>
            </div>
            <div className="flex justify-between">
              <span>Order</span>
              <span className="font-semibold text-slate-900">{receipt.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Channel</span>
              <span className="font-semibold text-slate-900">{receipt.channel}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment</span>
              <span className="font-semibold text-slate-900">{receipt.paymentMethod}</span>
            </div>
            {receipt.customerName ? (
              <div className="flex justify-between">
                <span>Customer</span>
                <span className="font-semibold text-slate-900">{receipt.customerName}</span>
              </div>
            ) : null}
            {receipt.customerPhone ? (
              <div className="flex justify-between">
                <span>Phone</span>
                <span className="font-semibold text-slate-900">{receipt.customerPhone}</span>
              </div>
            ) : null}
          </div>

          <div className="border-t border-dashed border-slate-300 my-2.5" />

          <div className="grid grid-cols-12 text-[10px] font-bold uppercase text-slate-500 pb-1">
            <span className="col-span-7">ITEM</span>
            <span className="col-span-2 text-center">QTY</span>
            <span className="col-span-3 text-right">AMOUNT</span>
          </div>

          <div className="space-y-2 py-1">
            {receipt.items.map((item) => (
              <div key={item.product.id} className="grid grid-cols-12 text-[11px] items-start">
                <div className="col-span-7 flex flex-col min-w-0 pr-1">
                  <span className="font-bold text-slate-900 truncate">
                    {item.product.name}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {formatPrice(item.product.price)}৳ each
                  </span>
                </div>
                <span className="col-span-2 text-center font-bold text-slate-800">
                  {item.quantity}
                </span>
                <span className="col-span-3 text-right font-bold text-slate-900">
                  {formatPrice(item.product.price * item.quantity)}৳
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-slate-300 my-2.5" />

          <div className="space-y-1.5 pt-1 text-[11px]">
            <div className="flex justify-between text-slate-600">
              <span>Items ({totalQuantity})</span>
              <span className="font-semibold text-slate-900">
                {formatPrice(receipt.total)}৳
              </span>
            </div>

            <div className="flex justify-between text-[13px] font-black text-slate-950 pt-1">
              <span>TOTAL</span>
              <span>{formatPrice(receipt.total)}৳</span>
            </div>
          </div>

          <div className="border-t border-dashed border-slate-300 my-3" />

          <p className="text-center text-[11px] font-semibold text-slate-700">
            Thank you for shopping
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4">
          <button
            type="button"
            disabled={isPrinting}
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 h-11 rounded-xl bg-[var(--right-bg)] hover:bg-[var(--right-surface)] border border-[var(--right-border)] text-[var(--right-text-main)] text-[13px] font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.98] disabled:opacity-60"
          >
            {isPrinting ? (
              <Loader2 className="w-4 h-4 animate-spin text-[var(--right-text-main)]" />
            ) : (
              <Printer className="w-4 h-4 text-[var(--right-text-main)]" />
            )}
            <span>{isPrinting ? "Printing..." : "Print"}</span>
          </button>

          <button
            type="button"
            onClick={onNewSale}
            className="flex items-center justify-center h-11 rounded-xl bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-[var(--primary-text)] text-[13px] font-bold transition-all cursor-pointer shadow-md active:scale-[0.98]"
          >
            New Sale
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(SaleCompleteModalComponent);
