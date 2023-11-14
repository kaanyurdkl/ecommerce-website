<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<template>
  <nav class="nav">
    <ul class="nav__items">
      <li class="nav__item">
        <router-link
          :class="{ active: route.params.category === 'men' }"
          :to="{ name: 'category', params: { category: 'men' } }"
          >Men</router-link
        >
      </li>
      /
      <li class="nav__item">
        <router-link
          :class="{ active: route.params.category === 'women' }"
          :to="{ name: 'category', params: { category: 'women' } }"
          >Women</router-link
        >
      </li>
    </ul>
  </nav>
</template>
<style lang="scss">
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: nav;
  &__items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    list-style: none;
  }
  &__item {
    a {
      color: #ccc;
      text-decoration: none;
    }
    .active {
      color: #3f3f3f;
    }
  }
}
</style>
