import { connectPG } from '../connection'

export default defineEventHandler(async (event) => {
  const sessionId = parseCookies(event).ProcurementAuth
  const config = useRuntimeConfig();

  if (!sessionId) {
    return { isLoggedOut: true, message: 'No active session' }
  }

  const client = connectPG()
  await client.connect()
  try {
    await client.query(
      `
        UPDATE users
        SET session_id = NULL
        WHERE session_id = $1
      `,
      [sessionId]
    )
  } finally {
    await client.end()
  }

  setCookie(event, 'ProcurementAuth', '', {
    httpOnly: true,
    secure: config.ON_PRODUCTION,
    sameSite: 'strict',
    maxAge: -1,
    path: '/'
  })

  return { isLoggedOut: true, message: 'Logout successful' }
})
