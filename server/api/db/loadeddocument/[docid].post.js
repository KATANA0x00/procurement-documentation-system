import fs from 'fs'
import path from 'path'

export default defineEventHandler(async event => {
  const file = await readBody(event)
  const { docid } = await event.context.params

  if (!file) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing file parameter'
    })
  }
  const filePath = path.join(process.cwd(), 'uploads', docid, file.file)

  if (!fs.existsSync(filePath)) {
    throw createError({ statusCode: 404, statusMessage: 'PDF not found' })
  }

  // Set headers so it opens in browser tab
  setHeader(event, 'Content-Type', 'application/pdf')
  setHeader(event, 'Content-Disposition', `inline; filename="${file.file}"`)

  // Return file as stream
  return fs.createReadStream(filePath)
})
