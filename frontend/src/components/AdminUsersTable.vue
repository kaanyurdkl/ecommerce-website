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
            <span>Admin</span>
          </li>
          <li v-else class="table__column regular-user">
            <i class="fa-solid fa-user"></i>
            <span>Regular</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
