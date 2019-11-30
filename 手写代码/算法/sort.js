// function quickSort(arr) {
//   const len = arr.length
//   if (len < 2) {
//     console.log(arr.slice())
//     return arr.slice()
//   } else {
//     const index = Math.floor(len / 2)
//     const pivot = arr[index]
//     const left = []
//     const right = []
//     for (let i = 0; i < len; i++) {
//       if (i === index) {
//         continue
//       }
//       if (arr[i] <= pivot) {
//         left.push(arr[i])
//       } else {
//         right.push(arr[i])
//       }
//     }
//     console.log([...left, pivot + '(p)', ...right])
//     return [...quickSort(left), pivot, ...quickSort(right)]
//   }
// }

function bubbleSort(arr) {
  const len = arr.length
  let temp
  for (let i = len; i > 1; i--) {
    for (let j = 1; j < i; j++) {
      if (arr[j - 1] > arr[j]) {
        temp = arr[j]
        arr[j] = arr[j - 1]
        arr[j - 1] = temp
      }
    }
  }
  return arr
}

function quickSort(arr) {
  const len = arr.length
  if (len < 2) {
    return arr.slice()
  } else {
    const pivot = Math.floor(len / 2)
    const left = []
    const right = []
    for (let i = 0; i < len; i++) {
      if (i === pivot) continue
      if (arr[i] <= arr[pivot]) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
    return [...quickSort(left), arr[pivot], ...quickSort(right)]
  }
}

function selectSort(arr) {
  const len = arr.length
  let temp
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[i]) {
        temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}

function insertSort(arr) {
  const len = arr.length
  let temp
  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        temp = arr[j - 1]
        arr[j - 1] = arr[j]
        arr[j] = temp
      } else {
        break
      }
    }
  }
  return arr
}

const arr = [3, 8, 20, 1, 30, 2]
console.log(new Date())
console.log(insertSort(arr))
console.log(new Date())