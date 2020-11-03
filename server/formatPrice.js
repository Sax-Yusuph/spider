const { priceRef } = require('./firestoreConfig')
const axios = require('axios')
const PRICE_API = `http://data.fixer.io/api/latest?access_key=ee494e06bf479f7ce900d42c6494aa8e&base=EUR&symbols=NGN,USD`

//************************ Get Prices */
exports.getPrices = data => {
	if (!data && data.length === 0)
		return console.log(
			'something wrong with your data bro --formatPrice.js/getPrices'
		)
	return data.map(item => item.actualPrice && item.actualPrice.value)
}

//************************ Get Highest Price */
exports.getHigestPrice = prices => {
	if (!prices && prices.length === 0)
		return console.log(
			'something wrong with your data bro --formatPrice.js/getHighestPrice'
		)
	return prices.reduce((a, b) => Math.max(a, b))
}
//************************ Get Lowest Price */
exports.getLowestPrice = prices => {
	if (!prices && prices.length === 0)
		return console.log(
			'something wrong with your data bro --formatPrice.js/prices'
		)
	return prices.reduce((a, b) => Math.min(a, b))
}
//************************Get Average Price */
exports.getAveragePrice = prices => {
	const totalPrice = prices.reduce((a, b) => a + b)
	const averagePrice = totalPrice / prices.length
	return +averagePrice.toFixed(2)
}

//************************ change Price String to Number */

exports.getActualPrice = (price, dollarRate) => {
	if (!price && price === 'undefined') return { error: 'price not provided' }
	try {
		const str = price.split('-')[0].split('.')[0].match(/\d+/g)
		if (str && price.includes('₦')) {
			const nairaPrice = parseFloat(str.join(''))
			const dollar = convertToDollar(nairaPrice, dollarRate)
			return {
				value: nairaPrice,
				dollarPrice: dollar && +dollar.toFixed(2),
				currency: '₦',
			}
		} else if (str && price.includes('$')) {
			const dollarPrice = parseFloat(str.join(''))
			const NairaPrice = convertToNaira(dollarPrice, dollarRate)
			return {
				value: NairaPrice && +NairaPrice.toFixed(2),
				dollarPrice,
				currency: '$',
			}
		} else {
			return {
				value: 0, //parseFloat(str.join('')),
				dollarPrice: 0, //parseFloat(str.join('')),
				currency: '',
			}
		}
	} catch (error) {
		console.log(error.message + '---getActualPrice')
		throw new Error(error.message + '---getActualPrice')
	}
}

//**@GET DOLLAR RATE *************************/
exports.getDollarRate = async () => {
	let currencyRate //{ NGN: 452.971532, USD: 1.177161 }

	try {
		const item = await priceRef.get()

		// check if firestore has the price_rate item
		if (item.exists) {
			currencyRate = item.data()
		} else {
			const res = await axios.get(PRICE_API)
			const { rates } = res.data
			await priceRef.set(rates)
			currencyRate = { ...rates }
		}

		const cr = (currencyRate.NGN * 100) / (currencyRate.USD * 100)
		return cr
	} catch (error) {
		console.log(error.message + ' --getDollarRate')
		return error.message
	}
}

//************************ Convert to Naira */
const convertToNaira = (dollarPrice, rate) => {
	if (rate) {
		return dollarPrice * rate
	} else {
		return dollarPrice
	}
}
//************************ Convert to Dollar */
const convertToDollar = (nairaPrice, rate) => {
	if (rate) {
		return nairaPrice / rate
	} else {
		return nairaPrice
	}
}

// module.exports = { getActualPrice }
