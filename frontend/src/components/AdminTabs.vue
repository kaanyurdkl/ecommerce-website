<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const tabs = [
  { value: "products", label: "Products" },
  { value: "users", label: "Users" },
  { value: "orders", label: "Orders" },
];

const activeTab = ref(props.modelValue);

watch(activeTab, (newVal) => {
  emit("update:modelValue", newVal);
});
</script>
<template>
  <ul class="admin__tabs">
    <li v-for="tab in tabs" class="admin__tab">
      <input
        type="radio"
        :id="tab.value"
        :value="tab.value"
        v-model="activeTab"
      />
      <label :for="tab.value">{{ tab.label }}</label>
    </li>
  </ul>
</template>
<style lang="scss">
.admin {
  &__tabs {
    position: relative;
    display: flex;
    gap: 2rem;
    list-style-type: none;
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 0.25rem;
      background-color: #3f3f3f;
      z-index: -1;
    }
  }
  &__tab {
    input {
      display: none;
      &:checked + label {
        color: #fff;
        background-color: #3f3f3f;
      }
    }
    label {
      display: inline-block;
      width: 100%;
      height: 100%;
      padding: 0.5rem 1.5rem;
      color: #ccc;
      font-size: 1rem;
      border-top-right-radius: 0.5rem;
      border-top-left-radius: 0.5rem;
      cursor: pointer;
      text-overflow: ellipsis;
      overflow: hidden;
      transition: all 0.1s ease-in-out;
    }
  }
}
</style>
