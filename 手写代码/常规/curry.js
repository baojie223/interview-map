function curry(fn) {
  var allArgs = []
  return function next() {
    // const args = Array.from(arguments)
    var args = [].slice.call(arguments)
    if (args.length > 0) {
      allArags = allArgs.concat(args)
      return next
    } else {
      return fn.apply(null, allArgs)
    }
  }
}

var multiply = curry(function() {
  // console.log(arguments)
  // const args = Array.from(arguments)
  let result = 1
  for (let i = 0; i < arguments.length; i++) {
    result = result + arguments[i]
  }
  return result
})

console.log(multiply(1)(2, 3)())

function currying(fn){
  var allArgs = [];

  return function next(){
      var args = [].slice.call(arguments);

      if(args.length > 0){
          allArgs = allArgs.concat(args);
          return next;
      }else{
          return fn.apply(null, allArgs);
      }
  }
}
var add = currying(function(){
  var sum = 0;
  for(var i = 0; i < arguments.length; i++){
      sum += arguments[i];
  }
  return sum;
});

console.log(add(1)(2, 3)(4, 5, 6)())

function uncurrying(fn) {
  return function() {
    let args = [].slice.call(arguments)
    let that = args.shift()
    return fn.apply(that, args)
  }
}

class Toast {
  constructor() {
    this.prompt = 'shit'
  }
  show(number) {
    console.log(this.prompt + number)
  }
}

const myShow = uncurrying(Toast.prototype.show)

const obj = {
  prompt: 'hello'
}

myShow(obj, 10)

function currying(fn) {
  let allArgs = []
  function next() {
    const args = [].slice.call(arguments)
    if (args.length > 0) {
      allArgs = allArgs.concat(args)
      return next
    } else {
      return fn.apply(null, allArgs)
    }
  }
  return next
}

const sum = currying(function() {
  let sum = 0
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i]
  }
  return sum
})

console.log(sum(1, 2)(3)(4, 5, 6)())
