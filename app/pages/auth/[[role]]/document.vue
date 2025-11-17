<template>
    <div
    v-if="popupVertify"
        style="
            z-index: 1;
            top: 0;
            left: 0;
            background-color: rgba(128, 128, 128, 0.2);
            position: absolute;
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        "
    >
        <div
            style="
                display: flex;
                flex-direction: column;
                background-color: var(--color-theme);
                padding: 40px;
                border-radius: 10px;
            "
        >
            <label
                style="
                    font-size: 24px;
                    margin-bottom: 20px;
                    color: var(--color-orange);
                "
                >ยืนยันการส่งเอกสาร</label
            >
            <div style="display: flex; justify-content: space-around; margin-top: 20px;">
                <button
                    style="border: none; border-radius: 7px; padding: 5px 15px; background-color: #20D897; cursor: pointer;"
                    @click="validHandler()"
                >
                    <span style="color: var(--color-theme)">ยืนยัน</span>
                </button>
                <button
                    style="border: none; border-radius: 7px; padding: 5px 15px; background-color: #fb4141; cursor: pointer;"
                    @click="invalidHandler()"
                >
                    <span style="color: var(--color-theme)">ยกเลิก</span>
                </button>
            </div>
        </div>
    </div>
    <div
        v-if="popupComment"
        style="
            z-index: 1;
            top: 0;
            left: 0;
            background-color: rgba(128, 128, 128, 0.2);
            position: absolute;
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        "
    >
        <div
            style="
                display: flex;
                flex-direction: column;
                background-color: var(--color-theme);
                padding: 20px;
                border-radius: 10px;
            "
        >
            <label
                style="
                    font-size: 24px;
                    margin-bottom: 10px;
                    color: var(--color-orange);
                "
                >คำแนะนำการแก้ไข</label
            >
            <textarea
                v-model="messageInput"
                placeholder="ระบุคำแนะนำการแก้ไข"
                style="
                    width: 400px;
                    height: 300px;
                    border-radius: 8px;
                    border: 1px solid var(--color-sub-mid);
                    padding: 10px 20px;
                    font-size: 16px;
                    margin-bottom: 20px;
                    background-color: var(--color-sub-light);
                "
            ></textarea>
            <div style="display: flex; justify-content: space-between">
                <button @click="cancelHandler()" class="getComment-btn-cancel">
                    ยกเลิก
                </button>
                <button @click="submitHandler()" class="getComment-btn">
                    ส่งแก้ไข
                </button>
            </div>
        </div>
    </div>
    <div
        v-if="PDFLoad"
        style="
            z-index: 1;
            top: 0;
            left: 0;
            position: absolute;
            width: 100vw;
            height: 100vh;
            background-color: rgba(128, 128, 128, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
        "
    >
        <Icon
            name="line-md:downloading-loop"
            size="12em"
            style="color: var(--color-orange); transform: translateY(-100px)"
        />
    </div>
    <div style="display: flex">
        <div class="navPage">
            <div
                :style="{
                    color: getStatusInfo(data.status).color,
                    border: `solid ${getStatusInfo(data.status).color} 3px`,
                    backgroundColor: getStatusInfo(data.status).color + '15',
                }"
                style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-size: 18px;
                    border-radius: 10px;
                    margin-bottom: 15px;
                    padding: 10px 0;
                    cursor: default;
                "
            >
                <Icon
                    :name="getStatusInfo(data.status).iconName || ''"
                    size="2em"
                    :style="{ color: getStatusInfo(data.status).color }"
                />
                {{ getStatusText(data.status) }}
            </div>

            <Svgbutton
                v-for="tab in tabList"
                :key="tab.page"
                :class="activePage === tab.page ? 'active' : undefined"
                :color="
                    activePage === tab.page ? 'var(--color-orange)' : undefined
                "
                :iconName="tab.iconName"
                @click="activePage = tab.page"
            >
                {{ tab.text }}
            </Svgbutton>
        </div>
        <div class="bodyPage">
            <div class="actionPage">
                <div
                    v-if="activePage === 'table-page'"
                    style="display: flex; position: absolute; left: 0"
                >
                    <Svgbutton
                        iconName="material-symbols:docs-add-on-rounded"
                        color="#FFF"
                        style="
                            background-color: #30a951;
                            padding-right: 20px;
                            border-radius: 8px 0 0 8px;
                        "
                        @click="triggerCSV"
                        >เพิ่มจากไฟล์</Svgbutton
                    >
                    <input
                        ref="csvInput"
                        type="file"
                        accept="application/csv"
                        style="display: none"
                        @change="uploadCSV"
                    />
                    <div>
                        <Svgbutton
                            iconName="ic:round-file-download"
                            color="#FFF"
                            style="
                                background-color: #30a951;
                                margin-left: 0px;
                                border-radius: 0 8px 8px 0;
                            "
                            @click="downloadTemplate()"
                        />
                    </div>
                </div>
                <Svgbutton
                    v-if="activePage === 'attach-page'"
                    iconName="solar:clipboard-outline"
                    color="#FFF"
                    style="
                        background-color: #30a951;
                        padding-right: 15px;
                        position: absolute;
                        left: 0;
                    "
                    @click="triggerUpload"
                    >เพิ่มไฟล์แนบ</Svgbutton
                >
                <input
                    ref="fileInput"
                    type="file"
                    accept=".pdf,image/png,image/jpeg"
                    style="display: none"
                    @change="handleFileChange"
                    multiple
                />
                <Svgbutton
                    iconName="hugeicons:pdf-01"
                    color="#FFF"
                    style="
                        background-color: #fb4141;
                        padding-left: 10px;
                        padding-right: 20px;
                        border-radius: 8px 0 0 8px;
                        margin-right: 2px;
                    "
                    @click="generatePDF()"
                    >PDF
                </Svgbutton>
                <div ref="pdfRef">
                    <Svgbutton
                        iconName="solar:alt-arrow-down-bold"
                        color="#FFF"
                        style="
                            background-color: #fb4141;
                            margin-left: 2px;
                            border-radius: 0 8px 8px 0;
                        "
                        @click="pdfIsActive = !pdfIsActive"
                    />
                    <ul
                        class="actionList"
                        style="width: 25%"
                        :style="[
                            pdfIsActive
                                ? {}
                                : { visibility: 'hidden', overflow: 'hidden' },
                            data.status === 'done'
                                ? { right: 0 }
                                : { right: '200px' },
                        ]"
                    >
                        <li
                            v-for="item in quickPDFList"
                            @click="generatePDF(item.docNeed)"
                        >
                            {{ item.text }}
                        </li>
                    </ul>
                </div>
                <Svgbutton
                    v-for="(item, i) in quickActionList.filter(
                        (q) => q.isDisplay
                    )"
                    v-if="data.status !== 'done'"
                    :key="i"
                    iconName="mingcute:send-line"
                    color="#FFF"
                    style="
                        background-color: #00aaff;
                        padding-right: 20px;
                        margin-right: 2px;
                        border-radius: 8px 0 0 8px;
                    "
                    @click="actionDoc(item.action)"
                >
                    {{ item.label }}
                </Svgbutton>
                <div ref="docRef">
                    <Svgbutton
                        iconName="solar:alt-arrow-down-bold"
                        color="#FFF"
                        :style="
                            data.status === 'done'
                                ? { display: 'none' }
                                : undefined
                        "
                        style="
                            background-color: #00aaff;
                            margin-left: 2px;
                            border-radius: 0 8px 8px 0;
                        "
                        @click="docIsActive = !docIsActive"
                    />
                    <ul
                        class="actionList"
                        :style="
                            docIsActive
                                ? undefined
                                : { visibility: 'hidden', overflow: 'hidden' }
                        "
                    >
                        <li @click="actionDoc('save')">บันทึก</li>
                        <li @click="actionDoc('edit')" v-if="role === 'admin'">
                            ส่งแก้ไข
                        </li>
                        <div
                            style="
                                height: 10px;
                                background-color: var(--color-sub-mid);
                            "
                            v-if="role === 'admin' && data.status === 'signed'"
                        ></div>
                        <li
                            @click="actionDoc('approve')"
                            v-if="role === 'admin' && data.status === 'signed'"
                        >
                            ส่งขอเอกสารใหม่
                        </li>
                    </ul>
                </div>
            </div>
            <DocInfo
                v-if="activePage === 'info-page'"
                v-model:data="data"
                v-model:departmentList="userInfo.departments"
            />
            <DocTable
                v-if="activePage === 'table-page'"
                v-model:data="data.doc_list"
                v-model:summary="data.expenses_summary"
                v-model:isVAT="data.is_vat_included"
            />
            <DocAttch
                v-if="activePage === 'attach-page'"
                v-model:data="data.doc_file"
                v-model:viewPDF="viewPDF"
                @removeFile="deletedFiles.push($event)"
            />
            <DocPayment
                v-if="activePage === 'payment-page'"
                v-model:dataPayment="dataPayment"
            />
            <DocTrack
                v-if="activePage === 'track-page'"
                v-model:datas="data"
                v-model:docId="id"
            />
        </div>
    </div>
