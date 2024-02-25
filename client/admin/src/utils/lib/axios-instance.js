import axios from "axios";

/* 
    create an instance of axios
*/
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
  withCredentials: true,
});

export default instance;
