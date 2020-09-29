import axios from 'axios';
const { requireAdmin } = require('./utils');

// trying without local storage:

export async function register({ username, password }) {
	try {
		const {
			data: user,
		} = await axios.post('/api/users/register', {
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
		const { data: cart } = await axios.get(`/api/orders/${customer}`)
		return cart
	} catch (error) {
		throw error
	}

// probably need to add products array here...

export async function addOrder({ customer, status, subtotal, tax, shipping, total, urgency }) {
	try {
		const { data: order } = await axios.post('/api/orders', {
			customer,
            status,
            subtotal, 
            tax, 
            shipping,
            total,
            urgency
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



// check art collector for q strings for long search terms 