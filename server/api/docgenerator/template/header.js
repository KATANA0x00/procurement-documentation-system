import path from 'path'
import fs from 'fs'

const docLogoRaw = path.resolve(process.cwd(), 'public/doc_logo.png')
const docLogo = fs.readFileSync(docLogoRaw).toString('base64')

export function header (data, idselect, Header, docmark = '') {
  return [
    {
      image: 'data:image/png;base64,' + docLogo,
      width: 60,
      margin: [0, 0, 0, -50]
    },
    { text: docmark, alignment: 'right' },
    { text: Header, bold: true, alignment: 'center', fontSize: 14 },
    { text: ' ' },
    { text: ' ' },
    {
      layout: 'noBorders',
      table: {
        widths: [42, '*', 24, '*'],
        body: [
          [
            { text: 'หน่วยงาน ', bold: true, alignment: 'right' },
            {
              text: 'คณะวิศวกรรมศาสตร์ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง',
              colSpan: 3
            },
            {},
            {}
          ],
          [
            { text: 'ที่ ', bold: true, alignment: 'right' },
            { text: 'อว.' + data['doc_id_' + idselect] },
            { text: 'วันที่', bold: true },
            {}
          ],
          [
            { text: 'เรื่อง ', bold: true, alignment: 'right' },
            {
              text:
                'ขอให้จัดหารายงานขอ' +
                data.doc_type +
                ' ' +
                data.doc_category +
                '\nด้วยเงิน ' +
                data.doc_money_source +
                ' ประจำปี ' +
                data.doc_money_year
            },
            {},
            {}
          ],
          [
            { text: 'เรียน คณบดี คณะวิศวกรรมศาสตร์', bold: true, colSpan: 2 },
            {},
            {},
            {}
          ],
          [
            {
              text:
                'ข้าพเจ้า ' +
                data.doc_requester +
                ' สังกัด ' +
                data.department +
                ' เหตุผลความจำเป็นใช้ในงาน ' +
                data.doc_reason +
                ' ขอให้จัดซื้อวัสดุกการศึกษา ดังรายการต่อไปนี้',
              colSpan: 4,
              leadingIndent: 24
            },
            {},
            {},
            {}
          ]
        ]
      }
    }
  ]
}
