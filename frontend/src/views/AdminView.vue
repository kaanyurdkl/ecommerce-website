<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useProductsStore } from "@/stores/productsStore";
import { useOrdersStore } from "@/stores/ordersStore";

const productsStore = useProductsStore();
const ordersStore = useOrdersStore();

const orders = ref(null);
const products = computed(() => productsStore.getAllProducts);

const deliverOrderHandler = async (id) => {
  await ordersStore.deliverOrder(id);
  orders.value = await ordersStore.getAllOrders();
};

const deleteProductHandler = async (id) => {
  console.log(id);
};

onMounted(async () => {
  orders.value = await ordersStore.getAllOrders();
});
</script>

<template>
  <section class="heading">
    <h2>Admin</h2>
  </section>
  <section>
    <h3>Orders</h3>
    <p>
      {{ orders }}
    </p>
    <button @click="deliverOrderHandler(orders[0]._id)">Deliver</button>
  </section>
  <section>
    <h3>Products</h3>
    <p>
      {{ products }}
    </p>
    <button @click="deleteProductHandler(products[0]._id)">Delete</button>
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
