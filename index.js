const axios = require('axios')
const format_res = require('./utils/format_res')
const fetchData = require('./utils/get_store')

// const defaultUserRequest = {
// 	item: 'infinix hot 8',
// 	urls: ['Konga', 'Jumia', 'AliExpress', 'Kara', 'Ebay', 'Slot'],
// }

exports.crawler =
	('/run',
	(req, res) => {
		console.log(req.query)
		const { item, stores } = req.query
		let _stores

		// check if the store query is 'all'
		if (stores === 'all' && typeof stores === 'string') {
			_stores = ['konga', 'jumia', 'aliexpress', 'kara', 'ebay', 'slot']
		} else {
			_stores = stores.split(',')
		}

		// format the urls to have an actual http url
		const formattedURLs = format_res({ item, stores: _stores })

		Promise.all([...formattedURLs.urls.map(fetchData)])
			.then(results => {
                const formatted_results = results.flat().filter(res => res.price !== '')
                const metadata = getmeta(formatted_results)
                console.log(metadata)
				res.json(formatted_results)
			})
			.catch(e => console.log(e.message))
	})


    const getmeta =(data)=>{
        const filter = data.filter(item => item.websiteName === 'jumia')[0]
        const meta = await axios.get(filter.link)
        return meta.data
    }