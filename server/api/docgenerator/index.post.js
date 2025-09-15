import PdfPrinter from 'pdfmake'
import path from 'path'
import PDFMerger from 'pdf-merger-js'

import { docDefinition_P01 } from './P01'

const fonts = {
  Sarabun: {
    normal: path.resolve('./app/assets/fonts/Sarabun-light.ttf'),
    bold: path.resolve('./app/assets/fonts/Sarabun-SemiBold.ttf'),
    italics: path.resolve('./app/assets/fonts/Sarabun-Italic.ttf'),
    bolditalics: path.resolve('./app/assets/fonts/Sarabun-BoldItalic.ttf')
  }
}

const printer = new PdfPrinter(fonts)

async function buildDoc (key) {
  const Definition = {
    P01: docDefinition_P01
  }
  if (!Definition[key]) return null

  const docBase = {
    defaultStyle: { font: 'Sarabun', fontSize: 10, lineHeight: 1.2 },
    content: [...docDefinition_P01()],
    header: (currentPage, pageCount, pageSize) => {
      if (currentPage === 1) return null
      return {
        text: `- ${currentPage} -`,
        alignment: 'center',
        margin: [0, 20, 0, 0]
      }
    }
  }

  const pdfDoc = printer.createPdfKitDocument(docBase)
  const chunks = []

  pdfDoc.on('data', chunk => chunks.push(chunk))

  return new Promise(resolve => {
    pdfDoc.on('end', () => resolve(Buffer.concat(chunks)))
    pdfDoc.end()
  })
}

export default defineEventHandler(async event => {
  const { docNeed } = await readBody(event)

  const merger = new PDFMerger()

  for (const docKey of docNeed) {
    const buffer = await buildDoc(docKey)
    if (buffer) {
      await merger.add(buffer)
    }
  }

  const mergedPdfBuffer = await merger.saveAsBuffer()

  setHeader(event, 'Content-Type', 'application/pdf')
  setHeader(event, 'Content-Disposition', 'attachment; filename=report.pdf')

  return mergedPdfBuffer
})
