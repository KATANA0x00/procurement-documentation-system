export default function formattedDate (inputDate, withTime = false) {
  const date = new Date(inputDate.replace(' ', 'T'))
  date.setHours(date.getHours() + 7)
  
  let formattedDate = date
    .toLocaleDateString('th-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    .replace(/^(วัน)/, '')
    .replace('ที่', ',')

  if (withTime) {
    const formattedTime = date.toLocaleTimeString('th-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    return { date: formattedDate, time: formattedTime }
  }
  
  return formattedDate
}
