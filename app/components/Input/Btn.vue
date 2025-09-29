<template>
  <div class="Input">
    <input
      :type="type"
      :placeholder="placeholder ? placeholder : undefined"
      :style="size ? { width: size } : undefined"
      v-model="filterSearch"
    />
    <button>
      <Icon :name="iconName" size="1.2em" />
    </button>
  </div>
</template>

<script setup>
const filterSearch = defineModel("filterSearch");

defineProps({
  type: { type: String, required: false },
  placeholder: { type: String, required: false },
  size: { type: String, required: false },
  iconName: { type: String, required: true },
});
</script>

<style scoped>
.Input {
  display: flex;
  position: relative;
  align-items: center;

  input {
    padding: 10px;
    padding-right: 40px;
    border: 1px solid var(--color-sub-mid);
    border-radius: 8px;
  }

  button {
    padding: 10px;
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 0 8px 8px 0;
    background-color: transparent;
    cursor: pointer;
  }
}

@media (max-width: 1280px) {
  .Input {
    input {
      width: 150px;
    }
  }
}
</style>
