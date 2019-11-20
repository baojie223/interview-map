function format(str) {
  const reg = new RegExp(/(?!r)/g)
  const newStr = str.replace(reg, '#')
  return newStr
}

function thousand(number) {
  const str = number.toString()
  const reg = /(?!^)(?=(\d{3})+$)/g
  const newStr = str.replace(reg, ',')
  console.log(str.match(reg))
  return newStr
}

const hour = 12
const minute = 30
const second = 15
function render(tpl, data) {
  const reg = /\$\{(.*?)\}/g
  return tpl.replace(reg, (match, key) => {
    console.log(match, key)
    // return data[key]
    return eval(key)
  })
}
