<script setup lang="ts">
import ProductsList from "@/components/ProductsList.vue";
import { useProductsStore } from "@/stores/productsStore";

defineProps<{ category: string; type: string }>();

const store = useProductsStore();
</script>
<template>
  <ProductsList
    v-if="store.getProductsListProducts(category, type)"
    :heading="`${category}'s ${type}`"
    :products="store.getProductsListProducts(category, type)"
  />
</template>
