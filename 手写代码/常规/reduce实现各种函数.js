// Array.prototype.myMap = function(cb) {
//   if (typeof cb !== 'function') {
//     return new TypeError('cb不是一个函数')
//   } else {
//     return this.reduce((prev, curr, index, list) => {
//       return prev.concat(cb(curr, index, list))
//     }, [])
//   }
// }
Array.prototype.myMap = function(fn) {
  const result = this.reduce((prev, curr, index, arr) => {
    return prev.concat(fn(curr, index, arr))
  }, [])
  return result
}


Array.prototype.myFilter = function(cb) {
  if (typeof cb !== 'function') {
    return new TypeError('cb不是一个函数')
  } else {
    return this.reduce((prev, curr, index) => {
      const bool = cb(curr, index, this)
      if (bool) {
        return prev.concat(this[index])
      } else {
        return prev
      }
    }, [])
  }
}

Array.prototype.max = function() {
  return this.reduce((prev, curr) => {
    return curr > prev ? curr : prev
  }, this[0])
}

Array.prototype.min = function() {
  return this.reduce((prev, curr) => {
    return curr < prev ? curr : prev
  }, this[0])
}

Array.prototype.distinct = function() {
  return this.reduce((prev, curr) => {
    // for (let i = 0; i < prev.length; i++) {
    //   if (prev[i] === curr) {
    //     return prev
    //   }
    // }
    return prev.includes(curr) ? prev : prev.concat(curr)
  }, [])
}

Array.prototype.myFlat1 = function(depth = 1) {
  const queue = [...this]
  const res = []
  while (queue.length) {
    const element = queue.shift()
    if (Array.isArray(element)) {
      element.forEach(item => {
        queue.push(item)
      })
    } else {
      res.push(element)
    }
  }
  return res
}

Array.prototype.myFlat2 = function() {
  const queue = [...this]
  let res = []
  while (queue.length) {
    const ele = queue.shift()
    if (!Array.isArray(ele)) {
      res.push(ele)
    } else {
      res = res.concat(ele.myFlat2())
    }
  }
  return res
}
