import React, { memo } from "react";
import MetricCard, { MetricCardProps } from "./MetricCard";

export interface MetricsGridProps {
  metrics: MetricCardProps[];
  className?: string;
}

function MetricsGridComponent({ metrics, className = "" }: MetricsGridProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full ${className}`}
    >
      {metrics.map((item) => (
        <MetricCard
          key={item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
          change={item.change}
          comparison={item.comparison}
        />
      ))}
    </div>
  );
}

export default memo(MetricsGridComponent);

