import axios from 'axios';

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
			return {message: 'Please login to access these features.'};
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

export async function getProductByType({type}){
  try {
    const { data: product } = await axios.get(`/api/products?type=${type}`)

    return product
  } catch (error) {
    throw error 
  }
}

// check art collector for q strings for long search terms 