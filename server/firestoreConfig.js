const Firestore = require('@google-cloud/firestore')

const PROJECTID = 'pricetrack-292909'
const PRICE_COLLECTION = 'currency-rate'

const initDB = new Firestore({
	projectId: PROJECTID,
	timestampsInSnapshots: true,
})

exports.db = initDB
exports.priceRef = initDB.collection(PRICE_COLLECTION).doc('priceRate')
