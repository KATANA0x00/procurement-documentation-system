import LdapAuth from 'ldapauth-fork'
import { Client } from 'pg'

export function connectLDAP () {
  const ldapUrl = process.env.NUXT_LDAP_URL
  const ldapDC = process.env.NUXT_LDAP_DC

  if (!ldapUrl || !ldapDC) {
    throw new Error('LDAP configuration is missing')
  }

  const options = {
    url: ldapUrl,
    searchBase: ldapDC,
    searchFilter: '(mail={{username}})',
    reconnect: false,
    timeout: 5000,
    connectTimeout: 3000
  }

  return new LdapAuth(options)
}

export function connectPG () {
  const pg_user = process.env.NUXT_PG_USER
  const pg_host = process.env.NUXT_PG_HOST
  const pg_base = process.env.NUXT_PG_BASE
  const pg_pass = process.env.NUXT_PG_PASS

  if (
    pg_user === '' ||
    pg_host === '' ||
    pg_base === '' ||
    pg_pass === ''
  ) {
    throw new Error('PostgreSQL configuration is missing')
  }

  const client = new Client({
    user: pg_user,
    host: pg_host,
    database: pg_base,
    password: pg_pass,
    port: process.env.NUXT_NUXT_PG_PORT
  })

  return client
}

export default defineEventHandler(async event => {
  try {
    const ldapAuth = connectLDAP()
    await ldapAuth.close()
  } catch (error) {
    console.error('Error connecting to LDAP:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }

  try {
    const client = connectPG()
    client.connect()
    client.end()
  } catch (error) {
    console.error('Error connecting to Database:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }

  return true
})
