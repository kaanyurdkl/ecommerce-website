<script setup lang="ts">
import { onMounted, ref } from "vue";
import { loadScript } from "@paypal/paypal-js";

import PaymentDelivery from "@/components/PaymentDelivery.vue";
import PaymentMethod from "@/components/PaymentMethod.vue";
import PaymentOrderSummary from "@/components/PaymentOrderSummary.vue";

import { useOrdersStore } from "@/stores/ordersStore";
import axios from "axios";

const props = defineProps<{
  id: String;
}>();

const ordersStore = useOrdersStore();

const orderDetails = ref(null);
const paypal = ref(null);

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

onMounted(async () => {
  orderDetails.value = await ordersStore.getOrderDetails(props.id);

  if (orderDetails.value.isPaid) return;

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
  <section class="payment">
    <div class="payment__left">
      <div v-if="orderDetails" class="payment__container">
        <h3>Order Id</h3>
        <p>#{{ orderDetails._id }}</p>
      </div>
      <PaymentDelivery
        v-if="orderDetails"
        :shipping-address="orderDetails.shippingAddress"
      />
      <PaymentMethod />
      <div v-if="orderDetails?.isPaid" class="payment__container">
        Paid at {{ formatDate(orderDetails.paidAt) }}
      </div>
      <div v-if="orderDetails?.isDelivered" class="payment__container">
        Delivered at {{ formatDate(orderDetails.deliveredAt) }}
      </div>
      <section
        v-if="!orderDetails?.isPaid"
        class="paypal-buttons-container"
      ></section>
    </div>
    <div class="payment__right">
      <PaymentOrderSummary
        v-if="orderDetails"
        :items="orderDetails.orderItems"
        :items-price="orderDetails.itemsPrice"
        :shipping-price="orderDetails.shippingPrice"
        :tax-price="orderDetails.taxPrice"
        :total-price="orderDetails.totalPrice"
      />
    </div>
  </section>
</template>
