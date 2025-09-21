<template>
  <div>
    <Accordion groupName="ประเภทการคืนเงิน" color="#FF8800">
      <ul class="type-list">
        <li v-for="item in type_enum" @click="dataPayment.type = item.value">
          <div
            class="type-list-item"
            :style="
              dataPayment.type === item.value
                ? {
                    backgroundColor: 'var(--color-orange)',
                    color: 'var(--color-theme)',
                  }
                : ''
            "
          >
            <Icon
              style="margin-right: 5px"
              :style="
                dataPayment.type === item.value
                  ? { color: 'var(--color-theme)' }
                  : ''
              "
              :name="
                dataPayment.type === item.value
                  ? 'material-symbols:check-circle-rounded'
                  : 'ic:outline-circle'
              "
            />
            {{ item.text }}
          </div>
        </li>
      </ul>
    </Accordion>
    <Accordion groupName="ประเภทการคืนเงิน" color="#20D897">
      <br />
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <button class="add-button" @click="addRow()">
          <Icon
            name="material-symbols:add-circle-outline-rounded"
            size="1.3rem"
            style="margin-right: 5px; color: var(--color-theme)"
          />
          เพิ่มรายการ
        </button>
        <div style="display: flex; margin-right: 60px">
          <span>ยอดรวมทั้งสิ้น </span>
          <div
            style="border-bottom: 2px solid var(--color-orange); padding: 0 5px"
          >
            <span>{{
              dataPayment.list
                ? dataPayment.list.reduce((acc, item) => acc + item.amount_b, 0)
                : 0
            }}</span>
            <span>.</span>
            <span>{{
              dataPayment.list
                ? dataPayment.list.reduce((acc, item) => acc + item.amount_s, 0)
                : 0
            }}</span>
          </div>
          <span> บาท</span>
        </div>
      </div>
      <div class="drag-header">
        <span></span>
        <span></span>
        <span style="text-align: left;">ชื่อบริษัท ห้างหุ้นส่วน ร้านค้า</span>
        <span>เล่มที่</span>
        <span>เลขที่</span>
        <span style="text-align: right;margin-right: 30px;">บาท</span>
        <span style="text-align: right;">สตางค์</span>
      </div>
      <draggable
        v-model="dataPayment.list"
        handle=".drag-handle"
        item-key="id"
        animation="200"
      >
        <template #item="{ element, index }">
          <div style="display: flex; position: relative; align-items: center">
            <div class="drag-list">
              <Icon
                class="drag-handle"
                name="material-symbols:drag-handle"
                size="1.4rem"
              />
              <span>{{ index + 1 }}</span>
              <input type="text" v-model="element.name" />
              <input type="text" v-model="element.book" />
              <input type="text" v-model="element.number" />
              <input
                type="number"
                v-model="element.amount_b"
                style="text-align: right"
              />
              <input
                type="number"
                v-model="element.amount_s"
                style="text-align: right"
              />
            </div>
            <button
              class="delete-button"
              style="background-color: transparent"
              @click="deleteRow(index)"
            >
              <Icon
                name="material-symbols:cancel-rounded"
                size="1.5rem"
                style="color: var(--color-sub-mid)"
              />
            </button>
          </div>
        </template>
      </draggable>
    </Accordion>
  </div>
</template>

<script setup>
import draggable from "vuedraggable";
const dataPayment = defineModel("dataPayment");

const type_enum = [
  {
    text: "คืนเงินบริษัท",
    value: "commercial",
  },
  {
    text: "คืนเงินบุคคล",
    value: "personal",
  },
];

function addRow() {
  dataPayment.value.list.push({
    name: "",
    book: "",
    number: "",
    amount_b: 0,
    amount_s: 0,
  });
}

function deleteRow(index) {
  dataPayment.value.list.splice(index, 1);
}
</script>

<style scoped>
.type-list {
  list-style: none;
  padding: 10px;
  margin: 0;
}

.type-list-item {
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-sub-mid);
  }
}

.drag-header {
  display: grid;
  grid-template-columns: 0.8fr 0.5fr 10fr 2fr 3fr 3fr 1fr;
  padding: 5px 0;
  margin:  0 50px 0 15px;
  span {
    color: var(--color-sub-dark);
    text-align: center;
  }
}

.drag-list {
  display: grid;
  grid-template-columns: 0.8fr 0.5fr 10fr 2fr 3fr 3fr 1fr;
  align-items: center;
  background-color: var(--color-sub-mid);
  padding: 5px 10px;
  margin: 2px;
  border-radius: 5px;

  input {
    border: none;
    border-bottom: transparent solid 1px;
    background-color: transparent;
    width: 90%;
    padding: 2px 5px;
    border-radius: 2px;

    transition: ease-in-out 0.1s;
  }

  input:hover {
    border: none;
    border-bottom: var(--color-orange) solid 1px;
  }

  input:focus {
    outline: 1px solid var(--color-orange);
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

.add-button,
.delete-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 5px 10px;
  border: none;
  border-radius: 8px 8px;
  background-color: var(--color-orange);
  color: var(--color-theme);
  cursor: pointer;

  &:hover {
    background-color: var(--color-sub-dark);
  }
}
</style>
