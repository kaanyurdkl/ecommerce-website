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
    <section class="admin__content">
      <AdminProductsTable
        v-if="activeTab === 'products'"
        :products="productsStore.products"
      />
      <AdminUsersTable v-if="activeTab === 'users'" :users="users" />
      <AdminOrdersTable v-if="activeTab === 'orders'" v-model:orders="orders" />
    </section>
  </section>
</template>

<style lang="scss">
.admin {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  &__content {
    flex-grow: 1;
    background-color: #eee;
    padding: 2rem;
    border-radius: 0.4rem;
  }
}

.table {
  position: relative;
  &__headers {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px 32px;
    margin-bottom: 20px;
    font-weight: 600;
    list-style-type: none;
    border-bottom: 1px solid #ccc;
  }
  &__rows {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0;
    font-size: 14px;
    list-style-type: none;
  }
  &__row {
    background-color: #fff;
    padding: 2rem;
    border-radius: 0.4rem;
  }
  &__columns {
    display: flex;
    justify-content: space-between;
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
