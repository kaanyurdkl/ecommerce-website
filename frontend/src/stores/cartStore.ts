import { defineStore } from "pinia";

import type { Cart, CartItem } from "@/types/productTypes";
import { updateCart } from "../utils/cartUtils";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      ...((localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : {
            cartItems: [],
            shippingAddress: null,
            paymentMethod: "PayPal",
          }) as Cart),
    };
  },
  getters: {
    numberOfItems(state) {
      return state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    },
  },
  actions: {
    addNewProductToCart(newProduct: CartItem) {
      const existProduct = this.cartItems.find((p) => p._id === newProduct._id);

      if (existProduct) {
        const cartItem = this.cartItems.find(
          (item) => item._id === existProduct._id
        );
        const quantity = cartItem.quantity;
        cartItem.quantity = quantity < 10 ? quantity + 1 : quantity;
      } else {
        this.cartItems.push(newProduct);
      }

      updateCart(this);
    },
    updateProductInCart(product: CartItem) {
      const item = this.cartItems.find((item) => item._id === product._id);

      if (item) item.quantity = product.quantity;

      updateCart(this);
    },
    removeProductFromCart(product: CartItem) {
      this.cartItems = this.cartItems.filter(
        (item) => item._id !== product._id
      );
      updateCart(this);
    },
    clearCartItems() {
      this.cartItems = [];
      updateCart(this);
    },
    savePayment(paymentMethod) {
      this.paymentMethod = paymentMethod;
      updateCart(this);
    },
    saveShippingAddress(address) {
      this.shippingAddress = address;
      updateCart(this);
    },
  },
});
