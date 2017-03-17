'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

/**
  @date 2017-3-16
  @author qinjun
  说明：
	//- 文件写入的数据格式是： （按最新一期排序）
	data = {
		balls: [
			{
				issueNumber: '',      // 期号
				redBall: [],          // 红球5个
				blueBall: []          // 蓝球2个
			}
		]
	}
 */

let daletou = { balls: [] }
// 百度说自第14052期(2014年5月5日20:10开售)起，变更中国体育彩票超级大乐透游戏规则
console.log(`开始获取页面数据，请耐心等待...`)

getBalls(1)
function getBalls(num) {	// num为数字，表示第num页
	

	http.get('http://kj.cjcp.com.cn/dlt/index.php?topage='+num, (res) => {

		let html = ''

		res.on('data', (data) => { html += data })	// data为buffer数据

		res.on('end', () => {

			const $ = cheerio.load(html)		// 拿到的都是数字，不需要解决编码问题

			console.log($.html())
			if ($.html() === '') {
				getBalls(num)
				return
			}
			const $redBall = $('.balls .redBalls')				// 拿到页面中所有红球
			const $blueBall = $('table.historylist .balls .blueBalls em')				// 拿到页面中所有蓝球
			const $issueNumber = $('table.historylist > tbody > tr td:first-child')	// 每一期的期号


			// console.log($blueBall)

			// let balls = []
			// for (let i = 0; i < length; i++) {
			// 	let everyIssue = {}				// 记录每一期数据
			// 	everyIssue.issueNumber = $issueNumber[i].children[0].data 	// 当期期号
			// 	everyIssue.redBall = []
			// 	for (let j = 0; j < 5; j++) {	// 每期3个球
			// 		everyIssue.redBall.push($redBall[j].children[0].data)
			// 	}
			// 	everyIssue.blueBall = []
			// 	everyIssue.blueBall.push($blueBall[0].children[0].data)
			// 	everyIssue.blueBall.push($blueBall[1].children[0].data)
			// 	balls.push(everyIssue)			// 将每期号码保存到数组中
			// }

			// daletou.balls = daletou.balls.concat(balls)			// 将当前页面记录的数据保存下来

			console.log(`获取数据成功~ (^_^) ...`)
			fs.writeFile(path.join(__dirname+'/data.json'), JSON.stringify(daletou))		// 保存为 json 格式

		})

	}).on('error', () => {
		console.log(`获取数据失败~ (T_T)，重新获取中...`)
		getBalls()		// 获取失败时重新获取当页
	})

}


// 'http://kj.cjcp.com.cn/dlt/index.php?topage=1'