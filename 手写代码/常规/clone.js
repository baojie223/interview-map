function getType(val) {
  const result = Object.prototype.toString.call(val)
  return result.slice(8, -1).toLowerCase()
}

// function deepCopy(obj) {
//   const map = new Map()
//   const newObj = new Object()
//   for (let key in obj) {
//     const t = getType(obj[key])
//     if (map.get(key)) {
//       newObj[key] = map.get(key)
//       continue
//     }
//     if (t !== 'array' && t !== 'object') {
//       newObj[key] = obj[key]
//     } else {
//       if (t === 'array') {
//         newObj[key] = obj[key].map(item => item)
//       }
//       if (t === 'object') {
//         newObj[key] = deepCopy(obj[key])
//       }
//     }
//     map.set(key, newObj[key])
//   }
//   return newObj
// }

function deepCopy(target, map = new WeakMap()) {
  if (map.get(target)) {
    return map.get(target)
  }
  let obj = {}
  map.set(target, obj)
  for (let key in target) {
    const t = getType(target[key])
    if (['number', 'string', 'boolean', 'undefined', 'null'].includes(t)) {
      obj[key] = target[key]
    }
    if (t === 'object') {
      obj[key] = deepCopy(target[key], map)
    }
    if (t === 'array') {
      obj[key] = [...target[key]]
    }
    if (t === 'date') {
      obj[key] = new Date(target[key])
    }
    if (t === 'regexp') {
      obj[key] = new RegExp(target[key])
    }
  }
  return obj
}

const target = {
  field1: 1,
  field2: null,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
  field5: new Date()
}
target.target = target

console.log(deepCopy(target))
