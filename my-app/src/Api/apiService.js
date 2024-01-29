import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/';

export const fetchItems = async (gender) => {
  try {
    let params = {};
    if (gender) {
      params.gender = gender;
    }

    const response = await axios.get(BASE_URL + 'api/', {
      params: params
    });
    console.log(response)
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (email, password) => {
  try {
    const response = await axios.post(BASE_URL + 'api/register/', {
      email: email,
      password: password
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(BASE_URL + 'api/login/', {
      email: email,
      password: password
    });
    localStorage.setItem('token', response.data.token);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addItemToCart = async (product_id, size) => {

  const api_with_token = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `token ${localStorage.getItem('token')}`
    }
  });

  try {
    const response = await api_with_token.post('api/cart/', {
      product_id: product_id,
      size: size
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchCartItems = async () => {

  const api_with_token = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `token ${localStorage.getItem('token')}`
    }
  });

  try {
    const response = await api_with_token.get('api/cart/');
    return response.data;
  } catch (error) {
    throw error;
  }
};