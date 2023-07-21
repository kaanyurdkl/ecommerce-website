<script setup lang="ts">
import ProductsList from "@/components/ProductsList.vue";
import { useProductsStore } from "@/stores/productsStore";

const store = useProductsStore();
</script>

<template>
  <ProductsList
    v-if="store.getAllFavoriteProducts"
    heading="Favorites"
    :products="store.getAllFavoriteProductsReversed"
  />
</template>
