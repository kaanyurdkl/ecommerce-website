<script setup lang="ts">
import { useRouter } from "vue-router";

import PaymentDelivery from "@/components/PaymentDelivery.vue";
import PaymentMethod from "@/components/PaymentMethod.vue";
import PaymentOrderSummary from "@/components/PaymentOrderSummary.vue";

import { useCartStore } from "@/stores/cartStore";
import { useOrdersStore } from "@/stores/ordersStore";

const router = useRouter();

const cartStore = useCartStore();
const ordersStore = useOrdersStore();

const placeOrderHandler = async () => {
  try {
    const res = await ordersStore.createOrder({
      orderItems: cartStore.cartItems,
      shippingAddress: cartStore.shippingAddress,
      paymentMethod: cartStore.paymentMethod,
      itemsPrice: cartStore.itemsPrice,
      shippingPrice: cartStore.shippingPrice,
      taxPrice: cartStore.taxPrice,
      totalPrice: cartStore.totalPrice,
    });
    cartStore.clearCartItems();
    router.push(`/order/${res._id}`);
  } catch (err) {}
};
</script>

<template>
  <section class="payment">
    <div class="payment__left">
      <PaymentDelivery :shipping-address="cartStore.shippingAddress" />
      <PaymentMethod />
      <button v-if="cartStore.shippingAddress" @click="placeOrderHandler">
        Place Order
      </button>
    </div>
    <div class="payment__right">
      <PaymentOrderSummary
        :items="cartStore.cartItems"
        :items-price="cartStore.itemsPrice"
        :shipping-price="cartStore.shippingPrice"
        :tax-price="cartStore.taxPrice"
        :total-price="cartStore.totalPrice"
      />
    </div>
  </section>
</template>

<style lang="scss">
.payment {
  display: flex;
  justify-content: space-between;
  max-width: 75rem;
  margin: auto;
  padding: 2rem;
  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    border: 1px solid #ccc;
    button {
      padding: 0.4rem 1.6rem;
      color: #fff;
      background-color: #3f3f3f;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      &:hover {
        background-color: #555;
      }
      &:active {
        background-color: #484848;
      }
    }
    h3 {
      font-size: 1rem;
    }
    p {
      font-size: 0.875rem;
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      list-style-type: none;
    }
  }
  &__left {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    width: 40rem;
    button {
      padding: 0.4rem 1.6rem;
      color: #fff;
      background-color: #3f3f3f;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      &:hover {
        background-color: #555;
      }
      &:active {
        background-color: #484848;
      }
    }
  }
  &__right {
    width: 24rem;
  }
}
</style>
