## Node 学习测试程序
使用node爬取的彩票中奖信息

- 当前程序仅使用node基本模块http、fs 和cheerio进行简单的操作。
- 在node环境下，直接使用命令

```nodejs
	npm install
```
或者安装cheerio（主要）和iconv-lite（用于解码）依赖，
```nodejs
	npm install cheerio iconv-lite
```

- 使用node直接运行即可，如：

```nodejs
	node ssq/app.js
```
即进行双色球数据爬取。（文件夹里面只有双色球数据会有read me文档，其他因为代码内容相似，所以不多累述）



- 目录下`app.js`为程序文件，爬取的数据将以JSON文件形式保存到`data.json`文件中
- 目录对应的名称是：
  - `/ssq/`	         ->双色球
  - `/7lecai/`     ->7乐彩
  - `/3D/`              ->福彩3D
  - `/daletou/`   ->大乐透



- 爬取最新数据时，需要事先知道有多少个页面（也可以在页面上末页的href中取到），页面地址在程序中可以找到，这里为图简单采用手动记录的方式。
- 其中

  - 双色球、福彩3D、7乐彩爬取的网站是：http://www.zhcw.com/
  - 大乐透爬取的网站是：http://kj.cjcp.com.cn/
- 程序还有很多需要改进的地方，有问题可以在Issues中提出，欢迎给出批评意见。
- 郑重声明：本项目纯属兴趣爱好，属于在学习node过程中的一个测试项目，拿到的数据仅供参考。严禁用作商业用途！