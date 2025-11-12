import axios from 'axios';

// const backendUrl = import.meta.env.VITE_BACKEND_URL||import.meta.env.VITE_DIRECT_BACKEND_URL;
const backendUrl = import.meta.env.VITE_DIRECT_BACKEND_URL;

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: backendUrl,
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('access_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;