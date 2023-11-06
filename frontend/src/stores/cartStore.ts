import { defineStore } from "pinia";

import type { Cart, CartItem, ShippingAddress } from "@/types/cartTypes";
import { updateCart } from "../utils/cartUtils";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      ...((localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : {
            cartItems: [] as CartItem[],
            shippingAddress: null as ShippingAddress | null,
            paymentMethod: "PayPal",
          }) as Cart),
    };
  },
  getters: {
    numberOfItems(state): number {
      return state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    },
  },
  actions: {
    addItem(newItem: CartItem): void {
      const existItem = this.cartItems.find((item) => item._id === newItem._id);

      if (existItem) {
        const quantity = existItem.quantity;
        existItem.quantity = quantity < 10 ? quantity + 1 : quantity;
      } else {
        this.cartItems.push(newItem);
      }

      updateCart(this);
    },
    updateItem(updateItem: CartItem): void {
      const existItem = this.cartItems.find(
        (item) => item._id === updateItem._id
      );

      if (existItem) existItem.quantity = updateItem.quantity;

      updateCart(this);
    },
    removeItem(removeItem: CartItem): void {
      this.cartItems = this.cartItems.filter(
        (item) => item._id !== removeItem._id
      );

      updateCart(this);
    },
    clearItems(): void {
      this.cartItems = [];

      updateCart(this);
    },
    saveShippingAddress(address: ShippingAddress): void {
      this.shippingAddress = address;
      localStorage.setItem("cart", JSON.stringify(this));
    },
  },
});
