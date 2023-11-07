<script setup lang="ts">
import { useRouter } from "vue-router";

import { useCartStore } from "@/stores/cartStore";

import CartCard from "@/components/CartCard.vue";
import Empty from "@/components/Empty.vue";

const router = useRouter();
const cartStore = useCartStore();

const submitHandler = () => {
  router.push("/placeorder");
};
</script>

<template>
  <section class="heading">
    <h2>Cart</h2>
  </section>
  <section class="cart">
    <Empty
      v-if="!cartStore.cartItems.length"
      :heading="'Your Cart is Empty!'"
      :message="'Looks like you haven\'t added anything to your cart yet'"
      :route-to="'home'"
      :route-label="'Start Shopping'"
    />
    <div
      v-if="cartStore.cartItems.length"
      class="cart__container cart-products"
    >
      <ul class="cart__items">
        <li v-for="cartItem in cartStore.cartItems" class="cart__item">
          <CartCard :cart-item="cartItem" />
        </li>
      </ul>
    </div>
    <div v-if="cartStore.cartItems.length" class="cart__container cart-summary">
      <h2 class="cart-summary__title">Order Summary</h2>
      <ul class="cart-summary__fees">
        <li class="cart-summary__fee cart-summary__subtotal">
          <span>Subtotal</span><span>${{ cartStore.itemsPrice }}</span>
        </li>
        <li class="cart-summary__fee cart-summary__shipping">
          <span>Shipping</span><span>${{ cartStore.shippingPrice }}</span>
        </li>
        <li class="cart-summary__fee cart-summary__tax">
          <span>Tax</span><span>${{ cartStore.taxPrice }}</span>
        </li>
      </ul>
      <p class="cart-summary__total">
        <span>Total</span><span>${{ cartStore.totalPrice }}</span>
      </p>
      <button @click="submitHandler" class="cart-summary__checkout">
        Checkout
      </button>
    </div>
  </section>
</template>

<style lang="scss">
.cart {
  color: #3f3f3f;
  padding: 2rem 0;
  @media screen and (min-width: 1024px) {
    display: flex;
    gap: 2rem;
  }
  @media screen and (max-width: 425px) {
    padding: 0;
  }
  &__container {
    height: fit-content;
    background-color: #eee;
    border-radius: 0.4rem;
  }
  &-products {
    padding: 1rem;
    flex: 3;
  }
  &__items {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    list-style: none;
  }
  &-summary {
    padding: 1rem;
    flex: 2;
    @media screen and (max-width: 1024px) {
      width: 100%;
    }
    &__title {
      margin-bottom: 2rem;
    }
    &__fees {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem 0;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      list-style: none;
    }
    &__fee {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
      font-weight: 300;
      text-transform: uppercase;
    }
    &__total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding: 1rem 0;
      font-size: 1.2rem;
      font-weight: 600;
      text-transform: uppercase;
      border-bottom: 1px solid #ccc;
    }
    &__checkout {
      width: 100%;
      padding: 1rem 0;
      color: #fff;
      background-color: #3f3f3f;
      font-weight: 600;
      border-radius: 0.4rem;
      &:hover {
        background-color: #555;
      }
      &:active {
        background-color: #484848;
      }
    }
  }
}
</style>
