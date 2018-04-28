const brain = require('brain.js')
const net = new brain.recurrent.RNN()

// net.train([{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},
//            {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},
//            {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}]);

// var output = net.run({ r: 1, g: 0.4, b: 0 });  // { white: 0.99, black: 0.002 }

// console.log(output)

const data = require('./data.json').balls

let d2016 = data.filter(v => v.issueNumber.substr(0, 4) === '2018').sort((a, b) => a.issueNumber - b.issueNumber)

// d2016 = d2016.filter(v => v.issueNumber < 2016010)

const result = []

for (let i = 0; i < d2016.length - 1; i++) {
  result.push({
    input: d2016[i].blueBall.map(v => parseInt(v)),
    output: d2016[i + 1].blueBall.map(v => parseInt(v))
  })
}

console.log(result)

net.train(result)

let out = net.run([3])

console.log(out)
