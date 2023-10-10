<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();
const router = useRouter();

const address = ref(cartStore.cart.shippingAddress?.address || "");
const city = ref(cartStore.cart.shippingAddress?.city || "");
const postalCode = ref(cartStore.cart.shippingAddress?.postalCode || "");
const country = ref(cartStore.cart.shippingAddress?.country || "");

const submitHandler = (e) => {
  e.preventDefault();
  cartStore.saveShippingAddress({
    address: address.value,
    city: city.value,
    postalCode: postalCode.value,
    country: country.value,
  });
  router.push("/payment");
};
</script>

<template>
  <section class="heading">
    <h2>Shipping</h2>
  </section>
  <section class="shipping">
    <form @submit="submitHandler">
      <div>
        <label for="address">Address :</label>
        <input
          v-model="address"
          type="text"
          id="address"
          placeholder="Enter address"
        />
      </div>
      <div>
        <label for="city">City :</label>
        <input v-model="city" type="text" id="city" placeholder="Enter city" />
      </div>
      <div>
        <label for="postalCode">Postal Code :</label>
        <input
          v-model="postalCode"
          type="text"
          id="postalCode"
          placeholder="Enter postal code"
        />
      </div>
      <div>
        <label for="country">Country :</label>
        <input
          v-model="country"
          type="text"
          id="country"
          placeholder="Enter country"
        />
      </div>
      <div>
        <input type="submit" value="Submit" />
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
</style>
