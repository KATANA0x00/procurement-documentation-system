export function numBreak (inputNum) {
  const roundedNum = Number(inputNum)
  if (isNaN(roundedNum)) return 'Invalid number'

  const fixedNumStr = roundedNum.toFixed(2)
  let [integerPart, decimalPart] = fixedNumStr.split('.')

  let result = ''
  while (integerPart.length > 3) {
    result = ',' + integerPart.slice(-3) + result
    integerPart = integerPart.slice(0, -3)
  }

  result = integerPart + result
  result += '.' + decimalPart

  return result
}
