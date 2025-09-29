export function unique (data) {
  return [
    { text: ' ' },
    { text: 'หน่วยงานขอใช้เงินในการจัดหา  ตามรหัสดังนี้' },
    {
      layout: 'noBorders',
      table: {
        widths: [17, 24, 25, 32, '*', 17, 65, 38, 48],
        body: [
          [
            {
              text: 'วิทยาเขต/คณะ/สำนัก/บัณฑิต',
              colSpan: 4
            },
            {},
            {},
            {},
            { text: 'คณะวิศวกรรมศาสตร์' },
            {
              text: 'รหัสวิทยาเขต/คณะ/สำนัก/บัณฑิต',
              colSpan: 3
            },
            {},
            {},
            { text: '01' }
          ],
          [
            {
              text: 'ภาควิชา/กอง/ฝ่าย',
              colSpan: 3
            },
            {},
            {},
            {
              text: data.department,
              colSpan: 2
            },
            {},
            {
              text: 'รหัสภาควิชา/กอง/ฝ่าย',
              colSpan: 2
            },
            {},
            {
              text: data.uid_department,
              colSpan: 2
            },
            {}
          ],
          [
            {
              text: 'กองทุน',
              colSpan: 2
            },
            {},
            {
              text: data.uid_fund.text,
              colSpan: 3
            },
            {},
            {},
            {
              text: 'รหัสกองทุน',
              colSpan: 2
            },
            {},
            {
              text: data.uid_fund.uid,
              colSpan: 2
            },
            {}
          ],
          [
            {
              text: 'แผนงาน',
              colSpan: 2
            },
            {},
            {
              text: data.uid_plan.text,
              colSpan: 3
            },
            {},
            {},
            {
              text: 'รหัสแผนงาน',
              colSpan: 2
            },
            {},
            {
              text: data.uid_plan.uid,
              colSpan: 2
            },
            {}
          ],
          [
            { text: 'งาน' },
            {
              text: '- กิจกรรมหลัก',
              colSpan: 2
            },
            {},
            {
              text: data.uid_work_main.text,
              colSpan: 2
            },
            {},
            { text: 'รหัส' },
            { text: '- กิจกรรมหลัก' },
            {
              text: data.uid_work_main.uid,
              colSpan: 2
            },
            {}
          ],
          [
            { text: '' },
            {
              text: '- กิจกรรมรอง',
              colSpan: 2
            },
            {},
            {
              text: data.uid_work_sub.text,
              colSpan: 2
            },
            {},
            { text: '' },
            { text: '- กิจกรรมรอง' },
            {
              text: data.uid_work_sub.uid,
              colSpan: 2
            },
            {}
          ],
          [
            { text: '' },
            {
              text: '- กิจกรรมย่อย',
              colSpan: 2
            },
            {},
            {
              text: data.uid_work_minor.text,
              colSpan: 2
            },
            {},
            { text: '' },
            { text: '- กิจกรรมย่อย' },
            {
              text: data.uid_work_minor.uid,
              colSpan: 2
            },
            {}
          ],
          [
            {
              text: 'งบรายจ่าย',
              colSpan: 3
            },
            {},
            {},
            {
              text: data.uid_expenses_category.text,
              colSpan: 2
            },
            {},
            {
              text: 'รหัสงบรายจ่าย',
              colSpan: 2
            },
            {},
            {
              text: data.uid_expenses_category.uid,
              colSpan: 2
            },
            {}
          ],
          [
            {
              text: 'ประเภทรายจ่าย',
              colSpan: 3
            },
            {},
            {},
            {
              text: data.uid_expenses_type.text,
              colSpan: 2
            },
            {},
            {
              text: 'รหัสประเภทรายจ่าย',
              colSpan: 2
            },
            {},
            {
              text: data.uid_expenses_type.uid,
              colSpan: 2
            },
            {}
          ],
          [
            {
              text: 'ประเภทค่าใช้จ่าย',
              colSpan: 3
            },
            {},
            {},
            {
              text: data.uid_expenses_subtype.text,
              colSpan: 2
            },
            {},
            {
              text: 'รหัสประเภทค่าใช้จ่าย',
              colSpan: 2
            },
            {},
            {
              text: data.uid_expenses_subtype.uid,
              colSpan: 2
            },
            {}
          ],
          [
            {
              text: 'ค่าใช้จ่าย',
              colSpan: 3
            },
            {},
            {},
            {
              text: data.uid_expenses_minor.text,
              colSpan: 2
            },
            {},
            {
              text: 'รหัสค่าใช้จ่าย',
              colSpan: 2
            },
            {},
            {
              text: data.uid_expenses_minor.uid,
              colSpan: 2
            },
            {}
          ]
        ]
      }
    }
  ]
}
