<template>
  <div
    v-if="deletePop"
    style="
      z-index: 1;
      top: 0;
      left: 0;
      background-color: rgba(128, 128, 128, 0.2);
      position: absolute;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    <div
      style="
        border-radius: 10px;
        padding: 20px 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--color-theme);
      "
    >
      <span style="margin-bottom: 30px; font-size: 24px"
        >ต้องการลบเอกสารเลขที่ {{ deleteText }} ใช่หรือไม่</span
      >
      <div style="width: 100%; display: flex; justify-content: space-around">
        <button class="deleteBtn" @click="comfirmDelete(true)">ยืนยัน</button>
        <button class="deleteBtn-cancel" @click="comfirmDelete(false)">
          ยกเลิก
        </button>
      </div>
    </div>
  </div>
  <Filter
    v-model:filterActive="filterActive"
    v-model:filterSearch="filterSearch"
    creatable
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
      <span></span>
    </div>
    <EXDoc
      v-for="item in items"
      :key="item.id"
      :data="item"
      :deleteDocument
      :deleteable="item.status === 'draft'"
    />
  </Accordion>
</template>

<script setup>
useHead({
  title: "PASADU : ระบบเอกสาร",
});

const userInfo = useState("userInfo");
const filterActive = ref("All");
const filterSearch = ref("");

const filteredGroups = ref([]);
const rawGroups = ref([]);

const deletePop = ref(false);
const deleteDoc = ref(null);
const deleteText = ref('')

watchEffect(async () => {
  rawGroups.value = await $fetch(
    `/api/db/ex_department/${userInfo.value.id}?filter=${filterActive.value}`,
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

function deleteDocument(deleteDocId, text="-") {
    deletePop.value = true;
    deleteDoc.value = deleteDocId;
    deleteText.value = text;
}

async function comfirmDelete(confirm) {
  if (!confirm) {
    deletePop.value = false;
    return;
  }

  const response = await $fetch(`/api/db/doc/remove/${deleteDoc.value}`, {
    method: "POST",
  });

  deletePop.value = false;

  if (response.success) {
    await reloadNuxtApp();
  }
}
</script>

<style scoped>
.contentHeader {
  display: grid;
  grid-template-columns: 2fr 5.5fr 2fr 2fr 2fr 0.5fr;
  span {
    color: var(--color-sub-dark);
    font-size: 14px;
    margin: 10px;
  }

  span:nth-last-child(2) {
    justify-self: end;
    text-align: right;
  }
}

.deleteBtn {
  background-color: transparent;
  color: var(--color-orange);
  border: 2px solid var(--color-orange);
  border-radius: 10px;
  padding: 10px 20px;
  width: fit-content;
  font-size: 18px;
}

.deleteBtn:hover {
  background-color: var(--color-orange);
  color: var(--color-theme);
}

.deleteBtn-cancel {
  background-color: transparent;
  color: var(--color-sub-dark);
  border: 2px solid var(--color-sub-dark);
  border-radius: 10px;
  padding: 10px 20px;
  width: fit-content;
  font-size: 18px;
}

.deleteBtn-cancel:hover {
  background-color: var(--color-sub-dark);
  color: var(--color-theme);
}

@media (max-width: 1366px) {
  .contentHeader {
    grid-template-columns: 2.4fr 4.5fr 2fr 2fr 2fr 0.5fr;
  }

  .contentHeader > span {
    font-size: 12px;
  }
}
</style>
