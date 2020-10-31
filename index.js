const axios = require('axios')
const { scrapMetadata } = require('./scrapStore')
const format_res = require('./server/format_res')
const fetchData = require('./server/get_store')
const isEmpty = require('./server/isEmpty')
const shuffle = require('./server/shuffleArray')

const DEFAULT_STORES = ['konga', 'jumia', 'aliexpress', 'kara', 'ebay', 'slot']

// const defaultUserRequest = {
// 	item: 'infinix hot 8',
// 	urls: ['konga', 'jumia', 'aliExpress', 'kara', 'ebay', 'slot'],
// }

exports.crawler = (req, res) => {
	const { item, stores } = req.query
	if (!item) return res.status(400).json({ error: 'no query specified' })

	let _stores
	// check if the store query is 'all'
	if (stores === 'all' && (typeof stores === 'string') | undefined) {
		_stores = DEFAULT_STORES
	} else {
		_stores = stores.split(',')
	}

	// format the urls to have an actual http url
	const formattedURLs = format_res({ item, stores: _stores })
	Promise.all([...formattedURLs.urls.map(fetchData)])
		.then(results => {
			const trim = results.flat().filter(res => res.price !== '')
			if (trim) {
				getmeta(trim).then(metadata => {
					const crawledRes = {
						...metadata,
						searchQuery: req.query,
						items: shuffle(trim),
					}
					res.json(crawledRes)
				})
			} else {
				res.status(500).json({ error: 'something happened' })
			}
		})
		.catch(e => console.log(e.message))
}

const getmeta = async data => {
	const _filter = data.filter(item => item.websiteName === 'jumia')[0]

	if (isEmpty(_filter) && !_filter.productLink) {
		throw new Error('productlink is undefined ---getmeta function')
	}

	try {
		const res = await axios.get(_filter.productLink)
		return scrapMetadata(res.data)
	} catch (error) {
		throw new Error(error.message)
	}
}
