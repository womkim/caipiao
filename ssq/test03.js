
const { log, isArray, isRepeat, getRand, getN, filterData } = require('./util')
const data = require('./data.json').balls
data.sort((a, b) => a.issueNumber - b.issueNumber)

const print = obj => console.log(obj)

// single year
const d = year => data.filter(_ => _.issueNumber.substr(0, 4) === year.toString())

// mutil year
const dt = (l, u) => data.filter(_ => parseInt(_.issueNumber.substr(0, 4)) >= l && parseInt(_.issueNumber.substr(0, 4)) <= u)

// print(d(2003))

// let dd = dt(2003, 2005)
// print(dd[0])
// print(dd[dd.length - 1])

const redBalls = data => data.map(_ => _.redBall)
const blueBalls = data => data.map(_ => _.blueBall)

// console.log(redBalls(d(2003)))

// 历史出现的最多的球
const maximunBalls = data => {
  let count = []
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      let index = parseInt(data[i][j], 10) - 1
      count[index] = count[index] === undefined ? 1 : count[index] + 1
    }
  }
  let result = []
  for (let i = 0; i < count.length; i++) {
    let index = i + 1
    let item = count[i] || 0
    index = index < 10 ? '0' + index : '' + index
    result.push([index, item])
  }
  return result
}

let dyear = d(2018)
let rballs = redBalls(dyear)
rballs = redBalls(data)
let bballs = blueBalls(dyear)
bballs = blueBalls(data)

const mbr = maximunBalls(rballs)
mbr.sort((a, b) => b[1] - a[1])
print(mbr)

const mbb = maximunBalls(bballs)
mbb.sort((a, b) => b[1] - a[1])
print(mbb)

// test
// let c = 0
// for (let i = 0; i < mbb.length; i++) {
//   c += parseInt(mbb[i][1], 10)
// }
// print(c)
// print(d(year).length)
// 每年出现的最多的球
// 本期红球 A 出现后，本期其他红球出现的概率
// 本期红球 A 出现后，下一期其他红球出现的概率
// 本期红球 A 出现后，本期蓝球出现的概率
// 本期红球 A 出现后，下期蓝球出现的概率
// 本期出现过的球，以往是否出现过
