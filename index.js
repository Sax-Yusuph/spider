const axios = require('axios')
const moment = require('moment')
const { scrapMetadata } = require('./scrapStore')
const { productRef } = require('./server/firestoreConfig')
const {
	getHigestPrice,
	getLowestPrice,
	getAveragePrice,
	getPrices,
	getDollarRate,
	getActualPrice,
} = require('./server/formatPrice')
const { format_res } = require('./server/format_res')
const { fetchData } = require('./server/get_store')
const { isEmpty } = require('./server/isEmpty')
const { shuffle } = require('./server/shuffleArray')

const DEFAULT_STORES = [
	'konga',
	'jumia',
	'aliexpress',
	'kara',
	'ebay',
	'slot',
	'femtech',
]

exports.crawler = async (req, res) => {
	const { item, stores } = req.query
	if (!item || !stores)
		return res.status(400).json({ error: 'correct query not specified' })

	let _stores
	// check if the store query is 'all'
	if (stores === 'all' && (typeof stores === 'string') | undefined) {
		_stores = DEFAULT_STORES
	} else if (stores === 'undefined') {
		return res.json({ error: 'stores is undefined' })
	} else {
		_stores = stores.split(',')
		_stores.push('jumia') // temporary fix
	}

	// format the urls to have an actual http url
	const formattedURLs = format_res({ item, stores: _stores })
	try {
		const rawResults = await Promise.all([...formattedURLs.urls.map(fetchData)])
		const trim = [].concat.apply([], rawResults)
		const appendedPrice = await appendPrices(trim)
		const metadata = await getmeta(appendedPrice)
		const priceStats = getPricestats(appendedPrice)
		const finalResults = {
			...metadata,
			priceStats,
			searchQuery: {
				...req.query,
				createdAt: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
			},
			items: shuffle(appendedPrice),
		}
		await productRef.add(finalResults)
		// send final results to client
		res.json(finalResults)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const getmeta = async data => {
	if (!data || data.length === 0) return
	const _filter = data.find(
		item => item.websiteName === 'jumia' && item.productLink !== ''
	)
	// console.log(_filter)
	if (isEmpty(_filter) || !_filter.productLink) {
		throw new Error('productlink is undefined ---getmeta function')
	}

	try {
		const resp = await axios.get(_filter.productLink)
		return scrapMetadata(resp.data)
	} catch (error) {
		throw new Error(error.message + ' --getmeta')
	}
}

getPricestats = data => {
	// data is an array of the scrapped products
	const prices = getPrices(data)
	if (prices) {
		const highestPrice = getHigestPrice(prices)
		const lowestPrice = getLowestPrice(prices)
		const averagePrice = getAveragePrice(prices)
		return {
			highestPrice,
			lowestPrice,
			averagePrice,
		}
	}
}

const appendPrices = async data => {
	if (!data.length) return
	const dollarRate = await getDollarRate()
	// console.log(dollarRate)
	const refined = []
	for (const item of data) {
		if (item && item.price) {
			actualPrice = getActualPrice(item.price, dollarRate)
			refined.push({ ...item, actualPrice })
		}
	}
	return refined
}
