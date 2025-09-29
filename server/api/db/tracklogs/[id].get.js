import { connectPG } from '~~/server/api/connection'

export default defineEventHandler(async event => {
  const { id } = event.context.params
  if (!id) {
    throw new Error("Missing or Invalid 'id' parameter")
  }

  if(id === 'new'){
    return []
  }

  const client = connectPG()
  client.connect()
  const result = await client.query(
    `
      SELECT l.action_date, u.name AS editor, l.doc_data, l.message
      FROM logs l
      LEFT JOIN users u ON l.editor = u.id
      WHERE doc_id = $1
      ORDER BY action_date ASC
    `,
    [id]
  )
  client.end()

  result.rows.forEach(row => {
    if (typeof row.doc_data !== 'object') {
      row.doc_data = JSON.parse(row.doc_data || {})
    }

    const { department, ...rest } = row.doc_data
    row.doc_data = rest
  })

  return result.rows
})
