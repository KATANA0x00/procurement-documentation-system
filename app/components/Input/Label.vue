<template>
  <div
    class="InputLabel"
    ref="dropdownRef"
    :style="end ? undefined : { marginRight: '25px' }"
  >
    <span :style="$slots.default == null ? undefined : { marginRight: '15px' }">
      <slot />
    </span>
    <div class="InputBox" :style="size ? { width: size } : { flex: 1 }">
      <input type="text" @focus="isActive = true" v-model="value" />
      <button
        v-if="dropdown.length > 0 "
        :class="{ active: isActive }"
        @click="isActive = !isActive"
      >
        <Icon name="solar:alt-arrow-down-bold" />
      </button>
      <ul
        class="dropdownList"
        v-if="dropdown.length > 0"
        v-show="isActive"
      >
        <li
          v-for="(list, idx) in dropdown"
          :key="idx"
          @click="
            value = list;
            isActive = false;
          "
        >
          {{ list }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
const value = defineModel("value");
defineProps({
  dropdown: {
    type: Array,
    required: false,
    default: () => [],
  },
  end: {
    type: Boolean,
    required: false,
  },
  size: {
    type: String,
    required: false,
  },
});

const isActive = ref(false);
const dropdownRef = ref(null);

// click outside logic
const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isActive.value = false;
    }
};
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.InputLabel {
  display: flex;
  align-items: center;
  position: relative;

  .InputBox {
    position: relative;
    display: flex;
    align-items: center;

    input {
      background-color: var(--color-sub-light);
      border: 1px solid var(--color-sub-mid);
      border-radius: 4px;
      padding: 8px 12px;
      width: 100%;
    }

    input:focus {
      outline-color: var(--color-orange);
    }

    button {
      display: flex;
      align-items: center;
      justify-content: right;
      position: absolute;
      right: 0;
      padding: 12px 12px;
      background-color: transparent;
      border: none;

      span {
        transition: transform ease-in-out 0.1s;
      }
    }

    button.active > span {
      transform: rotate(180deg);
    }
  }

  ul {
    position: absolute;
    top: 80%;
    left: 0;
    right: 0;
    z-index: 1;
    padding: 0;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--color-orange);

    li {
      list-style: none;
      padding: 8px 20px;
      background-color: var(--color-sub-light);
      cursor: pointer;
    }

    li:hover {
      background-color: var(--color-theme);
      color: var(--color-orange);
    }
  }
}
</style>
