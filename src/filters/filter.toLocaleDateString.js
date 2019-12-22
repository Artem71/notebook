export default function(str) {
    const date = new Date(str)
    return date.toLocaleDateString() + ' в ' + date.toLocaleTimeString()
}