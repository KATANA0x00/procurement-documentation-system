<template>
  <div class="statusIcon" :style="{ backgroundColor: statusInfo.color + '25' }">
    <Icon
      :name="statusInfo.iconName"
      :style="{ color: statusInfo.color }"
      size="0.8em"
    />
    <span class="statusText" :style="{ color: statusInfo.color }">
      {{ statusInfo.text }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  status: { type: String, required: true },
});

const statusInfo = getStatusInfo(props.status);
</script>

<style scoped>
.statusIcon {
  display: flex;
  align-items: center;
  max-width: 115px;
  padding: 2px 5px;
  border-radius: 6px;
  margin-left: -5px;

  .statusText {
    font-size: 12px;
    margin-left: 5px;
  }
}
</style>
