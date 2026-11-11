export interface OrderData {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  customer: {
    name: string;
    email: string;
  };
  items: number;
  total: string;
  channel: "Online Store" | "POS" | "Dropship";
  status: "Pending" | "Processing" | "Fulfilled" | "Cancelled";
  paymentMethod?: string;
  shippingAddress?: string;
}

export const mockOrders: OrderData[] = [
  {
    id: "1",
    orderNumber: "ORD-9421",
    date: "07 Nov, 2026",
    time: "02:45 PM",
    customer: {
      name: "Tariqul Islam",
      email: "tariqul@example.com",
    },
    items: 3,
    total: "৳12,450",
    channel: "Online Store",
    status: "Fulfilled",
    paymentMethod: "bKash Online",
    shippingAddress: "House 24, Road 7, Dhanmondi, Dhaka",
  },
  {
    id: "2",
    orderNumber: "ORD-9420",
    date: "07 Nov, 2026",
    time: "01:15 PM",
    customer: {
      name: "Mahmud Hasan",
      email: "mahmud.h@example.com",
    },
    items: 1,
    total: "৳4,800",
    channel: "POS",
    status: "Fulfilled",
    paymentMethod: "Cash on Counter",
    shippingAddress: "Store Outlet 1 (Bashundhara)",
  },
  {
    id: "3",
    orderNumber: "ORD-9419",
    date: "06 Nov, 2026",
    time: "09:30 PM",
    customer: {
      name: "Ayesha Rahman",
      email: "ayesha.r@example.com",
    },
    items: 4,
    total: "৳18,200",
    channel: "Online Store",
    status: "Processing",
    paymentMethod: "Nagad Gateway",
    shippingAddress: "Flat 4B, Sector 3, Uttara, Dhaka",
  },
  {
    id: "4",
    orderNumber: "ORD-9418",
    date: "06 Nov, 2026",
    time: "06:10 PM",
    customer: {
      name: "Rafiq Ahmed",
      email: "rafiq.ahmed@example.com",
    },
    items: 2,
    total: "৳7,350",
    channel: "Dropship",
    status: "Pending",
    paymentMethod: "Credit Card (Visa)",
    shippingAddress: "Station Road, Chawkbazar, Chattogram",
  },
  {
    id: "5",
    orderNumber: "ORD-9417",
    date: "06 Nov, 2026",
    time: "03:50 PM",
    customer: {
      name: "Nusrat Jahan",
      email: "nusrat.j@example.com",
    },
    items: 1,
    total: "৳2,450",
    channel: "Online Store",
    status: "Cancelled",
    paymentMethod: "bKash Online",
    shippingAddress: "Mirpur 10, Block C, Dhaka",
  },
  {
    id: "6",
    orderNumber: "ORD-9416",
    date: "05 Nov, 2026",
    time: "11:20 AM",
    customer: {
      name: "Shahidul Alam",
      email: "shahid.alam@example.com",
    },
    items: 5,
    total: "৳32,100",
    channel: "POS",
    status: "Fulfilled",
    paymentMethod: "Mastercard",
    shippingAddress: "Store Outlet 2 (Gulshan)",
  },
  {
    id: "7",
    orderNumber: "ORD-9415",
    date: "05 Nov, 2026",
    time: "08:15 AM",
    customer: {
      name: "Farhana Akter",
      email: "farhana.akter@example.com",
    },
    items: 2,
    total: "৳6,900",
    channel: "Dropship",
    status: "Processing",
    paymentMethod: "Nagad Gateway",
    shippingAddress: "Upashahar, Block B, Sylhet",
  },
  {
    id: "8",
    orderNumber: "ORD-9414",
    date: "04 Nov, 2026",
    time: "05:40 PM",
    customer: {
      name: "Kamrul Islam",
      email: "kamrul.i@example.com",
    },
    items: 3,
    total: "৳14,500",
    channel: "Online Store",
    status: "Fulfilled",
    paymentMethod: "bKash Online",
    shippingAddress: "Zindabazar, Main Road, Sylhet",
  },
];

