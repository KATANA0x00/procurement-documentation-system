import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const uploadRoot = config.NUXT_UPLOAD_DIR || 'uploads'

  const { docid } = event.context.params
  if (!docid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing doc query parameter'
    })
  }

  const formData = await readMultipartFormData(event)
  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No files uploaded' })
  }

  const savedFiles = []
  const uploadDir = path.join(uploadRoot, docid)
  await mkdir(uploadDir, { recursive: true })
  for (const file of formData) {
    if (file.filename && file.data) {
      const filePath = path.join(uploadDir, file.filename)
      try {
        await writeFile(filePath, file.data)
        savedFiles.push({ file: file.filename, name: file.filename })
      } catch (err) {
        console.error('Error writing file:', file.filename, err)
      }
    } else {
      console.warn('Skipped file due to missing filename or data:', {
        filename: file.filename,
        hasData: !!file.data
      })
    }
  }

  return {
    success: true,
    message: 'Files uploaded successfully',
    uploadedFiles: savedFiles
  }
})
