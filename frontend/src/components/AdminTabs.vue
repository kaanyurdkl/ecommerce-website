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
