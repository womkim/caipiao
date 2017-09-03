
const getRand = (min, max) => Math.round(min + Math.random() * (max - min))

// const data = [1, 8, 14, 17, 20, 22, 26, 32]
const data = [1, 8, 14, 17, 20, 22, 26, 32]
const len = data.length

// const blue = [05, 09, 12, 14, 16]
const blue = [4, 10, 13, 15, 5]

// for (let n = 0; n < 4; n++) {


  console.log(blue[getRand(0, 4)])

  // let result = []
  // for (let i = 0; i < 6; i++) {
  //   let index = getRand(0, len -1)
  //   while (result.indexOf(data[index]) > -1) {
  //     index = getRand(0, len - 1)
  //   }
  //   result.push(data[index])
  // }

  // result.sort((a, b) => a - b)
  // console.log(result)

// }

// 从 热 - 冷 分三阶段取号
const classa = [26, 22, 1, 14, 20, 8, 32, 17, 7, 18]
const classb = [3, 27, 30, 13, 5, 2, 16, 19, 6, 10]
const classc = [12, 4, 29, 25, 21, 9, 11, 23, 28, 31, 15, 24, 33]

const getN = (data, n) => {
  const len = data.length
  let result = []
  for (let i = 0; i < n; i++) {
    let index = getRand(0, len -1)
    while (result.indexOf(data[index]) > -1) {
      index = getRand(0, len -1)
    }
    result.push(data[index])
  }
  return result
}

console.log(getN(classa, 2))
console.log(getN(classb, 2))
console.log(getN(classc, 2))

// console.log('blue ball', getRand(1, 16))
let redball = []
for (let i = 0; i < 6; i++) {
  let tmp = getRand(1, 33)
  while (redball.indexOf(tmp) > -1) {
    tmp = getRand(1, 33)
  }
  redball.push(tmp)
}
console.log('red ball', redball)