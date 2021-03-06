const startTime = new Date().getTime()
const { log, isArray, isRepeat, getRand, getN, filterData } = require('./util')
const data = require('./data.json').balls
data.sort((a, b) => a.issueNumber - b.issueNumber)
// console.log(data)
// 

const cutBlueStart = 0
const cutBlueEnd = 5
const cutRedStart = 0
const cutRedEnd = 3

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
    let { flag, index } = isRepeat(item[0], item[1], temp2)
    if (flag) {
      temp2[index][2] = temp2[index][2] + 1
    } else {
      temp2.push(item)
    }
  })
  return temp2
}

// ---------- 打印历史球出现最多的次数排序
const redBallMost = amost(data, 'redBall')
const blueBallMost = amost(data, 'blueBall')

redBallMost.sort((a, b) => b[1] - a[1])
blueBallMost.sort((a, b) => b[1] - a[1])

log('redBall', redBallMost, 'r')
log('blueBall', blueBallMost, 'b')


// ---------- 打印在该球出现之后历史出现最多的球次数排序
const afterByBlueData = afterBy(data, 'blueBall')
afterByBlueData.sort((a, b) => a[0] - b[0] || a[1] - b[1])

const afterByRedData = afterBy(data, 'redBall')
afterByRedData.sort((a, b) => a[0] - b[0] || a[1] - b[1])

// log('redBall', afterByRedData, 'r')
// log('blueBall', afterByBlueData, 'b')

// // 验证长度
// console.log(afterByBlueData.length)
// console.log(16 * 16)
// console.log(afterByRedData.length)
// console.log(33 * 33)

// // 验证总数
// const len = data.length
// log('size of total data in blue', len)
// log('size of total data in red', len * 6)
// let sumb = 0
// afterByBlueData.map(_ => sumb += _[2])
// console.log(sumb)
// let sumr = 0
// afterByRedData.map(_ => sumr += _[2])
// console.log(sumr)
// console.log(sumr / sumb)
//
// // test analysis 
// const bbdd = filterData('07', afterByBlueData)
// bbdd.sort((a, b) => b[2] - a[2])
// const rrdd = filterData('01', afterByRedData)
// rrdd.sort((a, b) => b[2] - a[2])
// log('07', bbdd)
// log('01', rrdd)

// ---------- 打印最新一期出现的球
// the last issue result
const lastIssueData = data[data.length - 1]
// log('last issue data', lastIssueData)
const lidBlue = lastIssueData.blueBall
const lidRed = lastIssueData.redBall
// log('last issue blue ball', lidBlue)
// log('last issue red ball', lidRed)
log('the latest issue', lastIssueData)



// --------- 按出现最多的球和下期出现最多的球给出预测
// analysis base last issue data
const blueExpect = filterData(lidBlue[0], afterByBlueData)
blueExpect.sort((a, b) => b[2] - a[2])

let resultBlue = []
for (let i = cutBlueStart; i < cutBlueEnd; i++) {
  resultBlue.push(blueExpect[i][1])
}
for (let i = 0; i < 4; i++) {
  resultBlue.push(blueBallMost[i][0])
}
// resultBlue = resultBlue.unique()
log('the blue ball maybe come out', resultBlue.unique())
// log('the most come out number', resultBlue)

// ------ 从期望数组中随机取出一个值，作为蓝球购买预测
const shouldBuyBlue = getN(resultBlue, 1)
shouldBuyBlue.sort()
// log('in the end, you should buy this blue ball number', shouldBuyBlue)

let resultRed = []
let redExpectAll = []
for (let i = 0; i < lidRed.length; i++) {
  let redExpect = filterData(lidRed[i], afterByRedData)
  redExpect.sort((a, b) => b[2] - a[2])
  redExpectAll.push(redExpect)
  for (let j = cutRedStart; j < cutRedEnd; j++) {
    resultRed.push(redExpect[j][1])
  }
}
for (let i = 0; i < 4; i++) {
  resultRed.push(redBallMost[i][0])
}
// resultRed = resultRed.unique()
log('the red ball maybe come out', resultRed.unique())
const shouldBuyRed = getN(resultRed, 6)
shouldBuyRed.sort()
// log('you could buy six of this red ball number', shouldBuyRed)

const finalResult = {
  redBall: shouldBuyRed,
  blueBall: shouldBuyBlue
}

// blue ball expect
// log('blue ball expect', blueExpect, 'b')
// red ball expect
// log('red ball expect', redExpectAll, 'r')

log('finally, you shuold buy these number', finalResult)

// const redExpect = filterData(lidRed[0], afterByRedData)
// redExpect.sort((a, b) => b[2] - a[2])
// log('expect blue ball', redExpect)
// log('the most after blue ball', blueBallMost)
//
//
//
//
//
//
//
//
//
// // const data = [1, 8, 14, 17, 20, 22, 26, 32]
// const data = [1, 8, 14, 17, 20, 22, 26, 32]
// const len = data.length

// // const blue = [05, 09, 12, 14, 16]
// const blue = [4, 10, 13, 15, 5]

// // for (let n = 0; n < 4; n++) {

// console.log(blue[getRand(0, 4)])

// // let result = []
// // for (let i = 0; i < 6; i++) {
// //   let index = getRand(0, len -1)
// //   while (result.indexOf(data[index]) > -1) {
// //     index = getRand(0, len - 1)
// //   }
// //   result.push(data[index])
// // }

// // result.sort((a, b) => a - b)
// // console.log(result)

// // }

// // 从 热 - 冷 分三阶段取号
// const classa = [26, 22, 1, 14, 20, 8, 32, 17, 7, 18]
// const classb = [3, 27, 30, 13, 5, 2, 16, 19, 6, 10]
// const classc = [12, 4, 29, 25, 21, 9, 11, 23, 28, 31, 15, 24, 33]

// console.log(getN(classa, 2))
// console.log(getN(classb, 2))
// console.log(getN(classc, 2))

// // console.log('blue ball', getRand(1, 16))
// let redball = []
// for (let i = 0; i < 6; i++) {
//   let tmp = getRand(1, 33)
//   while (redball.indexOf(tmp) > -1) {
//     tmp = getRand(1, 33)
//   }
//   redball.push(tmp)
// }
// console.log('red ball', redball)

const endTime = new Date().getTime()
console.log('\n Time spend ' + (endTime - startTime) / 1000 + 's')
