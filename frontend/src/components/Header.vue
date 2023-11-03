<script setup lang="ts">
import { computed } from "vue";
import { useUsersStore } from "@/stores/usersStore";
import { useProductsStore } from "@/stores/productsStore";
import { useCartStore } from "@/stores/cartStore";

const usersStore = useUsersStore();
const productsStore = useProductsStore();
const cartStore = useCartStore();

const authUser = computed(() => usersStore.getAuthUser);

const countFavorites = computed<number>(
  () => productsStore.getAllFavoriteProducts.length
);

const numberOfCartItems = computed<number>(() => cartStore.numberOfCartItems);
</script>
<template>
  <header class="header">
    <router-link class="header__logo" :to="{ name: 'home' }">
      <img src="@/assets/logo.svg" alt="Logo" />
    </router-link>
    <ul class="header__links">
      <li>
        <router-link class="header__link" :to="{ name: 'favorites' }">
          <i class="header__link-icon fa-solid fa-heart"></i>
          <span class="header__link-text">
            <span> Favourites </span>
            <span v-if="countFavorites">({{ countFavorites }})</span>
          </span>
        </router-link>
      </li>
      <li>
        <router-link class="header__link" :to="{ name: 'cart' }">
          <i class="header__link-icon fa-solid fa-cart-shopping"></i>
          <span class="header__link-text">
            <span> Cart </span>
            <span v-if="numberOfCartItems">({{ numberOfCartItems }})</span>
          </span>
        </router-link>
      </li>
      <li>
        <router-link class="header__link" :to="{ name: 'user' }">
          <i class="header__link-icon fa-solid fa-user"></i>
          <span class="header__link-text">
            <span> {{ authUser ? "My Account" : "Sign In" }} </span>
          </span>
        </router-link>
      </li>
      <li v-if="authUser">
        <router-link class="header__link" :to="{ name: 'logout' }">
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
  background-color: #eee;
  padding: 0 2rem;
  grid-area: header;
  &__logo {
    height: 36px;
  }
  &__links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    list-style-type: none;
  }
  &__link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.4rem;
    color: #222;
    text-decoration: none;
    &-icon {
      display: flex;
      align-items: center;
    }
    &-text {
      font-size: 0.8rem;
      font-weight: 600;
      & > span:first-child {
        @media screen and (max-width: 768px) {
          display: none;
        }
      }
    }
    &:hover {
      .header__link-text {
        text-decoration: underline;
      }
    }
  }
}
</style>
