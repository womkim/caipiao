const data = require('./data.json')

// const r = ['02', '05', '14', '17', '32']
const r = ["02","11","13","23","31"]
// const b = ['08', '10']
const b = ["11","12"]

const eq = (d1, d2) => {
  const len = d1.length
  if (len !== d2.length) {
    return false
  }
  for (let i = 0; i < len; i++) {
    if (d1[i] !== d2[i]) {
      return false
    }
  }
  return true
}

let rt = []
let bt = []
let result = []
// data.balls.map(item => {
//   if (eq(r, item.redBall)) {
//     rt.push(item.issueNumber)
//   }
//   if (eq(b, item.blueBall)) {
//     bt.push(item.issueNumber)
//   }
//   if (eq(r, item.redBall) && eq(b, item.blueBall)) {
//     result.push(item.issueNumber)
//   }
// })

let d = data.balls

for (let i = 0; i < d.length; i++) {
  for (let j = i + 1; j < d.length; j++) {
    if (eq(d[i].redBall, d[j].redBall)) {
      rt.push({from: d[i].issueNumber, to: d[j].issueNumber})
    }
    if (eq(d[i].blueBall, d[j].blueBall)) {
      bt.push({from: d[i].issueNumber, to: d[j].issueNumber})
    }
    if (eq(d[i].redBall, d[j].redBall) && eq(d[i].blueBall, d[j].blueBall)) {
      result.push({from: d[i].issueNumber, to: d[j].issueNumber})
    }
  }
}

console.log(rt)
console.log(bt)
console.log(result)
