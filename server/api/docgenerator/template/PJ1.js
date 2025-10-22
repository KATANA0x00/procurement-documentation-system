import { header } from './header'
import { unique } from './unique'
import { sign } from './sign'

import numBreak from '~/composables/numBreak'

function getMaxRows (len) {
  const base = 5
  const steps = [14, 4, 17, 12]

  let current = base
  let i = 0

  while (len > current) {
    const step = i === 0 ? steps[0] : steps[((i - 1) % (steps.length - 1)) + 1]
    current += step
    i++
  }

  return current
}

export function docDefinition_PJ1 (data) {
  const maxRows = getMaxRows(data.doc_list.length)

  const paddedRows = Array.from(
    { length: maxRows - data.doc_list.length },
    (_, index) => [{ text: ' ' }, {}, {}, {}, {}, {}, {}]
  )
  return [
    ...header(data, 'pj1', 'บันทึกรายงานขอซื้อ', 'แบบ พจ.1'),
    { text: ' ' },
    {
      table: {
        headerRows: 1,
        widths: [24, 34, '*', 38, 48, 50, 58],
        body: [
          [
            {
              text: 'ลำดับที่',
              bold: true,
              alignment: 'center',
              margin: [0, 16, 0, 0]
            },
            {
              text: 'รหัสพัสดุ\nGPSC',
              bold: true,
              alignment: 'center',
              margin: [0, 16, 0, 0]
            },
            {
              text: 'รายการและรายละเอียด',
              bold: true,
              alignment: 'center',
              margin: [0, 24, 0, 0]
            },
            {
              text: 'จำนวน\n(หน่วย)',
              bold: true,
              alignment: 'center',
              margin: [0, 16, 0, 0]
            },
            {
              text: 'ราคาซื้อ\nครั้งหลังสุด\nหน่วยละ\n(บาท)',
              bold: true,
              alignment: 'center'
            },
            {
              text: 'ราคาซื้อ\nครั้งนี้\nหน่วยละ\n(บาท)',
              bold: true,
              alignment: 'center'
            },
            {
              text: 'รวมเงิน\n(บาท)',
              bold: true,
              alignment: 'center',
              margin: [0, 16, 0, 0]
            }
          ],
          ...data.doc_list.map((item, index) => [
            { text: index + 1 + '.', alignment: 'center' },
            {},
            { text: item.name, alignment: 'left' },
            { text: item.qty + ' ' + item.unit, alignment: 'center' },
            {},
            { text: numBreak(item.price), alignment: 'right' },
            { text: numBreak(item.total), alignment: 'right' }
          ]),
          ...paddedRows,
          [
            {
              text: 'ราคารวมรายการ',
              colSpan: 5,
              alignment: 'right',
              border: [false, false, false, false]
            },
            {},
            {},
            {},
            {},
            {
              text: numBreak(
                data.is_vat_included
                  ? data.expenses_summary
                  : (data.expenses_summary / 107) * 100
              ),
              alignment: 'right',
              colSpan: 2
            },
            {}
          ],
          [
            {
              text: 'ภาษีมูลค่าเพิ่ม 7%',
              colSpan: 5,
              alignment: 'right',
              border: [false, false, false, false]
            },
            {},
            {},
            {},
            {},
            {
              text: numBreak((data.expenses_summary * 7) / 107),
              alignment: 'right',
              colSpan: 2
            },
            {}
          ],
          [
            {
              text: 'รวมเป็นเงินทั้งสิ้น',
              colSpan: 5,
              alignment: 'right',
              border: [false, false, false, false]
            },
            {},
            {},
            {},
            {},
            {
              text: numBreak(data.expenses_summary),
              alignment: 'right',
              colSpan: 2
            },
            {}
          ],
          [
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, true] },
            { text: '', border: [false, false, false, true] }
          ]
        ]
      }
    },
    ...unique(data),
    { text: '', pageBreak: 'before' },
    { text: ' ' },
    { text: 'และพร้อมกันนี้ได้แนบเอกสารประกอบการพิจารณา ดังนี้' },
    {
      text: [
        ' ',
        {
          text: ' '.repeat(20)
        },
        '1. บันทึกเสนอซื้อ(พัสดุ) ',
        {
          text: ' '.repeat(30),
          decoration: 'underline',
          decorationStyle: 'dotted'
        }
      ]
    },
    {
      text: [
        ' ',
        {
          text: ' '.repeat(20)
        },
        '2. ใบเสนอราคาพัสดุ ',
        {
          text: ' '.repeat(30),
          decoration: 'underline',
          decorationStyle: 'dotted'
        },
        'ชุด'
      ]
    },
    { text: ' ' },
    {
      columns: [
        [
          { text: 'จึงเรียนมาเพื่อโปรดพิจารณา' },
          {
            text:
              '1.1 อนุมัติให้จัดซื้อวัสดุ วัสดุการศึกษาจำนวน ' +
              data.doc_list.length +
              ' รายการ วงเงิน ' +
              data.expenses_summary +
              ` บาท โดยวิธีเฉพาะเจาะจงตามพระราชบัญญัติการจัดซื้อจัดจ้าง และการบริหารบัญญัติการจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ. 2560 ข้อ 56 (2)ข้อ (ข) และกฎกระทรวง เรื่อง  กำหนดวงเงินการจัดซื้อจัดจ้างพัสดุโดยวิธีเฉพาะเจาะจง วงเงินการจัดซื้อจัดจ้างที่ไม่ทำข้อตกลงเป็นหนังสือ และวงเงินจัดซื้อจัดจ้างในการแต่งตั้งผู้ตรวจรับพัสดุ พ.ศ. 2560 ข้อ 1 ซึ่งอยู่ภายใต้อำนาจจัดซื้อจัดจ้าง  ข้อ 86 ของระเบียบกระทรวงการคลังว่าด้วยการจัดซื้อจัดจ้าง และบริหารภาครัฐ พ.ศ.2560 และได้ตรวจสอบเอกสารการเงินเป็นที่เรียบร้อยแล้ว โดยขอเบิกจากเงินรายได้ ประจำปี 2569 จากผู้ขาย${data.pm_list[0].name} เนื่องจากมีรายการสินค้าครบตามต้องการ`
          },
          { text: ' ' },
          { text: '1.2 อนุมัติแต่งตั้งกรรมการตรวจรับพัสดุ' },
          {
            text: [
              ' ',
              {
                text: ' '.repeat(10)
              },
              '1.2.1 ' + data.doc_committee[0]
            ]
          },
          {
            text: [
              ' ',
              {
                text: ' '.repeat(10)
              },
              '1.2.2 ' + data.doc_committee[1]
            ]
          },
          {
            text: [
              ' ',
              {
                text: ' '.repeat(10)
              },
              '1.2.3 ' + data.doc_committee[2]
            ]
          },
          { text: ' ' },
          { text: '1.3 ลงนามในใบสั่งซื้อ ที่แนบมานี้' },
          sign(data.doc_requester, 'ผู้ขอซื้อ'),
          sign(data.principal, 'หัวหน้าภาควิชา')
        ],
        [
          { text: ' ' },
          { text: 'ส่วนบันทึกงานพัสดุคณะ/สำนัก', bold: true },
          { text: 'เรียน   คณบดี' },
          { text: 'เห็นควรโปรดพิจารณา' },
          {
            text:
              '1.4 อนุมัติให้' +
              data.department +
              '  จัดซื้อ' +
              data.doc_category +
              ' จำนวน ' +
              data.doc_list.length +
              ' รายการ วงเงิน ' +
              data.expenses_summary +
              ' บาทด้วยเงินรายได้   ตามรายละเอียดข้างต้น'
          },
          { text: ' ' },
          { text: '1.5 อนุมัติแต่งตั้งกรรมการตรวจรับตามเสนอ' },
          { text: '1.6 ลงนามในใบสั่งซื้อ/จ้าง  ที่แนบมานี้' },
          sign(data.procurementer, 'นักวิชาการพัสดุ'),
          { text: ' ' },
          { text: '1.7 บันทึกชี้แจงเพิ่มเติม(ถ้ามี)' },
          {
            text: [
              ' ',
              {
                text: ' '.repeat(90),
                decoration: 'underline',
                decorationStyle: 'dotted'
              }
            ]
          },
          {
            text: [
              ' ',
              {
                text: ' '.repeat(90),
                decoration: 'underline',
                decorationStyle: 'dotted'
              }
            ]
          },
          sign('นางสาวบุญยืน   กลัดแขก', 'นักวิชาการพัสดุ'),
          sign('ผู้ช่วยศาสตราจารย์ ดร.เปี่ยมภูมิ  สฤกพฤกษ์', 'รองคณบดี'),
          { text: ' ' },
          { text: '1.8 อนุมัติให้ดำเนินการจัดซื้อและลงนามเรียบร้อยแล้ว' },
          sign('รองศาสตราจารย์ ดร.สมยศ   เกียรติวนิชวิไล', 'ผู้อนุมัติ'),
          { text: 'คณบดีคณะวิศวกรรมศาสตร์', alignment: 'center' }
        ]
      ],
      columnGap: 20
    },
    {
      canvas: [
        { type: 'line', x1: 265, y1: -580, x2: 265, y2: 10, lineWidth: 1 }
      ]
    }
  ]
}
