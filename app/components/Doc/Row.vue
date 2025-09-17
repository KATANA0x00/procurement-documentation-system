``<template>
  <div
    class="Row"
    :style="{ backgroundColor: isAlt ? 'var(--color-sub-mid)' : 'transparent' }"
  >
    <span class="drag-handle" style="cursor: grab">
      <Icon name="ic:twotone-menu" style="color: var(--color-sub-dark)" />
    </span>

    <span>{{ index + 1 }}</span>
    <input type="text" v-model="data.name" />
    <input type="number" v-model="data.qty" />
    <input type="text" v-model="data.unit" />
    <input
      style="text-align: end; transform: translateX(10%)"
      type="number"
      v-model="data.price"
    />
    <input
      style="text-align: end; transform: translateX(10%)"
      type="number"
      v-model="data.total"
    />

    <button @click="emit('remove')">
      <Icon
        name="material-symbols:cancel-rounded"
        size="1.5em"
        style="color: var(--color-sub-dark)"
      />
    </button>
  </div>
</template>

<script setup>
const data = defineModel("data", {
  default: () => ({ qty: 0, name: "", unit: "", price: 0, total: 0 }),
});
defineProps({
  index: {
    type: Number,
    default: 0,
  },
  isAlt: { type: Boolean },
});
const emit = defineEmits(["remove"]);
</script>

<style scoped>
.Row {
  display: grid;
  grid-template-columns: 0.4fr 0.4fr 6fr 1fr 1fr 2fr 2fr;

  align-items: center;
  padding: 5px 10px;

  position: relative;

  button {
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    position: absolute;
    right: 0;
    transform: translateX(130%);
    opacity: 0.3;
  }

  button:hover {
    opacity: 1;
  }

  input {
    border: none;
    border-bottom: transparent solid 1px;
    background-color: transparent;
    width: 90%;
    padding: 2px 0;
    border-radius: 2px;

    transition: ease-in-out 0.1s;
  }

  input:hover {
    border: none;
    border-bottom: var(--color-orange) solid 1px;
  }

  input:focus {
    outline: 1px solid var(--color-orange);
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
