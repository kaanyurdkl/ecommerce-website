import { defineStore } from "pinia";
import axios from "axios";

import { useUsersStore } from "./usersStore";
import type {
  Product,
  FavoriteProduct,
  Cart,
  CartItem,
} from "@/types/productTypes";
import { updateCart } from "../utils/cartUtils";

export const useProductsStore = defineStore("products", {
  state: () => {
    return {
      appState: false,
      products: [] as Product[],
      favoriteProducts: [] as FavoriteProduct[],
      cart: (localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : { cartItems: [] }) as Cart,
    };
  },
  getters: {
    getAppState(state) {
      return state.appState;
    },
    getAllProducts(state): Product[] {
      return state.products;
    },
    getAllProductsByCategory: (state) => {
      return (category: string): Product[] =>
        state.products.filter((p) => p.category === category);
    },
    getProductById(state) {
      return (id: string): Product | undefined => {
        return state.products.find((p) => p._id === id);
      };
    },
    getProductsListProducts: (state) => {
      return (category: string, type: string): Product[] => {
        const productsByCategory: Product[] = state.products.filter(
          (p) => p.category === category
        );
        const productsByType: Product[] = productsByCategory.filter(
          (p) => p.type === type
        );
        return productsByType;
      };
    },
    getAllFavoriteProducts(state): FavoriteProduct[] {
      return state.favoriteProducts;
    },
    getAllFavoriteProductsReversed(state): Product[] {
      return state.favoriteProducts.toReversed();
    },
    getAllProductsInCart(state): CartItem[] {
      return state.cart.cartItems;
    },
    getProductTypes: (state) => {
      return (category: string) => {
        const productsByCategory: Product[] = state.products.filter(
          (p) => p.category === category
        );
        const productsTypes = [
          "all",
          ...new Set(productsByCategory.map((p) => p.type)),
        ];
        return productsTypes;
      };
    },
  },
  actions: {
    async setApp() {
      const usersStore = useUsersStore();
      this.setAppState(false);
      try {
        await usersStore.setAuthUser();
        await this.setProducts();
        this.setAppState(true);
      } catch (error) {
        this.setAppState(false);
        return error;
      }
    },
    setAppState(newState: boolean) {
      this.appState = newState;
    },
    async setProducts() {
      try {
        const { data } = await axios.get("/api/products");
        this.products = data;
      } catch (error) {
        return error;
      }
    },
    addNewFavoriteProduct(newProduct: Product) {
      this.favoriteProducts.push(newProduct);
    },
    deleteFavoriteProduct(productToBeRemoved: Product) {
      const index = this.favoriteProducts.findIndex(
        (p) => p._id === productToBeRemoved._id
      );
      this.favoriteProducts.splice(index, 1);
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
