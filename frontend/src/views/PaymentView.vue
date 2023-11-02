<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useCartStore } from "@/stores/cartStore";

const router = useRouter();
const cartStore = useCartStore();

const paymentMethod = ref("PayPal");

const submitHandler = (e) => {
  e.preventDefault();
  router.push("/placeorder");
};

onMounted(() => {
  if (Object.keys(cartStore.shippingAddress).length === 0) {
    router.push("/shipping");
  }
});
</script>

<template>
  <section class="heading">
    <h2>Payment</h2>
  </section>
  <section class="payment">
    <form @submit="submitHandler">
      <div>
        <label for="paypal">PayPal</label>
        <input
          type="radio"
          name="paymentMethod"
          v-model="paymentMethod"
          value="PayPal"
          id="paypal"
        />
      </div>
      <div>
        <input type="submit" value="Continue" />
      </div>
    </form>
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
.payment {
  max-width: 75rem;
  padding: 2rem;
  margin: auto;
}
</style>
