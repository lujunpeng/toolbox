const MD5 = require('js-md5')
const token = '6b0457b72fda36a2a89ee98cc85cbb30'

export function sign(data, timestamp) {
  let jsonString = ''
  if (data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key]
        jsonString += element
      }
    }
  }
  const value = token + timestamp + jsonString
  return MD5(value)
}
