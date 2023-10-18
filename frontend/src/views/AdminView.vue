<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import { useProductsStore } from "@/stores/productsStore";
import { useUsersStore } from "@/stores/usersStore";
import { useOrdersStore } from "@/stores/ordersStore";

const productsStore = useProductsStore();
const usersStore = useUsersStore();
const ordersStore = useOrdersStore();

const products = computed(() => productsStore.getAllProducts);
const users = ref(null);
const orders = ref(null);

const newProduct = ref(null);
const newProductImagePath = ref(null);

const createProductHandler = async () => {
  newProduct.value = await productsStore.createProduct({
    image: newProductImagePath.value,
  });
  await productsStore.setProducts();
};

const updateProductHandler = async (id) => {
  newProduct.value = await productsStore.updateProduct(id, {
    ...newProduct.value,
    name: "New sample name",
    image: newProductImagePath.value,
  });
};

const deleteProductHandler = async (id) => {
  await productsStore.deleteProduct(id);
  await productsStore.setProducts();
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
  <section class="heading">
    <h2>Admin</h2>
  </section>
  <section>
    <h3>Products</h3>
    <ul>
      <li v-for="product in products">
        <p>Product image: {{ product.image }}</p>
        <p>Product id: {{ product._id }}</p>
        <p>Product name: {{ product.name }}</p>
        <p>Product category: {{ product.category }}</p>
        <p>Product type: {{ product.type }}</p>
        <p>Product price: {{ product.price }}</p>
        <p>
          <button @click="updateProductHandler(product._id)">Update</button>
        </p>
        <p>
          <button @click="deleteProductHandler(product._id)">Delete</button>
        </p>
      </li>
    </ul>
    <p>
      <input type="file" @change="onFilePicked" />
      <button @click="createProductHandler()">Create</button>
    </p>
  </section>
  <section>
    <h3>Users</h3>
    <ul>
      <li v-for="user in users">
        <p>User id: {{ user._id }}</p>
        <p>User name: {{ user.name }}</p>
        <p>Is user admin: {{ user.isAdmin }}</p>
      </li>
    </ul>
  </section>
  <section>
    <h3>Orders</h3>
    <ul>
      <li v-for="order in orders">
        <p>Order id: {{ order._id }}</p>
        <p>User name: {{ order.user.name }}</p>
        <p>Order created at: {{ order.createdAt }}</p>
        <p>Order total price: {{ order.totalPrice }}</p>
        <p>Is order paid: {{ order.isPaid }}</p>
        <p>
          Is order delivered: {{ order.isDelivered }}. Delivered at:
          {{ order.deliveredAt }}
        </p>
        <button @click="">Show details</button>
        <button @click="deliverOrderHandler(order._id)">Deliver</button>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
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
</style>
