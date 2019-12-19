export default function(date) {
  let time = ''
  const createTime = Date.now() - date

  const sec = (createTime / 1000).toFixed(0)
  time = sec + ' секунд назад'

  const min = sec / 60
  if (sec > 60) time = min + ' минут назад'
  
  const hour = min / 60
  if (min > 60) time = hour + ' часов назад'

  const days = hour / 24
  if (hour > 24) time = days + ' день назд'

  return time
}