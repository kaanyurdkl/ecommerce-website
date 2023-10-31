<script setup lang="ts">
defineProps(["orders"]);

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
  <div class="user__orders">
    <h3 class="user__header">My Orders</h3>
    <ul class="user__orders-list">
      <li v-for="order in orders" class="user__order">
        <h4>
          <span>Order: {{ order._id }}</span
          ><span>{{ order.isDelivered }}</span>
        </h4>
        <ul>
          <li>
            <span>Placed:</span><span>{{ formatDate(order.createdAt) }}</span>
          </li>
          <li>
            <span>Delivery:</span
            ><span>{{
              order.isDelivered
                ? formatDate(order.deliveredAt)
                : "Not Delivered"
            }}</span>
          </li>
          <li>
            <span>Order Total:</span
            ><span>{{ formatPrice(order.totalPrice) }}</span>
          </li>
        </ul>
        <button>Details</button>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
.user {
  &__orders {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  &__header {
    padding-bottom: 2rem;
    border-bottom: 1px solid #ccc;
  }
  &__orders-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 4rem;
    background-color: #eee;
    list-style-type: none;
  }
  &__order {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    min-width: 34rem;
    padding: 2rem;
    background-color: #fff;
    h4 {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      padding-bottom: 0.8rem;
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      list-style-type: none;
      li {
        display: flex;
        justify-content: space-between;
        &:last-child {
          font-weight: 600;
        }
      }
    }
    button {
      align-self: flex-end;
      padding: 0.6rem 1.4rem;
      color: #fff;
      background-color: #3f3f3f;
      font-size: 0.8rem;
      font-weight: 600;
      &:hover {
        background-color: #555;
      }
      &:active {
        background-color: #484848;
      }
    }
  }
}
</style>
