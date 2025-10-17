import path from 'path'
import { promises as fs } from 'fs'
import { connectPG } from '~~/server/api/connection'

export default defineEventHandler(async event => {
  const uploadRoot = process.env.NUXT_UPLOAD_DIR || 'uploads'
  const client = connectPG()
  client.connect()

  const { docid } = event.context.params
  if (!docid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing docid parameter'
    })
  }

  await client.query(
    `
      DELETE FROM documents WHERE id = $1;
      DELETE FROM paymentation WHERE doc_id = $1;
      DELETE FROM logs WHERE doc_id = $1;
    `,
    [docid]
  )

  const uploadDir = path.join(uploadRoot, docid)
  try {
    await fs.rm(uploadDir, { recursive: true, force: true });
  } catch (err) {
    console.warn('Could not delete:', err.message);
  }

  return {
    success: true,
    message: 'Document deleted',
  }
})