</template>

<script setup>
useHead({
    title: "PASADU : การจัดการเอกสาร",
});

const userInfo = useState("userInfo");
const route = useRoute();
const role = route.params.role; // admin
const id = route.query.doc; // new
const activePage = ref("info-page");

const PDFLoad = ref(false);
const docIsActive = ref(false);
const pdfIsActive = ref(false);

const tabList = [
    {
        page: "info-page",
        iconName: "mdi:file-document-multiple-outline",
        text: "ข้อมูลทั่วไป",
    },
    {
        page: "table-page",
        iconName: "material-symbols:table-outline",
        text: "ตารางรายการ",
    },
    {
        page: "attach-page",
        iconName: "majesticons:clipboard-list-line",
        text: "เอกสารแนบ",
    },
    {
        page: "payment-page",
        iconName: "tdesign:bill",
        text: "ใบสำคัญจ่าย",
    },
    {
        page: "track-page",
        iconName: "tabler:route-square",
        text: "เส้นทาง",
    },
];

const quickPDFList = [
    { text: "พ.1", docNeed: ["P01"] },
    { text: "พจ.1 + พ.43", docNeed: ["PJ1", "P43"] },
    { text: "พจ.1 + พ.43 + ใบสำคัญจ่าย", docNeed: ["PJ1", "P43", "PM"] },
    {
        text: "พ.1 + พจ.1 + พ.43 + ใบสำคัญจ่าย",
        docNeed: ["P01", "PJ1", "P43", "PM"],
    },
];

