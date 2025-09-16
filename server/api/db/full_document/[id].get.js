import { connectPG } from '../../connection'

export default defineEventHandler(async event => {
  const { id } = event.context.params

  if (!id) {
    throw new Error("Missing or Invalid 'id' parameter")
  }

  const client = connectPG()
  client.connect()
  if (id === 'new') {
    const usrId = getQuery(event).usrid
    const result = await client.query(
      `
      SELECT dp.name, dp.principal, u.name AS procurementer
      FROM departments dp
      LEFT JOIN users u ON dp.procurementer = u.id
      WHERE dp.id = $1
    `,
      [usrId]
    )
    client.end()
    return {
      status: 'draft',
      doc_id_p01: null,
      doc_id_pj1: null,
      doc_type: null,
      doc_category: null,
      doc_money_source: null,
      doc_money_year: null,
      doc_requester: null,
      doc_department: result.rows[0].name,
      doc_reason: null,
      doc_committee: ['', '', ''],
      no_tor: null,
      principal: result.rows[0].principal,
      procurementer_name: result.rows[0].procurementer,
      uid_fund: { uid: '0200', text: 'เพื่อการศึกษา' },
      uid_plan: { uid: '09007', text: 'จัดการศึกษาอุดมศึกษา' },
      uid_work_main: { uid: '0102', text: 'งานจัดการศึกษาด้านวิทยาศาสตร์และเทคโนโลยี' },
      uid_work_sub: { uid: '22', text: 'สาขาวิศวกรรมศาสตร์' },
      uid_work_minor: { uid: '211', text: 'ระดับปริญญาตรี' },
      uid_expenses_category: { uid: '52000', text: 'งบดำเนินงาน' },
      uid_expenses_type: { uid: '52500', text: 'ค่าวัสดุ' },
      uid_expenses_subtype: { uid: '5104010000', text: 'ค่าวัสดุใช้ไป' },
      uid_expenses_minor: { uid: '5104010103', text: 'ค่าวัสดุการศึกษาใช้ไป' },
      doc_list: [],
      doc_file: []
    }
  }
  const result = await client.query(
    `
    SELECT
      dc.status,
      dc.doc_id_p01,
      dc.doc_id_pj1,
      dc.doc_type,
      dc.doc_category,
      dc.doc_money_source,
      dc.doc_money_year,
      dc.doc_requester,
      dp.name AS doc_department,
      dc.doc_reason,
      dc.doc_committee,
      dc.no_tor,
      dp.principal,
      users.name AS procurementer_name,
      dc.uid_fund,
      dc.uid_plan,
      dc.uid_work_main,
      dc.uid_work_sub,
      dc.uid_work_minor,
      dc.uid_expenses_category,
      dc.uid_expenses_type,
      dc.uid_expenses_subtype,
      dc.uid_expenses_minor,
      dc.doc_list,
      dc.doc_file
    FROM documents dc
    JOIN departments dp ON dc.department = dp.id
    JOIN users ON users.id = dp.procurementer
    WHERE dc.id = $1
  `,
    [id]
  )
  client.end()

  const response = result.rows[0]
  return response
})
