import axios from 'axios';

// Create an Axios instance with secure configurations
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true, // Allows sending secure cookies with requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptors for request and response
axiosInstance.interceptors.request.use((config) => {
  // Add more secure headers if necessary
  config.headers['X-CSRF-Token'] = document.cookie.match(/csrfToken=([^;]+)/)?.[1];
  return config;
}, (error) => Promise.reject(error));

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized access (e.g., logout or redirect to login)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
