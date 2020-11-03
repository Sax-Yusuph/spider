exports.format_res = userRequest => {
	const { item, stores } = userRequest
	const BASE_URL = 'https://aqueous-brushlands-22513.herokuapp.com'
	if (!item) throw new Error('incorrect query params ---format.js --format_res')

	if (stores === undefined || stores.length === 0) {
		throw new Error('No stores defined --format_res')
	}

	const urls = stores
		.filter(url => url !== 'konga' && url !== 'aliexpress')
		.map(url => {
			let queryString = item.replace(/\s/g, '+')
			let storeUrl = ''
			switch (url) {
				case 'jumia':
					storeUrl = `https://www.jumia.com.ng/catalog/?q=${queryString}`
					break
				case 'kara':
					storeUrl = `https://www.kara.com.ng/catalogsearch/result/?q=${queryString}`
					break
				case 'slot':
					storeUrl = `https://slot.ng/?s=${queryString}&post_type=product`
					break
				case 'ebay':
					storeUrl = `https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw=${queryString}&_sacat=0`
					break
				case 'femtech':
					storeUrl = `https://femtechit.com/index.php?category_id=0&search=${queryString}&submit_search=&route=product%2Fsearch`
					break
			}
			console.log(storeUrl)
			return storeUrl
		})

	const SPA_Urls = stores
		.filter(url => url === 'konga' || url === 'aliexpress')
		.map(url => {
			let SPAStoreUrl = ''
			let queryString = userRequest.item.replace(/\s/g, '+')
			switch (url) {
				case 'aliexpress':
					SPAStoreUrl = `https://www.aliexpress.com/wholesale?SearchText=${queryString}`
					break
				case 'konga':
					queryString = userRequest.item.replace(/\s/g, '%20')
					SPAStoreUrl = `https://www.konga.com/search?search=${queryString}`
					break
			}
			return SPAStoreUrl
		})

	return {
		urls,
		SPA_Urls,
	}
}

// module.exports = format_res
