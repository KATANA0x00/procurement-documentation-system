<template>
  <div style="margin-top: 20px">
    <div v-if="datas.length === 0" style="
        text-align: center;
        color: var(--color-sub-dark);
        font-size: larger;
      ">
      ไม่มีไฟล์แนบ
    </div>
    <draggable v-model="datas" handle=".drag-handle" item-key="id" animation="200">
      <template #item="{ element, index }">
        <div class="drag-handle">
          <Icon name="ic:twotone-menu" style="color: var(--color-sub-dark); margin-right: 8px" />
          <span>{{ element.name }}</span>
          <button @click="removeItem(index)">
            <Icon name="material-symbols:cancel-rounded" size="1.5em" style="color: var(--color-sub-dark)" />
          </button>
          <button
            style="position:absolute; right: 0; transform: translateX(150%);"
            @click="viewPDF(element)"
          >
            <Icon name="gravity-ui:arrow-up-right-from-square" size="1.5rem"
              style="color: var(--color-sub-dark);" />
          </button>

        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import draggable from "vuedraggable";
const datas = defineModel("data", { default: [] });
const emit = defineEmits(["removeFile"])
const props = defineProps({
  viewPDF: {
    type: Function,
    required: true
  }
})

function removeItem(idx) {
  const removed = datas.value[idx]
  if (removed && removed.file) {
    emit("removeFile", removed.file)
  }
  datas.value.splice(idx, 1)
}
</script>

<style scoped>
.drag-handle {
  display: flex;
  align-items: center;
  background-color: var(--color-sub-mid);
  padding: 15px 10px;
  margin: 5px 0;
  border-radius: 8px;
  position: relative;

  button {
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
}
</style>
