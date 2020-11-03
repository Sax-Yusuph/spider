const shuffle = require('./server/shuffleArray')

const data = [
	{ a: 'a' },
	{ a: 'b' },
	{ a: '1' },
	{ a: '2' },
	{ a: '5' },
	{ a: '8' },
	{ a: 'f' },
	{ a: 'g' },
]

// const sh = shuffle(data)

// console.log(sh)
const rr = data.flat().filter(res => res.a !== 'b')
console.log('------------------------------------')
console.log(rr)
console.log('------------------------------------')
