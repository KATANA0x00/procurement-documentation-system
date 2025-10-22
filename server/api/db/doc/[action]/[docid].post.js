import { connectPG } from '~~/server/api/connection'

export default defineEventHandler(async event => {
  let { action, docid } = event.context.params
  const { userId, datas, dataPayment, message } = await readBody(event)
  const isLog = action != 'save'
  const client = connectPG()
  client.connect()
  if(docid == undefined || docid == null) {
    console.error(`docid null or undefined : ${docid}`)
    return {action: false}
  }
  // new document insert
  if (docid === 'new') {
    const result = await client.query(
      `
    WITH new_doc AS (
      INSERT INTO documents (
          department,
          status,
          no,
          doc_id_p01,
          doc_id_pj1,
          doc_type,
          doc_category,
          doc_money_source,
          doc_money_year,
          doc_requester,
          doc_reason,
          doc_committee,
          no_tor,
          uid_fund,
          uid_plan,
          uid_work_main,
          uid_work_sub,
          uid_work_minor,
          uid_expenses_category,
          uid_expenses_type,
          uid_expenses_subtype,
          uid_expenses_minor,
          doc_list,
          doc_file,
          expenses_summary,
          is_vat_included,
          doc_date_p01,
          doc_date_pj1
      ) VALUES (
          $1,  $2,  $3,  $4,  $5,  $6,  $7,  $8,  $9,
          $10, $11, $12, $13, $14, $15, $16, $17, $18,
          $19, $20, $21, $22, $23, $24, $25, $26, $29, $30
      )
      RETURNING id
    ),
    ins_payment AS (
  INSERT INTO paymentation (
    type,
    list,
    doc_id
  )
  SELECT $27, $28, id
  FROM new_doc
  RETURNING id AS payment_id
)
SELECT id
FROM new_doc;
  `,
      [
        datas.department,
        action === 'save' ? 'draft' : action,
        action === 'save' ? 0 : 1,
        datas.doc_id_p01,
        datas.doc_id_pj1,
        datas.doc_type,
        datas.doc_category,
        datas.doc_money_source,
        datas.doc_money_year,
        datas.doc_requester,
        datas.doc_reason,
        JSON.stringify(datas.doc_committee),
        datas.no_tor,
        JSON.stringify(datas.uid_fund),
        JSON.stringify(datas.uid_plan),
        JSON.stringify(datas.uid_work_main),
        JSON.stringify(datas.uid_work_sub),
        JSON.stringify(datas.uid_work_minor),
        JSON.stringify(datas.uid_expenses_category),
        JSON.stringify(datas.uid_expenses_type),
        JSON.stringify(datas.uid_expenses_subtype),
        JSON.stringify(datas.uid_expenses_minor),
        JSON.stringify(datas.doc_list),
        JSON.stringify(datas.doc_file ?? []),
        datas.expenses_summary,
        datas.is_vat_included,
        dataPayment.type,
        JSON.stringify(dataPayment.list),
        datas.doc_date_p01,
        datas.doc_date_pj1
      ]
    )
    docid = result.rows[0].id
  } else {
    const res = await client.query(
      `
      SELECT
        no,
        status
      FROM documents
      WHERE
        id = $1
    `,
      [docid]
    )
    const row = res.rows[0]
    if (action === 'save') {
      action = row.status
    } else if (action === 'done') {
      action = 'done'
      row.no = row.no === 0 ? 1 : row.no
    } else {
      row.no = row.no + 1
    }
    const result = await client.query(
      `
    WITH updated_doc AS (
      UPDATE documents
      SET
        department = $29,
        edited_date = NOW(),
        status = $22,
        no = $23,
        doc_id_p01 = $1,
        doc_id_pj1 = $2,
        doc_type = $3,
        doc_category = $4,
        doc_money_source = $5,
        doc_money_year = $6,
        doc_requester = $7,
        doc_reason = $8,
        doc_committee = $9,
        no_tor = $10,
        uid_fund = $11,
        uid_plan = $12,
        uid_work_main = $13,
        uid_work_sub = $14,
        uid_work_minor = $15,
        uid_expenses_category = $16,
        uid_expenses_type = $17,
        uid_expenses_subtype = $18,
        uid_expenses_minor = $19,
        doc_list = $20,
        doc_file = $21,
        expenses_summary = $25,
        is_vat_included = $26,
        doc_date_p01 = $30,
        doc_date_pj1 = $31
      WHERE id = $24
      RETURNING id
    )
    UPDATE paymentation
    SET
      type = $27,
      list = $28
    WHERE doc_id IN (SELECT id FROM updated_doc);
  `,
      [
        datas.doc_id_p01,
        datas.doc_id_pj1,
        datas.doc_type,
        datas.doc_category,
        datas.doc_money_source,
        datas.doc_money_year,
        datas.doc_requester,
        datas.doc_reason,
        JSON.stringify(datas.doc_committee),
        datas.no_tor,
        JSON.stringify(datas.uid_fund),
        JSON.stringify(datas.uid_plan),
        JSON.stringify(datas.uid_work_main),
        JSON.stringify(datas.uid_work_sub),
        JSON.stringify(datas.uid_work_minor),
        JSON.stringify(datas.uid_expenses_category),
        JSON.stringify(datas.uid_expenses_type),
        JSON.stringify(datas.uid_expenses_subtype),
        JSON.stringify(datas.uid_expenses_minor),
        JSON.stringify(datas.doc_list),
        JSON.stringify(datas.doc_file ?? []),
        action,
        res.rows[0].no,
        docid,
        datas.expenses_summary,
        datas.is_vat_included,
        dataPayment.type,
        JSON.stringify(dataPayment.list),
        datas.department,
        datas.doc_date_p01,
        datas.doc_date_pj1
      ]
    )
  }
  // save logs
  if (isLog) {
    const result = await client.query(
      `
      INSERT INTO logs (editor, doc_id, doc_data, message)
      VALUES ($1, $2, $3, $4)
    `,
      [userId, String(docid), JSON.stringify(datas), message]
    )
  }

  // all completed, return success
  client.end()
  return { action: 'success', docid: String(docid) }
})
