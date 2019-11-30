// function debounce(fn, wait, immediate) {
//   let timeout = null
//   function cb() {
//     const args = Array.prototype.slice.call(arguments)
//     if (immediate && !timeout) {
//       fn.apply(this, args)
//     }
//     if (timeout) clearTimeout(timeout)
//     timeout = setTimeout(() => {
//       fn.apply(this, args)
//       timeout = null
//     }, wait)
//   }
//   return cb
// }

function debounce(fn, wait, immediate) {
  let timer = null
  function cb(...args) {
    if (!timer && immediate) {
      fn.apply(this, args)
    }
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, wait)
  }
  return cb
}

function throttle1(fn, wait) {
  let timer = null
  function cb(...args) {
    if (timer) {
      return
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, wait)
    }
  }
  return cb
}

function throttle2(fn, wait) {
  let previus = 0
  function cb(...args) {
    const now = Date.now()
    if (now - previus < wait) {
      return
    } else {
      fn.apply(this, args)
      previus = now
    }
  }
  return cb
}