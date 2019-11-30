// Function.prototype.myCall = function() {
//   // if (typeof this !== 'function') {
//   //   return new Error('必须使用函数调用方法')
//   // }
//   const args = Array.from(arguments)
//   let context = args.shift()
//   if (args[0] instanceof Array) {
//     return new Error('传入参数为序列')
//   }
//   if (context === null) {
//     if (typeof window !== 'undefined') {
//       context = window
//     } else {
//       context = global
//     }
//   }
//   context.fn = this
//   result = context.fn(...args)
//   delete context.fn
//   return result
// }

Function.prototype.myCall = function() {
  const args = Array.from(arguments)
  let context = args.shift()
  if (String(context) === 'null' || typeof context === 'undefined') {
    if (typeof window !== 'undefined') {
      context = window
    } else {
      context = self
    }
  }
  context.fn = this
  result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.myApply = function() {
  // if (typeof this !== 'function') {
  //   return new Error('必须使用函数调用方法')
  // }
  const args = Array.from(arguments)
  let context = args.shift()
  let result
  if (!(args[0] instanceof Array)) {
    return new Error('传入参数为数组')
  }
  if (context === null) {
    if (typeof window !== 'undefined') {
      context = window
    } else {
      context = self
    }
  }
  context.fn = this
  result = context.fn(...args[0])
  delete context.fn
  return result
}

Function.prototype.myBind1 = function() {
  const outerArgs = Array.from(arguments)
  const context = outerArgs.shift()
  const fn = this
  return function() {
    const innerArgs = Array.from(arguments)
    return fn.call(context, ...outerArgs.concat(innerArgs))
  }
}

Function.prototype.myBind2 = function() {
  const outerArgs = [].slice.call(arguments)
  let context = outerArgs.shift()
  if (String(context) === 'null' || typeof context === 'undefined') {
    if (typeof window === 'undefined') {
      context = global
    } else {
      context = window
    }
  }
  const fn = this
  return function() {
    const innerArgs = Array.prototype.slice.call(arguments)
    return fn.myApply(context, outerArgs.concat(innerArgs))
  }
}

const obj = {
  value: 1,
  show(num1, num2) {
    console.log(this.value, num1 + num2)
    return this.value + num1 + num2
  },
}

let a = {
  value: 2,
}
var value = 10

// obj.show.myCall(null, 1, 2)
// console.log(global)
const bindShow = obj.show.myBind2(null, 20)
console.log(bindShow(30))
// // console.log(obj.value.myApply(a, [10, 20]))
// const b = new bindShow(a, 20)
// console.log(b(30))

// function test(a, b) {
//   console.log(arguments)
// }

// test(1, 2)
