<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();
</script>

<template>
  <section class="heading">
    <h2>Payment</h2>
  </section>
  <section class="payment"></section>
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
