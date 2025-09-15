import { header } from './template/header'
import { sign } from './template/sign'

export function docDefinition_P01 () {
  return [
    ...header(),
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
            { text: 'กำหนดเวลาที่ต้องใช้', bold: true, alignment: 'center' }
          ],
          [
            { text: '1.', alignment: 'center' },
            { text: 'A', alignment: 'left' },
            { text: '1 รายการ', alignment: 'center' },
            { text: '1,000,000.00', alignment: 'right' },
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
            { text: '1,000,000.00', alignment: 'right' },
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
                [{}, '4.1 ผศ.ดร.ธนวิชญ์ อนุวงศ์พินิจ', 'ประธานกรรมการ'],
                [{}, '4.2 ผศ.สรพงษ์ วชิรรัตนพรกุล', 'กรรมการ'],
                [{}, '4.3 ดร.นัชนัยน์ รุ่งเหมือนฟ้า', 'กรรมการและเลขานุการ'],
                [
                  {
                    text: 'จึงเรียนมาเพื่อโปรดพิจารณาเห็นชอบให้ดำเนินการจัดหาพัสดุข้างต้นต่อไปด้วยจักขอบคุณอย่างยิ่ง',
                    colSpan: 3
                  },
                  {},
                  {}
                ]
              ]
            }
          },
          sign('ผู้ช่วยศาสตราจารย์ ดร.ธนวิชญ์  อนุวงศ์พินิจ', 'ผู้ขอให้จัดหา'),
          sign('ผู้ช่วยศาสตราจารย์ ดร.อำนาจ  ขาวเน', 'หัวหน้าภาควิชา')
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
          { text: ' ' },
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
    }
  ]
}
