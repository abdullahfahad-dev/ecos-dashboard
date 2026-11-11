export interface ProductData {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  image: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  sales: string;
}

export const mockProducts: ProductData[] = [
  {
    id: "1",
    name: "Wireless Noise Canceling Headphones",
    sku: "WNH-001",
    category: "Electronics",
    price: "৳4,800",
    stock: 142,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&auto=format&fit=crop&q=80",
    status: "In Stock",
    sales: "৳68,400",
  },
  {
    id: "2",
    name: "Smart Fitness Watch Pro Edition",
    sku: "SWP-002",
    category: "Electronics",
    price: "৳3,600",
    stock: 84,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&auto=format&fit=crop&q=80",
    status: "In Stock",
    sales: "৳58,200",
  },
  {
    id: "3",
    name: "Premium Cotton Polo T-Shirt",
    sku: "CPT-003",
    category: "Fashion & Apparel",
    price: "৳1,250",
    stock: 215,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=120&auto=format&fit=crop&q=80",
    status: "In Stock",
    sales: "৳42,500",
  },
  {
    id: "4",
    name: "65W USB-C GaN Fast Charger",
    sku: "FCG-004",
    category: "Electronics",
    price: "৳1,850",
    stock: 18,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=120&auto=format&fit=crop&q=80",
    status: "Low Stock",
    sales: "৳33,300",
  },
  {
    id: "5",
    name: "Waterproof Travel Backpack 30L",
    sku: "WTB-005",
    category: "Bags & Luggage",
    price: "৳2,950",
    stock: 0,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&auto=format&fit=crop&q=80",
    status: "Out of Stock",
    sales: "৳26,550",
  },
  {
    id: "6",
    name: "Ceramic Coffee Mug & Warmer Set",
    sku: "CMW-006",
    category: "Home & Living",
    price: "৳1,450",
    stock: 67,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=120&auto=format&fit=crop&q=80",
    status: "In Stock",
    sales: "৳18,850",
  },
  {
    id: "7",
    name: "Hydrating Facial Cleanser 200ml",
    sku: "HFC-007",
    category: "Beauty & Personal",
    price: "৳950",
    stock: 12,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=120&auto=format&fit=crop&q=80",
    status: "Low Stock",
    sales: "৳16,150",
  },
  {
    id: "8",
    name: "Stainless Steel Thermal Water Bottle",
    sku: "TWB-008",
    category: "Sports & Outdoors",
    price: "৳850",
    stock: 130,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=120&auto=format&fit=crop&q=80",
    status: "In Stock",
    sales: "৳15,300",
  },
];

