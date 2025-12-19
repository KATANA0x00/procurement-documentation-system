<template>
  <NuxtLink
    class="content"
    :class="{ deleteable: deleteable }"
    :to="`${$route.fullPath.replace(/\/$/, '')}/document?doc=${data.id}`"
  >
    <span style="color: var(--color-sub-dark)"
      >{{ data.doc_id_p01
      }}{{ data.doc_id_pj1 ? " - " + data.doc_id_pj1 : "" }}</span
    >
    <span>{{ data.doc_requester }}</span>
    <span><StatusIcon :status="data.status" /></span>
    <span>{{ data.doc_category }}</span>
    <span style="justify-self: end; text-align: right">{{
      formattedDate(data.edited_date)
    }}</span>
    <button
      v-if="deleteable"
      style="padding: 0; background-color: transparent; border: none"
      @click.prevent.stop="deleteDocument(data.id, data.doc_id_p01+' - '+data.doc_id_pj1)"
    >
      <Icon
        name="material-symbols:cancel-rounded"
        size="1.5em"
        style="color: var(--color-sub-dark); margin: 0"
      />
    </button>
    <button
      v-else
      style="padding: 0; background-color: transparent; border: none"
      disabled
    >
      <Icon
        name="material-symbols:cancel-rounded"
        size="1.5em"
        style="color: transparent; margin: 0"
      />
    </button>
  </NuxtLink>
</template>

<script setup>
import { formattedDate } from "#imports";

defineProps({
  data: { typee: JSON, require: true },
  deleteable: {
    type: Boolean,
    required: false,
  },
  deleteDocument: {
    type: Function,
    required: false,
  },
});
</script>

<style scoped>
.content {
  display: grid;
  grid-template-columns: 2fr 5.5fr 2fr 2fr 2fr 0.5fr;
  cursor: pointer;
  border-radius: 8px;
  text-decoration: none;
  align-items: center;

  span {
    font-size: 14px;
    margin: 10px 15px;
  }
}

.content.deleteable {
  grid-template-columns: 2fr 5.5fr 2fr 2fr 2fr 0.5fr;
}

@media (max-width: 1366px) {
  .content {
    grid-template-columns: 2fr 5.5fr 2fr 2fr 2fr 0.5fr;
  }

  .content.deleteable {
    grid-template-columns: 2.3fr 4.5fr 2fr 2fr 2fr 0.5fr;
  }

  .content > span {
    font-size: 12px;
  }
}

.content:hover {
  background-color: var(--color-sub-mid);
}
</style>
