"use client";

import React, { memo, useMemo } from "react";
import ThemeIconBox from "@/components/ui/ThemeIconBox";
import { Package } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface OrderStatus {
  label: string;
  count: number;
  color: string;
}

interface OrdersStatusDonutProps {
  data?: OrderStatus[];
}

const defaultStatusData: OrderStatus[] = [
  { label: "Pending", count: 124, color: "#F59E0B" },
  { label: "Processing", count: 218, color: "#0284C7" },
  { label: "Shipped", count: 652, color: "#10B981" },
  { label: "Delivered", count: 268, color: "#8B5CF6" },
  { label: "Cancelled", count: 20, color: "#F43F5E" },
];

function OrdersStatusDonutComponent({
  data = defaultStatusData,
}: OrdersStatusDonutProps) {
  const chartData = data ?? defaultStatusData;

  const totalCount = useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.count, 0),
    [chartData]
  );

  const formattedList = useMemo(() => {
    return chartData.map((item) => ({
      ...item,
      percentage: totalCount > 0 ? `${((item.count / totalCount) * 100).toFixed(1)}%` : "0.0%",
    }));
  }, [chartData, totalCount]);

  return (
    <div className="flex flex-col justify-between p-4 sm:p-5 border border-[var(--right-border)] rounded-2xl shadow-xs w-full h-full min-h-[300px]">
      <div className="flex items-center gap-3 pb-2">
        <ThemeIconBox icon={Package} size="md" />
        <h3 className="text-[16px] font-bold text-[var(--right-text-main)] leading-tight">
          Orders by Status
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-4 flex-1 py-1">
        <div className="relative w-[150px] h-[150px] shrink-0 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={46}
                outerRadius={68}
                paddingAngle={3}
                stroke="none"
                isAnimationActive={true}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {chartData.map((item) => (
                  <Cell
                    key={item.label}
                    fill={item.color}
                    className="cursor-pointer transition-all duration-200 hover:opacity-85 outline-none"
                    tabIndex={-1}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[20px] font-extrabold tracking-tight text-[var(--right-text-main)] leading-none">
              {totalCount.toLocaleString()}
            </span>
            <span className="text-[10px] font-medium text-[var(--right-text-subtle)] mt-1">
              Orders
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 w-full sm:w-auto flex-1 max-w-[210px]">
          {formattedList.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-[12px] leading-tight"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-[var(--right-text-muted)]">
                  {item.label}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[var(--right-text-main)]">
                  {item.count.toLocaleString()}
                </span>
                <span className="text-[11px] font-normal text-[var(--right-text-subtle)] min-w-[36px] text-right">
                  ({item.percentage})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(OrdersStatusDonutComponent);
