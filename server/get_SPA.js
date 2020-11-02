const { skippedResources, blockedResourceTypes } = require('./resource')
const { scrapKonga } = require('../scrapStore')

const get_SPA = async (uri, browser) => {
	const page = await browser.newPage()
	await page.setRequestInterception(true)
	page.on('request', request => {
		const requestUrl = request._url.split('?')[0].split('#')[0]
		if (
			blockedResourceTypes.indexOf(request.resourceType()) !== -1 ||
			skippedResources.some(resource => requestUrl.indexOf(resource) !== -1)
		) {
			request.abort()
			// console.log(`blocked ----- ${requestUrl}`)
		} else {
			console.log(requestUrl)
			request.continue()
		}
	})

	try {
		// NAVIGATE TO THE PAGE VIA PUPPETEEER
		await page.goto(uri, { waitUntil: 'networkidle2', timeout: 0 })
		let html = await page.content()

		switch (uri.split('.')[1]) {
			case 'konga':
				return scrapKonga(html)
			case 'aliexpress':
				return await page.evaluate(() => {
					const products = window.runParams.items
					const ScrapedData = products.map(product => {
						return {
							websiteName: 'ali express',
							productName: product.title,
							productLink: `https:${product.productDetailUrl.split('?')[0]}`,

							newPrice: product.price,
							pickUp: product.logisticsDesc,
							productAvailability: product.tradeDesc,
							productImage: `https:${product.imageUrl}`,
						}
					})
					return ScrapedData
				})
		}
		await page.goto('about:blank')
		await page.close()
	} catch (error) {
		console.log(error.message)
		return error.message
	}
}

module.exports = get_SPA
