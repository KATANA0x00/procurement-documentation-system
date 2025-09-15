import { connectPG } from '../../connection'

export default defineEventHandler(async event => {
  const { id } = event.context.params
  const filter = getQuery(event).filter || 'All'
  if (!id) {
    throw new Error("Missing or Invalid 'id' parameter")
  }

  const client = connectPG()
  client.connect()
  const query = `
        SELECT dc.id, dc.doc_id_p01, dc.doc_id_pj1, dp.name AS department, dc.doc_requester, dc.status, dc.doc_category, dc.edited_date
        FROM documents dc
        JOIN departments dp
        ON dc.department = dp.id
        WHERE dp.id = $1
      ${filter === 'All' ? '' : 'AND dc.status ILIKE $2'}
    `

  const params = filter === 'All' ? [id] : [id, filter.toLocaleLowerCase()]
  const result = await client.query(query, params)
  client.end()

  const response = result.rows.length > 0
    ? { [result.rows[0].department]: result.rows }
    : [];

  return response
})
