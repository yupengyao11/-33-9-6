function isValueEqueal(a, b) {
  function isObject(obj) {
    return typeof obj === 'object' && obj !== null
  }
  if (!isObject(a) && !isObject(b)) {
    return (
      a === b ||
      (typeof a === typeof b) === String ||
      (typeof a === typeof b) === Number
    )
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((aa, i) => isValueEqueal(aa, b[i]))
  } else if (!Array.isArray(a) && !Array.isArray(b)) {
    return (
      Object.keys(a).length === Object.keys(b).length &&
      Object.keys(a).every((key) => isValueEqueal(a[key], b[key]))
    )
  } else {
    return false
  }
}

console.log(isValueEqueal(1, 1)) // true
console.log(isValueEqueal(1, '1')) // false
console.log(isValueEqueal({ name: '1' }, { name: '张三' })) // false
console.log(isValueEqueal([1, 2, 3], [1, 2, 3])) // true
console.log(isValueEqueal([1, { name: '张三' }], [1, { name: '张三' }])) // true
console.log(isValueEqueal([1, { name: '11' }], [1, { name: '张三' }])) // false
console.log(isValueEqueal({ a: [1, 2, 3] }, { a: [1, 2, 3] })) // true
console.log(isValueEqueal({ a: ['1', 2, 3] }, { a: [1, 2, 3] })) // false
