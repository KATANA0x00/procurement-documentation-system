<template>
    <Filter v-model:filterActive="filterActive" v-model:filterSearch="filterSearch"/>
    <Accordion v-for="(items, groupName, groupIdx) in filteredGroups" :key="groupName" :groupName="groupName"
        :color="colorPalettes(groupIdx)">
        <div class="contentHeader">
            <span>เลขที่เอกสาร</span>
            <span>ผู้ขอจัดซื้อ</span>
            <span>สถานะ</span>
            <span>ประเภท</span>
            <span>วันที่เข้า</span>
        </div>
        <EXDoc v-for="item in items" :key="item.doc_id" :data="item" />
    </Accordion>
</template>

<script setup>
    const userInfo = useState('userInfo')
    const filterActive = ref('waiting')
    const filterSearch = ref('')
    const filteredGroups = ref([])
    watchEffect(async () => {
        filteredGroups.value = await $fetch(`/api/db/ex_procurement/${userInfo.value.id}?filter=${filterActive.value}`,{
            method: 'GET'
        })
    })
</script>

<style scoped>
.contentHeader {
    display: grid;
    grid-template-columns: 1fr 6.5fr 2fr 2fr 1.5fr;

    span {
        color: var(--color-sub-dark);
        font-size: 14px;
        margin: 10px;
    }

    span:last-child {
        justify-self: end;
        text-align: right;
    }
}
</style>