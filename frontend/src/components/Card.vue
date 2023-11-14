<script setup lang="ts">
import { computed } from "vue";
import { useProductsStore } from "@/stores/productsStore";
import { useCartStore } from "@/stores/cartStore";
import type { Product, FavoriteProduct } from "@/types/productTypes";

const props = defineProps<{
  product: Product;
}>();

const productStore = useProductsStore();
const cartStore = useCartStore();

const isFavorite = computed<FavoriteProduct | undefined>(() =>
  productStore.favoriteProducts.find((p) => p._id === props.product._id)
);

const favoritesHandler = (): void => {
  if (!isFavorite.value) {
    productStore.addNewFavoriteProduct(props.product);
  } else {
    productStore.deleteFavoriteProduct(props.product);
  }
};

function formatPrice(price: number): string {
  return price.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
  });
}

const addToCart = (): void => {
  cartStore.addItem({ ...props.product, quantity: 1 });
};
</script>

<template>
  <div class="card">
    <div class="card__top">
      <router-link :to="{ name: 'productDetail', params: { id: product._id } }">
        <img
          class="card__image"
          :src="`http://localhost:8000${product.image}`"
          alt="Clothe image"
          title="Tshirt"
        />
      </router-link>
      <span v-if="isFavorite" class="card__icon card__icon--red">
        <i @click="favoritesHandler" class="fa-solid fa-heart"></i>
      </span>
      <span v-else class="card__icon">
        <i @click="favoritesHandler" class="fa-regular fa-heart"></i>
      </span>
    </div>
    <div class="card__bottom">
      <div class="card__price-title">
        <router-link
          :to="{ name: 'productDetail', params: { id: product._id } }"
        >
          <h3 class="card__title">{{ product.name }}</h3></router-link
        >
        <span class="card__price">{{ formatPrice(product.price) }}</span>
      </div>
      <button @click="addToCart" class="card__button">Add To Cart</button>
    </div>
  </div>
</template>

<style lang="scss">
.card {
  position: relative;
  color: #3f3f3f;
  background-color: #fff;
  width: 100%;
  max-width: 24rem;
  height: 30rem;
  border: 1px solid #ccc;
  border-bottom-width: 0.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #3f3f3f;
  }

  // Top part of the card
  &__top {
    position: relative;
    height: 80%;
    transition: height 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      height: 100%;
    }
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
    &:hover {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  &__icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.2rem;
    height: 2.2rem;
    background-color: #ffffff66;
    font-size: 1.4rem;
    border-radius: 100%;
    cursor: pointer;
    &--red {
      color: #ff3535;
    }
  }

  // Bottom part of the card
  &__bottom {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8rem;
    height: 20%;
    padding: 0 1rem;
    overflow: hidden;
  }
  &__price-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    a {
      color: #3f3f3f;
      text-decoration: none;
    }
  }
  &__title {
    font-size: 1rem;
    font-weight: 600;
    &:hover {
      text-decoration: underline;
    }
  }
  &__price {
    font-size: 1rem;
    font-weight: 600;
  }
  &__button {
    width: max-content;
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
    font-weight: 600;
    background-color: #fff;
    border: 1px solid #3f3f3f;
    border-radius: 2rem;
    &:hover {
      color: #fff;
      background-color: #3f3f3f;
    }
    &:active {
      color: #fff;
      background-color: #484848;
    }
  }
}
</style>
