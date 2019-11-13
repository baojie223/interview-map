function debounce(fn, time) {
  let timer = null
  return function() {
    if (!timer) {
      fn.call(arguments)
    } else {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.call(arguments)
    }, time)
  }
}
