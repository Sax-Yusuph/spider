const express = require('express')
const format_res = require('./utils/format_res')
const fetchData = require('./utils/get_store')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send('ready to test server')
})
const defaultUserRequest = {
	item: 'infinix hot 8',
	urls: ['Konga', 'Jumia', 'AliExpress', 'Kara', 'Ebay', 'Slot'],
}

app.get('/getstore', (req, res) => {
	const formattedURLs = format_res(defaultUserRequest)
	// res.send(formattedURLs)
	Promise.all([...formattedURLs.urls.map(fetchData)])
		.then(results => {
			const formatted_results = []
			results.forEach(result => formatted_results.push(...result))

			res.json(formatted_results)
		})
		.catch(e => console.log(e.message))
})

const PORT = 4000

app.listen(process.env.PORT || PORT, () => {
	console.log(`server started on port ${PORT}`)
})
