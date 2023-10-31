<script setup lang="ts">
import { ref, computed } from "vue";

import { useOrdersStore } from "@/stores/ordersStore";

const props = defineProps(["orders"]);
const emit = defineEmits(["update:orders"]);

const ordersStore = useOrdersStore();

const ordersHeaders = [
  "Id",
  "Name",
  "Created At",
  "Total",
  "Payment",
  "Delivery",
  "",
];

const selectedOrderId = ref(null);

const orderDetails = computed(() =>
  props.orders?.find((order) => order._id === selectedOrderId.value)
);
const orderDetailsGrouped = computed(() => {
  return {
    id: orderDetails.value._id,
    content: {
      Shipping: {
        Name: orderDetails.value.user.name,
        Email: orderDetails.value.user.email,
        Address: `${orderDetails.value.shippingAddress.address}, ${orderDetails.value.shippingAddress.city}, ${orderDetails.value.shippingAddress.country}, ${orderDetails.value.shippingAddress.postalCode}`,
        Status: orderDetails.value.isDelivered
          ? `Delivered at ${formatDate(orderDetails.value.deliveredAt)}`
          : "Not Delivered",
      },
      "Order Summary": {
        Items: formatPrice(orderDetails.value.itemsPrice),
        Shipping: formatPrice(orderDetails.value.shippingPrice),
        Tax: formatPrice(orderDetails.value.taxPrice),
        Total: formatPrice(orderDetails.value.totalPrice),
      },
      Payment: {
        Mathod: orderDetails.value.paymentMethod,
        Status: orderDetails.value.isPaid
          ? `Paid at ${formatDate(orderDetails.value.paidAt)}`
          : "Not paid",
      },
      "Order Items": orderDetails.value.orderItems,
    },
  };
});

const deliverOrderHandler = async (id) => {
  await ordersStore.deliverOrder(id);
  emit("update:orders", await ordersStore.getAllOrders());
};

function formatPrice(price) {
  return price.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
  });
}
function formatDate(date) {
  return new Date(date).toLocaleDateString();
}
</script>
<template>
  <div class="table table--orders">
    <div v-if="selectedOrderId" class="order-details">
      <button @click="selectedOrderId = null" class="order-details__back">
        <i class="fa-solid fa-arrow-left-long"></i>
      </button>
      <div class="order-details__header">
        <span>Order #{{ orderDetailsGrouped.id }}</span>
        <button
          v-if="!orderDetails.isDelivered"
          @click="deliverOrderHandler(orderDetailsGrouped.id)"
        >
          Mark As Delivered
        </button>
      </div>
      <div class="order-details__content">
        <div
          v-for="(
            detailsValue, detailsKey, index
          ) in orderDetailsGrouped.content"
          class="order-details__container"
        >
          <h3 class="order-details__title">{{ detailsKey }}</h3>
          <ul class="order-details__details">
            <li
              v-if="detailsKey !== 'Order Items'"
              v-for="(detailValue, detailKey, index) in detailsValue"
              class="order-details__detail"
            >
              <span class="order-details__label">{{ detailKey }}</span>
              <span class="order-details__value">{{ detailValue }}</span>
            </li>
            <li v-else>
              <ul class="order-details__details">
                <li
                  v-for="{ image, name, quantity, price } in detailsValue"
                  class="order-details__detail"
                >
                  <img
                    :src="`http://localhost:8000${image}`"
                    class="order-details__image"
                  />
                  <span class="order-details__value">
                    <span>
                      {{ name }}
                    </span>
                    <span>{{ quantity }} x {{ formatPrice(price) }}</span>
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ul v-if="!selectedOrderId" class="table__headers">
      <li v-for="header in ordersHeaders" class="table__header">
        {{ header }}
      </li>
    </ul>
    <ul v-if="!selectedOrderId" class="table__rows">
      <li v-for="order in orders" class="table__row">
        <ul class="table__columns">
          <li class="table__column">{{ order._id }}</li>
          <li class="table__column">
            {{ order.user.name }}
          </li>
          <li class="table__column">
            {{ formatDate(order.createdAt) }}
          </li>
          <li class="table__column">
            {{ formatPrice(order.totalPrice) }}
          </li>
          <li
            :class="{ table__column: true, 'status-negative': !order.isPaid }"
          >
            {{ order.isPaid ? formatDate(order.paidAt) : "Not Paid" }}
          </li>
          <li
            :class="{
              table__column: true,
              'status-negative': !order.isDelivered,
            }"
          >
            {{
              order.isDelivered
                ? formatDate(order.deliveredAt)
                : "Not Delivered"
            }}
          </li>
          <li class="table__column">
            <button
              class="orders-button--details"
              @click="selectedOrderId = order._id"
            >
              Details
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
