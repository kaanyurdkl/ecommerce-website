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
        <i class="fa-regular fa-heart"></i>
        <i
          :class="{
            'fa-solid': true,
            'fa-heart': true,
            'fa-solid--red': isFavorite,
          }"
        ></i>
      </button>
      <button class="cart-card__remove" @click="cartStore.removeItem(cartItem)">
        <i class="fa-solid fa-trash"></i>
      </button>
      <h4 class="cart-card__header">{{ cartItem.name }}</h4>
      <div>
        <p class="cart-card__price">
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
        <i class="fa-solid fa-caret-down"></i>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cart-card {
  position: relative;
  display: grid;
  grid-template-columns: 7rem 5rem 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "image details details details"
    "image actions actions actions ";
  row-gap: 2rem;
  column-gap: 2.5rem;
  width: 100%;
  padding: 1.5rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-bottom-width: 0.5rem;
  border-radius: 0.5rem;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 1.5rem;
    width: 7rem;
    height: 10.5rem;
    background-color: #3f3f3f;
    border-radius: 0.4rem;
    transform-origin: center;
    rotate: 10deg;
    translate: 0 -50%;
    z-index: -1;
  }

  &__favorite {
    position: absolute;
    top: 0;
    right: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.6rem;
    padding: 0.5rem;
    color: #3f3f3f;
    background-color: #ffb2e0;
    font-size: 1.75rem;
    font-weight: 600;
    border: 1px solid #3f3f3f;
    border-bottom-width: 0.25rem;
    border-radius: 0.5rem;
    .fa-regular {
      z-index: 2;
    }
    .fa-solid {
      position: absolute;
      top: 50%;
      left: 50%;
      transform-origin: center;
      translate: -50% -50%;
      color: #fff;
      z-index: 1;
      &--red {
        color: #ff6e6e;
      }
    }
    &:hover {
      background-color: #ffc5e8;
    }
    &:active {
      background-color: #fdd7ee;
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
    padding: 0.5rem;
    color: #3f3f3f;
    background-color: #ff6c5a;
    font-size: 1.75rem;
    font-weight: 600;
    border: 1px solid #3f3f3f;
    border-bottom-width: 0.25rem;
    border-radius: 0.5rem;
    &:hover {
      background-color: #fb7e6d;
    }
    &:active {
      background-color: #ff9688;
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
    align-self: center;
  }
  &__info {
    position: relative;
    grid-area: details;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    & > div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
  &__header {
    font-size: 1.25rem;
    font-weight: 400;
  }
  &__price {
    font-size: 1.25rem;
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
    font-size: 0.75rem;
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
      font-size: 1.25rem;
      border: 1px solid #3f3f3f;
      border-bottom-width: 0.25rem;
      border-radius: 0.4rem;
      outline: none;
      cursor: pointer;
      &:hover {
        color: #fff;
        background-color: #3f3f3f;
        & + i {
          color: #fff;
        }
      }
    }
    i {
      position: absolute;
      top: 50%;
      right: 1rem;
      font-size: 2rem;
      transform: translateY(-50%);
    }
  }
}
</style>
