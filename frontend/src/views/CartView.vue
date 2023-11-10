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
  <Empty
    v-if="!cartStore.cartItems.length"
    :heading="'Your Cart is Empty!'"
    :message="'Looks like you haven\'t added anything to your cart yet'"
    :route-to="'home'"
    :route-label="'Start Shopping'"
  />
  <section v-if="cartStore.cartItems.length" class="cart">
    <div class="cart__container cart-products">
      <ul class="cart__items">
        <li v-for="cartItem in cartStore.cartItems" class="cart__item">
          <CartCard :cart-item="cartItem" />
        </li>
      </ul>
    </div>
    <div class="cart__container cart-summary">
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
  @media screen and (min-width: 1024px) {
    display: flex;
    gap: 2rem;
  }
  @media screen and (max-width: 425px) {
    padding: 0;
  }
  &__container {
    height: fit-content;
  }
  &-products {
    flex: 3;
  }
  &__items {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    list-style: none;
  }
  &-summary {
    padding: 2rem;
    flex: 2;
    border: 1px solid #ccc;
    border-bottom-width: 0.5rem;
    border-radius: 0.5rem;
    @media screen and (max-width: 1024px) {
      width: 100%;
    }
    &__title {
      margin-bottom: 2rem;
      text-transform: uppercase;
      font-weight: 400;
    }
    &__fees {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 2rem 0;
      border-top: 0.25rem solid #ccc;
      list-style: none;
    }
    &__fee {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.875rem;
      font-weight: 300;
      text-transform: uppercase;
    }
    &__total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding: 1rem 0;
      font-size: 1.25rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    &__checkout {
      width: 100%;
      padding: 0.75rem 1.4rem;
      font-size: 1.25rem;
      text-transform: uppercase;
      border: 1px solid #3f3f3f;
      border-bottom-width: 0.25rem;
      border-radius: 0.4rem;
      transition: all 0.1s ease-in-out;
      &:hover {
        color: #fff;
        background-color: #3f3f3f;
      }
      &:active {
        border-color: #484848;
        background-color: #484848;
      }
    }
  }
}
</style>
