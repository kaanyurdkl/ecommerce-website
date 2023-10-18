import { defineStore } from "pinia";
import axios from "axios";

export const useUsersStore = defineStore("users", {
  state: () => {
    return {
      authUser: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    };
  },
  getters: {
    getAuthUser(state) {
      return state.authUser;
    },
  },
  actions: {
    async getAllUsers() {
      try {
        const { data } = await axios.get("/api/users");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async setAuthUser() {
      try {
        const { data } = await axios.get("/api/users/auth");

        this.authUser = data.user;

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          if (localStorage.getItem("user")) {
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        return error;
      }
    },
  },
});
