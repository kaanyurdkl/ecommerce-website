<script setup lang="ts">
import { ref, computed } from "vue";
import { useProductsStore } from "@/stores/productsStore";
import type { Product, FavoriteProduct } from "@/types/productTypes";

const props = defineProps<{
  product: Product;
}>();

const productStore = useProductsStore();

const favoriteProducts = computed<FavoriteProduct[]>(
  () => productStore.getAllFavoriteProducts
);

const isFavorite = computed<FavoriteProduct | undefined>(() =>
  favoriteProducts.value.find((p) => p.productId === props.product.productId)
);

const itemNumber = ref(1);

const itemTotalPrice = computed(
  () => props.product.productPrice * itemNumber.value
);

const favoritesHandler = () => {
  if (!isFavorite.value) {
    productStore.addNewFavoriteProduct(props.product);
  } else {
    productStore.deleteFavoriteProduct(props.product);
  }
};

const getFormattedPrice = (number: number): string => {
  const isNumber = !isNaN(number);

  if (!isNumber) {
    return "Price not available";
  } else {
    const formattedPrice = new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(Math.abs(number));
    return formattedPrice;
  }
};
</script>

<template>
  <div class="cart-card">
    <img class="cart-card__image" :src="product.productImg" alt="" />
    <div class="cart-card__info">
      <h4 class="cart-cart__header">{{ product.productTitle }}</h4>
      <p class="cart-cart__price">
        {{ getFormattedPrice(product.productPrice) }}
      </p>
      <ul class="cart-card__details">
        <li class="cart-card__detail">
          <span>Product no:</span><span>{{ product.productId }}</span>
        </li>
        <li class="cart-card__detail">
          <span>Total:</span
          ><span>{{ getFormattedPrice(itemTotalPrice) }}</span>
        </li>
      </ul>
    </div>
    <div class="cart-card__actions">
      <span v-if="isFavorite" class="cart-card__icon cart-card__icon--red">
        <i @click="favoritesHandler" class="fa-solid fa-heart"></i>
      </span>
      <span v-else class="cart-card__icon">
        <i @click="favoritesHandler" class="fa-regular fa-heart"></i>
      </span>
      <div class="cart-card__quantity">
        <select v-model="itemNumber">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cart-card {
  display: grid;
  grid-template-columns: 7rem 5rem 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "image details details details"
    "image actions actions actions ";
  gap: 1rem;
  width: 100%;
  @media screen and (max-width: 425px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
      "image details details details"
      "image details details details "
      "actions actions actions actions ";
    &__icon {
      width: 7rem;
    }
  }
  &__image {
    grid-area: image;
    width: 7rem;
    height: 10.5rem;
    object-fit: cover;
  }
  &__info {
    grid-area: details;
  }
  &__header {
    font-size: 1rem;
  }
  &__price {
    font-size: 1rem;
  }
  &__details {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    list-style-type: none;
  }
  &__detail {
    display: flex;
    flex: 1 1 50%;
    max-width: 300px;
    font-size: 0.7rem;
    span {
      flex: 1;
    }
  }
  &__actions {
    grid-area: actions;
    display: grid;
    grid-template-columns: 5rem 1fr;
    gap: 1rem;
    @media screen and (max-width: 425px) {
      grid-template-columns: 7rem 1fr;
    }
  }
  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    font-size: 1.8rem;
    border: 0.01px solid #000;
    i {
      cursor: pointer;
    }
    @media screen and (max-width: 425px) {
      width: unset;
    }
    &--red {
      color: #ff3535;
    }
  }
  &__quantity {
    position: relative;
    select {
      width: 100%;
      height: 100%;
      padding: 1rem;
      color: #222;
      border: 1px solid #222;
      outline: none;
      cursor: pointer;
    }
    i {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
