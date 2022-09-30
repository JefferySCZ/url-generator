// Alphabet a-z, A-Z Number 0-9
const all_CHAR =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

module.exports = (shortenURL_Generator) => {
  let result = ''
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * all_CHAR.length)
    const chooseChar = all_CHAR[randomIndex]
    result += chooseChar
  }
  return result
}
