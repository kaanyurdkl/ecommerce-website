import { defineStore } from "pinia";
import axios from "axios";

export const useOrdersStore = defineStore("orders", {
  state: () => {
    return {};
  },
  getters: {},
  actions: {
    async createOrder(order) {
      try {
        const { data } = await axios.post("/api/orders", { ...order });
        return data;
      } catch (error) {
        return error;
      }
    },
    async getOrderDetails(orderId) {
      try {
        const { data } = await axios.get(`/api/orders/${orderId}`);
        return data;
      } catch (error) {
        return error;
      }
    },
  },
});
