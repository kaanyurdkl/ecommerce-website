<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import { useProductsStore } from "@/stores/productsStore";
import { useUsersStore } from "@/stores/usersStore";
import { useOrdersStore } from "@/stores/ordersStore";

const productsStore = useProductsStore();
const usersStore = useUsersStore();
const ordersStore = useOrdersStore();

const tabs = [
  { value: "products", label: "Products" },
  { value: "users", label: "Users" },
  { value: "orders", label: "Orders" },
];
const productsHeaders = [
  "Image",
  "Id",
  "Name",
  "Category",
  "Type",
  "Price",
  "",
];
const usersHeaders = ["Id", "Name", "Email", "User Type"];
const ordersHeaders = [
  "Id",
  "Name",
  "Created At",
  "Total",
  "Payment",
  "Delivery",
  "",
];

const products = computed(() => productsStore.getAllProducts);
const users = ref(null);
const orders = ref(null);

const newProduct = ref(null);
const newProductImagePath = ref(null);

const activeTab = ref("products");
const isCreating = ref(false);

const createProductHandler = async () => {
  newProduct.value = await productsStore.createProduct({
    image: newProductImagePath.value,
  });
  await productsStore.getProducts();
};

const updateProductHandler = async (id) => {
  newProduct.value = await productsStore.updateProduct(id, {
    ...newProduct.value,
    name: "New sample name",
    image: newProductImagePath.value,
  });
  await productsStore.getProducts();
};

const deleteProductHandler = async (id) => {
  await productsStore.deleteProduct(id);
  await productsStore.getProducts();
};

const onFilePicked = async (e) => {
  const formData = new FormData();
  formData.append("image", e.target.files[0]);
  try {
    const res = await productsStore.uploadProductImage(formData);
    newProductImagePath.value = res.image;
  } catch (error) {
    console.log(error);
  }
};

const deliverOrderHandler = async (id) => {
  await ordersStore.deliverOrder(id);
  orders.value = await ordersStore.getAllOrders();
};

onMounted(async () => {
  users.value = await usersStore.getAllUsers();
  orders.value = await ordersStore.getAllOrders();
  newProductImagePath.value = products.value[0].image;
});
</script>

<template>
  <section class="admin">
    <ul class="admin__tabs">
      <div class="admin__tabs--line"></div>
      <li v-for="tab in tabs" class="admin__tab">
        <input
          type="radio"
          :id="tab.value"
          :value="tab.value"
          v-model="activeTab"
        />
        <label :for="tab.value">{{ tab.label }}</label>
      </li>
    </ul>
    <section class="admin__content">
      <div v-if="activeTab === 'products'" class="table table--products">
        <i
          v-if="!isCreating"
          @click="isCreating = !isCreating"
          class="fa-solid fa-plus products-button products-button--create"
        ></i>
        <i
          v-else
          @click="isCreating = !isCreating"
          class="fa-solid fa-minus products-button products-button--create"
        ></i>
        <ul v-if="!isCreating" class="table__headers">
          <li v-for="header in productsHeaders" class="table__header">
            {{ header }}
          </li>
        </ul>
        <ul v-if="!isCreating" class="table__rows">
          <li v-for="product in products" class="table__row">
            <ul class="table__columns">
              <li class="table__column">
                <img :src="`http://localhost:8000${product.image}`" />
              </li>
              <li class="table__column">
                {{ product._id }}
              </li>
              <li class="table__column">
                {{ product.name }}
              </li>
              <li class="table__column">
                {{ product.category }}
              </li>
              <li class="table__column">
                {{ product.type }}
              </li>
              <li class="table__column">${{ product.price }}</li>
              <li class="table__column">
                <i
                  class="fa-solid fa-pen products-button products-button--update"
                  @click="updateProductHandler(product._id)"
                ></i>
                <i
                  class="fa-solid fa-trash products-button products-button--delete"
                  @click="deleteProductHandler(product._id)"
                ></i>
              </li>
            </ul>
          </li>
        </ul>
        <form v-if="isCreating">
          <div>
            <label for="name">Name</label>
            <input type="text" id="name" placeholder="Product name" />
          </div>
          <div>
            <label for="image">Image</label>
            <input type="file" id="image" />
          </div>
          <div>
            <label for="category">Category</label>
            <input type="text" id="category" placeholder="Product category" />
          </div>
          <div>
            <label for="type">Type</label>
            <input type="text" id="type" placeholder="Product type" />
          </div>
          <div>
            <label for="description">Description</label>
            <textarea
              id="description"
              placeholder="Product decription"
            ></textarea>
          </div>
          <div>
            <label for="price">Price</label>
            <input type="text" id="price" placeholder="Product price" />
          </div>
        </form>
      </div>
      <div v-if="activeTab === 'users'" class="table table--users">
        <ul class="table__headers">
          <li v-for="header in usersHeaders" class="table__header">
            {{ header }}
          </li>
        </ul>
        <ul class="table__rows">
          <li v-for="user in users" class="table__row">
            <ul class="table__columns">
              <li class="table__column">{{ user._id }}</li>
              <li class="table__column">{{ user.name }}</li>
              <li class="table__column">{{ user.email }}</li>
              <li v-if="user.isAdmin" class="table__column admin-user">
                <i class="fa-solid fa-crown"></i>
                <span>Admin</span>
              </li>
              <li v-else class="table__column regular-user">
                <i class="fa-solid fa-user"></i>
                <span>Regular</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div v-if="activeTab === 'orders'" class="table table--orders">
        <ul class="table__headers">
          <li v-for="header in ordersHeaders" class="table__header">
            {{ header }}
          </li>
        </ul>
        <ul class="table__rows">
          <li v-for="order in orders" class="table__row">
            <ul class="table__columns">
              <li class="table__column">{{ order._id }}</li>
              <li class="table__column">
                {{ order.user.name }}
              </li>
              <li class="table__column">
                {{ new Date(order.createdAt).toLocaleDateString() }}
              </li>
              <li class="table__column">${{ order.totalPrice }}</li>
              <li v-if="order.isPaid" class="table__column">
                {{ new Date(order.paidAt).toLocaleDateString() }}
              </li>
              <li v-else class="table__column status-negative">Not Paid</li>
              <li v-if="order.isDelivered" class="table__column">
                {{ new Date(order.deliveredAt).toLocaleDateString() }}
              </li>
              <li v-else class="table__column status-negative">
                Not Delivered
              </li>
              <li class="table__column">
                <button class="orders-button--details" @click="">
                  Details
                </button>
              </li>
              <!-- <li class="orders__detail">
                <button @click="deliverOrderHandler(order._id)">Deliver</button>
              </li> -->
            </ul>
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
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
