<template>
  <div class="trackBody" style="border: none">
    <div style="border: none">วันเวลา</div>
    <div style="border: none">ผู้แก้ไข</div>
    <div style="border: none">การเปลี่ยนแปลง</div>
    <div style="border: none">คำอธิบาย</div>
  </div>

  <div class="trackBody" v-for="(log, idx) in logs_data" :key="idx">
    <div>
      {{ formattedDate(log.action_date, true).date }}
      <br />เวลา
      {{ formattedDate(log.action_date, true).time }}
      <StatusIcon
        :status="
          idx < logs_data.length - 1
            ? logs_data[idx + 1].doc_data.status
            : datas.status
        "
        style="border: none"
      />
    </div>
    <div>{{ log.editor }}</div>
    <div>
      <ul style="list-style-type: none; padding: 0">
        <li
          v-for="T in idx > 0
            ? deepTrack(
                logs_data[idx - 1].doc_data,
                idx < logs_data.length - 1 ? log.doc_data : datas
              ).filter((item) => item.key !== 'status')
            : []"
          :key="T.key"
          :style="{
            color: T.new && !T.old ? 'green' : T.old && !T.new ? 'red' : 'blue',
          }"
        >
          {{ T.new && !T.old ? "+" : T.old && !T.new ? "-" : "/" }}
          {{ T.key }}: {{ T.old }} => {{ T.new }}
        </li>
      </ul>
    </div>
    <div>{{ log.message }}</div>
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

<style>
.trackBody {
  display: grid;
  grid-template-columns: 1.5fr 1fr 2fr 2fr;

  div {
    font-size: small;
    border: solid 1px black;
    padding: 10px 20px;
    overflow: hidden;
  }
}
</style>
