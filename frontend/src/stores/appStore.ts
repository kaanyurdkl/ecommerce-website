import { defineStore } from "pinia";

import { useUsersStore } from "./usersStore";
import { useProductsStore } from "./productsStore";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      isAppReady: false,
    };
  },
  actions: {
    async setApp() {
      const usersStore = useUsersStore();
      const productsStore = useProductsStore();
      this.setAppState(false);
      try {
        await usersStore.setAuthUser();
        await productsStore.getProducts();
        this.setAppState(true);
      } catch (error) {
        this.setAppState(false);
        return error;
      }
    },
    setAppState(newState: boolean) {
      this.isAppReady = newState;
    },
  },
});
