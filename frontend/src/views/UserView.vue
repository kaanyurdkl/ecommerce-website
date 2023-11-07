<script setup lang="ts">
import { ref, onMounted } from "vue";

import UserOrders from "@/components/UserOrders.vue";
import UserInfos from "@/components/UserInfos.vue";

import { useUsersStore } from "@/stores/usersStore";
import { useOrdersStore } from "@/stores/ordersStore";

const usersStore = useUsersStore();
const ordersStore = useOrdersStore();

const myOrders = ref(null);

onMounted(async () => {
  myOrders.value = await ordersStore.getMyOrders();
});
</script>

<template>
  <section class="heading">
    <h2>Profile</h2>
  </section>
  <section class="user">
    <UserOrders :orders="myOrders" />
    <UserInfos :user="usersStore.authUser" />
  </section>
</template>

<style lang="scss">
.user {
  display: flex;
  justify-content: space-between;
  max-width: 75rem;
  padding: 2rem 0;
  margin: auto;
}
</style>
