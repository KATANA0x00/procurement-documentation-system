import { unlink } from 'fs/promises'
import path from 'path'

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const uploadRoot = config.NUXT_UPLOAD_DIR || 'uploads'

  const { docid } = event.context.params
  if (!docid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing docid parameter'
    })
  }

  const body = await readBody(event)
  if (!body || !body.files || !Array.isArray(body.files)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing files list'
    })
  }

  const uploadDir = path.join(uploadRoot, docid)
  const deleted = []

  for (const filename of body.files) {
    try {
      const filePath = path.join(uploadDir, filename)
      await unlink(filePath)
      deleted.push(filename)
    } catch (err) {
      console.warn('Could not delete:', filename, err.message)
    }
  }

  return {
    success: true,
    message: 'Files deleted',
    deleted
  }
})
