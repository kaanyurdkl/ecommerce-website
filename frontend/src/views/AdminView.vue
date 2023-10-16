<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useOrdersStore } from "@/stores/ordersStore";

const ordersStore = useOrdersStore();

const orders = ref(null);

const deliverOrderHandler = async (id) => {
  await ordersStore.deliverOrder(id);
  orders.value = await ordersStore.getAllOrders();
};

onMounted(async () => {
  orders.value = await ordersStore.getAllOrders();
});
</script>

<template>
  <section class="heading">
    <h2>Admin</h2>
  </section>
  <section class="orders">
    {{ orders }}
    <button @click="deliverOrderHandler(orders[0]._id)">Deliver</button>
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
