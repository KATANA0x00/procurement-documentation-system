import fs from 'fs'
import path from 'path'
import PdfPrinter from 'pdfmake'

const fonts = {
  Roboto: {
    normal: path.join(process.cwd(), 'fonts/Roboto-Regular.ttf'),
    bold: path.join(process.cwd(), 'fonts/Roboto-Medium.ttf'),
    italics: path.join(process.cwd(), 'fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(process.cwd(), 'fonts/Roboto-MediumItalic.ttf')
  }
}

const printer = new PdfPrinter(fonts)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { docid } = event.context.params

  if (!body || !body.file) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing file parameter'
    })
  }

  const fileName = body.file
  const filePath = path.join(process.cwd(), 'uploads', docid, fileName)
  if (!fs.existsSync(filePath)) {
    throw createError({ statusCode: 404, statusMessage: 'File not found' })
  }

  const ext = path.extname(fileName).toLowerCase()

  // If PDF, return directly
  if (ext === '.pdf') {
    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(event, 'Content-Disposition', `inline; filename="${fileName}"`)
    return fs.createReadStream(filePath)
  }

  // If image, convert to PDF
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    const imageBuffer = fs.readFileSync(filePath)
    const base64Image = `data:image/${ext === '.png' ? 'png' : 'jpeg'};base64,${imageBuffer.toString('base64')}`

    const docDefinition = {
      content: [
        {
          image: base64Image,
          width: 500 // adjust width as needed
        }
      ],
      pageMargins: [40, 40, 40, 40]
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinition)
    const chunks = []

    // Collect PDF in memory
    pdfDoc.on('data', (chunk) => chunks.push(chunk))
    pdfDoc.end()

    await new Promise((resolve) => pdfDoc.on('end', resolve))

    const pdfBuffer = Buffer.concat(chunks)

    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(event, 'Content-Disposition', `inline; filename="${fileName}.pdf"`)

    return pdfBuffer
  }

  throw createError({
    statusCode: 415,
    statusMessage: 'Unsupported file type'
  })
})
