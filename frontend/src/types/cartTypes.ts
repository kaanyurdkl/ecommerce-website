import type { Product } from "@/types/productTypes";

interface Cart {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface ShippingAddress {
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export type { Cart, CartItem, ShippingAddress };
