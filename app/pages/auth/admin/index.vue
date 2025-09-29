<template>
  <Filter
    v-model:filterActive="filterActive"
    v-model:filterSearch="filterSearch"
  />
  <Accordion
    v-for="(items, groupName, groupIdx) in filteredGroups"
    :key="groupName"
    :groupName="groupName"
    :color="colorPalettes(groupIdx)"
  >
    <div class="contentHeader">
      <span>เลขที่เอกสาร</span>
      <span>ผู้ขอจัดซื้อ</span>
      <span>สถานะ</span>
      <span>ประเภท</span>
      <span>วันที่เข้า</span>
    </div>
    <EXDoc v-for="item in items" :key="item.doc_id" :data="item" />
  </Accordion>
</template>

<script setup>
const userInfo = useState("userInfo");
const filterActive = ref("waiting");
const filterSearch = ref("");

const filteredGroups = ref([]);
const rawGroups = ref([]);

watchEffect(async () => {
  rawGroups.value = await $fetch(
    `/api/db/ex_procurement/${userInfo.value.id}?filter=${filterActive.value}`,
    {
      method: "GET",
    }
  );
  filteredGroups.value = searchFilter(filterSearch.value, rawGroups.value);
});

watch(filterSearch, (newVal) => {
  filteredGroups.value = searchFilter(newVal, rawGroups.value);
});

function searchFilter(filterSearch, filtereeGroups) {
  const search = filterSearch.toLowerCase();
  const results = {};

  for (const [groupKey, items] of Object.entries(filtereeGroups)) {
    // check group key
    if (groupKey.toLowerCase().includes(search)) {
      results[groupKey] = items;
      continue;
    }

    // check inside items
    const filteredItems = items.filter(
      (item) =>
        item.doc_id_p01.toLowerCase().includes(search) ||
        item.doc_id_pj1.toLowerCase().includes(search)
    );

    if (filteredItems.length > 0) {
      results[groupKey] = filteredItems;
    }
  }

  return results;
}
</script>

<style scoped>
.contentHeader {
  display: grid;
  grid-template-columns: 1fr 6.5fr 2fr 2fr 1.5fr;

  span {
    color: var(--color-sub-dark);
    font-size: 14px;
    margin: 10px;
  }

  span:last-child {
    justify-self: end;
    text-align: right;
  }
}

@media (max-width: 1366px) {
  .contentHeader {
    grid-template-columns: 1.9fr 5.5fr 2fr 2fr 2fr;
  }

  .contentHeader > span {
    font-size: 12px;
  }
}
</style>
