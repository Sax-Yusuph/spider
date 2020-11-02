const { priceRef } = require('./firestoreConfig')
const axios = require('axios')
const PRICE_API = `http://data.fixer.io/api/latest?access_key=ee494e06bf479f7ce900d42c6494aa8e&base=EUR&symbols=NGN,USD`

//************************ Get Prices */
exports.getPrices = data => {
	if (data.length === 0) return
	return data.map(item => item.actualPrice.value)
}

//************************ Get Highest Price */
exports.getHigestPrice = prices => {
	if (data.length === 0) return
	return prices.reduce((a, b) => Math.max(a, b))
}
//************************ Get Lowest Price */
exports.getLowestPrice = prices => {
	if (data.length === 0) return
	return prices.reduce((a, b) => Math.min(a, b))
}
//************************Get Average Price */
exports.getAveragePrice = prices => {
	const totalPrice = prices.reduce((a, b) => a + b)
	return totalPrice / prices.length
}

//************************ change Price String to Number */

exports.getActualPrice = async price => {
	if (!price) return { error: 'price not provided' }
	try {
		const str = price.split('-')[0].split('.')[0].match(/\d+/g)
		if (str && price.includes('₦')) {
			const nairaPrice = parseFloat(str.join(''))
			const dollar = await convertToDollar(nairaPrice)
			return {
				value: nairaPrice,
				dollarPrice: Math.floor(dollar),
				currency: '₦',
			}
		} else if (str && price.includes('$')) {
			const dollarPrice = parseFloat(str.join(''))
			const NairaPrice = await convertToNaira(dollarPrice)
			return {
				value: Math.floor(NairaPrice),
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
	}
}

//**@GET DOLLAR RATE *************************/
const getDollarRate = async () => {
	let currencyRate //{ NGN: 452.971532, USD: 1.177161 }

	try {
		const item = await priceRef.get()

		// check if firestore has the price_rate item
		if (item.exists) {
			currencyRate = item.data()
		} else {
			const res = await axios.get(PRICE_API)
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
const convertToNaira = async dollarPrice => {
	try {
		const rate = await getDollarRate()
		if (rate) {
			return dollarPrice * rate
		} else {
			return dollarPrice
		}
	} catch (error) {
		console.log(error.message + ' --convertToNaira')
		return error.message
	}
}
//************************ Convert to Dollar */
const convertToDollar = async nairaPrice => {
	try {
		const rate = await getDollarRate()
		if (rate) {
			return nairaPrice / rate
		} else {
			return nairaPrice
		}
	} catch (error) {
		console.log(error.message + ' --convertToDollar')
		return error.message
	}
}

// module.exports = { getActualPrice }
