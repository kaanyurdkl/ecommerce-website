<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

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

onMounted(() => {
  if (Object.keys(cartStore.shippingAddress).length === 0) {
    router.push("/shipping");
  } else if (!cartStore.paymentMethod) {
    router.push("/payment");
  }
});
</script>

<template>
  <section class="heading">Place Order</section>
  <section class="order">
    <button @click="placeOrderHandler">Place Order</button>
  </section>
</template>

<style lang="scss">
.heading {
  max-width: 75rem;
  padding: 2rem;
  margin: auto;
  font-size: 2rem;
  text-transform: uppercase;
  @media screen and (max-width: 768px) {
    text-align: center;
  }
  @media screen and (max-width: 425px) {
    font-size: 1.2rem;
    text-align: center;
  }
}
</style>
