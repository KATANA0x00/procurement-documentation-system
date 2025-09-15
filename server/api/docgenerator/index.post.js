import PdfPrinter from 'pdfmake'
import path from 'path'

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

function appendContent(Base, key) {
  const Definition = {
    P01: docDefinition_P01
  }
  if (Definition[key]) {
    if (Base.content.length > 0) {
      Base.content.push({ text: '', pageBreak: 'before' })
    }
    Base.content.push(...Definition[key]())
  }
}

export default defineEventHandler(async (event) => {
  const {docNeed} = await readBody(event)

  let docBase = {
    defaultStyle: { font: 'Sarabun', fontSize: 10, lineHeight: 1.2 },
    content: []
  }

  docNeed.forEach((doc) => {
    appendContent(docBase, doc)
  })
  
  const pdfDoc = printer.createPdfKitDocument(docBase)
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
