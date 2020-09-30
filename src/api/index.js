import axios from 'axios';

// trying without local storage:

export async function adminify ({ username, password }) {
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
}

export async function addOrder({ status, subtotal, tax, shipping, total, urgency, products = [] }) {
	try {
		const { data: order } = await axios.post('/api/orders', { 
            status, subtotal, tax, shipping, total, urgency, products 
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