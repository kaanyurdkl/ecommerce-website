<script setup lang="ts">
import { onMounted, ref } from "vue";
import { loadScript } from "@paypal/paypal-js";

import { useOrdersStore } from "@/stores/ordersStore";
import axios from "axios";

const props = defineProps<{
  id: String;
}>();

const ordersStore = useOrdersStore();

const orderDetails = ref(null);
const paypal = ref(null);

onMounted(async () => {
  orderDetails.value = await ordersStore.getOrderDetails(props.id);
  paypal.value = await loadScript({
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  });

  if (paypal.value) {
    await paypal.value
      .Buttons({
        createOrder(data, actions) {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: { value: orderDetails.value.totalPrice },
                },
              ],
            })
            .then((orderID) => {
              return orderID;
            });
        },
        async onApprove(data, actions) {
          return actions.order.capture().then(async function (details) {
            try {
              await axios.put(
                `http://localhost:8000/api/orders/${props.id}/pay`,
                {
                  ...details,
                }
              );
              orderDetails.value = await ordersStore.getOrderDetails(props.id);
            } catch (err) {
              console.log(err);
            }
          });
        },
        onError(err) {
          console.log(err.message);
        },
      })
      .render(".paypal-buttons-container");
  }
});
</script>

<template>
  <section class="heading">
    <h2>Order</h2>
  </section>
  <section class="paypal-buttons-container"></section>
  <section class="order">{{ orderDetails }}</section>
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
