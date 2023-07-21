<script setup lang="ts">
import ProductsList from "@/components/ProductsList.vue";
import { useProductsStore } from "@/stores/productsStore";

defineProps<{ category: string }>();

const store = useProductsStore();
</script>

<template>
  <ProductsList
    v-if="store.getAllProductsByCategory(category)"
    :heading="category"
    :products="store.getAllProductsByCategory(category)"
  />
</template>
