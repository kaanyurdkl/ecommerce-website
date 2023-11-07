<script setup lang="ts">
defineProps<{
  heading: string;
  message: string;
  routeTo: string;
  routeLabel: string;
}>();
</script>
<template>
  <div class="container">
    <h2>{{ heading }}</h2>
    <p>{{ message }}</p>
    <router-link :to="{ name: routeTo }">{{ routeLabel }}</router-link>
  </div>
</template>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: fit-content;
  margin: auto;
  padding: 8rem 0;
  background-color: #eee;
  text-align: center;
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
    color: #fff;
    background-color: #3f3f3f;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    border-radius: 0.4rem;
    &:hover {
      background-color: #555;
    }
    &:active {
      background-color: #484848;
    }
  }
}
</style>
