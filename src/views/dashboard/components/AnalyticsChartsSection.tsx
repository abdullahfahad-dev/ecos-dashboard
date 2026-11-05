import React from "react";
import SalesRevenueChart from "./SalesRevenueChart";
import OrdersStatusDonut from "./OrdersStatusDonut";

export default function AnalyticsChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
      <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
        <SalesRevenueChart />
      </div>
      <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
        <OrdersStatusDonut />
      </div>
    </div>
  );
}

