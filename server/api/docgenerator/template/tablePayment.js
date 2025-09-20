export function tablePayment (list, maxRows) {
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
              text: item.amount_b,
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
            { text: '(ห้าพันสี่ร้อยยี่สิบสี่บาทเก้าสิบสตางค์)', colSpan: 4 },
            {},
            {},
            {},
            { text: '5,424', alignment: 'center' },
            { text: '90', alignment: 'center' },
            {}
          ]
        ]
      }
    }
  ]
}
