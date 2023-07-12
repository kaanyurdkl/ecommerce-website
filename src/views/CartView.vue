<template>
  <section class="heading">
    <h2>Cart</h2>
  </section>
  <section class="cart">
    <div class="cart__container">
      <ul class="cart__items">
        <li class="cart__item">
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
              <button>Favorite</button>
              <button>Quantity</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="cart__container cart__info"></div>
  </section>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.heading {
  padding: 2rem;
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
  &__container {
    border: 0.01px solid #000;
    background-color: #eee;
  }
  &__item {
    display: flex;
    padding: 1rem;
  }
  @media screen and (min-width: 768px) {
    display: flex;
  }
}
.cart-card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "image details details details"
    "image actions actions actions ";
  gap: 1rem;
  &__image {
    grid-area: image;
    width: 112px;
    height: 168px;
    object-fit: cover;
  }
  &__info {
    grid-area: details;
  }
  &__details {
    list-style-type: none;
  }
  &__actions {
    grid-area: actions;
  }
}
</style>
