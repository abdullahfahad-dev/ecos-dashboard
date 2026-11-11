import React from "react";

export interface PosProductItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  brand: string;
  sku: string;
  image?: string;
  icon?: React.ElementType;
}

export interface PosCartItem {
  product: PosProductItem;
  quantity: number;
}

export interface SaleReceiptData {
  orderNumber: string;
  date: string;
  time: string;
  channel: string;
  paymentMethod: string;
  customerName?: string;
  customerPhone?: string;
  storeName?: string;
  storePhone?: string;
  items: PosCartItem[];
  total: number;
}
