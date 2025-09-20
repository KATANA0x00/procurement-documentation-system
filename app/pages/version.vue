<template>
    <div style="display: flex; justify-content: center;padding-top: 30vh;">
        <div class="container">
            <label class="header">Last time deployed</label>
            <label>{{ formattedDate(lastDeploy, true).date }}</label>
            <label>{{ formattedDate(lastDeploy, true).time }}</label>
            <br>
            <label class="header">Creator/Developer</label>
            <label>GITHUB : KATANA0x00</label>
            <label>AIoT Lab IoTE@KMITL</label>
            <br>
        </div>
    </div>


</template>

<script setup>
definePageMeta({
    layout: 'empty'
})
const config = useRuntimeConfig()
const lastDeploy = config.public.dateNow
</script>

<style>
.container {
    display: flex;
    flex-direction: column;

    label {
        margin-left: 20px;
        font-size: 18px;
    }

    .header {
        font-weight: 600;
        font-size: 24px;
        margin-left: 0px;
        color: var(--color-orange);
    }
}
</style>