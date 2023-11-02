<script setup lang="ts">
import { ref } from "vue";

const selectedPaymentMethod = ref("paypal");
</script>
<template>
  <div class="payment__container payment-method">
    <h3>Payment Method</h3>
    <div>
      <label for="paypal">
        <i
          v-if="selectedPaymentMethod === 'paypal'"
          class="fa-solid fa-circle"
        ></i>
        <i v-else class="fa-regular fa-circle"></i>
        <i class="fa-brands fa-paypal"></i>
        <span>Paypal</span>
      </label>
      <input
        type="radio"
        id="paypal"
        value="paypal"
        v-model="selectedPaymentMethod"
      />
    </div>
  </div>
</template>
<style lang="scss">
.payment-method {
  label {
    display: flex;
    gap: 1.4rem;
    font-size: 0.875rem;
    align-items: center;
    i {
      font-size: 1.2rem;
      &:nth-child(2) {
        padding: 0.4rem;
        font-size: 1.6rem;
        border: 1px solid #3f3f3f;
      }
    }
  }
  input {
    display: none;
  }
}
</style>
