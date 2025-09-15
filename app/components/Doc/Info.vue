<template>
  <div>
    <Accordion class="generalInfo" groupName="ทั่วไป" color="#FF8800">
      <br />
      <div>
        <InputLabel v-model:value="data.doc_id_p01" size="200px"
          >เลขที่ อว. (พ.1)</InputLabel
        >
        <InputLabel v-model:value="data.doc_id_pj1" size="200px"
          >เลขที่ อว. (พจ.1)</InputLabel
        >
      </div>
      <div>
        <InputLabel
          v-model:value="data.doc_type"
          :dropdown="doc_type"
        ></InputLabel>
        <InputLabel v-model:value="data.doc_category" :dropdown="doc_category"
          >ประเภท</InputLabel
        >
        <InputLabel
          v-model:value="data.doc_money_source"
          :dropdown="doc_money_source"
          >ด้วยเงิน</InputLabel
        >
        <InputLabel v-model:value="data.doc_money_year" end>ประจำปี</InputLabel>
      </div>
      <div>
        <InputLabel v-model:value="data.doc_requester" style="flex: 1"
          >ผู้ขอให้จัดหา</InputLabel
        >
        <InputLabel v-model:value="data.doc_department" style="flex: 1" end
          >สังกัด</InputLabel
        >
      </div>
      <InputLabel v-model:value="data.doc_reason" end>เพื่อใช้งาน</InputLabel>
    </Accordion>
    <Accordion class="accompliceInfo" groupName="ผู้เกี่ยวข้อง" color="#20D897">
      <br />
      <div
        style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-bottom: -15px;
        "
      >
        <div>
          <label>กรรมการตรวจรับ</label>
          <InputLabel
            v-for="(_, idx) in data.doc_committee"
            :key="idx"
            v-model:value="data.doc_committee[idx]"
          ></InputLabel>
        </div>
        <div>
          <label>หัวหน้าสังกัด</label>
          <InputLabel v-model:value="data.principal" end></InputLabel>
          <br />
          <label>นักวิชาการพัสดุ</label>
          <InputLabel v-model:value="data.procurementer_name" end></InputLabel>
        </div>
      </div>
    </Accordion>
    <Accordion class="uidInfo" groupName="รหัสสามมิติ" color="#26A5FF">
      <br />
      <InputUid v-model:value="data.uid_fund">กองทุน</InputUid>
      <InputUid v-model:value="data.uid_plan">แผนงาน</InputUid>
      <InputUid v-model:value="data.uid_work_main">งาน - กิจกรรมหลัก</InputUid>
      <InputUid v-model:value="data.uid_work_sub">งาน - กิจกรรมรอง</InputUid>
      <InputUid v-model:value="data.uid_work_minor">งาน - กิจกรรมย่อย</InputUid>
      <InputUid v-model:value="data.uid_expenses_category">งบรายจ่าย</InputUid>
      <InputUid v-model:value="data.uid_expenses_type">ประเภทรายจ่าย</InputUid>
      <InputUid v-model:value="data.uid_expenses_subtype"
        >ประเภทค่าใช้จ่าย</InputUid
      >
      <InputUid v-model:value="data.uid_expenses_minor">ค่าใช้จ่าย</InputUid>
    </Accordion>
  </div>
</template>

<script setup>
const data = defineModel("data");

const doc_type = ["จัดซื้อ", "จัดจ้าง"];
const doc_category = ["วัสดุการศึกษา"];
const doc_money_source = ["งบประมาณ", "เงินรายได้"];
</script>

<style scoped>
.generalInfo {
  div {
    display: flex;
    margin-bottom: 5px;
  }
}

.accompliceInfo {
  div > div {
    margin-bottom: 10px;

    label {
      margin-bottom: 5px;
      display: inline-block;
    }
  }
}

.uidInfo {
  div {
    margin-bottom: 10px;
  }
}
</style>
