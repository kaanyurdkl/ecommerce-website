<script setup lang="ts">
import { onMounted } from "vue";

import UserOrders from "@/components/UserOrders.vue";
import UserInfos from "@/components/UserInfos.vue";

import { useUsersStore } from "@/stores/usersStore";
import { useOrdersStore } from "@/stores/ordersStore";

const usersStore = useUsersStore();
const ordersStore = useOrdersStore();

onMounted(async () => {
  await ordersStore.getMyOrders();
});
</script>

<template>
  <section class="heading">
    <h2>My Account</h2>
  </section>
  <section class="user">
    <UserOrders :orders="ordersStore.myOrdersReversed" />
    <UserInfos :user="usersStore.authUser" />
  </section>
</template>

<style lang="scss" scoped>
.user {
  display: flex;
  justify-content: space-between;
}
</style>
