export interface EventData {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  discount: string;
  productsCount: number;
  status: "Active" | "Upcoming" | "Expired";
  hasPopup: boolean;
}

export const mockEvents: EventData[] = [
  {
    id: "1",
    name: "Winter Mega Clearance",
    subtitle: "Seasonal Sitewide Sale",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=120&auto=format&fit=crop&q=80",
    discount: "Up to 50%",
    productsCount: 148,
    status: "Active",
    hasPopup: true,
  },
  {
    id: "2",
    name: "Tech & Gadget Flash Deal",
    subtitle: "Weekend Special Deal",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=120&auto=format&fit=crop&q=80",
    discount: "Flat 25%",
    productsCount: 64,
    status: "Active",
    hasPopup: true,
  },
  {
    id: "3",
    name: "Spring Fashion Carnival",
    subtitle: "New Arrival Promotion",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=120&auto=format&fit=crop&q=80",
    discount: "30% OFF",
    productsCount: 112,
    status: "Upcoming",
    hasPopup: false,
  },
  {
    id: "4",
    name: "Home Essentials Expo",
    subtitle: "Living & Kitchen Special",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=120&auto=format&fit=crop&q=80",
    discount: "Up to 40%",
    productsCount: 88,
    status: "Active",
    hasPopup: true,
  },
  {
    id: "5",
    name: "Black Friday Early Access",
    subtitle: "Exclusive VIP Deals",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80",
    discount: "Up to 70%",
    productsCount: 230,
    status: "Upcoming",
    hasPopup: true,
  },
  {
    id: "6",
    name: "Autumn Wardrobe Festival",
    subtitle: "Last Season Stock",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=120&auto=format&fit=crop&q=80",
    discount: "Flat 15%",
    productsCount: 42,
    status: "Expired",
    hasPopup: false,
  },
  {
    id: "7",
    name: "Fitness Gear Promo Week",
    subtitle: "Sports & Nutrition Sale",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=120&auto=format&fit=crop&q=80",
    discount: "20% OFF",
    productsCount: 56,
    status: "Active",
    hasPopup: false,
  },
  {
    id: "8",
    name: "Back to Campus Specials",
    subtitle: "Study, Laptop & Books",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=120&auto=format&fit=crop&q=80",
    discount: "Up to 35%",
    productsCount: 95,
    status: "Expired",
    hasPopup: false,
  },
];

