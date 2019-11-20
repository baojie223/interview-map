function objectFactory() {
  const obj = new Object()
  const args = [].slice.call(arguments)
  const constructor = args.shift()
  obj.__proto__ = constructor.prototype
  const result = constructor.apply(obj, args)
  return typeof result === 'object' ? result : obj
}

function Person(name, age) {
  this.name = name
  this.age = age
  return 'abc'
}

Person.prototype.sayhi = function() {
  console.log(this.name)
}

const p = objectFactory(Person, 'baojie', 23)
console.log(p)
p.sayhi()
