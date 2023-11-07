<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useProductsStore } from "@/stores/productsStore";
import { useCartStore } from "@/stores/cartStore";
import type { FavoriteProduct } from "@/types/productTypes";
import type { CartItem } from "@/types/cartTypes";

const props = defineProps<{
  cartItem: CartItem;
}>();

const productStore = useProductsStore();
const cartStore = useCartStore();

const isFavorite = computed<FavoriteProduct | undefined>(() =>
  productStore.favoriteProducts.find((p) => p._id === props.cartItem._id)
);

const itemQuantity = ref(props.cartItem.quantity);

watch(itemQuantity, (newVal) => {
  cartStore.updateItem({
    ...props.cartItem,
    quantity: Number(newVal),
  });
});

const itemTotalPrice = computed<number>(
  () => props.cartItem.price * itemQuantity.value
);

const favoritesHandler = (): void => {
  if (!isFavorite.value) {
    productStore.addNewFavoriteProduct(props.cartItem);
  } else {
    productStore.deleteFavoriteProduct(props.cartItem);
  }
};

function formatPrice(price: number): string {
  return price.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
  });
}
</script>

<template>
  <div class="cart-card">
    <img
      class="cart-card__image"
      :src="`http://localhost:8000${cartItem.image}`"
    />
    <div class="cart-card__info">
      <button class="cart-card__favorite" @click="favoritesHandler">
        <i
          :class="{
            'fa-solid': true,
            'fa-heart': true,
            'cart-card__favorite--red': isFavorite,
          }"
        ></i>
      </button>
      <button class="cart-card__remove" @click="cartStore.removeItem(cartItem)">
        <i class="fa-solid fa-trash"></i>
      </button>
      <h4 class="cart-cart__header">{{ cartItem.name }}</h4>
      <p class="cart-cart__price">
        {{ formatPrice(cartItem.price) }}
      </p>
      <ul class="cart-card__details">
        <li class="cart-card__detail">
          <span>Product no:</span><span>{{ cartItem._id }}</span>
        </li>
        <li class="cart-card__detail">
          <span>Total:</span><span>{{ formatPrice(itemTotalPrice) }}</span>
        </li>
      </ul>
    </div>
    <div class="cart-card__actions">
      <div class="cart-card__quantity">
        <select v-model="itemQuantity">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
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

  &__favorite {
    position: absolute;
    top: 0;
    right: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.6rem;
    padding: 0.75rem;
    color: #fff;
    background-color: #ffc6c6;
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: 0.2rem;
    &:hover {
      background-color: #ffd2d2;
    }
    &:active {
      background-color: #fdcdcd;
    }
    &--red {
      color: #ff3535;
    }
  }
  &__remove {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.6rem;
    padding: 0.75rem;
    color: #fff;
    background-color: #3f3f3f;
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: 0.2rem;
    &:hover {
      background-color: #555;
    }
    &:active {
      background-color: #484848;
    }
  }
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
    border-radius: 0.4rem;
  }
  &__info {
    position: relative;
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
  }
  &__quantity {
    position: relative;
    select {
      color: #3f3f3f;
      width: 100%;
      height: 100%;
      padding: 1rem;
      border: 1px solid #3f3f3f;
      border-radius: 0.4rem;
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
