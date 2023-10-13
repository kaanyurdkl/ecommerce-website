<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useOrdersStore } from "@/stores/ordersStore";

const props = defineProps<{
  id: String;
}>();

const ordersStore = useOrdersStore();

const orderDetails = ref(null);

onMounted(async () => {
  orderDetails.value = await ordersStore.getOrderDetails(props.id);
});
</script>

<template>
  <section class="heading">
    <h2>Order</h2>
  </section>
  <section class="order">{{ orderDetails }}</section>
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
