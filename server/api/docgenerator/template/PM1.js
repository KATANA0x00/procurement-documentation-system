import { tablePayment } from './tablePayment'

export function docDefinition_PM1 (data, refund_person = null) {
  return [
    {
      text: 'แบบฟอร์มส่งใบสำคัญจ่าย',
      bold: true,
      alignment: 'center',
      fontSize: 14
    },
    { text: ' ' },
    {
      text: [
        'ชื่อ  ' + (refund_person === null ? data.doc_requester : refund_person) + '  ภาควิชา  ' + data.department
      ],
      alignment: 'center'
    },
    { text: ' ' },
    ...tablePayment(data.pm_list,24),
    { text: ' ' },
    {
      text: [
        'รวมเป็นเงิน',
        {
          text: ' '.repeat(50),
          decoration: 'underline',
          decorationStyle: 'dotted'
        },
        'บาท'
      ],
      alignment: 'right',
      margin: [0, 0, 30, 0]
    },
    { text: ' ' },
    {
      layout: 'noBorders',
      table: {
        widths: ['*', '*', '*', '*', 30],
        body: [
          [
            {
              text: 'เจ้าหน้าที่พัสดุผู้รับ',
              alignment: 'right'
            },
            {
              text: '.' + ' '.repeat(40) + '.',
              decoration: 'underline',
              decorationStyle: 'dotted'
            },
            {
              text: 'เจ้าหน้าที่การเงินผู้รับ',
              alignment: 'right'
            },
            {
              text: '.' + ' '.repeat(40) + '.',
              decoration: 'underline',
              decorationStyle: 'dotted'
            },
            {}
          ],
          [
            {
              text: 'วันที่',
              alignment: 'right'
            },
            {
              text: '.' + ' '.repeat(40) + '.',
              decoration: 'underline',
              decorationStyle: 'dotted'
            },
            {
              text: 'วันที่',
              alignment: 'right'
            },
            {
              text: '.' + ' '.repeat(40) + '.',
              decoration: 'underline',
              decorationStyle: 'dotted'
            },
            {}
          ]
        ]
      }
    }
  ]
}
