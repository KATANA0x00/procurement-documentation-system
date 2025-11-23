<template>
    <div class="chart-container">
        <canvas ref="canvasRef"></canvas>
        <div class="center-text">
            <span class="main-text">{{
                numBreak(
                    summaryDoc.reduce(
                        (sum, item) => sum + Number(item.total),
                        0
                    )
                ).slice(0, -3)
            }}</span>
            <span class="sub-text">ฉบับ</span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    summaryDoc: {
        type: Array,
        default: [],
    },
});
import { onMounted, ref } from "vue";
import {
    Chart,
    DoughnutController,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const canvasRef = ref(null);
const order = ["waiting", "edit", "approve", "signed", "done"];
onMounted(() => {
    new Chart(canvasRef.value, {
        type: "doughnut",
        data: {
            labels: order.map((status) => getStatusText(status)),
            datasets: [
                {
                    label: "จำนวน",
                    data: order.map((status) => {
                        const item = props.summaryDoc.find(
                            (i) => i.status === status
                        );
                        return item ? Number(item.total) : 0;
                    }),
                    backgroundColor: [2, 0, 4, 3, 1].map((index) =>
                        colorPalettes(index)
                    ),
                    borderWidth: 5,
                },
            ],
        },
        options: {
            responsive: true,
            cutout: "60%",
            plugins: {
                legend: { display: false },
            },
        },
    });
});
</script>

<style scoped>
.chart-container {
    position: relative;
}

.center-text {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    justify-content: center;
}

.main-text {
    font-weight: 600;
    font-size: 38px;
}

.sub-text {
    font-size: 24px;
}

/* Responsive for screen width under 1366px */
@media (max-width: 1366px) {
    .chart-container {
        width: 240px;
        height: 240px;
    }
    .main-text {
        font-size: 32px;
    }
    .sub-text {
        font-size: 20px;
    }
}

/* Specific for 1280px screen */
@media (max-width: 1280px) {
    .chart-container {
        width: 210px;
        height: 210px;
    }
    .main-text {
        font-size: 28px;
    }
    .sub-text {
        font-size: 18px;
    }
}
</style>
