<script setup lang="ts">
defineProps<{
  heading: string;
  message: string;
  routeTo: string;
  routeLabel: string;
}>();
</script>
<template>
  <section class="empty">
    <h2>
      <span>
        {{ heading }}
      </span>
      <span>
        <i class="fa-solid fa-exclamation"></i>
        <i class="fa-solid fa-exclamation"></i>
      </span>
    </h2>
    <p>{{ message }}</p>
    <router-link :to="{ name: routeTo }">{{ routeLabel }}</router-link>
  </section>
</template>
<style lang="scss" scoped>
.empty {
  width: 100%;
  padding: 8rem 0;
  color: #3f3f3f;
  background-color: #fff;
  text-align: center;
  border: 1px solid #ccc;
  border-bottom-width: 0.5rem;
  border-radius: 0.5rem;
  h2 {
    margin-bottom: 2rem;
    font-size: 2rem;
    span {
      &:first-child {
        margin-right: 0.5rem;
      }
      &:last-child {
        position: relative;
        &:first-child {
        }
        i {
          font-size: 5rem;
          transform-origin: center;
          &:first-child {
            position: absolute;
            left: 0.25rem;
            color: #ccc;
            font-size: 6rem;
            translate: 0 -1%;
          }
          &:last-child {
            translate: 0 20%;
          }
        }
      }
    }
  }
  p {
    margin-bottom: 3rem;
    font-size: 1.2rem;
  }
  a {
    display: inline-block;
    padding: 1rem 1.8rem;
    color: #3f3f3f;
    background-color: #fff;
    font-size: 1rem;
    text-decoration: none;
    text-transform: uppercase;
    border: 1px solid #3f3f3f;
    border-bottom-width: 0.25rem;
    border-radius: 0.5rem;
    transition: all 0.1s ease-in-out;
    &:hover {
      color: #fff;
      background-color: #3f3f3f;
    }
    &:active {
      border-color: #555;
      background-color: #555;
    }
  }
}
</style>
