import axios from 'axios';

// trying without local storage:

export async function adminify({ username, password }) {
	try {
		const { data: user } = await axios.post('/api/users/adminify', {
			username: username,
			password: password,
			admin: true
		});

		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
			return user;
		} else {
			return { message: 'Please login to access these features.' };
		}
	} catch (error) {
		throw error;
	}
}

export async function register({ username, password }) {
	try {
		const { data: user } = await axios.post('/api/users/register', {
			username: username,
			password: password,
		});

		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
			return user;
		} else {
			return { message: 'Please login to access these features.' };
		}
	} catch (error) {
		throw error;
	}
}

export async function login({ username, password }) {
	try {
		const {
			data: user,
		} = await axios.post('api/users/login', {
			username,
			password,
		});
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
			return user;
		}
	} catch (error) {
		throw error;
	}
}

export async function fetchProductsByType(type) {
	try {
		const { data: products } = await axios.get(`/api/products?type=${type}`)
		return products
	} catch (error) {
		throw error
	}
}

export async function fetchProductById(id) {
	try {
		const { data: product } = await axios.get(`/api/products/${id}`)
		console.log('product api', product);
		return product
	} catch (error) {
		throw error
	}
}

export async function fetchOrders() {
	try {
		const { data: orders } = await axios.get(`/api/orders`)
		return orders
	} catch (error) {
		throw error
	}
}

export async function fetchCart(customer) {
	try {
		const { data: result } = await axios.get(`/api/cart`, {
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Authorization':
					'Bearer ' + JSON.parse(localStorage.getItem('user')
					).token
			}
		});

		return result.cart
	} catch (error) {
		throw error
	}
}

export async function addOrder({ customer, status, subtotal, tax, shipping, total, urgency }) {
	try {
		const { data: order } = await axios.post('/api/orders', {
			customer, status, subtotal, tax, shipping, total, urgency
		});
		if (order) {
			return order;
		} else {
			return {};
		}
	} catch (error) {
		throw error;
	}
}

export async function addItemToCart({ id, customer, imageUrl, description, orderId, name, price }) {
	try {
		const user = JSON.parse(localStorage.getItem('user'));
		const { data } = await axios.post(`/api/cart/${id}`, { id, customer, imageUrl, description, orderId, name, price }, {
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Authorization': 'Bearer ' + user.token
			},
			body: {
				'Customer': user.customer
			}
		});
		console.log('add item', data)
		if (data) {
			return data;
		} else {
			return {};
		}
	} catch (error) {
		throw error
	}
}

export async function deleteItemFromCart(id) {
	try {
		console.log('id from api before axios', id)
		const user = JSON.parse(localStorage.getItem('user'));
		const { data } = await axios.delete(`/api/cart/${id}`,
            {
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Authorization': 'Bearer ' + user.token
				},
				body: {
					'Customer': user.customer
				}
			}
		);
		console.log('DeleteFromCartData', data)
		if (data) {
			return data.cart.id;

		} else {
			return {};
		}
	} catch (error) {
		throw error
	}
}