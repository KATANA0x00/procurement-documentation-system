import numBreak from '~/composables/numBreak'
import { sign43, sign432, sign433 } from './sign'

function getMaxRows(len) {
    const base = 9
    const steps = [13, 2, 9, 13]

    let current = base
    let i = 0

    while (len > current) {
        const step = i === 0 ? steps[0] : steps[((i - 1) % (steps.length - 1)) + 1]
        current += step
        i++
    }

    return current
}

export function docDefinition_P43(data) {
    const maxRows = getMaxRows(data.doc_list.length)

    const paddedRows = Array.from(
        { length: maxRows - data.doc_list.length },
        (_, index) => [{ text: ' ' }, {}, {}, {}, {}, {}, {}, {}, {}]
    )
    return [
        { text: 'แบบ พ.43', alignment: 'right' },
        { text: 'ใบเบิกวัสดุ', bold: true, alignment: 'center', fontSize: 14 },
        { text: ' ' },
        {
            columns: [
                [
                    { text: 'เล่มที่' + '.'.repeat(10), alignment: 'left' },
                    { text: ' ' },
                    { text: 'เลขที่' + '.'.repeat(10), alignment: 'left' }
                ],
                [
                    { text: 'ส่วนราชการ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารฯ' },
                    { text: 'หน่วยงาน    คณะวิศวกรรมศาสตร์' },
                    { text: 'ภาควิชา/กอง ' + data.department },
                    { text: 'วันที่' + '.'.repeat(15) + 'เดือน' + '.'.repeat(20) + 'พ.ศ.' + '.'.repeat(15) }
                ]
            ], columnGap: 50
        },
        {
            layout: 'noBorders',
            table: {
                widths: [42, '*', 24, '*'],
                body: [
                    [
                        { text: 'เรียน หัวหน้างานพัสดุ', bold: true, colSpan: 4 },
                        {},
                        {},
                        {}
                    ],
                    [
                        {
                            text:
                                'ด้วย ' +
                                data.doc_requester +
                                'มีความประสงค์ขอเบิกพัสดุตามรายการ และจำนวน ' +
                                data.doc_list.length +
                                ' รายการ' +
                                ' เพื่อ' +
                                data.doc_reason +
                                ' และต้องการใช้สิ่งของตามใบเบิกนี้\nภายในวันที่ ' +
                                '.'.repeat(15) +
                                'เดือน' +
                                '.'.repeat(25) +
                                'พ.ศ' +
                                '.'.repeat(15) +
                                'และมอบให้' +
                                '.'.repeat(60) +
                                'เป็นผู้รับพัสดุแทน',
                            colSpan: 4,
                            leadingIndent: 24
                        },
                        {},
                        {},
                        {}
                    ]
                ]
            }
        },
        { text: ' ' },
        {
            table: {
                headerRow: 2,
                widths: [24, '*', 28, 28, 18, 38, 55, 55, 25],
                body: [
                    [
                        {
                            text: 'ลำดับที่',
                            bold: true,
                            alignment: 'center',
                            rowSpan: 2,
                            margin: [0, 18, 0, 0]
                        },
                        {
                            text: 'รายการ',
                            bold: true,
                            alignment: 'center',
                            rowSpan: 2,
                            margin: [0, 18, 0, 0]
                        },
                        { text: 'จำนวน', bold: true, alignment: 'center', colSpan: 3 },
                        {},
                        {},
                        { text: 'ส่วนของงานพัสดุ', bold: true, alignment: 'center', colSpan: 3 },
                        {},
                        {},
                        {
                            text: 'หมาย\nเหตุ',
                            bold: true,
                            alignment: 'center',
                            rowSpan: 2,
                            margin: [0, 18, 0, 0]
                        }
                    ],
                    [
                        {},
                        {},
                        { text: 'เบิก', bold: true, alignment: 'center' },
                        { text: 'จ่าย', bold: true, alignment: 'center' },
                        { text: 'ค้างจ่าย', bold: true, alignment: 'center' },
                        { text: 'รหัสพัสดุ', bold: true, alignment: 'center' },
                        { text: 'ต้นทุน/หน่วย', bold: true, alignment: 'center' },
                        { text: 'จำนวนเงิน', bold: true, alignment: 'center' },
                        {}
                    ],
                    ...data.doc_list.map((item, index) => [
                        { text: index+1+'.', alignment: 'center' },
                        { text: item.name, alignment: 'left' },
                        { text: item.qty + ' ' + item.unit, alignment: 'center' },
                        { text: item.qty + ' ' + item.unit, alignment: 'center' },
                        {},
                        {},
                        {},
                        {},
                        {}
                    ]),
                    ...paddedRows,
                    [
                        { text: ' ', alignment: 'center', colSpan: 5 },
                        {},
                        {},
                        {},
                        {},
                        {
                            text: 'รวม',
                            alignment: 'center',
                            colSpan: 2,
                            border: [false, false, false, false]
                        },
                        {},
                        {text: numBreak(data.expenses_summary), alignment: 'right'},
                        {},
                    ]
                ]
            }
        },
        { text: ' ' },
        {text:' '},
        {
            columns:
                [
                    [
                        sign43('ผู้ขอเบิก'),
                        { text: ' ' },
                        sign432('หัวหน้าภาควิชา'),
                        { text: 'ได้รับสิ่งของไปถูกต้องเรียบร้อยแล้ว', bold: true },
                        sign43('ผู้รับพัสดุ')
                    ],
                    [
                        sign432('ผู้ตัดบัญชีพัสดุ'),
                        sign432('ผู้จ่ายของ'),
                        { text: ' ' },
                        { text: 'อนุมัติให้จ่ายได้', bold: true, margin: [45, 0, 0, 0] },
                        sign433('.'.repeat(40), 'ผู้สั่งจ่าย'),
                        {
                            text: 'หัวหน้างานพัสดุ',
                            alignment: 'left',
                            margin: [45, 0, 0, 0]
                        },
                        {
                            text:
                                [
                                    'ว.ด.ป.',
                                    {
                                        text: ' '.repeat(40),
                                        decoration: 'underline',
                                        decorationStyle: 'dotted'
                                    }
                                ],
                            alignment: 'left',
                            margin: [0, 0, 0, 0]
                        },
                        { text: ' ' },
                        { text: 'เอกสารผ่านงานบัญชีแล้ว', bold: true },
                        sign433('.'.repeat(40), 'หัวหน้างานบัญชี'),
                        {
                            text:
                                [
                                    'ว.ด.ป.',
                                    {
                                        text: ' '.repeat(40),
                                        decoration: 'underline',
                                        decorationStyle: 'dotted'
                                    }
                                ],
                            alignment: 'left',
                            margin: [0, 0, 0, 0]
                        }
                    ]
                ], columnGap: 10
        },
        {
            canvas: [
                { type: 'line', x1: 235, y1: -240, x2: 235, y2: -75, lineWidth: 1 }
            ]
        }
    ]
}