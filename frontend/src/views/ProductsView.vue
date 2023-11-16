<script setup lang="ts">
import ProductsList from "@/components/ProductsList.vue";
import { useProductsStore } from "@/stores/productsStore";

defineProps<{ category: string; type: string }>();

const store = useProductsStore();
</script>
<template>
  <section class="heading">
    <h2>{{ category }}</h2>
  </section>
  <ProductsList
    v-if="store.getProductsByCategoryAndType(category, type)"
    :heading="`${category}'s ${type}`"
    :products="store.getProductsByCategoryAndType(category, type)"
  />
</template>
