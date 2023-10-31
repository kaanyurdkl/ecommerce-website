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
    <div class="admin__tabs--line"></div>
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
    &--line {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: #ccc;
      z-index: -1;
    }
  }
  &__tab {
    width: 6rem;
    input {
      display: none;
      &:checked + label {
        color: #3f3f3f;
        border-bottom: 2px solid #3f3f3f;
      }
    }
    label {
      display: inline-block;
      width: 100%;
      height: 100%;
      padding: 0.4rem 0;
      color: #ccc;
      font-size: 1rem;
      font-weight: 600;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      text-overflow: ellipsis;
      overflow: hidden;
      transition: all 0.2s ease-in-out;
    }
  }
}
</style>
