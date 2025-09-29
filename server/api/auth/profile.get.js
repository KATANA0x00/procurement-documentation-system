import { connectPG } from '../connection'

export default defineEventHandler(async event => {
  const sessionId = parseCookies(event).ProcurementAuth
  if (!sessionId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: No session found'
    })
  }

  const client = connectPG()
  client.connect()
  const response = await client.query(
    `
        SELECT u.id, u.name, em.department_id AS department_id, dp.name AS department, u.user_level, u.department_name
        FROM users u
        INNER JOIN employees em ON em.documenter_id = u.id
        LEFT JOIN departments dp ON em.department_id = dp.id
        WHERE session_id = $1 AND expired_at > NOW()
    `,
    [sessionId]
  )
  client.end()

  const result = Object.values(response.rows.reduce((acc, curr) => {
    if (!acc[curr.id]) {
      acc[curr.id] = {
        id: curr.id,
        name: curr.name,
        user_level: curr.user_level,
        department_name: curr.department_name,
        departments: [],
        department_ids: []
      };
    }
    acc[curr.id].departments.push(curr.department);
    acc[curr.id].department_ids.push(curr.department_id);
    return acc;
  }, {}))

  return result.length > 0
    ? result[0]
    : { error: 'No user found for this session' }
})
