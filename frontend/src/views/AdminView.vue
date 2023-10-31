<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

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

const products = computed(() => productsStore.getAllProducts);
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
        :products="products"
      />
      <AdminUsersTable v-if="activeTab === 'users'" :users="users" />
      <AdminOrdersTable v-if="activeTab === 'orders'" v-model:orders="orders" />
    </section>
  </section>
</template>

<style lang="scss">
.order-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  &__back {
    width: fit-content;
    color: #3f3f3f;
    cursor: pointer;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding-bottom: 1rem;
    span {
      font-size: 1.6rem;
      font-weight: 600;
    }
    button {
      padding: 0 1rem;
      color: #fff;
      background-color: #3f3f3f;
      cursor: pointer;
      &:hover {
        background-color: #555;
      }
      &:active {
        background-color: #484848;
      }
    }
  }
  &__content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "shipping orderSummary"
      "payment ."
      "orderItems .";
    row-gap: 4rem;
  }
  &__container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &:first-child {
      grid-area: shipping;
    }
    &:nth-child(2) {
      grid-area: orderSummary;
    }
    &:nth-child(3) {
      grid-area: payment;
    }
    &:last-child {
      grid-area: orderItems;
    }
  }
  &__title {
    position: relative;
    padding-bottom: 0.8rem;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 12rem;
      height: 0.1rem;
      background-color: #3f3f3f;
    }
  }
  &__details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style-type: none;
  }
  &__detail {
    display: flex;
    align-items: center;
  }
  &__label {
    display: inline-block;
    width: 25%;
    font-weight: 600;
  }
  &__value {
    flex-grow: 1;
    span {
      display: inline-block;
      width: 50%;
    }
  }
  &__image {
    width: 4rem;
    margin-right: 2rem;
    height: 5rem;
    object-fit: cover;
  }
}
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 30rem;
  color: #3f3f3f;
  div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    label {
      font-size: 0.8rem;
      font-weight: 600;
    }
    input:not([type="file"]),
    textarea {
      padding: 0.8rem;
      background-color: #fff;
      border: 1px solid #ccc;
      &::placeholder {
        font-size: 0.8rem;
      }
      &:focus {
        border-color: #3f3f3f;
        outline: none;
      }
    }
    input[type="file"] {
    }
    input[type="submit"] {
      color: #fff;
      background-color: #3f3f3f;
      font-weight: 600;
      transition: background-color 0.1s ease-in-out;
      border: none;
      &:hover {
        background-color: #555;
      }
    }
  }
}
.heading {
  max-width: 75rem;
  padding: 2rem;
  margin: auto;
  font-size: 2rem;
  text-transform: uppercase;
  @media screen and (max-width: 768px) {
    text-align: center;
  }
  @media screen and (max-width: 425px) {
    font-size: 1.2rem;
    text-align: center;
  }
}

.admin {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 2rem;
  gap: 2rem;
  max-width: 75rem;
  margin: auto;
  &__content {
    flex-grow: 1;
    background-color: #eee;
    padding: 2rem;
  }
  &__tabs {
    position: relative;
    display: flex;
    gap: 2rem;
    list-style-type: none;
    &--line {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: #ccc;
      z-index: -1;
    }
  }
  &__tab {
    width: 6rem;
    input {
      display: none;
      &:checked + label {
        color: #3f3f3f;
        border-bottom: 2px solid #3f3f3f;
      }
    }
    label {
      display: inline-block;
      width: 100%;
      height: 100%;
      padding: 0.4rem 0;
      color: #ccc;
      font-size: 1rem;
      font-weight: 600;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      text-overflow: ellipsis;
      overflow: hidden;
      transition: all 0.2s ease-in-out;
    }
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
  &--products {
    .table__header {
      &:first-child {
        width: 8%;
      }
      &:nth-child(2) {
        width: 22%;
      }
      &:nth-child(3) {
        width: 10%;
      }
      &:nth-child(4) {
        width: 10%;
      }
      &:nth-child(5) {
        width: 10%;
      }
      &:nth-child(6) {
        width: 8%;
      }
      &:last-child {
        width: 10%;
      }
    }
    .table__column {
      &:first-child {
        width: 8%;
        img {
          width: 100%;
          height: 100px;
          object-fit: cover;
        }
      }
      &:nth-child(2) {
        width: 22%;
      }
      &:nth-child(3) {
        width: 10%;
      }
      &:nth-child(4) {
        width: 10%;
      }
      &:nth-child(5) {
        width: 10%;
      }
      &:nth-child(6) {
        width: 8%;
      }
      &:last-child {
        display: flex;
        justify-content: space-between;
        width: 10%;
      }
    }
    .products-button {
      padding: 0.6rem;
      font-size: 14px;
      cursor: pointer;
      &--create {
        position: absolute;
        top: 6px;
        right: 0;
        color: #fff;
        background-color: #3f3f3f;
        &:hover {
          background-color: #555;
        }
      }
      &--update,
      &--delete {
        transition: all 0.2s ease-in-out;
        &:hover {
          background-color: #eee;
        }
      }
    }
  }
  &--users {
    .table__header {
      &:first-child {
        width: 30%;
      }
      &:nth-child(2) {
        width: 25%;
      }
      &:nth-child(3) {
        width: 30%;
      }
      &:last-child {
        width: 15%;
      }
    }
    .table__column {
      &:first-child {
        width: 30%;
      }
      &:nth-child(2) {
        width: 25%;
      }
      &:nth-child(3) {
        width: 30%;
      }
      &:last-child {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        padding: 0.4rem;
        font-weight: 600;
        width: 15%;
      }
    }
    .admin-user {
      color: #c02fd8;
      background-color: #f9d7ff;
    }
    .regular-user {
      color: #00b3ff;
      background-color: #d7f3ff;
    }
  }
  &--orders {
    .table__header {
      &:first-child {
        width: 22%;
      }
      &:nth-child(2) {
        width: 16%;
      }
      &:nth-child(3) {
        width: 12%;
      }
      &:nth-child(4) {
        width: 8%;
      }
      &:nth-child(5) {
        width: 10%;
      }
      &:nth-child(5) {
        width: 10%;
      }
      &:nth-child(6) {
        width: 12%;
      }
      &:last-child {
        width: 8%;
      }
    }
    .table__column {
      &:first-child {
        width: 22%;
      }
      &:nth-child(2) {
        width: 16%;
      }
      &:nth-child(3) {
        width: 12%;
      }
      &:nth-child(4) {
        width: 8%;
      }
      &:nth-child(5) {
        width: 10%;
      }
      &:nth-child(5) {
        width: 10%;
      }
      &:nth-child(6) {
        width: 12%;
      }
      &:last-child {
        width: 8%;
        padding: 0;
      }
    }
    .orders-button {
      &--details {
        display: block;
        width: 100%;
        padding: 0.4rem 0;
        color: #fff;
        background-color: #3f3f3f;
        transition: all 0.1s ease-in-out;
        &:hover {
          background-color: #555;
        }
      }
    }
    .status-negative {
      padding: 0.4rem 0;
      color: red;
      background-color: #ffe4e4;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>
