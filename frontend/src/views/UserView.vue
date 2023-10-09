<script setup lang="ts">
import { useUsersStore } from "@/stores/usersStore";
const store = useUsersStore();
</script>

<template>
  <section class="heading">
    <h2>Profile</h2>
    <p>User is {{ store.authUser }}</p>
  </section>
</template>

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
</style>
