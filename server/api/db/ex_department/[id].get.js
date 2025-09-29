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
    SELECT
      dp.name AS dp_name,
      dc.id,
      dc.doc_id_p01,
      dc.doc_id_pj1,
      dc.edited_date,
      dc.status,
      dc.doc_category,
      dc.doc_requester
    FROM documents dc
    JOIN departments dp ON dc.department = dp.id
    JOIN employees em ON em.department_id = dp.id
    WHERE em.documenter_id ILIKE $1
    ${filter === 'All' ? '' : 'AND dc.status ILIKE $2'}
  `

  const params = filter === 'All' ? [id] : [id, filter.toLocaleLowerCase()]
  const result = await client.query(query, params)
  client.end()

  const response = result.rows.reduce((acc, row) => {
    const { dp_name, ...doc } = row
    if (!acc[dp_name]) {
      acc[dp_name] = []
    }
    acc[dp_name].push(doc)
    return acc
  }, {})

  return response
})
