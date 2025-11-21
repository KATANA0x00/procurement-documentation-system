import { connectPG } from '../../connection'

export default defineEventHandler(async event => {
  const { id } = event.context.params
  
  if (!id) {
    throw new Error("Missing or Invalid 'id' parameter")
  }

  const client = connectPG()
  client.connect()
  if (id === 'new') {
    client.end()
    return {
      type: 'personal',
      list: []
    }
  }
  const result = await client.query(
    `
    SELECT
      pm.type,
      pm.list,
      pm.refund_person
    FROM paymentation pm
    WHERE pm.doc_id = $1
  `,
    [id]
  )
  client.end()

  const response = result.rows[0]
  return response
})
