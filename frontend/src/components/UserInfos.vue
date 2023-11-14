<script setup lang="ts">
defineProps(["user"]);
</script>
<template>
  <div class="my-info">
    <h3 class="my-info__header">My Info</h3>
    <ul class="my-info__infos">
      <li>
        <span>email</span>
        <span>{{ user.emails[0].value }}</span>
      </li>
      <li>
        <span>first name</span>
        <span>{{ user.name.givenName }}</span>
      </li>
      <li>
        <span>last name</span>
        <span>{{ user.name.familyName }}</span>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
.my-info {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 20rem;
  color: #3f3f3f;
  &__header {
    padding-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: 400;
    text-transform: uppercase;
    border-bottom: 0.5rem solid #ccc;
  }
  &__infos {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    gap: 2rem;
    li {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 1.5rem 1rem;
      background-color: #fff;
      border: 1px solid #ccc;
      border-bottom-width: 0.5rem;
      border-radius: 0.5rem;
      span {
        &:first-child {
          font-size: 1.25rem;
          text-transform: uppercase;
        }
        &:last-child {
          font-size: 0.875rem;
        }
      }
    }
  }
}
</style>