const quickActionList = computed(() => [
    {
        label: "ส่งเอกสาร",
        action: "waiting",
        isDisplay: role === "",
    },
    {
        label: "ตรวจแล้ว",
        action: "approve",
        isDisplay:
            role === "admin" && ["waiting", "edit"].includes(data.value.status),
    },
    {
        label: "รับเอกสารแล้ว",
        action: "signed",
        isDisplay: role === "admin" && data.value.status === "approve",
    },
    {
        label: "ตั้งเบิก",
        action: "done",
        isDisplay: role === "admin" && data.value.status === "signed",
    },
]);

// ------------------- File Handler ------------------ //
const fileInput = ref(null);
const csvInput = ref(null);
const uploadedFileMeta = ref([]);
const deletedFiles = ref([]);
const fileMap = ref(new Map());
function triggerUpload() {
    fileInput.value.click();
}
async function handleFileChange(event) {
    const target = event.target;
    const files = target.files;
    if (!files || files.length === 0) return;

    const docId = id;
    const timestamp = Date.now();

    const metaList = [];
    const originalFiles = Array.from(files);
    originalFiles.forEach((file, index) => {
        const ext = file.name.split(".").pop() || "bin";
        const storedName = `${docId}_${timestamp}_${index + 1}.${ext}`;
        fileMap.value.set(file.name, file);
        metaList.push({
            file: storedName,
            name: file.name,
        });
    });

    if (!Array.isArray(data.value.doc_file)) {
        data.value.doc_file = [];
    }
    data.value.doc_file.push(...metaList);
    uploadedFileMeta.value = metaList;
    if (fileInput.value) fileInput.value.value = "";
}

