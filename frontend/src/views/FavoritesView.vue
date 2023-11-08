<script setup lang="ts">
import ProductsList from "@/components/ProductsList.vue";
import Empty from "@/components/Empty.vue";
import { useProductsStore } from "@/stores/productsStore";

const store = useProductsStore();
</script>

<template>
  <section class="heading">
    <h2>Favorites</h2>
  </section>
  <ProductsList
    v-if="store.favoriteProducts.length"
    heading="Favorites"
    :products="store.getFavoriteProductsReversed"
  />
  <Empty
    v-if="!store.favoriteProducts.length"
    :heading="'No Favorites Yet!'"
    :message="'Click the heart icon on any product to add your favorite items here'"
    :route-to="'home'"
    :route-label="'Start Shopping'"
  />
</template>
