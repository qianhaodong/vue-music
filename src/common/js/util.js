// 工具函数
function getRandomInt(min, max) { // 返回随机数
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) { // 打乱数组
  let _arr = arr.slice() // 复制一份数组，防止改变原数组
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

// 节流函数
export function debounce(func, delay) {
  let timer
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
