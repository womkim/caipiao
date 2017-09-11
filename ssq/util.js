
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
  str = str.toString()
  str = str.substr(0, 1).toUpperCase().concat(str.substr(1))
  let printStr = ''
  if (typeof data === 'object') {
    printStr = `║ $${sign} ~ " ${str} " ->:  ║`
  } else {
    printStr = `║ $${sign} ~ " ${str} " ->:  ${data}  ║`
  }
  const { start, end } = strSign('═', printStr.length - 2)
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

const getYears = (data) => {
  let years = []
  data.map(item => {
    let year = item.issueNumber.substr(0, 4)
    if (years.indexOf(year) === -1) {
      years.push(year)
    }
  })
  return years
}

const isArray = obj => Object.prototype.toString.call(obj) === '[object Array]'

const getRand = (min, max) => Math.round(min + Math.random() * (max - min))

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

const isRepeat = (before, after, array) => {
  if (!array || !isArray(array)) {
    log('error', 'with wrong parameters')
  }
  for (let i = 0; i < array.length; i++) {
    let item = array[i]
    if (item[0] === before && item[1] === after) {
      return { flag: true, index: i}
    }
  }
  return { flag: false, index: null}
}

const filterData = (no, data) => data.filter(_ => _[0] === no)

module.exports = {
  log,
  getYears,
  isArray,
  isRepeat,
  filterData
}
