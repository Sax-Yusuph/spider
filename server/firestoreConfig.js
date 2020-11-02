const Firestore = require('@google-cloud/firestore')

const PROJECTID = 'pricetrack-292909'
const PRODUCT_COLLECTION = 'products'
const PRICE_COLLECTION = 'products'
const db = new Firestore({
	projectId: PROJECTID,
	timestampsInSnapshots: true,
})

exports.priceRef = db.collection(PRICE_COLLECTION).doc('priceRate')
exports.productRef = db.collection(PRODUCT_COLLECTION)

// module.exports = { priceRef, productRef }
