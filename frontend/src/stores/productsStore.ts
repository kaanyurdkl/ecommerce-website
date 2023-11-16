import { defineStore } from "pinia";
import axios from "axios";

import type { Product, FavoriteProduct } from "@/types/productTypes";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as Product[],
    favoriteProducts: [] as FavoriteProduct[],
  }),
  getters: {
    getProductById(state) {
      return (id: string): Product | undefined => {
        return state.products.find((p) => p._id === id);
      };
    },
    getProductsByCategory(state) {
      return (category: string): Product[] =>
        state.products.filter((p) => p.category === category);
    },
    getProductsByType(state) {
      return (type: string): Product[] =>
        state.products.filter((p) => p.type === type);
    },
    getProductsByCategoryAndType(state) {
      return (category: string, type: string): Product[] => {
        const productsByCategory = this.getProductsByCategory(category);
        const productsByType = productsByCategory.filter(
          (p) => p.type === type
        );
        return productsByType;
      };
    },
    getFavoriteProductsReversed(state): Product[] {
      return state.favoriteProducts.toReversed();
    },
    getProductTypesByCategory(state) {
      return (category: string) => {
        const productsByCategory = this.getProductsByCategory(category);
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
