function getType(val) {
  const result = Object.prototype.toString.call(val)
  return result.slice(8, -1).toLowerCase()
}

function deepCopy(obj) {
  const map = new Map()
  const newObj = new Object()
  for (let key in obj) {
    const t = getType(obj[key])
    if (map.get(key)) {
      newObj[key] = map.get(key)
      continue
    }
    if (t !== 'array' && t !== 'object') {
      newObj[key] = obj[key]
    } else {
      if (t === 'array') {
        newObj[key] = obj[key].map(item => item)
      }
      if (t === 'object') {
        newObj[key] = deepCopy(obj[key])
      }
    }
    map.set(key, newObj[key])
  }
  return newObj
}

const target = {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child'
  },
  field4: [2, 4, 8]
};
target.target = target;

console.log(deepCopy(target))
