<script setup lang="ts">
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/productsStore";
import * as _ from "lodash";

const route = useRoute();
const store = useProductsStore();

const getTypeLabel = (type: string): string => {
  return _.startCase(type).replace(" ", "-");
};
</script>
<template>
  <aside v-if="route.params?.category" class="aside">
    <h4>Shop by Product</h4>
    <ul>
      <li v-for="type in store.getProductTypes(route.params.category)">
        <router-link
          v-if="type === 'all'"
          :to="{
            name: 'category',
            params: { category: route.params.category },
          }"
          >{{ getTypeLabel(type) }}</router-link
        >
        <router-link
          v-else
          :to="{
            name: 'products',
            params: { category: route.params.category, type },
          }"
          >{{ getTypeLabel(type) }}</router-link
        >
      </li>
    </ul>
  </aside>
</template>
<style lang="scss">
.aside {
  grid-area: aside;
  padding: 2rem;
  ul {
    list-style: none;
    li {
      font-size: 0.8rem;
      margin-top: 0.4rem;
      a {
        color: #222;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
}
</style>
