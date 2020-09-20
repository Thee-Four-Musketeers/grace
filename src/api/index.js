import axios from 'axios';
import { getProductById } from '../../db/products';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}


// trying without local storage:

export async function register({ username, password }) {
  try {
      const { data: { user: newUser } } = await axios.post('/api/users/register', {
          username: username,
          password: password,
      });
      let user = newUser;
      // if (newUser) {
      //     localStorage.setItem("user", JSON.stringify(newUser));
      //     return newUser;
      // } else {
      //     alert("Please login to access these features.");
      // }

      return newUser
  } catch (error) {
      throw error;
  }
}
export async function login({ username, password }) {
  try {
      const { data: { user } } = await axios.post('/api/users/login', {
          username,
          password
      });
      // if (user) {
      //     localStorage.setItem('user', JSON.stringify(user));
      //     return user;
      // }

      return user 
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