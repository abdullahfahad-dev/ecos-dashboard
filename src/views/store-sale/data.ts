import { PosProductItem } from "./types";

export const initialPosProducts: PosProductItem[] = [
  {
    id: "1",
    name: "Demo Product 3",
    price: 250,
    stock: 24,
    brand: "sonar bangla",
    sku: "DP-003",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    name: "Demo Product 2",
    price: 150,
    stock: 49,
    brand: "Illana Gardner",
    sku: "DP-002",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    name: "Demo Product",
    price: 99.99,
    stock: 1510,
    brand: "Charlotte Powers",
    sku: "DP-001",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    name: "Demo Product 4",
    price: 450,
    stock: 12,
    brand: "Lynn Dorsey",
    sku: "DP-004",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "5",
    name: "Demo Product 5",
    price: 680,
    stock: 35,
    brand: "Erlich Bridges",
    sku: "DP-005",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=120&auto=format&fit=crop&q=80",
  },
];

export const filterBrands = [
  "All",
  "Illana Gardner",
  "sonar bangla",
  "Charlotte Powers",
  "Lynn Dorsey",
  "Erlich Bridges",
];
