<template>
  <div class="dateInput">
    <label>
      <slot></slot>
    </label>
    <input type="date" v-model="value"/>
  </div>
</template>

<script setup>
const showPicker = ref(false);

const value = defineModel("value");
</script>

<style scoped>
.dateInput {
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 25px;

  label {
    transition: transform ease-in-out 0.1s;
    margin-right: 15px;
  }

  input {
    background-color: var(--color-sub-light);
    border: 1px solid var(--color-sub-mid);
    border-radius: 4px;
    padding: 8px 12px;
    width: 200px;
  }
}
</style>
