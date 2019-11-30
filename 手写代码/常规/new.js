// function objectFactory() {
//   const obj = new Object()
//   const args = [].slice.call(arguments)
//   const constructor = args.shift()
//   obj.__proto__ = constructor.prototype
//   const result = constructor.apply(obj, args)
//   return typeof result === 'object' ? result : obj
// }

function objectFactory(fn, ...args) {
  const obj = {}
  obj.__proto__ = fn.prototype
  const result = fn.apply(obj, args)
  if (Object.prototype.toString.call(result) === '[object Object]') {
    return result
  } else {
    return obj
  }
}

function Person(name, age) {
  this.name = name
  this.age = age
  return {
    name: 'haoren'
  }
}

Person.prototype.sayhi = function() {
  console.log(this.name)
}

// const p = objectFactory(Person, 'baojie', 23)
const p = new Person('baojie', 12)
console.log(p)
p.sayhi()
