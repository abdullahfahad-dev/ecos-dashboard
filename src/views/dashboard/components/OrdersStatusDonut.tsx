"use client";

import React, { useMemo } from "react";
import { Package } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

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

function DonutTooltip({
  active,
  payload,
  total,
}: {
  active?: boolean;
  payload?: Array<{ payload?: OrderStatus }>;
  total: number;
}) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    if (!item) return null;

    const percentage = total > 0 ? ((item.count / total) * 100).toFixed(1) : "0.0";

    return (
      <div className="z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center px-3 py-1.5 bg-[var(--right-bg)] border border-[var(--right-border)] rounded-xl shadow-xl backdrop-blur-xs">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[11px] font-semibold text-[var(--right-text-subtle)]">
              {item.label}
            </span>
          </div>
          <span className="text-[13px] font-extrabold text-[var(--right-text-main)] leading-tight">
            {item.count.toLocaleString()} ({percentage}%)
          </span>
        </div>
      </div>
    );
  }
  return null;
}

export default function OrdersStatusDonut({
  data = defaultStatusData,
}: OrdersStatusDonutProps) {
  const totalCount = useMemo(
    () => data.reduce((acc, curr) => acc + curr.count, 0),
    [data]
  );

  const formattedList = useMemo(() => {
    return data.map((item) => ({
      ...item,
      percentage: totalCount > 0 ? `${((item.count / totalCount) * 100).toFixed(1)}%` : "0.0%",
    }));
  }, [data, totalCount]);

  return (
    <div className="flex flex-col justify-between p-4 sm:p-5 bg-[var(--right-bg)] border border-[var(--right-border)] rounded-2xl shadow-xs w-full h-full min-h-[300px]">
      <div className="flex items-center gap-3 pb-2">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-xl text-[var(--primary-color)] shrink-0"
          style={{
            backgroundColor: "color-mix(in srgb, var(--primary-color) 30%, transparent)",
          }}
        >
          <Package className="w-5 h-5" />
        </div>
        <h3 className="text-[16px] font-bold text-[var(--right-text-main)] leading-tight">
          Orders by Status
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-4 flex-1 py-1">
        <div className="relative w-[150px] h-[150px] shrink-0 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={<DonutTooltip total={totalCount} />}
                allowEscapeViewBox={{ x: true, y: true }}
                wrapperStyle={{ zIndex: 40, outline: "none" }}
              />
              <Pie
                data={data}
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
                {data.map((item) => (
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
