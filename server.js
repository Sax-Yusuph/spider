const express = require('express')
const puppeteer = require('puppeteer')
const format_res = require('./utils/format_res')
const get_SPA = require('./utils/get_SPA')
const fetchData = require('./utils/get_store')
const fs = require('fs')
const { performance } = require('perf_hooks')
const bodyParser = require('body-parser')

const app = express()

let browser

app.use(bodyParser.json())

app.get('/', (req, res) => {
	if (browser) return
	puppeteer
		.launch({
			headless: false,
			args: [
				// "--proxy-server=" + proxy,
				'--no-sandbox',
				'--disable-setuid-sandbox',
				'--disable-dev-shm-usage',
				'--disable-accelerated-2d-canvas',
				'--disable-gpu',
				'--window-size=1920x1080',
			],
		})
		.then(chromium => {
			browser = chromium
			res.send('Chromium Instance Launched')
		})
})
const defaultUserRequest = {
	item: 'infinix hot 8',
	urls: ['Konga', 'Jumia', 'AliExpress', 'Kara', 'Ebay', 'Slot'],
}
app.get('/getstore', (req, res) => {
	const formattedURLs = format_res(defaultUserRequest)
	// res.send(formattedURLs)
	const t0 = performance.now()
	if (browser) {
		Promise.all([
			...formattedURLs.urls.map(fetchData),
			...formattedURLs.SPA_Store_Urls.map(async uri => {
				return get_SPA(uri, browser)
			}),
		])
			.then(results => {
				const formatted_results = []
				results.forEach(result => formatted_results.push(...result))

				res.send(JSON.stringify(formatted_results, null, 3))
				fs.writeFile(
					'serverResults.json',
					JSON.stringify(formatted_results, null, 3),
					() => {
						console.log(
							`scraped ${formatted_results.length} results >>>>>>>>`
						)
						console.log('yay! successfully completed')
						console.log(
							`finished in : ${Math.ceil(
								(performance.now() - t0) / 1000
							)} seconds`
						)
					}
				)
			})
			.catch(e => console.log(e.message))
	} else {
		res.status(400).send('Opps! Chromium not launched yet')
	}
})

const PORT = 4000

app.listen(process.env.PORT || PORT, () => {
	console.log(`server started on port ${PORT}`)
})

/** TODOS
 *
 * EXPLORE BROWSER.CONNECT OPTIONS. (i am doubting the automatic ASYNC() function)
 * CLOSER EITHER browser.page or browser.disconnect IN get_spa FUNCTION or server.js FILE.
 **/
