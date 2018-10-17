## Node Learning test program （[点我查看中文文档](README.ZH.md)）
use node crawling lottery winning information

- The current program uses only the node base modules http, fs, and cheerio for simple operations.
- In the node environment, use the command directly

```nodejs
	npm install
```
or install cheerio（main）and iconv-lite（For decoding）depend，
```nodejs
	npm install cheerio iconv-lite
```

- use node Run directly，example：

```nodejs
	node ssq/app.js
```
That is, the two-color ball data crawling is performed. (There are only two-color ball data in the folder, there will be read me documents, other because the code content is similar, so not much to say)



- In the directory `app.js` is the program file, the crawled data will be saved to the `data.json` file as a JSON file.
- The corresponding name of the directory is：
  - `/ssq/`	         ->two-color ball
  - `/7lecai/`     ->7 lecai
  - `/3D/`              ->fucai 3D
  - `/daletou/`   ->Lotto



- When crawling the latest data, you need to know in advance how many pages (you can also get it in the href on the last page of the page). The page address can be found in the program. Here, the manual is simple to record.
- among them

  - two-color ball, fucai 3D, 7 lecai color crawling website is：http://www.zhcw.com/
  - The website that the big lottery crawls is：http://kj.cjcp.com.cn/
- There are still a lot of things to improve in the program, and there are problems that can be raised in Issues. Comments are welcome.
- Solemnly declare: This project is purely a hobby, belonging to a test project in the process of learning node, the data obtained is for reference only. It is strictly prohibited for commercial use!
