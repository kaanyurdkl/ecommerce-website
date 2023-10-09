import { defineStore } from "pinia";

import { useUsersStore } from "./usersStore";
import { useProductsStore } from "./productsStore";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      appState: false,
    };
  },
  getters: {
    getAppState(state) {
      return state.appState;
    },
  },
  actions: {
    async setApp() {
      const usersStore = useUsersStore();
      const productsStore = useProductsStore();
      this.setAppState(false);
      try {
        await usersStore.setAuthUser();
        await productsStore.setProducts();
        this.setAppState(true);
      } catch (error) {
        this.setAppState(false);
        return error;
      }
    },
    setAppState(newState: boolean) {
      this.appState = newState;
    },
  },
});
