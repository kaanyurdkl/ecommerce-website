<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import { useAppStore } from "@/stores/appStore";

import Header from "@/components/Header.vue";
import Navigation from "@/components/Navigation.vue";
import Aside from "@/components/Aside.vue";

const route = useRoute();
const appStore = useAppStore();

onMounted(async () => {
  await appStore.setApp();
});
</script>

<template>
  <div
    v-if="appStore.isAppReady"
    :class="{ grid: true, 'grid--aside': route.params?.category }"
  >
    <Header />
    <Navigation
      v-if="
        route.name === 'home' ||
        route.name === 'category' ||
        route.name === 'products'
      "
    />
    <Aside />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: "Anton";
  src: local("Anton"),
    url("./assets/fonts/Anton-Regular.ttf") format("truetype");
}

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

body {
  font-family: "Anton";
  box-sizing: border-box;
  color: #3f3f3f;
  background-color: #f8f5f1;
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
  grid-area: main;
  width: 100%;
  max-width: 75rem;
  margin: 0 auto;
  padding: 2rem;
}

.v-toolbar {
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 1;
}

.heading {
  margin-bottom: 4rem;
  text-transform: uppercase;
  h2 {
    font-size: 3rem;
  }
  @media screen and (max-width: 768px) {
    text-align: center;
  }
  @media screen and (max-width: 425px) {
    font-size: 1.2rem;
    text-align: center;
  }
}

.form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 2rem;
  row-gap: 4rem;
  color: #3f3f3f;
  div {
    position: relative;
    align-self: start;
    &:has(input[type="submit"]) {
      display: flex;
      justify-content: space-between;
    }

    &:has(input[type="text"])::before,
    &:has(textarea)::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #ccc;
      border-radius: 0.5rem;
      transform-origin: center;
      transition: all 0.2s ease-in-out;
      z-index: -1;
    }
    &:has(> textarea)::before {
      height: 94%;
    }
    &:has(> input:focus)::before,
    &:has(> textarea:focus)::before {
      rotate: -8deg;
    }

    input:not([type="file"], [type="submit"], [type="button"]),
    textarea {
      width: 100%;
      padding: 0.5rem;
      padding-top: 2rem;
      background-color: #fff;
      border: 1px solid #ccc;
      border-bottom-width: 0.25rem;
      border-radius: 0.5rem;
    }
    input:not([type="file"]) {
      &:focus {
        border-color: #3f3f3f;
        outline: none;
        & + label {
          translate: 0 -120%;
        }
      }
    }
    textarea {
      height: 10rem;
      &:focus {
        border-color: #3f3f3f;
        outline: none;
        & + label {
          translate: 0 -180%;
        }
      }
    }
    input[type="file"]::file-selector-button {
      padding: 1rem;
      color: #3f3f3f;
      background-color: #fff;
      border: 1px solid #ccc;
      border-bottom-width: 0.25rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.1s ease-in-out;
      &:hover {
        color: #fff;
        background-color: #3f3f3f;
        border-color: #3f3f3f;
      }
    }
    input[type="submit"],
    input[type="button"] {
      width: 40%;
      padding: 0.5rem 0;
      color: #3f3f3f;
      background-color: #fff;
      border: 1px solid #3f3f3f;
      border-bottom-width: 0.25rem;
      border-radius: 0.5rem;
      transition: background-color 0.1s ease-in-out;
      &:hover {
        color: #fff;
        background-color: #3f3f3f;
      }
    }

    input[type="text"] + label,
    textarea + label {
      position: absolute;
      left: 0.5rem;
      translate: 0 -50%;
      color: #ccc;
      text-transform: uppercase;
      transition: translate 0.2s ease-in-out;
      pointer-events: none;
    }
    input[type="text"] {
      & + label {
        top: 50%;
      }
      &:valid + label {
        translate: 0 -120%;
      }
    }
    textarea {
      & + label {
        top: 30%;
      }
      &:valid + label {
        translate: 0 -180%;
      }
    }

    &:has(> input[type="file"]) {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      label {
        text-transform: uppercase;
      }
    }
  }
}
</style>
