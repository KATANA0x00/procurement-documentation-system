import PdfPrinter from 'pdfmake'
import path from 'path'

import { docDefinition_P01 } from './P01'

const fonts = {
  Sarabun: {
    normal: path.resolve('./app/assets/fonts/Sarabun-Regular.ttf'),
    bold: path.resolve('./app/assets/fonts/Sarabun-Bold.ttf'),
    italics: path.resolve('./app/assets/fonts/Sarabun-Italic.ttf'),
    bolditalics: path.resolve('./app/assets/fonts/Sarabun-BoldItalic.ttf')
  }
}

const printer = new PdfPrinter(fonts)

export default defineEventHandler(async event => {
  const pdfDoc = printer.createPdfKitDocument(docDefinition_P01)
  const chunks = []
  pdfDoc.on('data', chunk => chunks.push(chunk))

  const pdfBuffer = await new Promise(resolve => {
    pdfDoc.on('end', () => resolve(Buffer.concat(chunks)))
    pdfDoc.end()
  })

  setHeader(event, 'Content-Type', 'application/pdf')
  setHeader(event, 'Content-Disposition', 'attachment; filename=report.pdf')

  return pdfBuffer
})
