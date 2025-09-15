export const docDefinition_P01 = {
  defaultStyle: { font: 'Sarabun' },
  content: [
    { text: 'แบบ พ.1', alignment: 'right' },
    { text: 'บันทึกขอจัดหา', bold: true, alignment: 'center' },
    { text: ' ' },
    {
      table: {
        headerRows: 1,
        widths: ['*', 'auto', 100, '*'],
        body: [
          ['First', 'ภาษาไทย', 'Third', 'The last one'],
          ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
          [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4']
        ]
      }
    }
  ]
}
