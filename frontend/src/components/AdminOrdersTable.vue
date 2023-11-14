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
      <div class="order-details__header">
        <button @click="selectedOrderId = null" class="order-details__back">
          <i class="fa-solid fa-arrow-left-long"></i>
        </button>
        <span>ORDER #{{ orderDetailsGrouped.id }}</span>
        <button
          v-if="!orderDetails.isDelivered"
          class="order-details__delivery"
          @click="deliverOrderHandler(orderDetailsGrouped.id)"
        >
          Mark As Delivered
        </button>
        <span v-else></span>
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
<style lang="scss">
.table {
  &--orders {
    .table__headers {
      grid-template-columns: 22% 22% 12% 10% 12% 12% 10%;
    }
    .table__columns {
      grid-template-columns: 22% 22% 12% 10% 12% 12% 10%;
    }
    .table__column {
      text-align: center;
    }
    .orders-button {
      &--details {
        display: inline-block;
        padding: 0.5rem 1rem;
        color: #3f3f3f;
        background-color: #fff;
        border: 1px solid #3f3f3f;
        border-bottom-width: 0.25rem;
        border-radius: 0.5rem;
        transition: all 0.1s ease-in-out;
        &:hover {
          color: #fff;
          background-color: #3f3f3f;
        }
      }
    }
    .status-negative {
      justify-self: center;
      padding: 0.5rem 1rem;
      color: #ff624c;
      background-color: #ffe4e1;
      border-radius: 0.5rem;
    }
  }
}
.order-details {
  display: flex;
  flex-direction: column;
  gap: 6rem;
  &__header {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
    span {
      justify-self: center;
      font-size: 2rem;
    }
  }
  &__back {
    position: relative;
    width: 4rem;
    height: 4rem;
    font-size: 2rem;
    border: 1px solid #3f3f3f;
    border-radius: 100%;
    &::before {
      content: "";
      position: absolute;
      top: 0.5rem;
      left: 0.25rem;
      width: 4rem;
      height: 4rem;
      background-color: #ccc;
      border-radius: 100%;
      z-index: -1;
      transition: all 0.1s ease-in-out;
    }
    &:hover::before {
      top: 0;
      left: 0;
    }
  }
  &__delivery {
    justify-self: end;
    padding: 1rem;
    color: #3f3f3f;
    background-color: #fff;
    border: 1px solid #3f3f3f;
    border-bottom-width: 0.25rem;
    border-radius: 0.5rem;
    transition: all 0.1s ease-in-out;
    &:hover {
      color: #fff;
      background-color: #3f3f3f;
    }
  }
  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr 1FR;
    grid-template-rows: auto;
    grid-template-areas:
      "shipping orderSummary orderItems"
      "payment . orderItems"
      ". . orderItems";
    align-items: start;
    column-gap: 1.5rem;
    row-gap: 4rem;
  }
  &__container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    background-color: #fff;
    border: 1px solid #ccc;
    border-bottom-width: 0.5rem;
    border-radius: 0.5rem;
    &:first-child {
      grid-area: shipping;
    }
    &:nth-child(2) {
      grid-area: orderSummary;
      .order-details__value {
        text-align: right;
      }
    }
    &:nth-child(3) {
      grid-area: payment;
    }
    &:last-child {
      grid-area: orderItems;
    }
  }
  &__title {
    position: relative;
    padding-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 400;
    text-transform: uppercase;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0.25rem;
      background-color: #ccc;
    }
  }
  &__details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style-type: none;
  }
  &__detail {
    display: flex;
    align-items: center;
  }
  &__label {
    display: inline-block;
    width: 25%;
    font-size: 1rem;
    text-transform: uppercase;
  }
  &__value {
    flex-grow: 1;
    font-size: 0.875rem;
    span {
      display: inline-block;
      width: 50%;
      &:last-child {
        text-align: right;
      }
    }
  }
  &__image {
    width: 4rem;
    margin-right: 2rem;
    height: 5rem;
    object-fit: cover;
    border-radius: 0.4rem;
  }
}
</style>
