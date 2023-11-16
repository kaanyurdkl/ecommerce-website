import { defineStore } from "pinia";
import axios from "axios";

export const useOrdersStore = defineStore("orders", {
  state: () => {
    return {
      myOrders: [],
    };
  },
  getters: {
    myOrdersReversed(state) {
      const orders = [...state.myOrders];
      return orders.reverse();
    },
  },
  actions: {
    async getAllOrders() {
      try {
        const { data } = await axios.get("/api/orders");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async getMyOrders() {
      try {
        const { data } = await axios.get("/api/orders/myorders");
        this.myOrders = data;
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
    async deliverOrder(orderId) {
      try {
        await axios.put(`/api/orders/${orderId}/deliver`);
      } catch (error) {
        return error;
      }
    },
  },
});
