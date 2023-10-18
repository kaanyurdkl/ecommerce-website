import { defineStore } from "pinia";
import axios from "axios";

import type { Product, FavoriteProduct } from "@/types/productTypes";

export const useProductsStore = defineStore("products", {
  state: () => {
    return {
      products: [] as Product[],
      favoriteProducts: [] as FavoriteProduct[],
    };
  },
  getters: {
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
    async getProducts() {
      try {
        const { data } = await axios.get("/api/products");
        this.products = data;
      } catch (error) {
        return error;
      }
    },
    async createProduct(productDetails) {
      try {
        const { data } = await axios.post("/api/products", productDetails);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async updateProduct(id, productDetails) {
      try {
        const { data } = await axios.put(`/api/products/${id}`, productDetails);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`/api/products/${id}`);
      } catch (error) {
        console.log(error);
      }
    },
    async uploadProductImage(uploadData) {
      try {
        const { data } = await axios.post("/api/uploads", uploadData);
        return data;
      } catch (error) {
        console.log(error);
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
  },
});
