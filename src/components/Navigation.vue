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
  margin-top: 2rem;
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
      color: #222;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    .active {
      text-decoration: underline;
    }
  }
}
</style>
