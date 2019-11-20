const getType = val => {
  if (typeof val !== 'object') {
    return typeof val
  } else {
    return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
  }
}

console.log(getType(new Date()))
