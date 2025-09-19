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
  const result = await client.query(
    `
        SELECT u.id, u.name, dp.id AS department_id, dp.name AS department, u.user_level
        FROM users u
        INNER JOIN departments dp ON u.department = dp.id
        WHERE session_id = $1 AND expired_at > NOW()
    `,
    [sessionId]
  )
  client.end()

  return result.rows.length > 0
    ? result.rows[0]
    : { error: 'No user found for this session' }
})
