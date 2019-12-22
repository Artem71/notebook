export default function(str) {
  if (str.length > 50) {
    return str = str.slice(0, 35) + '...'
  } else {
    return str
  }
}