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
    return response.data.data;
  } catch (error) {
    throw error;
  }
};