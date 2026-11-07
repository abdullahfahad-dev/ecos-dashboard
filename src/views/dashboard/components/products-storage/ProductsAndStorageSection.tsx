import React from "react";
import TopSellingProducts, { ProductItem } from "@/components/ui/TopSellingProducts";
import ShopStorageSummary from "./ShopStorageSummary";
import { Headphones, Watch, Shirt, Zap, Briefcase } from "lucide-react";

const topSellingProductsData: ProductItem[] = [
  {
    id: "1",
    name: "Wireless Headphone",
    units: 312,
    revenue: "৳62,400",
    icon: Headphones,
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    units: 198,
    revenue: "৳49,500",
    icon: Watch,
  },
  {
    id: "3",
    name: "Cotton Polo T-shirt",
    units: 176,
    revenue: "৳31,680",
    icon: Shirt,
  },
  {
    id: "4",
    name: "USB-C Fast Charger",
    units: 142,
    revenue: "৳12,780",
    icon: Zap,
  },
  {
    id: "5",
    name: "Backpack (Anti Theft)",
    units: 118,
    revenue: "৳11,800",
    icon: Briefcase,
  },
];

export default function ProductsAndStorageSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
      <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
        <TopSellingProducts products={topSellingProductsData} />
      </div>
      <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
        <ShopStorageSummary />
      </div>
    </div>
  );
}
