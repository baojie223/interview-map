class MyPromise {
  status = 'pending'
  value = ''
  reason = ''
  constructor(fn) {
    fn(this.resolve, this.reject)
  }

  static then(fn) {
    fn(this.value)
  }

  resolve(value) {
    if (this.status === 'pending') {
      this.value = value
      this.status = 'resolved'
      return this
    }
  }

  reject(reason) {
    if (this.status === 'pending') {
      this.reason = reason
      this.status = 'rejected'
      return this
    }
  }
}

return 
class MyPromise {
  status = 'pending'
  value = void 0
  reason = void 0
  onFulfilledArray = []
  onRejectedArray = []
  constructor(fn) {
    try {
      fn(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  static deferred() {
    let dfd = {}
    dfd.promise = new MyPromise((resolve, reject) => {
      dfd.resolve = resolve
      dfd.reject = reject
    })
    return dfd
  }

  resolve = value => {
    if (this.status === 'pending') {
      this.value = value
      this.status = 'resolved'
      this.onFulfilledArray.forEach(fn => {
        fn(this.value)
      })
    }
  }

  reject = reason => {
    if (this.status === 'pending') {
      this.reason = reason
      this.status = 'rejected'
      this.onRejectedArray.forEach(fn => {
        fn(this.reason)
      })
    }
  }

  then = (onFulfilled, onRejected) => {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : e => {
            throw e
          }
    const resolvePromise = (promise, x, resolve, reject) => {
      if (promise === x) {
        return reject(new TypeError('Cyclic reference'))
      }
      let isUsed
      if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
          let then = x.then
          if (typeof then === 'function') {
            then.call(x, y => {
              if (isUsed) return
              isUsed = true
              resolvePromise(promise, y, resolve, reject)
            }, e => {
              if (isUsed) return
              isUsed = true
              reject(e)
            })
          } else {
            resolve(x)
          }
        } catch (e) {
          if (isUsed) return
          isUsed = true
          reject(e)
        }
      } else {
        resolve(x)
      }
    }
    let promise2
    switch (this.status) {
      case 'pending':
        promise2 = new MyPromise((resolve, reject) => {
          this.onFulfilledArray.push(() => {
            setTimeout(() => {
              try {
                const temp = onFulfilled(this.value)
                resolvePromise(promise2, temp, resolve, reject)
              } catch (e) {
                reject(e)
              }
            })
          })
          this.onRejectedArray.push(() => {
            setTimeout(() => {
              try {
                const temp = onRejected(this.reason)
                resolvePromise(promise2, temp, resolve, reject)
              } catch (e) {
                reject(e)
              }
            })
          })
        })
        break
      case 'resolved':
        promise2 = new MyPromise((resolve, reject) => {
          setTimeout(() => {
            try {
              const temp = onFulfilled(this.value)
              resolvePromise(promise2, temp, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        break
      case 'rejected':
        promise2 = new MyPromise((resolve, reject) => {
          setTimeout(() => {
            try {
              const temp = onRejected(this.reason)
              resolvePromise(promise2, temp, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        break
      default:
    }
    return promise2
  }
}

const ps1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})

const ps2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 2000)
})

ps1
  .then(res => {
    console.log(res)
    return ps2
  })
  .then(res => {
    console.log(res)
  })

module.exports = MyPromise
