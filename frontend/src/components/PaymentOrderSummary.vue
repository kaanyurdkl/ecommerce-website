<script setup lang="ts">
defineProps(["items", "itemsPrice", "shippingPrice", "taxPrice", "totalPrice"]);

function formatPrice(price) {
  return price.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
  });
}
</script>
<template>
  <div class="payment__container order-summary">
    <h3>Order Summary</h3>
    <ul class="order-summary__items">
      <li v-for="item in items" class="order-summary__item">
        <img :src="`http://localhost:8000${item.image}`" />
        <div class="order-summary__item-details">
          <div>{{ item.name }}</div>
          <div>
            <span>{{ formatPrice(item.price) }}</span> x {{ item.quantity }}
          </div>
        </div>
      </li>
    </ul>
    <ul class="order-summary__prices">
      <li>
        <span>Subtotal</span><span>{{ formatPrice(itemsPrice) }}</span>
      </li>
      <li>
        <span>Shipping</span><span>{{ formatPrice(shippingPrice) }}</span>
      </li>
      <li>
        <span>Tax</span><span>{{ formatPrice(taxPrice) }}</span>
      </li>
    </ul>
    <div class="order-summary__total-price">
      <span>Total</span><span>{{ formatPrice(totalPrice) }}</span>
    </div>
  </div>
</template>
<style lang="scss">
.order-summary {
  color: #3f3f3f;
  gap: 4rem;
  h3 {
    padding-bottom: 1rem;
    border-bottom: 0.25rem solid #ccc;
  }
  &__items {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  &__item {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding-bottom: 2.5rem;
    border-bottom: 0.125rem solid #ccc;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 6.5rem;
      height: 8.5rem;
      background-color: #3f3f3f;
      border-radius: 0.25rem;
      transform-origin: center;
      z-index: -1;
    }
    &:nth-child(2n + 1)::before {
      rotate: 8deg;
    }
    &:nth-child(2)::before {
      rotate: -8deg;
    }
    img {
      width: 6rem;
      height: 8rem;
      object-fit: cover;
      border-radius: 0.25rem;
    }
  }
  &__item-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 8rem;
    text-align: right;
    div {
      &:first-child {
        font-size: 1.25rem;
      }
      &:last-child {
        font-size: 0.875rem;
        span {
          &:first-child {
            font-size: 1rem;
          }
        }
      }
    }
  }
  &__prices {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-bottom: 1rem;
    li {
      display: flex;
      justify-content: space-between;
      text-transform: uppercase;
      span {
        &:first-child {
          font-size: 0.875rem;
        }
        &:last-child {
          font-size: 1rem;
        }
      }
    }
  }
  &__total-price {
    display: flex;
    justify-content: space-between;
    font-size: 1.25rem;
    font-weight: 600;
    text-transform: uppercase;
  }
}
</style>
