'use strict'

const http = require('http')
const fs = require('fs')
const cheerio = require('cheerio')

/**
  @date 2017-3-16
  @author qinjun
  说明：
    本程序是借助node http模块获取网页内容，然后使用cheerio进行文本处理，原理简单。
    http请求是属于异步请求，而本程序为了避免异步带来的数据混乱问题，改成同步进行，
    所以运行速度会很慢，请耐心等待。（之前使用过异步获取，速度非常快，只是需要在后期重新整理数据）
    本程序纯属个人兴趣练手程序，程序存在许多不足的地方，欢迎指出。
    拿到的数据可以自行作为参考数据测试训练等，严禁用作商业用途！
	//- 文件写入的数据格式是： （按最新一期排序）
	data = {
		balls: [
			{
				issueNumber: '',      // 期号
				redBall: [],          // 红球
				blueBall: ''          // 蓝球
			}
		]
	}
 */

let ssq = { balls: [] }
const total = process.env.TOTAL || 105		// 截止到20170314，最后一期为2017029，总共105个页面记录

console.log(`开始获取页面数据，请耐心等待...`)
getBalls(1)

function getBalls(num) {	// num为数字，表示第num页
	

	http.get('http://kaijiang.zhcw.com/zhcw/html/ssq/list_' + num + '.html', (res) => {

		let html = ''

		res.on('data', (data) => { html += data })	// data为buffer数据

		res.on('end', () => {

			const $ = cheerio.load(html)		// 拿到的都是数字，不需要解决编码问题

			const $redBall = $('em.rr') 					// 拿到页面中所有红球
			const $blueBall = $('em:not(.rr)')				// 拿到页面中所有蓝球
			const $issueNumber = $('tr>td:nth-child(2)')	// 每一期的期号
			const length = $blueBall.length 				// 页面期数以蓝球数量为准

			let balls = []
			let count = 0		// 用于记录红球
			for (let i = 0; i < length; i++) {
				let everyIssue = {}				// 记录每一期数据
				everyIssue.issueNumber = $issueNumber[i].children[0].data 	// 当期期号
				everyIssue.redBall = []			// 当期红球号码，以数组方式记录
				for (let j = 0; j < 6; j++) {	// 每期6个红球
					everyIssue.redBall.push($redBall[count].children[0].data)
					count++
				}
				everyIssue.blueBall = $blueBall[i].children[0].data 		// 当期蓝球号码
				balls.push(everyIssue)			// 将每期号码保存到数组中
			}

			ssq.balls = ssq.balls.concat(balls)			// 将当前页面记录的数据保存下来

			console.log(`获取第 ${num} 页数据成功~ (^_^) ...`)
			if (num === total) {
				fs.writeFile('data.json', JSON.stringify(ssq))		// 保存为 json 格式
				return
			}

			getBalls(num+1)    // 获取下一页数据
		})

	}).on('error', () => {
		console.log(`获取第 ${num} 页数据失败~ (T_T)，重新获取中...`)
		getBalls(num)		// 获取失败时重新获取当页
	})

}
