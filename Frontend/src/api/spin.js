// Frontend/src/api/spin.js

import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/spin";

export const spinWheel = async () => {
  try {
    const response = await axios.post(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Spin failed:", error);
    throw error;
  }
};
