<template>
  <div class="filter">
    <div style="display: flex; align-items: center">
      <span>ตัวกรอง :&nbsp;</span>
      <Svgbutton
        v-for="status in statusList"
        :key="status"
        :iconName="getStatusIcon(status)"
        @click="filterActive = status"
        :class="{ active: filterActive === status }"
        :color="filterActive === status ? 'var(--color-orange)' : undefined"
      >
        {{ getStatusText(status) }}
      </Svgbutton>
    </div>

    <div style="display: flex; align-items: center">
      <InputBtn
        :placeholder="`ค้นหา เลขที่เอกสาร${creatable ? '' : ' หรือ สังกัด'}`"
        iconName="heroicons:magnifying-glass-16-solid"
        v-model:filterSearch="filterSearch"
      />
      <Svgbutton
        v-if="creatable"
        iconName="material-symbols:add-circle-outline-rounded"
        style="border: solid 1px var(--color-sub-mid); margin-left: 10px"
        @click="
          navigateTo(`${$route.fullPath.replace(/\/$/, '')}/document?doc=new`)
        "
        >สร้างเอกสาร</Svgbutton
      >
    </div>
  </div>
</template>

<script setup>
const filterActive = defineModel("filterActive");
const filterSearch = defineModel("filterSearch");
const props = defineProps({
  creatable: { type: Boolean, required: false, default: false },
});

const statusList = ref([
  "All",
  ...(props.creatable ? ["draft"] : []),
  "waiting",
  "edit",
  "approve",
  "signed",
  "done",
]);
</script>

<style scoped>
.filter {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;

  div > button {
    margin: 0 5px;
  }

  .active {
    background-color: var(--color-sub-light);
    border: solid 1px var(--color-sub-mid);
  }
}
</style>
