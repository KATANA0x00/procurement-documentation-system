import { header } from './header'
import { unique } from './unique'
import { sign } from './sign'

import numBreak from '~/composables/numBreak'

export function docDefinition_P01 (data) {
  return [
    ...header(data, 'p01', 'บันทึกขอจัดหา', 'แบบ พ.1'),
    { text: ' ' },
    {
      table: {
        headerRows: 1,
        widths: [38, '*', 56, 68, 68],
        body: [
          [
            {
              text: 'ลำดับที่',
              bold: true,
              alignment: 'center',
              margin: [0, 9, 0, 0]
            },
            {
              text: 'รายการ',
              bold: true,
              alignment: 'center',
              margin: [0, 9, 0, 0]
            },
            { text: 'จำนวน\n(หน่วย)', bold: true, alignment: 'center' },
            { text: 'ราคาประมาณ\n(บาท)', bold: true, alignment: 'center' },
            { text: 'กำหนดเวลา\nที่ต้องใช้', bold: true, alignment: 'center' }
          ],
          [
            { text: '1.', alignment: 'center' },
            { text: data.doc_category, alignment: 'left' },
            { text: data.doc_list.length + ' รายการ', alignment: 'center' },
            // { text: numBreak((Math.ceil(data.expenses_summary / 1000) * 1000).toFixed(2)), alignment: 'right' },
            { text: numBreak(data.expenses_summary), alignment: 'right' },
            {}
          ],
          [' ', {}, {}, {}, {}],
          [' ', {}, {}, {}, {}],
          [
            {
              text: 'รวมเป็นเงินทั้งสิ้น',
              alignment: 'right',
              colSpan: 3,
              border: [false, true, true, false]
            },
            {},
            {},
            // { text: numBreak((Math.ceil(data.expenses_summary / 1000) * 1000).toFixed(2)), alignment: 'right' },
            { text: numBreak(data.expenses_summary), alignment: 'right' },
            { text: ' ', border: [true, true, false, false] }
          ],
          [
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, true] },
            { text: '', border: [false, false, false, false] }
          ]
        ]
      }
    },
    { text: 'และพร้อมกันนี้ได้แนบเอกสารประกอบการพิจารณา ดังนี้' },
    {
      columns: [
        [
          {
            text: [
              '1. รายละเอียดและคุณลักษณะพัสดุ ',
              {
                text: ' '.repeat(10),
                decoration: 'underline',
                decorationStyle: 'dotted'
              },
              ' ชุด'
            ]
          },
          {
            text: [
              '2. ใบเสนอราคาพัสดุ ',
              {
                text: ' '.repeat(10),
                decoration: 'underline',
                decorationStyle: 'dotted'
              },
              ' ชุด'
            ]
          },
          {
            text: [
              '3. สัญญาการยืมเงิน ',
              {
                text: ' '.repeat(10),
                decoration: 'underline',
                decorationStyle: 'dotted'
              },
              ' ใบ'
            ]
          },
          { text: '4. ขอเสนอชื่อ กรรมการตรวจรับพัสดุ' },
          {
            layout: 'noBorders',
            table: {
              widths: [2, '*', 95],
              body: [
                [{}, '4.1 ' + data.doc_committee[0], 'ประธานกรรมการ'],
                [{}, '4.2 ' + data.doc_committee[1], 'กรรมการ'],
                [{}, '4.3 ' + data.doc_committee[2], 'กรรมการและเลขานุการ'],
                [
                  {
                    text: 'จึงเรียนมาเพื่อโปรดพิจารณาเห็นชอบให้ดำเนินการจัดหาพัสดุ\nข้างต้นต่อไปด้วยจักขอบคุณอย่างยิ่ง',
                    colSpan: 3
                  },
                  {},
                  {}
                ]
              ]
            }
          },
          sign(data.doc_requester, 'ผู้ขอให้จัดหา'),
          sign(data.principal, 'หัวหน้าภาควิชา')
        ],
        [
          {
            text: 'ส่วนบันทึกการขอใช้เงิน',
            bold: true,
            decoration: 'underline',
            margin: [0, 0, 0, 5]
          },
          { text: 'เห็นควรอนุมัติให้จัดซื้อตามเสนอ' },
          { text: 'ทั้งนี้จะต้องดำเนินการให้แล้วเสร็จสิ้นพร้อมส่งหลักฐาน' },
          {
            text: [
              'ให้งานพัสดุภายในวันที่ ',
              {
                text:
                  ' '.repeat(10) + '/' + ' '.repeat(10) + '/' + ' '.repeat(10),
                decoration: 'underline',
                decorationStyle: 'dotted'
              }
            ]
          },
          { text: 'มอบหมายให้หน่วยงานดำเนินการจัดหาพัสดุต่อไป' },
          sign('นางสาวบุญยืน   กลัดแขก', 'นักวิชาการพัสดุ'),
          sign('ผู้ช่วยศาสตราจารย์ ดร.เปี่ยมภูมิ   สฤกพฤกษ์', 'รองคณบดี'),
          { text: ' ' },
          { text: 'อนุมัติ', alignment: 'center' },
          { text: ' ' },
          {
            text: [
              'ลงชื่อ',
              {
                text: ' '.repeat(70) + '.',
                decoration: 'underline',
                decorationStyle: 'dotted'
              }
            ],
            alignment: 'center'
          },
          {
            text: '(รองศาสตราจารย์ ดร.สมยศ   เกียรติวนิชวิไล)',
            alignment: 'center'
          },
          {
            text: 'คณบดีคณะวิศวกรรมศาสตร์',
            alignment: 'center'
          }
        ]
      ],
      columnGap: 20
    },
    {
      canvas: [
        { type: 'line', x1: 255, y1: -330, x2: 255, y2: 10, lineWidth: 1 }
      ]
    },
    { text: '', pageBreak: 'before' },
    ...unique(data)
  ]
}
