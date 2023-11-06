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
    :message="'Add favorite items'"
    :route-to="'home'"
    :route-label="'Start Shopping'"
  />
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
</style>
