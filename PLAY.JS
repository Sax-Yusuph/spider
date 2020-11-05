const { getPricestats } = require('./index')

const data = [
	{
		id: 'b93d7b3f-3945-4bd4-aa54-ad42e067357f',
		websiteName: 'jumia',
		productName:
			'Infinix NOTE 6 - X-PEN - 6.01-ch FHD+ (64GB ROM + 4GB RAM) - 16MP/8MP/2MP + 16MP -4000MAH -4G LTE-ANDROID 9 PIE - Black',
		productLink:
			'https://www.jumia.com.ng//infinix-note-6-x-pen-6.01-ch-fhd-64gb-rom-4gb-ram-16mp8mp2mp-16mp-4000mah-4g-lte-android-9-pie-black-42956021.html',
		productImage:
			'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/12/065924/1.jpg?7253',
		productStore: 'not provided',
		productAvailability: '',
		officialBadge: 'not provided',
		price: '₦ 83,000',
		actualPrice: {
			value: 83000,
			dollarPrice: 214.48,
			currency: '₦',
		},
	},
	{
		id: '82930fe5-147f-4cfe-be55-76f02fd2a87f',
		websiteName: 'kara',
		productName: 'Infinix Hot 5 Lite',
		productLink: 'https://www.kara.com.ng/infinix-hot-5-lite',
		productImage:
			'https://www.kara.com.ng/pub/media/catalog/product/cache/acf1a829635e5a35e3be9ccd68062a20/i/n/infinix_hot_5_lite.jpg',
		price: '₦43,120.00',
		actualPrice: {
			value: 43120,
			dollarPrice: 111.42,
			currency: '₦',
		},
	},
	{
		id: '367975d8-5afd-490e-91ef-e04cc8c5cdcf',
		websiteName: 'kara',
		productName: 'Infinix Hot 9 Pro (64GB/4GB)',
		productLink: 'https://www.kara.com.ng/infinix-hot-9-pro-64gb-4gb',
		productImage:
			'https://www.kara.com.ng/pub/media/catalog/product/cache/acf1a829635e5a35e3be9ccd68062a20/i/n/infinix-hot9-play-1_1.jpg',
		price: '₦70,000.00',
		actualPrice: {
			value: 70000,
			dollarPrice: 180.88,
			currency: '₦',
		},
	},
	{
		id: 'dc25fae4-d235-4001-8b65-45e3fb1754db',
		websiteName: 'ebay',
		productName:
			'Infinix Hot 8 Cyan 64 GB 4 GB RAM 6.52" Triple Camera Dual Sim Googleplay Phone',
		productLink:
			'https://www.ebay.com/itm/Infinix-Hot-8-Cyan-64-GB-4-GB-RAM-6-52-Triple-Camera-Dual-Sim-Googleplay-Phone/183941216922?hash=item2ad3c03a9a:g:K2EAAOSwCG5dcLKT',
		productImage:
			'https://i.ebayimg.com/thumbs/images/g/K2EAAOSwCG5dcLKT/s-l225.jpg',
		productAvailability: 'Brand New',
		shipping: '+$29.00 shipping',
		from: 'From India',
		price: '$189.00',
		actualPrice: {
			value: 73141.07,
			dollarPrice: 189,
			currency: '$',
		},
	},
	{
		id: 'e0aa867f-679d-48db-a5d4-adee4657ada1',
		websiteName: 'kara',
		productName: 'Infinix Note 7 - 4GB RAM',
		productLink: 'https://www.kara.com.ng/infinix-note-8',
		productImage:
			'https://www.kara.com.ng/pub/media/catalog/product/cache/acf1a829635e5a35e3be9ccd68062a20/i/n/infinix_note_7_1.jpg',
		price: '₦77,500.00',
		actualPrice: {
			value: 77500,
			dollarPrice: 200.26,
			currency: '₦',
		},
	},
	{
		id: '14274e7a-84bc-4c22-823b-185144d4fedc',
		websiteName: 'jumia',
		productName:
			'Infinix Note 6 (X610B) 6.01" AMOLED (4GB RAM, 64GB ROM) Android 9 Pie,(16MP+8MP+2MP) Triple +16MP 4000mAh 4G LTE Smartphone',
		productLink:
			'https://www.jumia.com.ng//note-6-x610b-6.01-amoled-4gb-ram-64gb-rom-16mp-triple-camera-4g-4000mah-fingerprint-pen-aqua-blue-infinix-mpg340204.html',
		productImage:
			'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/02/343524/1.jpg?9653',
		productStore: 'not provided',
		productAvailability: '',
		officialBadge: 'not provided',
		price: '₦ 85,000',
		actualPrice: {
			value: 85000,
			dollarPrice: 219.64,
			currency: '₦',
		},
	},
	{
		id: 'cea28cef-5f6b-4b17-be7f-575f488c4b91',
		websiteName: 'ebay',
		productName:
			'Infinix Smart 3 Plus Black,32 GB 2 GB RAM 6.21" Dual SIM 4G Googleplay Phone',
		productLink:
			'https://www.ebay.com/itm/Infinix-Smart-3-Plus-Black-32-GB-2-GB-RAM-6-21-Dual-SIM-4G-Googleplay-Phone/183788281256?hash=item2acaa29da8:g:MlsAAOSwgaNcwW9M',
		productImage:
			'https://i.ebayimg.com/thumbs/images/g/MlsAAOSwgaNcwW9M/s-l225.jpg',
		productAvailability: 'Brand New',
		shipping: '+$18.17 shipping',
		from: 'From India',
		price: '$128.59',
		actualPrice: {
			value: 49534.7,
			dollarPrice: 128,
			currency: '$',
		},
	},
	{
		id: 'b93d7b3f-3945-4bd4-aa54-ad42e067357f',
		websiteName: 'jumia',
		productName:
			'Infinix NOTE 6 - X-PEN - 6.01-ch FHD+ (64GB ROM + 4GB RAM) - 16MP/8MP/2MP + 16MP -4000MAH -4G LTE-ANDROID 9 PIE - Black',
		productLink:
			'https://www.jumia.com.ng//infinix-note-6-x-pen-6.01-ch-fhd-64gb-rom-4gb-ram-16mp8mp2mp-16mp-4000mah-4g-lte-android-9-pie-black-42956021.html',
		productImage:
			'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/12/065924/1.jpg?7253',
		productStore: 'not provided',
		productAvailability: '',
		officialBadge: 'not provided',
		price: '₦ 83,000',
		actualPrice: {
			value: 83000,
			dollarPrice: 214.48,
			currency: '₦',
		},
	},
	{
		id: '82930fe5-147f-4cfe-be55-76f02fd2a87f',
		websiteName: 'kara',
		productName: 'Infinix Hot 5 Lite',
		productLink: 'https://www.kara.com.ng/infinix-hot-5-lite',
		productImage:
			'https://www.kara.com.ng/pub/media/catalog/product/cache/acf1a829635e5a35e3be9ccd68062a20/i/n/infinix_hot_5_lite.jpg',
		price: '₦43,120.00',
		actualPrice: {
			value: 43120,
			dollarPrice: 111.42,
			currency: '₦',
		},
	},
	{
		id: '367975d8-5afd-490e-91ef-e04cc8c5cdcf',
		websiteName: 'kara',
		productName: 'Infinix Hot 9 Pro (64GB/4GB)',
		productLink: 'https://www.kara.com.ng/infinix-hot-9-pro-64gb-4gb',
		productImage:
			'https://www.kara.com.ng/pub/media/catalog/product/cache/acf1a829635e5a35e3be9ccd68062a20/i/n/infinix-hot9-play-1_1.jpg',
		price: '₦70,000.00',
		actualPrice: {
			value: 70000,
			dollarPrice: 180.88,
			currency: '₦',
		},
	},
	{
		id: 'dc25fae4-d235-4001-8b65-45e3fb1754db',
		websiteName: 'ebay',
		productName:
			'Infinix Hot 8 Cyan 64 GB 4 GB RAM 6.52" Triple Camera Dual Sim Googleplay Phone',
		productLink:
			'https://www.ebay.com/itm/Infinix-Hot-8-Cyan-64-GB-4-GB-RAM-6-52-Triple-Camera-Dual-Sim-Googleplay-Phone/183941216922?hash=item2ad3c03a9a:g:K2EAAOSwCG5dcLKT',
		productImage:
			'https://i.ebayimg.com/thumbs/images/g/K2EAAOSwCG5dcLKT/s-l225.jpg',
		productAvailability: 'Brand New',
		shipping: '+$29.00 shipping',
		from: 'From India',
		price: '$189.00',
		actualPrice: {
			value: 73141.07,
			dollarPrice: 189,
			currency: '$',
		},
	},
	{
		id: 'e0aa867f-679d-48db-a5d4-adee4657ada1',
		websiteName: 'kara',
		productName: 'Infinix Note 7 - 4GB RAM',
		productLink: 'https://www.kara.com.ng/infinix-note-8',
		productImage:
			'https://www.kara.com.ng/pub/media/catalog/product/cache/acf1a829635e5a35e3be9ccd68062a20/i/n/infinix_note_7_1.jpg',
		price: '₦77,500.00',
		actualPrice: {
			value: 77500,
			dollarPrice: 200.26,
			currency: '₦',
		},
	},
	{
		id: '14274e7a-84bc-4c22-823b-185144d4fedc',
		websiteName: 'jumia',
		productName:
			'Infinix Note 6 (X610B) 6.01" AMOLED (4GB RAM, 64GB ROM) Android 9 Pie,(16MP+8MP+2MP) Triple +16MP 4000mAh 4G LTE Smartphone',
		productLink:
			'https://www.jumia.com.ng//note-6-x610b-6.01-amoled-4gb-ram-64gb-rom-16mp-triple-camera-4g-4000mah-fingerprint-pen-aqua-blue-infinix-mpg340204.html',
		productImage:
			'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/02/343524/1.jpg?9653',
		productStore: 'not provided',
		productAvailability: '',
		officialBadge: 'not provided',
		price: '₦ 85,000',
		actualPrice: {
			value: 85000,
			dollarPrice: 219.64,
			currency: '₦',
		},
	},
	{
		id: 'cea28cef-5f6b-4b17-be7f-575f488c4b91',
		websiteName: 'ebay',
		productName:
			'Infinix Smart 3 Plus Black,32 GB 2 GB RAM 6.21" Dual SIM 4G Googleplay Phone',
		productLink:
			'https://www.ebay.com/itm/Infinix-Smart-3-Plus-Black-32-GB-2-GB-RAM-6-21-Dual-SIM-4G-Googleplay-Phone/183788281256?hash=item2acaa29da8:g:MlsAAOSwgaNcwW9M',
		productImage:
			'https://i.ebayimg.com/thumbs/images/g/MlsAAOSwgaNcwW9M/s-l225.jpg',
		productAvailability: 'Brand New',
		shipping: '+$18.17 shipping',
		from: 'From India',
		price: '$128.59',
		actualPrice: {
			value: 49534.7,
			dollarPrice: 128,
			currency: '$',
		},
	},
	{
		id: 'b93d7b3f-3945-4bd4-aa54-ad42e067357f',
		websiteName: 'jumia',
		productName:
			'Infinix NOTE 6 - X-PEN - 6.01-ch FHD+ (64GB ROM + 4GB RAM) - 16MP/8MP/2MP + 16MP -4000MAH -4G LTE-ANDROID 9 PIE - Black',
		productLink:
			'https://www.jumia.com.ng//infinix-note-6-x-pen-6.01-ch-fhd-64gb-rom-4gb-ram-16mp8mp2mp-16mp-4000mah-4g-lte-android-9-pie-black-42956021.html',
		productImage:
			'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/12/065924/1.jpg?7253',
		productStore: 'not provided',
		productAvailability: '',
		officialBadge: 'not provided',
		price: '₦ 83,000',
		actualPrice: {
			value: 83000,
			dollarPrice: 214.48,
			currency: '₦',
		},
	},
	{
		id: '82930fe5-147f-4cfe-be55-76f02fd2a87f',
		websiteName: 'kara',
		productName: 'Infinix Hot 5 Lite',
		productLink: 'https://www.kara.com.ng/infinix-hot-5-lite',
		productImage:
			'https://www.kara.com.ng/pub/media/catalog/product/cache/acf1a829635e5a35e3be9ccd68062a20/i/n/infinix_hot_5_lite.jpg',
		price: '₦43,120.00',
		actualPrice: {
			value: 43120,
			dollarPrice: 111.42,
			currency: '₦',
		},
	},
	{
		id: '367975d8-5afd-490e-91ef-e04cc8c5cdcf',
		websiteName: 'kara',
		productName: 'Infinix Hot 9 Pro (64GB/4GB)',
		productLink: 'https://www.kara.com.ng/infinix-hot-9-pro-64gb-4gb',
		productImage:
			'https://www.kara.com.ng/pub/media/catalog/product/cache/acf1a829635e5a35e3be9ccd68062a20/i/n/infinix-hot9-play-1_1.jpg',
		price: '₦70,000.00',
		actualPrice: {
			value: 70000,
			dollarPrice: 180.88,
			currency: '₦',
		},
	},
	{
		id: 'dc25fae4-d235-4001-8b65-45e3fb1754db',
		websiteName: 'ebay',
		productName:
			'Infinix Hot 8 Cyan 64 GB 4 GB RAM 6.52" Triple Camera Dual Sim Googleplay Phone',
		productLink:
			'https://www.ebay.com/itm/Infinix-Hot-8-Cyan-64-GB-4-GB-RAM-6-52-Triple-Camera-Dual-Sim-Googleplay-Phone/183941216922?hash=item2ad3c03a9a:g:K2EAAOSwCG5dcLKT',
		productImage:
			'https://i.ebayimg.com/thumbs/images/g/K2EAAOSwCG5dcLKT/s-l225.jpg',
		productAvailability: 'Brand New',
		shipping: '+$29.00 shipping',
		from: 'From India',
		price: '$189.00',
		actualPrice: {
			value: 73141.07,
			dollarPrice: 189,
			currency: '$',
		},
	},
	{
		id: 'e0aa867f-679d-48db-a5d4-adee4657ada1',
		websiteName: 'kara',
		productName: 'Infinix Note 7 - 4GB RAM',
		productLink: 'https://www.kara.com.ng/infinix-note-8',
		productImage:
			'https://www.kara.com.ng/pub/media/catalog/product/cache/acf1a829635e5a35e3be9ccd68062a20/i/n/infinix_note_7_1.jpg',
		price: '₦77,500.00',
		actualPrice: {
			value: 77500,
			dollarPrice: 200.26,
			currency: '₦',
		},
	},
	{
		id: '14274e7a-84bc-4c22-823b-185144d4fedc',
		websiteName: 'jumia',
		productName:
			'Infinix Note 6 (X610B) 6.01" AMOLED (4GB RAM, 64GB ROM) Android 9 Pie,(16MP+8MP+2MP) Triple +16MP 4000mAh 4G LTE Smartphone',
		productLink:
			'https://www.jumia.com.ng//note-6-x610b-6.01-amoled-4gb-ram-64gb-rom-16mp-triple-camera-4g-4000mah-fingerprint-pen-aqua-blue-infinix-mpg340204.html',
		productImage:
			'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/02/343524/1.jpg?9653',
		productStore: 'not provided',
		productAvailability: '',
		officialBadge: 'not provided',
		price: '₦ 85,000',
		actualPrice: {
			value: 85000,
			dollarPrice: 219.64,
			currency: '₦',
		},
	},
	,
]

// const priceStats = getPricestats(data)
// console.log('------------------------------------')
// console.log(priceStats)
// console.log('------------------------------------')

const prices = data.map(item => {
	if (typeof item === 'undefined') return
	return item.actualPrice && item.actualPrice.value
})
console.log('------------------------------------')
console.log(prices)
console.log('------------------------------------')
