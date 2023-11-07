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
  h3 {
    padding-bottom: 1rem;
    border-bottom: 1px solid #ccc;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    padding: 0.6rem;
    background-color: #eee;
    border-radius: 0.4rem;
    img {
      width: 6rem;
      height: 8rem;
      object-fit: cover;
      border-radius: 0.4rem;
    }
  }
  &__item-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 8rem;
    padding: 1.4rem 0;
    div {
      &:first-child {
        font-size: 0.875rem;
        font-weight: 600;
      }
      &:last-child {
        font-size: 0.8rem;
        span {
          &:first-child {
            font-weight: 600;
          }
        }
      }
    }
  }
  &__prices {
    padding-bottom: 1rem;
    font-size: 0.8rem;
    border-bottom: 1px solid #ccc;
    li {
      display: flex;
      justify-content: space-between;
      span {
        &:last-child {
          font-weight: 600;
        }
      }
    }
  }
  &__total-price {
    display: flex;
    justify-content: space-between;
    font-size: 1.8rem;
    font-weight: bold;
  }
}
</style>
