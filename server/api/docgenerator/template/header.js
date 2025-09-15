import path from 'path'
import fs from 'fs'

const docLogoRaw = path.resolve('./app/assets/doc_logo.png')
const docLogo = fs.readFileSync(docLogoRaw).toString('base64')

export function header() {
  return [
    {
      image: 'data:image/png;base64,' + docLogo,
      width: 60,
      margin: [0, 0, 0, -50]
    },
    { text: 'แบบ พ.1', alignment: 'right' },
    { text: 'บันทึกขอจัดหา', bold: true, alignment: 'center', fontSize: 14 },
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
            { text: 'อว.' + '7002.14/2' },
            { text: 'วันที่', bold: true },
            {}
          ],
          [
            { text: 'เรื่อง ', bold: true, alignment: 'right' },
            {
              text: 'ขอให้จัดหารายงานขอซื้อวัสดุกการศึกษา\nด้วยเงินงบประมาณ ประจำปี 2568'
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
              text: 'ข้าพเจ้า นายธีรสิทธิ์ โท้ทอง สังกัด วิศวกรรมไอโอทีและสารสนเทศ เหตุผลความจำเป็นใช้ในงาน การเรียนการสอนของหลักสูตรฯ ขอให้จัดซื้อวัสดุกการศึกษา ดังรายการต่อไปนี้',
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
