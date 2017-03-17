'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')		// 用于解决获取的页面乱码的问题

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
// 百度查到自第14052期(2014年5月5日20:10开售)起，变更中国体育彩票超级大乐透游戏规则
// 这里将爬取2007年以来的所有数据
const total = process.env.TOTAL || 51			// 截止到20170315，最后一期为2017029，共51个页面记录，每个页面最多30条

console.log(`开始获取页面数据，请耐心等待...`)
getBalls(1)

function getBalls(num) {	// num为数字，表示第num页

	http.get('http://kj.cjcp.com.cn/dlt/index.php?topage='+num, (res) => {

		let html = []

		res.on('data', (data) => { html.push(data) })

		res.on('end', () => {

			const str = iconv.decode(Buffer.concat(html), 'gb2312')			// 该网页是以 gb2312 编码的， 拿到的期号会有文字，需要先解决乱码问题（可以截取只留下数字，就不存在乱码的问题）
			const $ = cheerio.load(str)

			if ($.html() === '') {
				console.log(`第${num}页没有获取到数据~ (T_T)，重新获取中...`)
				getBalls(num)
				return
			}

			const $redBall = $('.q_red')				// 拿到页面中所有红球
			const $blueBall = $('.q_blue')			// 拿到页面中所有蓝球
			const $issueNumber = $('.qihao')		// 每一期的期号
			var length = $issueNumber.length

			let balls = []
			let countR = 0		// 用于记录红球
			let countB = 0		// 用于记录蓝球
			for (let i = 0; i < length; i++) {
				let everyIssue = {}				// 记录每一期数据
				// 期号
				everyIssue.issueNumber = $issueNumber[i].children[0].data 	// 当期期号			// 该页面是的球是用input标签记录的，通过attribs.value获取
				// 红球
				everyIssue.redBall = []
				for (let j = 0; j < 5; j++) {	// 每期5个红球
					everyIssue.redBall.push($redBall[countR].attribs.value)
					countR++
				}
				// 蓝球
				everyIssue.blueBall = []			// 每期2个蓝球
				for (let j = 0; j < 2; j++) {
					everyIssue.blueBall.push($blueBall[countB].attribs.value)
					countB++
				}
				// 将每期号码保存到数组中
				balls.push(everyIssue)
			}

			daletou.balls = daletou.balls.concat(balls)			// 将当前页面记录的数据保存下来

			console.log(`获取第 ${num} 页数据成功~ (^_^) ...`)
			if (num === total) {			// 在最后一次写入到文件中
				fs.writeFile(path.join(__dirname+'/data.json'), JSON.stringify(daletou))		// 保存为 json 格式
				return
			}

			getBalls(num+1)		// 获取下一页数据

		})

	}).on('error', () => {
		console.log(`获取第 ${num} 页数据失败~ (T_T)，重新获取中...`)
		getBalls(num)		// 获取失败时重新获取当页
	})

}
