<template>
  <section class="heading">
    <h2>Cart</h2>
  </section>
  <section class="cart">
    <div class="cart__container cart-products">
      <ul class="cart__items">
        <li class="cart-items__item">
          <div class="cart-card">
            <img class="cart-card__image" src="tshirt2.jpg" alt="" />
            <div class="cart-card__info">
              <h4 class="cart-cart__header">T-Shirt</h4>
              <p class="cart-cart__price">$14.90</p>
              <ul class="cart-card__details">
                <li class="cart-card__detail">
                  <span>Product no:</span><span>10</span>
                </li>
                <li class="cart-card__detail">
                  <span>Total:</span><span>$35.90</span>
                </li>
              </ul>
            </div>
            <div class="cart-card__actions">
              <span v-if="false" class="cart-card__icon cart-card__icon--red">
                <i @click="" class="fa-solid fa-heart"></i>
              </span>
              <span v-else class="cart-card__icon">
                <i @click="" class="fa-regular fa-heart"></i>
              </span>
              <div class="cart-card__quantity">
                <select>
                  <option value="">Quantity</option>
                </select>
                <i class="fa-solid fa-chevron-down"></i>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="cart__container cart-summary">
      <h2 class="cart-summary__title">Order Summary</h2>
      <ul class="cart-summary__fees">
        <li class="cart-summary__subtotal">
          <span>Subtotal</span><span>$40.0</span>
        </li>
        <li class="cart-summary__shipping">
          <span>Shipping</span><span>$10.0</span>
        </li>
      </ul>
      <p class="cart-summary__total"><span>Total</span><span>$50.0</span></p>
      <button class="cart-summary__checkout">Checkout</button>
    </div>
  </section>
</template>
<script setup lang="ts"></script>
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

.cart {
  margin: auto;
  padding: 2rem;
  max-width: 75rem;
  @media screen and (min-width: 1024px) {
    display: flex;
    gap: 2rem;
  }
  @media screen and (max-width: 425px) {
    padding: 0;
  }
  &__container {
    height: fit-content;
    background-color: #eee;
  }
  &-products {
    flex: 3;
  }
  &__items {
    &__item {
      display: flex;
      width: 100%;
      padding: 1rem;
    }
  }
  &-summary {
    padding: 1rem;
    flex: 2;
    @media screen and (max-width: 1024px) {
      width: 100%;
    }
    &__title {
      margin-bottom: 2rem;
    }
    &__fees {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem 0;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      list-style: none;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
        font-weight: 300;
        text-transform: uppercase;
      }
    }
    &__total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding: 1rem 0;
      font-size: 1.2rem;
      font-weight: 600;
      text-transform: uppercase;
      border-bottom: 1px solid #ccc;
    }
    &__checkout {
      width: 100%;
      padding: 1rem 0;
      color: #fff;
      background-color: #222;
      &:active {
        background-color: #333;
      }
    }
  }
}
.cart-card {
  display: grid;
  grid-template-columns: 7rem 5rem 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "image details details details"
    "image actions actions actions ";
  gap: 1rem;
  width: 100%;
  @media screen and (max-width: 425px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
      "image details details details"
      "image details details details "
      "actions actions actions actions ";
    &__icon {
      width: 7rem;
    }
  }
  &__image {
    grid-area: image;
    width: 7rem;
    height: 10.5rem;
    object-fit: cover;
  }
  &__info {
    grid-area: details;
  }
  &__header {
    font-size: 1rem;
  }
  &__price {
    font-size: 1rem;
  }
  &__details {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    list-style-type: none;
  }
  &__detail {
    display: flex;
    flex: 1 1 50%;
    max-width: 300px;
    font-size: 0.7rem;
    span {
      flex: 1;
    }
  }
  &__actions {
    grid-area: actions;
    display: grid;
    grid-template-columns: 5rem 1fr;
    gap: 1rem;
    @media screen and (max-width: 425px) {
      grid-template-columns: 7rem 1fr;
    }
  }
  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    font-size: 1.8rem;
    border: 0.01px solid #000;
    @media screen and (max-width: 425px) {
      width: unset;
    }
    &--red {
      color: #ff3535;
    }
  }
  &__quantity {
    position: relative;
    select {
      width: 100%;
      height: 100%;
      padding: 1rem 0.4rem;
      border: 1px solid #222;
      outline: none;
    }
    i {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
