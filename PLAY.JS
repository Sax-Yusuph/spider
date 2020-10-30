// const arr = 'konga,jumia,aliexpress,kara,ebay,slot'
// // console.log(typeof arr)

// if (typeof arr === 'string') {
// 	console.log('true')
// } else {
// 	console.log('false')
// }

const defaultUserRequest = {
	item: 'infinix hot 8',
	urls: ['konga', 'jumia', 'aliExpress', 'kara', 'ebay', 'slot'],
}

// const a = defaultUserRequest.urls.filter(
// 	url => url !== 'jumia' && url !== 'kara' && url !== 'ebay' && url !== 'slot'
// )

const a = defaultUserRequest.urls.filter(
	url => url !== ('jumia' && 'kara' && 'ebay' && 'slot')
)

console.log(a)

const b = 'jumia'
console.log(b.split('-')[0])
