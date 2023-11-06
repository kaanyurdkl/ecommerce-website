<script setup lang="ts">
import ProductsList from "@/components/ProductsList.vue";
import Empty from "@/components/Empty.vue";
import { useProductsStore } from "@/stores/productsStore";

const store = useProductsStore();
</script>

<template>
  <ProductsList
    v-if="store.favoriteProducts.length"
    heading="Favorites"
    :products="store.getFavoriteProductsReversed"
  />
  <Empty
    v-else
    :heading="'No Favorites Yet!'"
    :message="'Add favorite items'"
    :route-to="'home'"
    :route-label="'Start Shopping'"
  />
</template>
