import { defineStore } from "pinia";

import type { Cart, CartItem } from "@/types/productTypes";
import { updateCart } from "../utils/cartUtils";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cart: (localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : {
            cartItems: [],
            shippingAddress: {},
            paymentMethod: "PayPal",
          }) as Cart,
    };
  },
  getters: {
    getAllProductsInCart(state): CartItem[] {
      return state.cart.cartItems;
    },
  },
  actions: {
    saveShippingAddress(address) {
      this.cart.shippingAddress = address;
      updateCart(this.cart);
    },
    addNewProductToCart(newProduct: CartItem) {
      const existProduct = this.cart.cartItems.find(
        (p) => p._id === newProduct._id
      );

      if (existProduct) {
        this.cart.cartItems = this.cart.cartItems.map((p) =>
          p._id === existProduct._id
            ? {
                ...newProduct,
                quantity: p.quantity < 10 ? p.quantity + 1 : p.quantity,
              }
            : p
        );
      } else {
        this.cart.cartItems.push(newProduct);
      }

      updateCart(this.cart);
    },
    updateProductInCart(product: CartItem) {
      const item = this.cart.cartItems.find((item) => item._id === product._id);

      if (item) item.quantity = product.quantity;

      updateCart(this.cart);
    },
    removeProductFromCart(product: CartItem) {
      this.cart.cartItems = this.cart.cartItems.filter(
        (item) => item._id !== product._id
      );
      updateCart(this.cart);
    },
  },
});
