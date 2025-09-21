import num2th from '~/composables/num2th'
import numBreak from '~/composables/numBreak'

export function tablePayment (list, maxRows) {
  const total = list.reduce((acc, item) => acc + item.amount_b + (item.amount_s*0.01), 0)

  const paddedRows = Array.from({ length: maxRows - list.length }, (_, index) => [
    { text: ' ', border: [true, false, true, false] },
    { text: ' ', border: [true, false, true, false] },
    { text: ' ', border: [true, false, true, false] },
    { text: ' ', border: [true, false, true, false] },
    { text: ' ', border: [true, false, true, false] },
    { text: ' ', border: [true, false, true, false] },
    { text: ' ', border: [true, false, true, false] }
  ])
  return [
    {
      table: {
        headerRows: 2,
        widths: [30, '*', 40, 120, 40, 20, 40],
        body: [
          [
            {
              text: 'ลำดับที่',
              alignment: 'center',
              rowSpan: 2,
              margin: [0, 10, 0, 0]
            },
            {
              text: 'ชื่อบริษัท ห้างหุ้นส่วน ร้านค้า',
              alignment: 'center',
              rowSpan: 2,
              margin: [0, 10, 0, 0]
            },
            { text: 'ใบส่งของ', alignment: 'center', colSpan: 2 },
            {},
            { text: 'จำนวนเงิน', alignment: 'center', colSpan: 2 },
            {},
            {
              text: 'หมายเหตุ',
              alignment: 'center',
              rowSpan: 2,
              margin: [0, 10, 0, 0]
            }
          ],
          [
            {},
            {},
            { text: 'เล่มที่', alignment: 'center' },
            { text: 'เลขที่', alignment: 'center' },
            { text: 'บาท', alignment: 'center' },
            { text: 'สต.', alignment: 'center' },
            {}
          ],
          ...list.map((item, index) => [
            {
              text: '1.',
              alignment: 'center',
              border: [true, false, true, false]
            },
            { text: item.name, border: [true, false, true, false] },
            {
              text: item.book || '',
              alignment: 'center',
              border: [true, false, true, false]
            },
            {
              text: item.number,
              alignment: 'center',
              border: [true, false, true, false]
            },
            {
              text: numBreak(item.amount_b).slice(0,-3),
              alignment: 'center',
              border: [true, false, true, false]
            },
            {
              text: item.amount_s,
              alignment: 'center',
              border: [true, false, true, false]
            },
            { text: '', border: [true, false, true, false] }
          ]),
          ...paddedRows,
          [
            { text: '(' + num2th(total) + ')', colSpan: 4 },
            {},
            {},
            {},
            { text: numBreak(total).slice(0,-3), alignment: 'center' },
            { text: numBreak(total).slice(-2), alignment: 'center' },
            {}
          ]
        ]
      }
    }
  ]
}
