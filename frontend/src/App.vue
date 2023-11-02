<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import { useAppStore } from "@/stores/appStore";

import Header from "@/components/Header.vue";
import Navigation from "@/components/Navigation.vue";
import Aside from "@/components/Aside.vue";

const appStore = useAppStore();
const route = useRoute();

const isAppReady = computed(() => appStore.getAppState);

onMounted(async () => {
  await appStore.setApp();
});
</script>

<template>
  <div
    v-if="isAppReady"
    :class="{ grid: true, 'grid--aside': route.params?.category }"
  >
    <Header />
    <Navigation v-if="route.name !== 'admin'" />
    <Aside />
    <main>
      <RouterView />
    </main>
  </div>
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

.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    "header"
    "nav"
    "main";
  &--aside {
    grid-template-columns: repeat(7, 1fr);
    grid-template-areas:
      "header header header header header header header"
      "nav nav nav nav nav nav nav"
      "aside main main main main main main";
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-areas:
      "header"
      "nav"
      "main";
  }
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

.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 30rem;
  color: #3f3f3f;
  div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    label {
      font-size: 0.8rem;
      font-weight: 600;
    }
    input:not([type="file"]),
    textarea {
      padding: 0.8rem;
      background-color: #fff;
      border: 1px solid #ccc;
      &::placeholder {
        font-size: 0.8rem;
      }
      &:focus {
        border-color: #3f3f3f;
        outline: none;
      }
    }
    input[type="file"] {
    }
    input[type="submit"] {
      color: #fff;
      background-color: #3f3f3f;
      font-weight: 600;
      transition: background-color 0.1s ease-in-out;
      border: none;
      &:hover {
        background-color: #555;
      }
    }
  }
}
</style>
