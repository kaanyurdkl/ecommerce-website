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
  <section v-if="!store.favoriteProducts.length" class="heading">
    <h2>Favorites</h2>
  </section>
  <Empty
    v-if="!store.favoriteProducts.length"
    :heading="'No Favorites Yet!'"
    :message="'Click the heart icon on any product to add your favorite items here'"
    :route-to="'home'"
    :route-label="'Start Shopping'"
  />
</template>
