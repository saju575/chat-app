import axios from "../lib/axios-instance";
export const getDataRequest = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
