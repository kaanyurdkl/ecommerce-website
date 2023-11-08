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
    <h2>{{ heading }}</h2>
    <p>{{ message }}</p>
    <router-link :to="{ name: routeTo }">{{ routeLabel }}</router-link>
  </section>
</template>
<style lang="scss" scoped>
.empty {
  width: 100%;
  padding: 8rem 0;
  background-color: #eee;
  text-align: center;
  border: 1px solid #3f3f3f;
  border-bottom-width: 1rem;
  border-radius: 0.8rem;
  h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
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
    font-weight: 600;
    text-decoration: none;
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
</style>
