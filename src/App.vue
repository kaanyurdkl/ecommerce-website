<script setup lang="ts">
import { onMounted } from "vue";
import { useProductsStore } from "@/stores/productsStore";
import Header from "@/components/Header.vue";
import Navigation from "@/components/Navigation.vue";
import Aside from "@/components/Aside.vue";

const store = useProductsStore();

onMounted(() => {
  store.setProducts();
});
</script>

<template>
  <Header />
  <Navigation />
  <Aside />
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

body {
  font-family: sans-serif;
  box-sizing: border-box;
  background-color: #fff;
}

#app {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    "header header header header header header header"
    "nav nav nav nav nav nav nav"
    "aside main main main main main main";
}

main {
  margin-top: 2rem;
  grid-area: main;
}

.v-toolbar {
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
