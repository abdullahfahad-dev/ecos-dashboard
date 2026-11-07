import React from "react";
import SalesRevenueChart, { RevenueDataPoint } from "@/components/ui/SalesRevenueChart";
import OrdersStatusDonut, { OrderStatus } from "@/components/ui/OrdersStatusDonut";

const salesRevenueData: RevenueDataPoint[] = [
  { date: "Oct 4", amount: 20000 },
  { date: "Oct 7", amount: 70000 },
  { date: "Oct 10", amount: 120000 },
  { date: "Oct 13", amount: 110000 },
  { date: "Oct 16", amount: 160000 },
  { date: "Oct 19", amount: 130000 },
  { date: "Oct 22", amount: 276400 },
  { date: "Oct 25", amount: 175000 },
  { date: "Oct 28", amount: 190000 },
  { date: "Oct 31", amount: 220000 },
  { date: "Nov 3", amount: 250000 },
];

const ordersStatusData: OrderStatus[] = [
  { label: "Pending", count: 124, color: "#F59E0B" },
  { label: "Processing", count: 218, color: "#0284C7" },
  { label: "Shipped", count: 652, color: "#10B981" },
  { label: "Delivered", count: 268, color: "#8B5CF6" },
  { label: "Cancelled", count: 20, color: "#F43F5E" },
];

export default function AnalyticsChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
      <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
        <SalesRevenueChart data={salesRevenueData} />
      </div>
      <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
        <OrdersStatusDonut data={ordersStatusData} />
      </div>
    </div>
  );
}
