import React from "react";
import TopSellingProducts from "./TopSellingProducts";
import ShopStorageSummary from "./ShopStorageSummary";

export default function ProductsAndStorageSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
      <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
        <TopSellingProducts />
      </div>
      <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
        <ShopStorageSummary />
      </div>
    </div>
  );
}

