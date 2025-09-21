import { tablePayment } from './tablePayment'

export function docDefinition_PM2 (data) {
  return [
    {
      text: 'แบบฟอร์มส่งใบส่งของ',
      bold: true,
      alignment: 'center',
      fontSize: 14
    },
    { text: ' ' },
    {
      text: [
        data.department + ' ผู้ส่ง  ' + data.doc_requester + '  วันที่',
        {
          text: ' '.repeat(50),
          decoration: 'underline',
          decorationStyle: 'dotted'
        },
        ' '
      ],
      alignment: 'center'
    },
    { text: ' ' },
    ...tablePayment(data.pm_list,25),
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
      margin: [0,0,30,0]
    },
    { text: ' ' },
    {
      layout: 'noBorders',
      table: {
        widths: ['*', '*', '*', '*',30],
        body: [
          [
            {
              text: 'เจ้าหน้าที่พัสดุผู้รับ',
              alignment: 'right'
            },
            {
              text: '.'+' '.repeat(40)+'.',
              decoration: 'underline',
              decorationStyle: 'dotted'
            },
            {
              text: 'เจ้าหน้าที่การเงินผู้รับ',
              alignment: 'right'
            },
            {
              text: '.'+' '.repeat(40)+'.',
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
              text: '.'+' '.repeat(40)+'.',
              decoration: 'underline',
              decorationStyle: 'dotted'
            },
            {
              text: 'วันที่',
              alignment: 'right'
            },
            {
              text: '.'+' '.repeat(40)+'.',
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
