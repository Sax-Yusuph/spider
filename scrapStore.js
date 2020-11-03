const cheerio = require('cheerio')
const uuidv4 = require('uuid').v4
const { getActualPrice } = require('./server/formatPrice')
const fs = require('fs')

exports.scrapJumia = html => {
	const $ = cheerio.load(html)
	const products = $('a[class=core]') || 'unable to get'
	const jumiaProducts = []

	products.each(async function () {
		const productName = $(this).find('.info > .name').text()
		const productLink = $(this).attr('href')
		const productStore =
			$(this).find('.shop-logo > span').text() || 'not provided'

		// const oldPrice = $(this).find('.info > .s-prc-w > .old').text()
		const price = $(this).find('.info > .prc').text()

		const official =
			$(this).find('.top-badge > img').attr('src') || 'not provided'
		const info = $(this).find('.info > .tag').text()
		const productImage = $(this).find('.img-c > img').attr('data-src')

		jumiaProducts.push({
			id: uuidv4(),
			websiteName: 'jumia',
			productName,
			productLink: `https://www.jumia.com.ng/${productLink}`,
			productImage,
			productStore,
			productAvailability: info,
			officialBadge: official,
			// oldPrice,
			price,
			// actualPrice: await getActualPrice(price),
		})
	})

	// console.log(jumiaProducts)
	return jumiaProducts
}

exports.scrapKonga = html => {
	const $ = cheerio.load(html)
	const products = $('.a2cf5_2S5q5.cf5dc_3HhOq')
	const kongaProducts = []

	products.each(async function () {
		const productName = $(this)
			.find('._4941f_1HCZm > a > .af885_1iPzH > h3')
			.text()
		const productLink = $(this).find('._4941f_1HCZm > a ').attr('href')
		const productStore =
			$(this).find('._4941f_1HCZm > form > ._7cc7b_23GsY').text() ||
			'not provided'

		const oldPrice = $(this).find('._4e81a_39Ehs > .f6eb3_1MyTu').text()

		// DO THIS LATER
		const price = $(this).find('._4e81a_39Ehs > .d7c0f_sJAqi').text()

		const official =
			$(this).find('.top-badge > img').attr('src') || 'not provided'
		const info = $(this).find('._4941f_1HCZm > form > ._09e22_1ojNd').text()
		const infoAlt = $(this).find('._4941f_1HCZm > form > ._7c514_GMwE8').text()
		const productImage = $(this)
			.find('._7e903_3FsI6 > a > picture')
			.children()
			.first()
			.attr('data-srcset')

		kongaProducts.push({
			id: uuidv4(),
			websiteName: 'konga',
			productName,
			productLink: `https://www.konga.com${productLink}`,
			productImage,
			productStore,
			productAvailability: info,
			pickUp: infoAlt,
			officialBadge: official,
			// oldPrice,
			price,
			// actualPrice: await getActualPrice(price),
		})
	})

	// console.log(kongaProducts)
	return kongaProducts
}

/*****************************
 SLOT NG
 **********************************************/
exports.scrapSlot = html => {
	const $ = cheerio.load(html)
	const products = $('.product-inner')
	const slotProducts = []

	products.each(async function () {
		const productName = $(this).find('.mf-product-content > h2').text()
		const productLink = $(this).find('.mf-product-thumbnail > a ').attr('href')

		const price = $(this)
			.find('.mf-product-price-box> .price > .woocommerce-Price-amount.amount')
			.text()
		const productImage = $(this)
			.find('.mf-product-thumbnail > a > img')
			.attr('src')

		slotProducts.push({
			id: uuidv4(),
			websiteName: 'slot',
			productName,
			productLink,
			productImage,
			price,
			// actualPrice: await getActualPrice(price),
		})
	})

	// console.log(slotProducts)
	return slotProducts
}

/*****************************
 FEMTECH IT  ************** beta !!!!!!!!
 **********************************************/
exports.scrapFemtech = html => {
	const $ = cheerio.load(html)
	const products = $('.product-item-container.cartinfo--center')
	const femtechProducts = []
	products.each(function () {
		const productName = $(this).find('.caption > h4').text()
		const productLink = $(this).find('h4 > a').attr('href')

		const price = $(this).find('.price-new').text()
		const productImage = $(this)
			.find('.product-image-container img')
			.attr('src')

		femtechProducts.push({
			id: uuidv4(),
			websiteName: 'femtech',
			productName,
			productLink,
			productImage,
			price,
			// actualPrice: price ? await getActualPrice(price) : null,
		})
	})

	// console.log(slotProducts)
	return femtechProducts
}

/*****************************
 KARA NG
 **********************************************/
exports.scrapKara = html => {
	const $ = cheerio.load(html)
	const products = $('.product-item-info')
	const karaProducts = []

	products.each(async function () {
		const productName = $(this).find('.product-item-name > a').text()
		const productLink = $(this).find('.product-item-name > a').attr('href')

		const price = $(this)
			.find(".price-wrapper[data-price-type='finalPrice']")
			.text()
		const productImage = $(this).find('img.product-image-photo ').attr('src')

		karaProducts.push({
			id: uuidv4(),
			websiteName: 'kara',
			productName,
			productLink,
			productImage,
			price,
			// actualPrice: await getActualPrice(price),
		})
	})

	// console.log(karaProducts)
	return karaProducts
}

/*****************************
 EBAY STORE
 **********************************************/
exports.scrapEbay = html => {
	const $ = cheerio.load(html)
	const products = $('.s-item__wrapper')
	const EbayProducts = []

	products.each(async function () {
		const productName = $(this).find('.s-item__title').text()
		const productLink = $(this).find('.s-item__info > a ').attr('href')

		// DO THIS LATER
		const price = $(this)
			.find('.s-item__detail--primary > .s-item__price ')
			.text()

		const info = $(this).find('.s-item__subtitle > .SECONDARY_INFO').text()
		const shipping = $(this)
			.find('.s-item__detail--primary > .s-item__logisticsCost')
			.text()
		const infoAlt = $(this).find('.s-item__detail--secondary > span ').text()
		const productImage = $(this)
			.find('.s-item__image-wrapper > img')
			.attr('src')

		EbayProducts.push({
			id: uuidv4(),
			websiteName: 'ebay',
			productName,
			productLink,
			productImage,
			productAvailability: info,
			shipping,
			from: infoAlt,
			price,
			// actualPrice: await getActualPrice(price),
		})
	})

	// console.log(EbayProducts)
	return EbayProducts
}

exports.scrapMetadata = html => {
	const $ = cheerio.load(html)
	const description = $('.markup.-mhm.-pvl.-oxa.-sc').text()
	const stars = $('.stars._s._al').text()
	const details = $('.-plxs.-fs14._more').text()
	const name = $('.-fs20.-pts.-pbxs').text()
	const brandText = $('.-fs14.-pvxs').text()
	const price = $('.-b.-ltr.-tal.-fs24').text()
	return {
		id: uuidv4(),
		name,
		description,
		rating: { stars, details },
		brand: brandText.split(':')[1].split('|')[0],
		price,
	}
}

// module.exports = {
// 	scrapJumia,
// 	scrapKonga,
// 	scrapEbay,
// 	scrapSlot,
// 	scrapKara,
// 	scrapMetadata,
// }
