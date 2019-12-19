export default function(str) {
  if (str.length > 25) {
    return str = str.slice(0, 25) + '...'
  } else {
    return str
  }
}