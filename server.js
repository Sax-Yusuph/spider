const express = require('express')
const puppeteer = require('puppeteer')
const format_res = require('./utils/format_res')
const get_SPA = require('./utils/get_SPA')
const fetchData = require('./utils/get_store')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()

let browser

app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send('ready to test server')
})
const defaultUserRequest = {
	item: 'infinix hot 8',
	urls: ['Slot'],
}

app.get('/getstore', (req, res) => {
	const formattedURLs = format_res(defaultUserRequest)
	// res.send(formattedURLs)
	Promise.all([...formattedURLs.urls.map(fetchData)])
		.then(results => {
			const formatted_results = []
			results.forEach(result => formatted_results.push(...result))

			res.json(formatted_results)
			fs.writeFile(
				'serverResults.json',
				JSON.stringify(formatted_results, null, 3),
				() => {
					console.log(`scraped ${formatted_results.length} results >>>>>>>>`)
					console.log('yay! successfully completed')
				}
			)
		})
		.catch(e => console.log(e.message))
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
