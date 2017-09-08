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
