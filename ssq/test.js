
const { log, isArray } = require('./util')
const data = require('./data.json').balls
data.sort((a, b) => a.issueNumber - b.issueNumber)
// console.log(data)
const amost = (data, type) => {
  if (!isArray(data)) {
    log('error', 'data is not an array.')
    return
  }
  let times = []
  data.map(item => {
    if (!isArray(item[type])) {
      log('error', type + ' in data is not an array.')
      return
    }
    item[type].map(ball => {
      let i = parseInt(ball, 10) - 1
      times[i] = times[i] === undefined ? 0 : times[i] + 1
    })
  })
  let balls = []
  times.map((item, index) => {
    let i = index + 1
    i = i < 10 ? '0' + i : '' + i
    balls.push([i, item])
  })
  // log(type, balls, type.substr(0, 1))
  return balls
}

const redBallMost = amost(data, 'redBall')
const blueBallMost = amost(data, 'blueBall')

redBallMost.sort((a, b) => b[1] - a[1])
blueBallMost.sort((a, b) => b[1] - a[1])

// log('redBall', redBallMost, 'r')
// log('blueBall', blueBallMost, 'r')

const afterBy = (data, type) => {
  if (!isArray(data)) {
    log('error', 'data is not an array.')
    return
  }
  let temp = []
  for (let i = 0; i < data.length - 1; i++) {
    let balls = data[i][type]
    if (!isArray(balls)) {
      log('error', type + ' in data is not an array.')
      return
    }
    let ballsAfter = data[i + 1][type]
    balls.map(aa => {
      ballsAfter.map(bb => {
        temp.push([aa, bb, 1])
      })
    })
  }
  // return temp
  let temp2 = []
  temp.map(item => {
    temp2.map((record, index) => {
      console.log(item)
      if (item[0] === record[0] && item[1] === record[1]) {
        let t = record[2] + 1
        temp2[index] = [item[0], item[1], t]
      } else {
        temp2.push(item)
      }
    })
  })
  return temp2
}

log('blueBall', afterBy(data, 'blueBall'), 'r')

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
    let index = getRand(0, len - 1)
    while (result.indexOf(data[index]) > -1) {
      index = getRand(0, len - 1)
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
