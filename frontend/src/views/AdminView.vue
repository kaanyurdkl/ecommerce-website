<script setup lang="ts">
import { ref, onMounted } from "vue";

import AdminTabs from "@/components/AdminTabs.vue";
import AdminProductsTable from "@/components/AdminProductsTable.vue";
import AdminUsersTable from "@/components/AdminUsersTable.vue";
import AdminOrdersTable from "@/components/AdminOrdersTable.vue";

import { useProductsStore } from "@/stores/productsStore";
import { useUsersStore } from "@/stores/usersStore";
import { useOrdersStore } from "@/stores/ordersStore";

const productsStore = useProductsStore();
const usersStore = useUsersStore();
const ordersStore = useOrdersStore();

const users = ref(null);
const orders = ref(null);

const activeTab = ref("products");

onMounted(async () => {
  users.value = await usersStore.getAllUsers();
  orders.value = await ordersStore.getAllOrders();
});
</script>

<template>
  <section class="admin">
    <AdminTabs v-model="activeTab" />
    <AdminProductsTable
      v-if="activeTab === 'products'"
      :products="productsStore.products"
    />
    <AdminUsersTable v-if="activeTab === 'users'" :users="users" />
    <AdminOrdersTable v-if="activeTab === 'orders'" v-model:orders="orders" />
  </section>
</template>

<style lang="scss">
.admin {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4rem;
}

.table {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  &__headers {
    display: grid;
    align-items: center;
    padding: 2rem 1rem;
    border-bottom: 0.25rem solid #ccc;
    list-style-type: none;
  }
  &__header {
    font-size: 0.875rem;
    text-transform: uppercase;
    text-align: center;
  }
  &__rows {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    list-style-type: none;
  }
  &__row {
    padding: 1rem;
    background-color: #fff;
    border: 1px solid #ccc;
    border-bottom-width: 0.25rem;
    border-radius: 0.5rem;
  }
  &__columns {
    display: grid;
    align-items: center;
    list-style-type: none;
  }
  &__column {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
