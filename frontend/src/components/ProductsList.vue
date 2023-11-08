<script setup lang="ts">
import Card from "@/components/Card.vue";
import type { Product } from "@/types/productTypes";
defineProps<{
  heading: string;
  products: Product[];
}>();
</script>
<template>
  <section class="products">
    <Card v-for="product in products" :product="product" />
  </section>
</template>
<style lang="scss" scoped>
.products {
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  justify-items: center;
  gap: 6rem 2rem;
  transition: all 1s ease;
}
</style>
