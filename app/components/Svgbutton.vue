<template>
  <button>
    <Icon
      :name="iconName"
      size="1.2em"
      :style="color ? { color: color } : undefined"
    />
    <span :style="color ? { color: color } : undefined">
      <slot />
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  iconName: { type: String, required: true },
  color: { type: String, required: false },
});
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid transparent;
  background-color: transparent;
  cursor: pointer;

  span {
    margin-left: 5px;
  }
}

button:hover {
  background-color: var(--color-sub-mid);
  border: solid 1px var(--color-sub-mid);
}
</style>
