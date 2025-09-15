<template>
  <div class="accordion">
    <button
      class="groupHeader"
      :style="{ backgroundColor: color + '25' }"
      @click="showContent = !showContent"
    >
      <Icon name="material-symbols:circle" :style="{ color: color }" />
      <span style="margin: 0 5px">{{ groupName }}</span>
      <Icon
        :name="
          showContent
            ? 'fluent-emoji-high-contrast:minus'
            : 'fluent-emoji-high-contrast:plus'
        "
        :style="{
          position: 'absolute',
          right: '15px',
          color: color ? color : undefined,
        }"
      />
    </button>
    <div
      class="content"
      :style="{ overflow: 'hidden', height: showContent ? 'auto' : '0' }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  groupName: { type: String, require: true },
  color: { type: String, require: false },
});

const showContent = ref(true);
</script>

<style scoped>
.accordion {
  margin: 20px 0;

  .groupHeader {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border: 1px solid transparent;
    border-radius: 8px;
    width: 100%;
    position: relative;
  }
}
</style>
