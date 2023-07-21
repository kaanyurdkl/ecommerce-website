import { defineStore } from "pinia";
import type { Product, FavoriteProduct } from "@/types/productTypes";
import productsJson from "@/products.json";

export const useProductsStore = defineStore("products", {
  state: () => {
    return {
      products: [] as Product[],
      favoriteProducts: [] as FavoriteProduct[],
      cart: [] as Product[],
    };
  },
  getters: {
    getAllProducts(state): Product[] {
      return state.products;
    },
    getAllProductsByCategory: (state) => {
      return (category: string): Product[] =>
        state.products.filter((p) => p.productGender === category);
    },
    getProductById(state) {
      return (id: number): Product | undefined => {
        return state.products.find((p) => p.productId === Number(id));
      };
    },
    getProductsListProducts: (state) => {
      return (category: string, type: string): Product[] => {
        const productsByCategory: Product[] = state.products.filter(
          (p) => p.productGender === category
        );
        const productsByType: Product[] = productsByCategory.filter(
          (p) => p.productType === type
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
    getAllProductsInCart(state): Product[] {
      return state.cart;
    },
    getProductTypes: (state) => {
      return (category) => {
        const productsByCategory: Product[] = state.products.filter(
          (p) => p.productGender === category
        );
        const productsTypes = [
          "all",
          ...new Set(productsByCategory.map((p) => p.productType)),
        ];
        return productsTypes;
      };
    },
  },
  actions: {
    setProducts() {
      this.products = productsJson;
    },
    addNewFavoriteProduct(newProduct: Product) {
      this.favoriteProducts.push(newProduct);
    },
    deleteFavoriteProduct(productToBeRemoved: Product) {
      const index = this.favoriteProducts.findIndex(
        (p) => p.productId === productToBeRemoved.productId
      );
      this.favoriteProducts.splice(index, 1);
    },
    addNewProductToCart(newProduct: Product) {
      this.cart.push(newProduct);
    },
  },
});
