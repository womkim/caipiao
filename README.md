## Node 学习测试程序
使用node爬取的彩票中奖信息

- 当前程序仅使用node基本模块http、fs 和cheerio进行简单的操作。
- 在node环境下，安装cheerio依赖，直接使用命令

```nodejs
	npm install
```
or
```nodejs
	npm install cheerio
```

- 使用node直接运行即可，如：

```nodejs
	node ssq/app.js
```
即进行双色球数据爬取。



- 目录下`app.js`为程序文件，爬取的数据将以JSON文件形式保存到`data.json`文件中
- 目录对应的名称是：
  - `/ssq/`	        ->双色球
  - `/7lecai/`      ->7乐彩
  - `/3D/`              ->福彩3D



- 爬取最新数据时，需要事先知道有多少个页面（也可以在页面上末页的href中取到），页面地址在程序中可以找到，这里为图简单采用手动记录的方式。