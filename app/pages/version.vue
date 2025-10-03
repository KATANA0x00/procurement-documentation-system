<template>
  <div style="display: flex; justify-content: center; padding-top: 30vh">
    <div class="container">
      <label class="header">Last time deployed</label>
      <label v-if="lastDeploy">{{ formattedDate(lastDeploy, true).date }}</label>
      <label v-if="lastDeploy">เวลา : {{ formattedDate(lastDeploy, true).time }}</label>
      <br />
      <label class="header">Creator/Developer</label>
      <label>GITHUB : KATANA0x00</label>
      <label>AIoT Lab IoTE@KMITL</label>
      <br />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
    layout: 'empty'
})

useHead({
  title: "Version Info",
});

const lastDeploy = ref(null);

onMounted(() => {
  const config = useRuntimeConfig();
  lastDeploy.value =
    import.meta.env.NUXT_PUBLIC_DATE_NOW ||
    process.env.NUXT_PUBLIC_DATE_NOW ||
    config.public.dateDeploy;
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;

  label {
    margin-left: 20px;
    font-size: 28px;
  }

  .header {
    font-weight: 600;
    font-size: 38px;
    margin-left: 0px;
    color: var(--color-orange);
  }
}
</style>
