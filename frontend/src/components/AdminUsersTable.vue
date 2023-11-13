<script setup lang="ts">
defineProps(["users"]);

const usersHeaders = ["Id", "Name", "Email", "User Type"];
</script>
<template>
  <div class="table table--users">
    <ul class="table__headers">
      <li v-for="header in usersHeaders" class="table__header">
        {{ header }}
      </li>
    </ul>
    <ul class="table__rows">
      <li v-for="user in users" class="table__row">
        <ul class="table__columns">
          <li class="table__column">{{ user._id }}</li>
          <li class="table__column">{{ user.name }}</li>
          <li class="table__column">{{ user.email }}</li>
          <li v-if="user.isAdmin" class="table__column admin-user">
            <i class="fa-solid fa-crown"></i>
          </li>
          <li v-else class="table__column regular-user">
            <i class="fa-solid fa-user"></i>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
.table {
  &--users {
    .table__headers {
      grid-template-columns: 30% 25% 30% 15%;
    }
    .table__columns {
      grid-template-columns: 30% 25% 30% 15%;
    }
    .table__column {
      text-align: center;
      &:last-child {
        font-size: 1.5rem;
        padding: 0.125rem 0;
      }
    }
    .admin-user {
      color: #ff6fe8;
      background-color: #ffe2fa;
      border-radius: 0.5rem;
    }
    .regular-user {
      color: #3badff;
      background-color: #d9efff;
      border-radius: 0.5rem;
    }
  }
}
</style>
