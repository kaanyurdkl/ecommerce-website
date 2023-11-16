<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";

import { useCartStore } from "@/stores/cartStore";

const props = defineProps(["shippingAddress"]);

const route = useRoute();

const cartStore = useCartStore();

const isEditingDeliveryAddress = ref(!props.shippingAddress);
const newShippingAddress = reactive(
  props.shippingAddress
    ? { ...props.shippingAddress }
    : {
        address: null,
        city: null,
        postalCode: null,
        country: null,
      }
);

const saveHandler = (e) => {
  e.preventDefault();
  isEditingDeliveryAddress.value = false;
  cartStore.saveShippingAddress(newShippingAddress);
};

const closeHandler = (e) => {
  e.preventDefault();
  isEditingDeliveryAddress.value = false;

  newShippingAddress.address = props.shippingAddress
    ? props.shippingAddress.address
    : null;
  newShippingAddress.city = props.shippingAddress
    ? props.shippingAddress.city
    : null;
  newShippingAddress.postalCode = props.shippingAddress
    ? props.shippingAddress.postalCode
    : null;
  newShippingAddress.country = props.shippingAddress
    ? props.shippingAddress.country
    : null;
};
</script>
<template>
  <div class="payment__container shipping-address">
    <button
      v-if="route.name === 'placeorder' && !isEditingDeliveryAddress"
      class="shipping-address__edit"
      @click="isEditingDeliveryAddress = !isEditingDeliveryAddress"
    >
      Edit
    </button>
    <h3>Delivery Address</h3>
    <p v-if="!isEditingDeliveryAddress">
      {{ shippingAddress.address }}, {{ shippingAddress.city }},
      {{ shippingAddress.postalCode }}, {{ shippingAddress.country }}
    </p>
    <form v-if="isEditingDeliveryAddress" @submit="saveHandler">
      <div>
        <label for="address">Address</label>
        <input
          v-model="newShippingAddress.address"
          type="text"
          placeholder="Enter your address"
          id="address"
          required
        />
      </div>
      <div>
        <label for="city">City</label>
        <input
          v-model="newShippingAddress.city"
          type="text"
          placeholder="Enter your address"
          id="city"
          required
        />
      </div>
      <div>
        <label for="postalCode">Postal Code</label>
        <input
          v-model="newShippingAddress.postalCode"
          type="text"
          placeholder="Enter your address"
          id="postalCode"
          required
        />
      </div>
      <div>
        <label for="country">Country</label>
        <input
          v-model="newShippingAddress.country"
          type="text"
          placeholder="Enter your address"
          id="country"
          required
        />
      </div>
      <div>
        <button class="shipping-address__save">Save</button>
        <button class="shipping-address__save" @click="closeHandler">
          Cancel
        </button>
      </div>
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
    padding: 0.25rem 1.4rem;
    font-size: 0.875rem;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    div {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      label {
        font-size: 0.875rem;
        text-transform: uppercase;
      }
      input {
        padding: 1rem;
        color: #3f3f3f;
        font-size: 1rem;
        font-weight: 400;
        border: 1px solid #ccc;
        border-bottom-width: 0.25rem;
        border-radius: 0.5rem;
        outline: none;
        &:focus {
          border-color: #3f3f3f;
        }
      }
      &:last-child {
        flex-direction: row;
        button {
          flex: 1;
        }
      }
    }
  }
}
</style>
