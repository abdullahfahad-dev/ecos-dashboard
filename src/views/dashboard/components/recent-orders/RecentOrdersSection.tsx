import React from "react";
import Link from "next/link";
import ThemeIconBox from "@/components/ui/ThemeIconBox";
import { ShoppingBag, ArrowRight, MoreHorizontal } from "lucide-react";

interface OrderItem {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    avatar: string;
  };
  amount: string;
  payment: {
    label: string;
    type: "paid" | "cod";
  };
  status: {
    label: string;
    type: "processing" | "shipped" | "pending" | "delivered";
  };
  date: string;
}

const recentOrdersData: OrderItem[] = [
  {
    id: "1",
    orderNumber: "#FS-10284",
    customer: {
      name: "Abdullah Al Mamun",
      avatar: "A",
    },
    amount: "৳2,490",
    payment: {
      label: "Paid",
      type: "paid",
    },
    status: {
      label: "Processing",
      type: "processing",
    },
    date: "Nov 3, 02:14 PM",
  },
  {
    id: "2",
    orderNumber: "#FS-10283",
    customer: {
      name: "Nusrat Jahan",
      avatar: "N",
    },
    amount: "৳3,200",
    payment: {
      label: "Paid",
      type: "paid",
    },
    status: {
      label: "Shipped",
      type: "shipped",
    },
    date: "Nov 3, 01:22 PM",
  },
  {
    id: "3",
    orderNumber: "#FS-10282",
    customer: {
      name: "Sakib Hasan",
      avatar: "S",
    },
    amount: "৳1,580",
    payment: {
      label: "COD",
      type: "cod",
    },
    status: {
      label: "Pending",
      type: "pending",
    },
    date: "Nov 3, 12:06 PM",
  },
  {
    id: "4",
    orderNumber: "#FS-10281",
    customer: {
      name: "Tanjim Rahman",
      avatar: "T",
    },
    amount: "৳5,990",
    payment: {
      label: "Paid",
      type: "paid",
    },
    status: {
      label: "Delivered",
      type: "delivered",
    },
    date: "Nov 2, 10:48 PM",
  },
  {
    id: "5",
    orderNumber: "#FS-10280",
    customer: {
      name: "Mim Akter",
      avatar: "M",
    },
    amount: "৳2,200",
    payment: {
      label: "Paid",
      type: "paid",
    },
    status: {
      label: "Delivered",
      type: "delivered",
    },
    date: "Nov 2, 08:31 PM",
  },
];

const statusStyles = {
  processing: {
    bg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    dot: "bg-sky-500",
  },
  shipped: {
    bg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    dot: "bg-purple-500",
  },
  pending: {
    bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    dot: "bg-amber-500",
  },
  delivered: {
    bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-500",
  },
};

const paymentStyles = {
  paid: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  cod: "bg-slate-500/10 text-[var(--right-text-muted)] border-[var(--right-border)]",
};

export default function RecentOrdersSection() {
  return (
    <div className="flex flex-col p-4 sm:p-5 bg-[var(--right-bg)] border border-[var(--right-border)] rounded-2xl shadow-xs w-full">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2.5">
          <ThemeIconBox icon={ShoppingBag} size="md" />
          <h3 className="text-[16px] sm:text-[18px] font-bold text-[var(--right-text-main)] leading-tight tracking-[-0.45px]">
            Recent Orders
          </h3>
        </div>

        <Link
          href="/orders"
          className="flex items-center gap-1.5 text-[12px] font-semibold text-[var(--primary-color)] hover:opacity-85 transition-opacity cursor-pointer shrink-0"
        >
          <span>View All Orders</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="w-full overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[760px] text-left border-collapse">
          <thead>
            <tr className="text-[12px] font-bold text-[var(--right-text-muted)]">
              <th className="py-2.5 px-4 rounded-l-xl font-bold bg-[var(--right-surface)]">Order ID</th>
              <th className="py-2.5 px-4 font-bold bg-[var(--right-surface)]">Customer</th>
              <th className="py-2.5 px-4 font-bold bg-[var(--right-surface)]">Amount</th>
              <th className="py-2.5 px-4 font-bold bg-[var(--right-surface)]">Payment</th>
              <th className="py-2.5 px-4 font-bold bg-[var(--right-surface)]">Status</th>
              <th className="py-2.5 px-4 font-bold bg-[var(--right-surface)]">Date</th>
              <th className="py-2.5 px-4 rounded-r-xl font-bold w-12 text-center bg-[var(--right-surface)]" aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--right-border)] text-[12px]">
            {recentOrdersData.map((order) => {
              const currentStatus = statusStyles[order.status.type];
              const currentPayment = paymentStyles[order.payment.type];

              return (
                <tr
                  key={order.id}
                  className="hover:bg-[var(--right-surface)] transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 font-bold text-[var(--right-text-main)] whitespace-nowrap">
                    {order.orderNumber}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--primary-color)] text-white text-[12px] font-semibold shrink-0">
                        {order.customer.avatar}
                      </div>
                      <span className="font-medium text-[var(--right-text-main)] truncate max-w-[170px]">
                        {order.customer.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-[var(--right-text-main)] whitespace-nowrap">
                    {order.amount}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${currentPayment}`}
                    >
                      {order.payment.label}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${currentStatus.bg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot}`} />
                      {order.status.label}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[var(--right-text-muted)] whitespace-nowrap">
                    {order.date}
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <button
                      className="p-1 text-[var(--right-text-subtle)] hover:text-[var(--right-text-main)] rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                      aria-label="Order actions"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

