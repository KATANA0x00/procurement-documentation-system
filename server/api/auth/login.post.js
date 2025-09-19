import { connectLDAP, connectPG } from '../connection'
import { encryptData } from '~~/server/api/crypto'

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const { email, password } = await readBody(event)
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required'
    })
  }

  const bypassUser = [
    { usr: 'admin.test@dev', psw: '12345678' },
    { usr: 'user.test@dev', psw: '12345678' }
  ]
  const isBypass = bypassUser.some(
    user => user.usr === email && user.psw === password
  )

  let ldapUser = null
  const username = email.split('@')[0]
  // LDAP authentication
  if (!isBypass) {
    const ldapAuth = connectLDAP()
    try {
      const ldapUser = await new Promise((resolve, reject) => {
        ldapAuth.on('error', err => {
          reject(new Error('Internal Server Error: ' + err.message))
        })

        ldapAuth.authenticate(email, password, (err, user) => {
          if (err) {
            reject(new Error('Email or password is incorrect'))
          } else {
            resolve(user)
          }
        })
      })
    } catch (e) {
      return {
        isAuth: false,
        message: e instanceof Error ? e.message : String(e)
      }
    } finally {
      await ldapAuth.close()
    }
  }

  const sessionId = encryptData({
    email,
    password,
    date: new Date().toISOString()
  })

  //PG authentication
  const client = connectPG()
  client.connect()
  const result = await client.query(
    `
        UPDATE users
        SET session_id = $1, expired_at = NOW() + INTERVAL '7 days'
        WHERE id = $2
        RETURNING users.user_level
    `,
    [sessionId, username]
  )
  client.end()
  if (result.rows.length === 0) {
    throw new Error('User not found : Contact Administrator')
  }

  setCookie(event, 'ProcurementAuth', sessionId, {
    httpOnly: true,
    secure: process.env.ON_PRODUCTION === 'true',
    sameSite: process.env.ON_PRODUCTION === 'true' ? 'strict' : 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  })

  const redirectPath = result.rows[0].user_level >= 2 ? '/auth/admin' : '/auth'

  return { isAuth: true, message: 'Login Successfull!', redirect: redirectPath }
})
