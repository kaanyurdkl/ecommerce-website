<script setup lang="ts">
import Card from "@/components/Card.vue";
import type { Product } from "@/types/productTypes";
defineProps<{
  heading: string;
  products: Product[];
}>();
</script>
<template>
  <section class="heading">
    <h2>{{ heading }}</h2>
  </section>
  <section class="products">
    <Card v-for="product in products" :product="product" />
  </section>
</template>
<style lang="scss" scoped>
.heading {
  padding: 2rem;
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
.products {
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  justify-items: center;
  gap: 6rem 2rem;
  transition: all 1s ease;
}
</style>
