import React from "react";
import TopSellingProducts, { ProductItem } from "@/components/ui/TopSellingProducts";
import SalesReportCard, { SalesReportItem } from "@/components/ui/SalesReportCard";
import { Headphones, Watch, Shirt, Zap, Briefcase } from "lucide-react";

const analyticsTopProducts: ProductItem[] = [
  {
    id: "1",
    name: "Wireless Headphone",
    units: 620,
    revenue: "৳62,400",
    icon: Headphones,
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    units: 580,
    revenue: "৳58,200",
    icon: Watch,
  },
  {
    id: "3",
    name: "Cotton Polo T-shirt",
    units: 540,
    revenue: "৳48,600",
    icon: Shirt,
  },
  {
    id: "4",
    name: "USB-C Fast Charger",
    units: 480,
    revenue: "৳38,400",
    icon: Zap,
  },
  {
    id: "5",
    name: "Backpack (Anti Theft)",
    units: 420,
    revenue: "৳33,600",
    icon: Briefcase,
  },
];

const salesReportData: SalesReportItem[] = [
  {
    id: "1",
    period: "W1 (Oct 6 – Oct 12)",
    orders: 48,
    customers: 45,
    revenue: "৳8,240",
    refunds: 2,
    netSales: "৳8,060",
  },
  {
    id: "2",
    period: "W2 (Oct 13 – Oct 19)",
    orders: 52,
    customers: 49,
    revenue: "৳8,920",
    refunds: 1,
    netSales: "৳8,870",
  },
  {
    id: "3",
    period: "W3 (Oct 20 – Oct 26)",
    orders: 67,
    customers: 63,
    revenue: "৳11,760",
    refunds: 3,
    netSales: "৳11,460",
  },
  {
    id: "4",
    period: "W4 (Oct 27 – Nov 2)",
    orders: 73,
    customers: 70,
    revenue: "৳12,840",
    refunds: 2,
    netSales: "৳12,560",
  },
  {
    id: "5",
    period: "W5 (Nov 3 – Nov 9)",
    orders: 71,
    customers: 68,
    revenue: "৳12,230",
    refunds: 1,
    netSales: "৳12,110",
  },
];

export default function AnalyticsProductsAndReportSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
      <div className="lg:col-span-6 flex flex-col">
        <TopSellingProducts
          title="Best Selling Products"
          products={analyticsTopProducts}
          viewAllHref="/products"
        />
      </div>
      <div className="lg:col-span-6 flex flex-col">
        <SalesReportCard data={salesReportData} />
      </div>
    </div>
  );
}
