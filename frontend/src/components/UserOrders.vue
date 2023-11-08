<script setup lang="ts">
import { useRouter } from "vue-router";

defineProps(["orders"]);

const router = useRouter();

function formatPrice(price) {
  return price.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
  });
}
function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

const showDetailsHandler = (id) => {
  router.push(`/order/${id}`);
};
</script>
<template>
  <div class="my-orders">
    <h4 class="my-orders__header">My Orders</h4>
    <ul class="my-orders__orders">
      <li v-for="order in orders" class="my-orders__order">
        <h4>
          <span
            ><span style="color: #ccc; font-style: italic">#</span>
            {{ order._id }}</span
          >
          <span v-if="order.isPaid" class="my-orders__order--paid">
            <span>Paid</span>
            <i class="fa-solid fa-check"></i>
          </span>
          <span v-else class="my-orders__order--not-paid">
            <span>Not Paid</span>
            <i class="fa-solid fa-xmark"></i>
          </span>
        </h4>
        <ul>
          <ul>
            <li>
              <span>Placed</span><span>{{ formatDate(order.createdAt) }}</span>
            </li>
            <li>
              <span>Delivery</span
              ><span>{{
                order.isDelivered
                  ? formatDate(order.deliveredAt)
                  : "Not Delivered"
              }}</span>
            </li>
          </ul>
          <li>
            <span>Order Total</span
            ><span>{{ formatPrice(order.totalPrice) }}</span>
          </li>
        </ul>
        <button @click="showDetailsHandler(order._id)">Details</button>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
.my-orders {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 44rem;
  color: #3f3f3f;
  &__header {
    padding-bottom: 2rem;
    font-size: 2rem;
    font-weight: 600;
    text-transform: uppercase;
    border-bottom: 0.5rem solid #ccc;
  }
  &__orders {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    list-style-type: none;
  }
  &__order {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    padding: 2rem;
    border: 1px solid #ccc;
    border-bottom-width: 0.5rem;
    border-radius: 0.4rem;
    h4 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1rem;
      font-weight: 600;
      border-bottom: 0.25rem solid #ccc;
      &:first-child {
        font-size: 1.6rem;
      }
    }
    &--paid,
    &--not-paid {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: center;
      padding: 0.25rem 0.5rem;
      font-size: 1rem;
      text-transform: uppercase;
      border: 1px solid #3f3f3f;
      border-bottom-width: 0.25rem;
      border-radius: 0.5rem;
    }
    &--paid {
      background-color: #00ffa3;
    }
    &--not-paid {
      background-color: #ffe601;
    }
    ul {
      display: flex;
      flex-direction: column;
      list-style-type: none;
    }
    li {
      display: flex;
      justify-content: space-between;
    }
    & > ul {
      gap: 2rem;
      & > li {
        font-size: 1.4rem;
        font-weight: 600;
      }
    }
    button {
      padding: 0.4rem 1.4rem;
      font-size: 1.2rem;
      font-weight: 600;
      text-transform: uppercase;
      border: 1px solid #3f3f3f;
      border-bottom-width: 0.25rem;
      border-radius: 0.4rem;
      transition: all 0.1s ease-in-out;
      &:hover {
        color: #fff;
        background-color: #3f3f3f;
      }
      &:active {
        border-color: #484848;
        background-color: #484848;
      }
    }
  }
}
</style>
