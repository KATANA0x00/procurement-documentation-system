export default function num2th (num) {
  num = parseFloat(num).toFixed(2)
  let [integerPart, decimalPart] = num.toString().split('.')

  const thNum = [
    'ศูนย์',
    'หนึ่ง',
    'สอง',
    'สาม',
    'สี่',
    'ห้า',
    'หก',
    'เจ็ด',
    'แปด',
    'เก้า'
  ]
  const thDigit = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน']

  function readNumber (n) {
    if (n === '0') return ''
    let txt = ''
    const len = n.length
    for (let i = 0; i < len; i++) {
      let digit = parseInt(n[i])
      if (digit !== 0) {
        if (i === len - 1 && digit === 1 && len > 1) {
          txt += 'เอ็ด'
        } else if (i === len - 2 && digit === 2) {
          txt += 'ยี่'
        } else if (i === len - 2 && digit === 1) {
          txt += ''
        } else {
          txt += thNum[digit]
        }
        txt += thDigit[len - i - 1]
      }
    }
    return txt
  }

  let bahtText = ''
  if (parseInt(integerPart) > 0) {
    let groups = []
    while (integerPart.length > 0) {
      groups.unshift(integerPart.slice(-6))
      integerPart = integerPart.slice(0, -6)
    }
    for (let i = 0; i < groups.length; i++) {
      let groupText = readNumber(groups[i])
      if (groupText !== '') {
        if (i < groups.length - 1) groupText += 'ล้าน'
        bahtText += groupText
      }
    }
    bahtText += 'บาท'
  }

  let satangText = ''
  if (decimalPart === '00') {
    satangText = 'ถ้วน'
  } else {
    satangText = readNumber(decimalPart) + 'สตางค์'
  }

  return bahtText + satangText
}
