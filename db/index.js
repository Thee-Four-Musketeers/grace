module.exports = {
	...require('./users.js'),
	...require('./products.js'),
	...require('./orders.js'),
	...require('./util'),
	...require('./orders_products')
};