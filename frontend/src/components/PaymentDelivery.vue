<script setup lang="ts">
import { ref, reactive, computed } from "vue";

import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();

const isEditingDeliveryAddress = ref(false);
const shippingAddress = computed(() => cartStore.getShippingAddress);
const newShippingAddress = reactive(
  shippingAddress.value
    ? shippingAddress.value
    : {
        address: null,
        city: null,
        postalCode: null,
        country: null,
      }
);

const saveAddressHandler = (e) => {
  e.preventDefault();
  isEditingDeliveryAddress.value = false;
  cartStore.saveShippingAddress(newShippingAddress);
};
</script>
<template>
  <div class="payment__container shipping-address">
    <button
      v-if="shippingAddress && !isEditingDeliveryAddress"
      class="shipping-address__edit"
      @click="isEditingDeliveryAddress = !isEditingDeliveryAddress"
    >
      Edit
    </button>
    <h3>Delivery Address</h3>
    <p v-if="shippingAddress && !isEditingDeliveryAddress">
      {{ shippingAddress.address }}, {{ shippingAddress.city }},
      {{ shippingAddress.postalCode }}, {{ shippingAddress.country }}
    </p>
    <form v-else @submit="saveAddressHandler">
      <div>
        <label for="address">Address</label>
        <input
          v-model="newShippingAddress.address"
          type="text"
          placeholder="Enter your address"
          id="address"
        />
      </div>
      <div>
        <label for="city">City</label>
        <input
          v-model="newShippingAddress.city"
          type="text"
          placeholder="Enter your address"
          id="city"
        />
      </div>
      <div>
        <label for="postalCode">Postal Code</label>
        <input
          v-model="newShippingAddress.postalCode"
          type="text"
          placeholder="Enter your address"
          id="postalCode"
        />
      </div>
      <div>
        <label for="country">Country</label>
        <input
          v-model="newShippingAddress.country"
          type="text"
          placeholder="Enter your address"
          id="country"
        />
      </div>
      <button class="shipping-address__save">Save Address</button>
    </form>
  </div>
</template>
<style lang="scss" scoped>
.shipping-address {
  color: #3f3f3f;
  &__edit {
    position: absolute;
    top: 2rem;
    right: 2rem;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    div {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      label {
        font-size: 0.8rem;
        font-weight: 600;
      }
      input {
        padding: 1rem;
        font-size: 0.875rem;
        border: 1px solid #ccc;
        outline: none;
      }
    }
  }
}
</style>
