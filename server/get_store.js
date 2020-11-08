const axios = require('axios')
const fs = require('fs')
const {
	scrapJumia,
	scrapKara,
	scrapSlot,
	scrapEbay,
	scrapFemtech,
} = require('../scrapStore')

exports.fetchData = URL => {
	if (!URL)
		throw new Error(
			"url is for this website is not specified, check 'format_res.js' //--getstore.js --fetchdata"
		)
	return axios
		.get(URL)
		.then(function (response) {
			let uri = URL.split('.')[1].includes('ng/?s=')
				? 'slot'
				: URL.split('.')[1]
			switch (uri) {
				case 'jumia':
					return scrapJumia(response.data)
				case 'ebay':
					return scrapEbay(response.data)
				case 'slot':
					return scrapSlot(response.data)
				case 'kara':
					return scrapKara(response.data)
				case 'femtech':
					// fs.writeFileSync('./femtech.html', response.data)
					return scrapFemtech(response.data)
			}
		})
		.catch(function (error) {
			return { error: error.message + '---fetchData' }
		})
}
