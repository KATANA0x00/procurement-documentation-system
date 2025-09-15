<template>
  <div class="InputUid">
    <span><slot /></span>
    <InputLabel v-model:value="value.uid" style="width: 15%" />
    <InputLabel v-model:value="value.text" end style="flex: 1" />
  </div>
</template>

<script setup>
const value = defineModel("value", {
  default: () => ({ uid: "", text: "" }),
});
</script>

<style scoped>
.InputUid {
  display: flex;
  align-items: center;

  span {
    margin-right: 15px;
    width: 15%;
  }
}
</style>
