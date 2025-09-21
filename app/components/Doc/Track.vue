<template>
  <div v-for="(log, idx) in logs_data" :key="idx" style="position: relative">
    <StatusIcon
      :status="
        idx < logs_data.length - 1
          ? logs_data[idx + 1].doc_data.status
          : datas.status
      "
      style="
        align-self: baseline;
        margin: 10px 0px 5px 0px;
        position: absolute;
        right: 50px;
        transform: translateY(10%);
      "
    />
    <label
      style="
        align-self: baseline;
        margin: 10px 0px 5px 0px;
        position: absolute;
        right: 180px;
        transform: translateY(10%);
      "
    >
      แก้ไขโดย:
      {{ log.editor }}</label
    >
    <Accordion
      :groupName="
        formattedDate(log.action_date, true).time +
        ' - ' +
        formattedDate(log.action_date, true).date
      "
      :color="
        getStatusInfo(
          idx < logs_data.length - 1
            ? logs_data[idx + 1].doc_data.status
            : datas.status
        ).color
      "
      :hide="false"
    >
      <div style="margin-bottom: 10px"></div>
      <span
        style="padding-left: 10px; font-weight: 600"
        :style="
          log.message === ''
            ? { color: 'var(--color-sub-dark)' }
            : { color: 'var(--color-orange)' }
        "
        >คำอธิบายแก้ไข :
      </span>
      <span>{{ log.message === "" ? "-" : log.message }}</span>
      <br />
      <span
        style="padding-left: 10px; font-weight: 600; color: var(--color-orange)"
        >รายการแก้ไข :</span
      >
      <ul style="list-style-type: none; padding: 0; margin: 0">
        <li
          v-for="T in idx > 0
            ? deepTrack(
                logs_data[idx - 1].doc_data,
                idx < logs_data.length - 1 ? log.doc_data : datas
              ).filter(
                (item) =>
                  item.key !== 'status' && item.key !== 'is_vat_included'
              )
            : []"
          :key="T.key"
          :style="{
            color: T.new && !T.old ? 'green' : T.old && !T.new ? 'red' : 'blue',
            marginLeft: '30px',
          }"
        >
          {{
            T.new && !T.old ? "เพิ่ม " : T.old && !T.new ? "ลบ " : "แก้ไขจาก "
          }}
          {{ T.new && T.old ? T.old + " เป็น " + T.new : T.old || T.new }}
        </li>
      </ul>
    </Accordion>
  </div>
</template>

<script setup>
const props = defineProps({
  datas: {
    type: Object,
    required: true,
  },
  docId: {
    type: String,
    required: true,
  },
});

// ------------------- API CALL ------------------ //
const logs_data = ref(
  await $fetch(`/api/db/tracklogs/${props.docId}`, {
    method: "GET",
  })
);
</script>
