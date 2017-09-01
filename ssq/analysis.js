// var fs = require('fs')
// var http = require('http')
// var https = require('https')

var data = require('./data.json').balls

// console.log(data)

function log (str = 'empty', data = '', sign = 'b') {
  if (typeof data === 'object') {
    console.log(`>『 $${sign} ~ 』 " ${str} " ->:`)
    console.log(data)
  } else {
    console.log(`>『 $${sign} ~ 』 " ${str} " ->:  ${data}`)
  }
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
  let nextTimeNumberBlue = []
  // the ball after a ball come out once
  for (let i = 0; i < data.length - 1; i++) {
    let count = 1
    nextTimeNumberBlue.push([data[i], data[i + 1], 1])
  }
  // make unique
}

// get the year
let years = []
data.map(item => {
  let year = item.issueNumber.substr(0, 4)
  if (years.indexOf(year) === -1) {
    years.push(year)
  }
})
log('data', data)

// log all exists years
// log('all years', years)

// analysis all years' data
log('analysis all data')
analysisBlue(data, 'all years')

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

// // except 2003's data
// const divide2003Data = data.filter(d => d.issueNumber.substr(0, 4) !== '2003')
// analysisBlue(divide2003Data, 'all years except 2003')

// // except 2003 and 2017's data
// const divide2003_2017Data = data.filter(d => {
//   if (d.issueNumber.substr(0, 4) !== '2017' && d.issueNumber.substr(0, 4) !== '2003') return true
//   return false
// })
// analysisBlue(divide2003_2017Data, 'all years except 2003 and 2017')
