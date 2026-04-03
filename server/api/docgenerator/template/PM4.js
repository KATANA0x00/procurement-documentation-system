import { tablePayment } from "./tablePayment";

export function docDefinition_PM4(data, refund_person = null) {
    const total = data.pm_list.reduce(
        (acc, item) => acc + item.amount_b + item.amount_s * 0.01,
        0,
    );
    return [
        {
            text: "แบบฟอร์มคืนเงินยืม",
            bold: true,
            alignment: "center",
            fontSize: 14,
        },
        {
            text:
                "คืนเงินยืม " +
                (refund_person === null ? data.doc_requester : refund_person) +
                " ลงวันที่ ................................................... ยอดเงินยืม " +
                total +
                " บาท",
            alignment: "center",
        },
        {
            text: "ชื่อผู้ยืมต่อ ................................. ลงวันที่ ................................................... ยอดเงินยืม ............... บาท",
            alignment: "center",
        },
        {
            text: "งบ........................................................สาขาวิชา/ส่วนบริหารงานทั่วไป.........................................",
            alignment: "center",
        },
        ...tablePayment(data.pm_list, 24),
        { text: " " },
        {
            text: "คืนเงินยืม  ................................. ลงวันที่ ................................................... ยอดเงินยืม ............... บาท",
            marginLeft: 20,
        },
        {
            text: "ชื่อผู้ยืมต่อ ................................. ลงวันที่ ................................................... ยอดเงินยืม ............... บาท",

            marginLeft: 20,
        },
        {
            text: "งบ........................................................สาขาวิชา/ส่วนบริหารงานทั่วไป.........................................",
            marginLeft: 20,
        },
        { text: " " },
        {
            layout: "noBorders",
            table: {
                widths: ["*", "*", "*", "*", 30],
                body: [
                    [
                        {},
                        {},
                        {
                            text: "เจ้าหน้าที่พัสดุผู้รับ",
                            alignment: "right",
                        },
                        {
                            text: "." + " ".repeat(40) + ".",
                            decoration: "underline",
                            decorationStyle: "dotted",
                        },
                        {},
                    ],
                    [
                        {},
                        {},
                        {
                            text: "วันที่",
                            alignment: "right",
                        },
                        {
                            text: "." + " ".repeat(40) + ".",
                            decoration: "underline",
                            decorationStyle: "dotted",
                        },
                        {},
                    ],
                ],
            },
        },
    ];
}
