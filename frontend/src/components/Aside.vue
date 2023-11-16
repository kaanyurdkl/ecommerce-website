<script setup lang="ts">
import { useRoute } from "vue-router";
import * as _ from "lodash";
import { useProductsStore } from "@/stores/productsStore";

const route = useRoute();
const store = useProductsStore();

const formatLabel = (type: string): string => {
  return _.startCase(type).replace(" ", "-");
};
</script>
<template>
  <aside v-if="route.params?.category" class="aside">
    <h4>Shop by Product</h4>
    <ul>
      <li
        v-for="type in store.getProductTypesByCategory(route.params.category)"
      >
        <router-link
          :to="{
            name: type === 'all' ? 'category' : 'products',
            params:
              type === 'all'
                ? { category: route.params.category }
                : { category: route.params.category, type },
          }"
          :class="{
            aside__link: true,
            'aside__link--active':
              type === 'all'
                ? route.params.type === undefined
                : route.params.type === type,
          }"
          >{{ formatLabel(type) }}</router-link
        >
      </li>
    </ul>
  </aside>
</template>
<style lang="scss">
.aside {
  grid-area: aside;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    list-style: none;
    li {
      font-size: 0.875rem;
    }
  }
  &__link {
    color: #ccc;
    text-decoration: none;
    &--active {
      color: #3f3f3f;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
}
</style>
