<template>
  <div>
    <div class="tableHeader">
      <span></span>
      <span></span>
      <span>รายการ</span>
      <span>จำนวน</span>
      <span>หน่วย</span>
      <span style="text-align: end">ราคา/หน่วย</span>
      <span style="text-align: end">ราคารวม</span>
    </div>
    <div
      v-if="datas.length === 0"
      style="
        text-align: center;
        padding: 5px 0;
        color: var(--color-sub-dark);
        font-size: large;
      "
    >
      ไม่มีรายการ
    </div>
    <draggable
      v-model="datas"
      handle=".drag-handle"
      item-key="id"
      animation="200"
    >
      <template #item="{ element, index }">
        <DocRow
          v-model:data="datas[index]"
          :index="index"
          :isAlt="index % 2 === 0"
          @remove="datas.splice(index, 1)"
        />
      </template>
    </draggable>
    <div class="tableEnd">
      <div style="display: flex; justify-content: space-between">
        <button
          @click="
            datas.push({ qty: 0, name: '', unit: '', price: 0, total: 0 })
          "
        >
          เพิ่มรายการ
        </button>
        <div>
          <button
            @click="isVAT = !isVAT"
            style="
              display: flex;
              align-items: center;
              gap: 10px;
              background-color: transparent;
              border: none;
              cursor: pointer;
              padding: 0 15px;
            "
          >
            <Icon
              style="color: var(--color-orange)"
              :name="isVAT ? 'bi:toggle-off' : 'bi:toggle-on'"
              size="1.5em"
            />
            <span
              style="color: var(--color-orange)"
              :style="
                !isVAT
                  ? {
                      textDecoration: 'none',
                      textDecorationThickness: undefined,
                    }
                  : {
                      textDecoration: 'line-through',
                      textDecorationThickness: '2px',
                    }
              "
              >ราคารายการรวมภาษี</span
            >
          </button>
        </div>
      </div>

      <span style="text-align: end" class="hightlight">ราคารวมรายการ</span>
      <span style="text-align: end; padding-right: 10px" class="hightlight">
        {{
          numBreak((isVAT ? summarize() : (summarize() / 107) * 100).toFixed(2))
        }}
      </span>
      <span></span>
      <span style="text-align: end">รวมภาษีมูลค่าเพิ่ม 7%</span>
      <span style="text-align: end; padding-right: 10px">{{
        numBreak(((summary * 7) / 107).toFixed(2))
      }}</span>
      <span></span>
      <span
        style="
          font-weight: 600;
          text-align: end;
          border-bottom-left-radius: 8px;
        "
        class="hightlight"
        >รวมเป็นเงินทั้งสิ้น</span
      >
      <span
        style="font-weight: 600; text-align: end; padding-right: 10px"
        class="hightlight"
        >{{ numBreak(summary) }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { numBreak } from "#imports";
import draggable from "vuedraggable";
const datas = defineModel("data", { default: [] });
const isVAT = defineModel("isVAT", { default: false });
const summary = defineModel("summary", { default: 0 });

function summarize() {
  if (datas.value === null) {
    return 0;
  }
  return datas.value.reduce((acc, item) => acc + item.total, 0);
}

watch(
  () => datas.value.map((item) => ({ qty: item.qty, price: item.price })), // do not watch total
  (newVal, oldVal) => {
    newVal.forEach((item, i) => {
      const old = oldVal?.[i];
      if (!old) return;

      if (item.qty !== old.qty || item.price !== old.price) {
        // recalculate total when qty or price change
        datas.value[i].total = parseFloat(
          (datas.value[i].qty * datas.value[i].price).toFixed(2)
        );
      }
      // changes to total are ignored
    });
  },
  { deep: true }
);
watch(
  [datas, isVAT],
  () => {
    const base = datas.value.reduce((acc, item) => acc + item.total, 0);
    const total = isVAT.value ? base + base * 0.07 : base;
    summary.value = total.toFixed(2);
  },
  { deep: true }
);
</script>

<style scoped>
.tableHeader {
  display: grid;
  grid-template-columns: 0.4fr 0.4fr 6fr 1fr 1fr 2fr 2fr;
  margin: 20px 0 10px 0;
  padding: 0 10px;

  span {
    color: var(--color-sub-dark);
  }
}

.tableEnd {
  border-top: 1px solid var(--color-sub-mid);
  display: grid;
  grid-template-columns: 8.8fr 2fr 2fr;

  button {
    width: max-content;
    padding: 5px 15px;
    color: #fff;
    background-color: var(--color-orange);
    border: var(--color-orange) 1px solid;
    border-bottom-right-radius: 8px;
  }

  button:hover {
    color: var(--color-orange);
    background-color: #fff;
    border: var(--color-orange) 1px solid;
  }

  span {
    padding: 5px 0;
  }

  .hightlight {
    background-color: var(--color-orange);
    color: #fff;
  }
}
</style>
