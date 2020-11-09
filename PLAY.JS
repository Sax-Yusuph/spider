const fs = require('fs')
const cheerio = require('cheerio')
const { getLowestPrice } = require('./server/formatPrice')

const html = fs.readFileSync('./test.html')

const $ = cheerio.load(html)

const img = $('.-fw.-fh').attr(src)
console.log('------------------------------------')
console.log(img)
console.log('------------------------------------')

// const brandText = 'undefined'
// const splitBrand = brandText => {
// 	if (brandText) {
// 		const firstSplit = brandText.includes(':')
// 			? brandText.split(':')[1]
// 			: brandText
// 		const secondSplit = firstSplit.includes('|')
// 			? firstSplit.split('|')[0]
// 			: firstSplit
// 		return secondSplit
// 	} else {
// 		return ''
// 	}
// }

// console.log('------------------------------------')
// console.log(splitBrand(brandText))
// // console.log('------------------------------------')
// const getLowPrice = prices => {
// 	const filter = prices.filter(price => typeof price !== 'undefined')
// 	if (filter.length === 0) return
// 	console.log(filter.length)
// 	console.log(filter.reduce((a, b) => Math.min(a, b)))
// }

// prices = [2]

// getLowPrice(prices)
