import axios from "../lib/axios-instance";

/* 
  create  products
*/
export const sendPostRequest = async (data, url) => {
  try {
    const response = await axios.post(url, data);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
