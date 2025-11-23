<template>
    <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 20px">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px">
            <!-- Doughnut Section -->
            <div class="gridCell columnCell">
                <div class="text-center">
                    <span class="title-text">จำนวนเอกสาร</span>
                </div>
                <Doughnut
                    style="margin-top: 20px"
                    :summaryDoc="summaryData.numDoc"
                />
            </div>

            <!-- Status List Section -->
            <div class="gridCell">
                <div style="width: 100%">
                    <div
                        v-for="value in [
                            { Label: 'waiting', idx: 2 },
                            { Label: 'edit', idx: 0 },
                            { Label: 'approve', idx: 4 },
                            { Label: 'signed', idx: 3 },
                            { Label: 'done', idx: 1 },
                        ]"
                        class="status-row"
                    >
                        <div
                            class="status-icon"
                            :style="{
                                backgroundColor: colorPalettes(value.idx),
                            }"
                        >
                            <Icon
                                :name="getStatusIcon(value.Label)"
                                size="1.5rem"
                                style="color: white"
                            />
                        </div>
                        <div class="status-text">
                            <span class="status-label">{{
                                getStatusText(value.Label)
                            }}</span>
                            <span class="status-value">{{
                                numBreak(
                                    summaryData.numDoc.find(
                                        (item) => item.status === value.Label
                                    )?.total || 0
                                ).slice(0, -3)
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Summary Cards -->
            <div
                class="gridCell columnCell"
                v-for="(value, idx) in sumList"
                :style="idx === 0 ? 'grid-column: span 2' : ''"
            >
                <div
                    class="summary-card"
                    :style="{
                        backgroundColor: colorPalettes(value.Color) + '25',
                    }"
                >
                    <span class="card-title">{{ value.Header }}</span>
                    <span
                        class="card-value"
                        :style="{ color: colorPalettes(value.Color) }"
                        >{{ value.Result }}</span
                    >
                    <span class="card-department">{{ value.Department }}</span>
                </div>
            </div>
        </div>
        <div>
            <div class="resultTable">
                <div class="header">
                    <span style="text-align: start">ภาควิชา/หลักสูตร</span>
                    <span>เวลาเฉลี่ย</span>
                    <span>เวลาน้อยที่สุด</span>
                    <span>เวลามากที่สุด</span>
                </div>
                <div class="container" v-for="value in tableData">
                    <span
                        style="
                            text-align: start;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        "
                        >{{ value.department_name }}</span
                    >
                    <span>{{
                        Object.keys(value.avg_interval).length > 0
                            ? (value.avg_interval.hours / 24).toFixed(0) +
                              " วัน " +
                              (value.avg_interval.hours % 24).toFixed(0) +
                              " ชม. "
                            : "-"
                    }}</span>
                    <span>{{
                        Object.keys(value.min_interval).length > 0
                            ? (value.min_interval.hours / 24).toFixed(0) +
                              " วัน " +
                              (value.min_interval.hours % 24).toFixed(0) +
                              " ชม. "
                            : "-"
                    }}</span>
                    <span>{{
                        Object.keys(value.max_interval).length > 0
                            ? (value.max_interval.hours / 24).toFixed(0) +
                              " วัน " +
                              (value.max_interval.hours % 24).toFixed(0) +
                              " ชม. "
                            : "-"
                    }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const summaryData = ref({});
const tableData = ref([]);

const response = await $fetch("/api/db/dashboard");
if (response.ok) {
    summaryData.value = response.summaryData;
    tableData.value = response.tableData;
}

function intervalToSeconds(interval) {
    if (!interval || Object.keys(interval).length === 0) return null;
    return (
        (interval.hours || 0) * 3600 +
        (interval.minutes || 0) * 60 +
        (interval.seconds || 0) +
        (interval.milliseconds || 0) / 1000
    );
}

function secondsToDHMS(seconds) {
    let days = Math.floor(seconds / 86400);
    seconds %= 86400;
    let hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return { days, hours, minutes, seconds: secs };
}

// Initialize variables to track overall min/max and department names
let overallMin = { seconds: Infinity, department: "" };
let overallMax = { seconds: -Infinity, department: "" };

tableData.value.forEach((dep) => {
    const minSec = intervalToSeconds(dep.min_interval);
    const maxSec = intervalToSeconds(dep.max_interval);

    if (minSec !== null && minSec < overallMin.seconds) {
        overallMin.seconds = minSec;
        overallMin.department = dep.department_name;
    }

    if (maxSec !== null && maxSec > overallMax.seconds) {
        overallMax.seconds = maxSec;
        overallMax.department = dep.department_name;
    }
});

const minTime = secondsToDHMS(overallMin.seconds);
const maxTime = secondsToDHMS(overallMax.seconds);

const sumList = [
    {
        Header: "งบประมาณที่ใช้",
        Result: numBreak(summaryData.value.moneyMax.expenses_summary) + ' บาท',
        Department: summaryData.value.moneyMax.name,
        Color: 0,
    },
    {
        Header: "เวลาดำเนินการน้อยที่สุด",
        Result: minTime.days + " วัน " + minTime.hours + " ชม.",
        Department: overallMin.department,
        Color: 1,
    },
    {
        Header: "เวลาดำเนินการมากที่สุด",
        Result: maxTime.days + " วัน " + maxTime.hours + " ชม.",
        Department: overallMax.department,
        Color: 4,
    },
];
</script>

<style scoped>
.resultTable {
    text-align: center;
    overflow-y: auto;
    position: relative;
    border-bottom: 5px solid #ffeeda;
    max-height: 85vh;
    /* hide scrollbar but keep content scrollable */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }

    .header {
        display: grid;
        grid-template-columns: 3fr repeat(3, 1fr);
        padding: 10px 10px;
        margin-bottom: 5px;
        border-radius: 10px;
        position: sticky;
        top: 0;
        background-color: #ffeeda;

        span {
            color: var(--color-orange);
            font-weight: 600;
        }
    }

    .container {
        display: grid;
        grid-template-columns: 3fr repeat(3, 1fr);
        padding: 5px 10px;
    }
}

.gridCell {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.columnCell {
    flex-direction: column;
}

.text-center {
    text-align: center;
}

.title-text {
    font-weight: 600;
    font-size: 32px;
}

.status-row {
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 10px 0;
}

.status-icon {
    aspect-ratio: 1/1;
    border-radius: 10px;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.status-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.status-label {
    font-size: 18px;
}

.status-value {
    font-size: 22px;
    font-weight: 600;
}

.summary-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 20px 0;
    border-radius: 20px;
}

.card-title {
    font-size: 22px;
    font-weight: 600;
}

.card-value {
    font-weight: 600;
    font-size: 36px;
}

.card-department {
    font-size: 22px;
    text-align: center;
    word-wrap: break-word;
}

/* Responsive for screen under 1366px */
@media (max-width: 1366px) {
    .title-text {
        font-size: 28px;
    }
    .status-label {
        font-size: 16px;
    }
    .status-value {
        font-size: 20px;
    }
    .card-title {
        font-size: 18px;
    }
    .card-value {
        font-size: 28px;
    }
    .card-department {
        font-size: 18px;
    }
}

/* Responsive for screen under 1280px */
@media (max-width: 1280px) {
    .title-text {
        font-size: 24px;
    }
    .status-label {
        font-size: 14px;
    }
    .status-value {
        font-size: 18px;
    }
    .card-title {
        font-size: 16px;
    }
    .card-value {
        font-size: 24px;
    }
    .card-department {
        font-size: 16px;
    }
}
</style>
