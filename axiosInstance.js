// axiosInstance.js
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL; 

const axiosInstance = axios.create({
  baseURL,
});



// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    config.url !=="/users/login" && (config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`);
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
