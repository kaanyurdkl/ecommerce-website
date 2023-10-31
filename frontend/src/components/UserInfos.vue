<script setup lang="ts">
defineProps(["user"]);
</script>
<template>
  <div class="user__infos">
    <h3 class="user__header">My Info</h3>
    <ul class="user__orders-list">
      <li>{{ user.emails[0].value }}</li>
      <li>{{ user.name.givenName }}</li>
      <li>{{ user.name.familyName }}</li>
    </ul>
  </div>
</template>
<style lang="scss">
.user {
  &__infos {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  &__header {
    padding-bottom: 2rem;
    border-bottom: 1px solid #ccc;
  }
}
</style>
