const tst = 'time spend'
console.time(tst)
const { log, isArray, isRepeat, getRand, getN, filterData } = require('./util')
const data = require('./data.json').balls
data.sort((a, b) => a.issueNumber - b.issueNumber)

const expect = ['01', '08', '10', '14', '21', '26']

let d = data.filter(item => item.redBall.every((_, i) => _ === expect[i]))

console.log(d)

console.timeEnd(tst)
