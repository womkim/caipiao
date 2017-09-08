// var fs = require('fs')
// var http = require('http')
// var https = require('https')

const { log, getYears } = require('./util')
var data = require('./data.json').balls

var startTime = new Date().getTime()
// console.log(data)

function strSign (sign, len) {
  let str = sign
  for (let i = 0; i < len - 1; i++) {
    str += sign
  }
  return {
    start: '╔' + str + '╗',
    end: '╚' + str + '╝'
  }
}

function log (str = 'empty', data = '', sign = 'b') {
  str = str.substr(0, 1).toUpperCase().concat(str.substr(1))
  let printStr = ''
  if (typeof data === 'object') {
    printStr = `║ $${sign} ~ " ${str} " ->:  ║`
  } else {
    printStr = `║ $${sign} ~ " ${str} " ->:  ${data}  ║`
  }
  const { start, end } = strSign('═', printStr.length)
  // before print
  const strColorBlue = '\x1B[36m%s\x1B[39m'
  const strColorYellow = '\x1B[33m%s\x1B[39m'
  console.log()
  console.log(strColorBlue, start)
  // print data
  console.log(strColorBlue, printStr)
  if (typeof data === 'object') {
    console.log(data)
  }
  // after print
  console.log(strColorBlue, end)
}
/*
 * blueball analysis 
 *  
 */
function analysisBlue (data, key) {
  // the most times
  let timesBlue = []
  data.map(item => {
    let i = parseInt(item.blueBall, 10) - 1
    timesBlue[i] = timesBlue[i] !== undefined ? timesBlue[i] + 1 : 0
  })

  // ajust data
  let blueballTimes = []
  timesBlue.map((item, index) => {
    let i = index + 1
    i = i < 10 ? '0' + i : '' + i
    let tmp = [i, item]
    blueballTimes.push(tmp)
  })

  log(`${key} total blueball number is`, blueballTimes.length)
  // log('the times of all blueballs come out', blueballTimes)

  // sort ball record descending
  blueballTimes.sort((a, b) => b[1] - a[1])
  log(`max time in ${key} histrory is`, blueballTimes)

  // when a blue ball's number come out
  // record all balls have come out after this issuenumber next time
  // the ball after a ball come out once
  // [a, b, c]
  let nextTimeNumberBlue = []
  for (let i = 0; i < data.length - 1; i++) {
    nextTimeNumberBlue.push([data[i].blueBall, data[i + 1].blueBall, 1])
  }
  nextTimeNumberBlue.sort((a, b) => a[0] - b[0] || a[1] - b[1])
  let lastTimeNumberBlue = []
  let count = 1
  for (let i = 0; i < nextTimeNumberBlue.length - 1; i++) {
    if (nextTimeNumberBlue[i][1] === nextTimeNumberBlue[i + 1][1]) {
      count++
      if (i === nextTimeNumberBlue.length - 2) {
        lastTimeNumberBlue.push([nextTimeNumberBlue[i][0], nextTimeNumberBlue[i][1], ++count])
      }
    } else {
      lastTimeNumberBlue.push([nextTimeNumberBlue[i][0], nextTimeNumberBlue[i][1], count])
      count = 1
    }
  }

  let fixedTimeNumberBlue = []
  for (let j = 0; j < blueballTimes.length; j++) {
    let temp = []
    for (let i = 0; i < blueballTimes.length; i++) {
      let index = i + fixedTimeNumberBlue.length * blueballTimes.length
      temp.push(lastTimeNumberBlue[index])
    }
    fixedTimeNumberBlue.push(temp)
  }

  log(' blue balls have come out after this issuenumber next time', fixedTimeNumberBlue)
  // log('lastTimeNumberBlue', lastTimeNumberBlue)
  // log('lastTimeNumberBlue\'s length ', lastTimeNumberBlue.length)
  // log('should last length ', 16 * 16)
  // log('should last length ', data.length)
}

function analysisRed (data, key) {
  // the most times
  let timesRed = []
  data.map(item => {
    item.redBall.map(ball => {
      let i = parseInt(ball, 10) - 1
      timesRed[i] = timesRed[i] !== undefined ? timesRed[i] + 1 : 0
    })
  })

  // ajust data
  let redballTimes = []
  timesRed.map((item, index) => {
    let i = index + 1
    i = i < 10 ? '0' + i : '' + i
    let tmp = [i, item]
    redballTimes.push(tmp)
  })

  log(`${key} total redball number is`, redballTimes.length)
  // log('the times of all redballs come out', redballTimes)
  // sort ball record descending
  redballTimes.sort((a, b) => b[1] - a[1])
  log(`max time in ${key} histrory is`, redballTimes)
}

// get the year
let years = getYears(data)
// log('data', data)

// log all exists years
// log('all years', years)

// analysis all years' data
analysisBlue(data, 'all years 【 blue 】 ball')
analysisRed(data, 'all years 【 red 】 ball', 'r')

// every year's record
let yData = []
years.map(item => {
  let fdata = data.filter(d => d.issueNumber.substr(0, 4) === item)
  yData.push({[item]: fdata})
})

// // analysis every year
// yData.map(item => {
//   for (let key in item) {
//     // analysisBlue(item[key], key)
//   }
// })

// except 2003's data
const divide2003Data = data.filter(d => d.issueNumber.substr(0, 4) !== '2003')
// analysisBlue(divide2003Data, 'all years except 2003')

// except 2003 and 2017's data
const divide2003_2017Data = data.filter(d => {
  if (d.issueNumber.substr(0, 4) !== '2017' && d.issueNumber.substr(0, 4) !== '2003') return true
  return false
})
// analysisBlue(divide2003_2017Data, 'all years except 2003 and 2017')

var endTime = new Date().getTime()
log('time spend in ', (endTime - startTime) / 1000 + 's', 'T')
