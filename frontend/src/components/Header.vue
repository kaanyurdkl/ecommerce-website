<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useUsersStore } from "@/stores/usersStore";
import { useProductsStore } from "@/stores/productsStore";
import { useCartStore } from "@/stores/cartStore";

const route = useRoute();

const usersStore = useUsersStore();
const productsStore = useProductsStore();
const cartStore = useCartStore();

const authUser = computed(() => usersStore.getAuthUser);

const numberOfCartItems = computed<number>(() => cartStore.numberOfItems);
</script>
<template>
  <header class="header">
    <router-link class="header__logo" :to="{ name: 'home' }">
      <img src="@/assets/logo.svg" alt="Logo" />
    </router-link>
    <ul class="header__links">
      <li
        :class="{
          header__link: true,
          'header__link--active': route.name === 'favorites',
        }"
      >
        <router-link :to="{ name: 'favorites' }">
          <i class="header__link-icon fa-solid fa-heart"></i>
          <span class="header__link-text">
            <span> Favourites </span>
            <span v-if="productsStore.favoriteProducts.length"
              >({{ productsStore.favoriteProducts.length }})</span
            >
          </span>
        </router-link>
      </li>
      <li
        :class="{
          header__link: true,
          'header__link--active': route.name === 'cart',
        }"
      >
        <router-link :to="{ name: 'cart' }">
          <i class="header__link-icon fa-solid fa-cart-shopping"></i>
          <span class="header__link-text">
            <span> Cart </span>
            <span v-if="numberOfCartItems">({{ numberOfCartItems }})</span>
          </span>
        </router-link>
      </li>
      <li
        :class="{
          header__link: true,
          'header__link--active': route.name === 'user',
        }"
      >
        <router-link :to="{ name: 'user' }">
          <i class="header__link-icon fa-solid fa-user"></i>
          <span class="header__link-text">
            <span> {{ authUser ? "My Account" : "Sign In" }} </span>
          </span>
        </router-link>
      </li>
      <li v-if="authUser" class="header__link">
        <router-link :to="{ name: 'logout' }">
          <i class="header__link-icon fa-solid fa-user"></i>
          <span class="header__link-text">
            <span> Sign Out </span>
          </span>
        </router-link>
      </li>
    </ul>
  </header>
</template>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  padding: 0 2rem;
  grid-area: header;
  &__logo {
    height: 36px;
  }
  &__links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    list-style-type: none;
  }
  &__link {
    position: relative;
    padding: 0.5rem 0.875rem;
    border: 1px solid transparent;
    border-bottom-width: 0.25rem;
    border-radius: 0.5rem;
    &::after {
      display: none;
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 70%;
      background-color: #ccc;
      border-radius: 0.5rem;
      transform-origin: center;
      translate: 0 -50%;
    }
    &--active {
      background-color: #fff;
      border-color: #3f3f3f;
      &::after {
        display: inline-block;
      }
    }
    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      color: #3f3f3f;
      font-size: 0.875rem;
      text-decoration: none;
    }
    &-icon {
      display: flex;
      align-items: center;
      z-index: 1;
    }
    &-text {
      z-index: 1;
      & > span:first-child {
        @media screen and (max-width: 768px) {
          display: none;
        }
      }
    }
  }
}
</style>
