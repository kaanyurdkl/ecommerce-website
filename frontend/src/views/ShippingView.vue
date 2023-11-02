<script setup lang="ts">
// import { useRouter } from "vue-router";

import PaymentDelivery from "@/components/PaymentDelivery.vue";
import PaymentMethod from "@/components/PaymentMethod.vue";
import PaymentOrderSummary from "@/components/PaymentOrderSummary.vue";

// const router = useRouter();

/* const submitHandler = (e) => {
  e.preventDefault();
  cartStore.saveShippingAddress(newShippingAddress.value);
  router.push("/payment");
}; */
</script>

<template>
  <section class="payment">
    <div class="payment__left">
      <PaymentDelivery />
      <PaymentMethod />
      <button>Confirm Order</button>
    </div>
    <div class="payment__right">
      <PaymentOrderSummary />
    </div>
    <!-- <form @submit="submitHandler">
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
    </form> -->
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
