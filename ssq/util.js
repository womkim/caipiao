
function log (str = 'empty', data = '', sign = 'b') {
  if (typeof data === 'object') {
    console.log(`>『 $${sign} ~ 』 " ${str} " --:`)
    console.log(data)
  } else {
    console.log(`>『 $${sign} ~ 』 " ${str} " ->:  ${data}`)
  }
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

const isRepeat = (before, after, array) => {
  if (!array || !isArray(array)) {
    log('error', 'with wrong parameters')
  }
}

module.exports = {
  log,
  getYears,
  isArray
}