const uploadFiles = async (docid = id) => {
    console.log("frontend call upload");
    // --- Step 1: Upload new files ---
    const newFormData = new FormData();
    for (const item of data.value.doc_file) {
        const file = fileMap.value.get(item.name);
        if (file) {
            // new file (because it's still in fileMap)
            newFormData.append("files", file, item.file);
        }
    }

    if ([...newFormData.entries()].length > 0) {
        try {
            const res = await fetch(`/api/db/doc/upload/${docid}`, {
                method: "POST",
                body: newFormData,
            });
            if (!res.ok)
                throw new Error(`Upload failed with status ${res.status}`);
        } catch (err) {
            console.error("Upload failed:", err);
        }
    }
    // --- Step 2: Delete removed files ---
    try {
        const res = await fetch(`/api/db/doc/delete/${docid}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                files: deletedFiles.value,
            }),
        });
        if (!res.ok) throw new Error(`Delete failed with status ${res.status}`);
    } catch (err) {
        console.error("Delete failed:", err);
    }
};

function triggerCSV() {
    csvInput.value.click();
}
async function uploadCSV(event) {
    const file = event.target.files[0];
    if (file) {
        const rows = await readCSV(file);
        data.value.doc_list = rows;
        csvInput.value.value = null;
    }
}

// ------------------- Document Action ------------------ //
async function actionDoc(status, stay = false) {
    if (data.value.status === "done") {
        return id;
    }
    const prevStatus = data.value.status;
    if (
        role === "" &&
        ["waiting", "approve", "signed", "done"].includes(prevStatus) &&
        !stay
    ) {
        alert("ไม่สามารถดำเนินการกับเอกสารในสถานะนี้ได้");
        return false;
    }

    if (role === "admin" && prevStatus === "edit") {
        alert("ไม่สามารถดำเนินการกับเอกสารในสถานะนี้ได้");
        return false;
    }

    const message = ref("");
    if (status === "edit") {
        const result = await getComment();
        if (result === null) {
            return false;
        }
        message.value = result;
    }

    if (status === "waiting") {
        const result = await getVertify();
        if (result === null) {
            return false;
        }
    }

    async function getDepartment_id(departmentID) {
        const departments = await $fetch("/api/db/departmentlist");
        const found = departments.find(
            (dept) => dept.department_name === departmentID
        );
        return found ? found.department_id : 36;
    }
    const dp_id = await getDepartment_id(data.value.doc_department);
    const dp_main_id = await getDepartment_id(data.value.doc_sub_department);
    
    const response = await $fetch(`/api/db/doc/${status}/${id}`, {
        method: "POST",
        body: {
            userId: userInfo.value.id,
            datas: {
                ...data.value,
                department: dp_id,
                sub_department: dp_main_id
            },
            dataPayment: dataPayment.value,
            message: message.value,
        },
    });
    if (uploadedFileMeta.value.length > 0 || deletedFiles.value.length > 0) {
        if (id === "new") {
            uploadFiles(response.docid);
        } else {
            uploadFiles();
        }
    }

    if (!stay) {
        navigateTo(`/auth/${role}`);
    } else {
        return response.docid;
    }
}

const messageInput = ref("");
const submitHandler = ref(null);
const cancelHandler = ref(null);
const popupComment = ref(false);
function getComment() {
    popupComment.value = true;

    return new Promise((resolve) => {
        const onSubmit = () => {
            popupComment.value = false;
            resolve(messageInput.value);
            messageInput.value = "";
        };
        const onCancel = () => {
            popupComment.value = false;
            resolve(null); // ✅ indicate cancel
            messageInput.value = "";
        };
        submitHandler.value = onSubmit;
        cancelHandler.value = onCancel;
    });
}

const validHandler = ref(null);
const invalidHandler = ref(null);
const popupVertify = ref(false);
function getVertify() {
    popupVertify.value = true;

    return new Promise((resolve) => {
        const onValid = () => {
            popupVertify.value = false;
            resolve(true);
        };
        const onInvalid = () => {
            popupVertify.value = false;
            resolve(null); // ✅ indicate cancel
        };
        validHandler.value = onValid;
        invalidHandler.value = onInvalid;
    });
}

async function viewPDF(fileElement) {
    const docid = await actionDoc("save", true);
    if (!docid) {
        return;
    }
    pdfIsActive.value = false;
    PDFLoad.value = true;

    const pdfWindow = window.open("", "_blank");
    pdfWindow.document.write(`
    <html>
      <head>
        <title>Generating PDF...</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 80vh;
            font-family: sans-serif;
            background: #f9f9f9;
          }
          h2 {
            color: #555;
          }
        </style>
      </head>
      <body>
        <h2>⏳ Please wait... generating your PDF</h2>
      </body>
    </html>
  `);
    pdfWindow.document.close();

    try {
        const response = await $fetch(`/api/db/loadeddocument/${docid}`, {
            method: "POST",
            body: fileElement,
            responseType: "arrayBuffer",
        });

        const blob = new Blob([response], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        pdfWindow.location.href = url;
    } finally {
        PDFLoad.value = false;
    }
}
// ------------------- Document ------------------ //
async function generatePDF(docNeed = ["P01", "PJ1", "P43", "AFI", "PM"]) {
    const docid = await actionDoc("save", true);
    if (!docid) {
        return;
    }
    pdfIsActive.value = false;
    PDFLoad.value = true;

    const pdfWindow = window.open("", "_blank");
    pdfWindow.document.write(`
    <html>
      <head>
        <title>Generating PDF...</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 80vh;
            font-family: sans-serif;
            background: #f9f9f9;
          }
          h2 {
            color: #555;
          }
        </style>
      </head>
      <body>
        <h2>⏳ Please wait... generating your PDF</h2>
      </body>
    </html>
  `);
    pdfWindow.document.close();

    try {
        const res = await $fetch.raw(`/api/docgenerator/${docid}`, {
            method: "POST",
            body: { docNeed },
        });

        const blob = new Blob([res._data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        pdfWindow.location.href = url;
    } finally {
        PDFLoad.value = false;
    }
}

// ------------------- API CALL ------------------ //
const data = ref(
    await $fetch(
        `/api/db/full_document/${id}${
            id === "new" ? `?usrid=${userInfo.value.department_ids[0]}` : ""
        }`,
        {
            method: "GET",
        }
    )
);

const dataPayment = ref(
    await $fetch(`/api/db/payment_document/${id}`, {
        method: "GET",
    })
);
// click outside logic
const docRef = ref(null);
const pdfRef = ref(null);
const handleClickOutside = (event) => {
    if (docRef.value && !docRef.value.contains(event.target)) {
        docIsActive.value = false;
    }
    if (pdfRef.value && !pdfRef.value.contains(event.target)) {
        pdfIsActive.value = false;
    }
};
onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.navPage {
    width: max-content;

    button {
        width: 100%;
        padding: 5px 10px;
    }

    .active {
        background-color: var(--color-sub-light);
        border: 1px solid var(--color-sub-mid);
        border-radius: 8px;
    }
}

.bodyPage {
    margin: 0 200px 0 100px;
    flex: 1;

    .actionPage {
        display: flex;
        justify-content: flex-end;
        position: relative;

        div > button {
            height: 100%;
        }

        button {
            margin: 0 5px;
        }

        .actionList {
            position: absolute;
            top: 80%;
            right: 0;
            z-index: 1;
            padding: 0;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid var(--color-orange);
            width: 20%;

            li {
                list-style: none;
                padding: 8px 20px;
                background-color: var(--color-sub-light);
                cursor: pointer;
                opacity: 1;
            }

            li:hover {
                background-color: var(--color-theme);
                color: var(--color-orange);
            }
        }
    }
}

@media (max-width: 1366px) {
    .bodyPage {
        margin: 0 100px 0 100px;
    }
}

.getComment-btn {
    background-color: transparent;
    color: var(--color-orange);
    border: 2px solid var(--color-orange);
    border-radius: 10px;
    padding: 10px 20px;
    width: fit-content;
}

.getComment-btn:hover {
    background-color: var(--color-orange);
    color: var(--color-theme);
}

.getComment-btn-cancel {
    background-color: transparent;
    color: var(--color-sub-dark);
    border: 2px solid var(--color-sub-dark);
    border-radius: 10px;
    padding: 10px 20px;
    width: fit-content;
}

.getComment-btn-cancel:hover {
    background-color: var(--color-sub-dark);
    color: var(--color-theme);
}
</style>
