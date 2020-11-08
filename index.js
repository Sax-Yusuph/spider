const axios = require('axios')
const { format, getTime, subDays } = require('date-fns')
const { scrapMetadata } = require('./scrapStore')
const { db } = require('./server/firestoreConfig')
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
const { onlyUnique } = require('./server/uniqueArray')

const DEFAULT_STORES = [
	'konga',
	'jumia',
	'aliexpress',
	'kara',
	'ebay',
	'slot',
	'femtech',
]
const DB_PRODUCT_COLLECTION = 'pricetrack-products'
const PRODUCT_COLLECTION = 'productItem'

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
		_stores = _stores.filter(onlyUnique)
	}

	// format the urls to have an actual http url
	const formattedURLs = format_res({ item, stores: _stores })
	try {
		// try getting recent search from database
		const matchedProductFromDB = await getProductsInDb(item, _stores)
		if (matchedProductFromDB) {
			console.log('done  👍   👍  ---------------------')
			return res.json(matchedProductFromDB)
		}

		// else perform a new search
		console.log('no query found in Database')
		console.log('scraping new products -------------------------------------')
		const rawResults = await Promise.all([...formattedURLs.urls.map(fetchData)])
		const trim = [].concat.apply([], rawResults)
		const appendedPrice = await appendPrices(trim)
		const metadata = await getmeta(appendedPrice)
		const priceStats = getPricestats(appendedPrice)
		const finalResults = {
			...metadata,
			priceStats,
			searchQuery: {
				item,
				stores: _stores.join(','),
				createdAt: getTime(new Date()),
			},
			items: shuffle(appendedPrice),
		}
		await db
			.collection(DB_PRODUCT_COLLECTION)
			.doc(req.query.item)
			.collection(PRODUCT_COLLECTION)
			.doc()
			.set(finalResults)
		// send final results to client
		res.json(finalResults)
		console.log('done  👍  👍 -------------------------')
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// ************************* util functions*****************************//
// ********************************************************************//
// 1

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

// *******************************************************//
// 2
// *******************************************************//
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
// *******************************************************//
// 3
// *******************************************************//
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
// *******************************************************//
// 4
// *******************************************************//

const getProductsInDb = async (item, stores) => {
	// find the last 3 days equivalent in milliseconds
	const lastUpdatedDate = getTime(subDays(new Date(), 3)) // typeof ==> number
	const _stores = stores.join(',') //convert stores to a string
	const QueryRef = db
		.collectionGroup(PRODUCT_COLLECTION)
		.where('searchQuery.item', '==', item)
		.where('searchQuery.stores', '==', _stores)
		.where('searchQuery.createdAt', '>=', lastUpdatedDate)

	try {
		return QueryRef.get().then(function (snap) {
			let documents = []
			snap.forEach(function (doc) {
				documents.push({ ...doc.data(), id: doc.id })
			})
			if (documents.length) {
				console.log('found query in Database')
				console.log(
					'sending products to client --------------------------------'
				)
				return documents[0]
			}
		})
	} catch (error) {
		console.log('------------------------------------')
		console.log(error.message, 'couldnt get object big bro!', error.message)
		console.log('------------------------------------')
		return
	}
}
