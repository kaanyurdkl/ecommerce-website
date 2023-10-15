import { defineStore } from "pinia";
import axios from "axios";

export const useOrdersStore = defineStore("orders", {
  state: () => {
    return {};
  },
  getters: {},
  actions: {
    async getMyOrders() {
      try {
        const { data } = await axios.get("/api/orders/myorders");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
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
