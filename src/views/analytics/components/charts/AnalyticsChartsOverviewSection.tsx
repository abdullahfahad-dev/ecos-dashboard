import React from "react";
import SalesRevenueChart, { RevenueDataPoint } from "@/components/ui/SalesRevenueChart";
import OrdersStatusDonut, { CategoryStatusItem } from "@/components/ui/OrdersStatusDonut";

const revenueTrendData: RevenueDataPoint[] = [
  { date: "W1", amount: 50000, orders: 320 },
  { date: "W3", amount: 60000, orders: 410 },
  { date: "W5", amount: 80000, orders: 530 },
  { date: "W7", amount: 68000, orders: 460 },
  { date: "W9", amount: 98000, orders: 670 },
  { date: "W11", amount: 75000, orders: 510 },
  { date: "W13", amount: 96000, orders: 690 },
  { date: "W17", amount: 178540, orders: 1124 },
  { date: "W19", amount: 100000, orders: 740 },
  { date: "W21", amount: 115000, orders: 820 },
  { date: "W26", amount: 145000, orders: 980 },
];

const bestSellingCategoriesData: CategoryStatusItem[] = [
  { label: "Electronics", percentage: "32.5%", color: "#3B82F6" },
  { label: "Fashion", percentage: "28.7%", color: "#F59E0B" },
  { label: "Home & Living", percentage: "18.4%", color: "#10B981" },
  { label: "Health & Beauty", percentage: "12.6%", color: "#F43F5E" },
  { label: "Others", percentage: "7.8%", color: "#8B5CF6" },
];

export default function AnalyticsChartsOverviewSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
      <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
        <SalesRevenueChart
          title="Revenue Trend"
          subtitle="Weekly sales performance overview"
          data={revenueTrendData}
          periodLabel="Last 26 Weeks"
          showLegend={true}
        />
      </div>
      <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
        <OrdersStatusDonut
          title="Best Selling Categories"
          data={bestSellingCategoriesData}
          centerValue="248K"
          centerLabel="Total Sales"
          periodLabel="Last 30 Days"
        />
      </div>
    </div>
  );
}

