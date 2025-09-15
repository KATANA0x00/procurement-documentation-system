<template>
  <NuxtLink
    class="content"
    :to="`${$route.fullPath.replace(/\/$/, '')}/document?doc=${data.id}`"
  >
    <span style="color: var(--color-sub-dark)">{{ data.doc_id_p01 }}{{ data.doc_id_pj1 ? ' - '+data.doc_id_pj1 : '' }}</span>
    <span>{{ data.doc_requester }}</span>
    <span><StatusIcon :status="data.status" /></span>
    <span>{{ data.doc_category }}</span>
    <span style="justify-self: end; text-align: right">{{
      formattedDate(data.edited_date)
    }}</span>
  </NuxtLink>
</template>

<script setup>
import { formattedDate } from "#imports";

defineProps({
  data: { typee: JSON, require: true },
});
</script>

<style scoped>
.content {
  display: grid;
  grid-template-columns: 1fr 6.5fr 2fr 2fr 1.5fr;
  cursor: pointer;
  border-radius: 8px;
  text-decoration: none;

  span {
    font-size: 14px;
    margin: 10px 15px;
  }
}

.content:hover {
  background-color: var(--color-sub-mid);
}
</style>
