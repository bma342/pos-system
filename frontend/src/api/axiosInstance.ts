import axios from 'axios';
import { getSubdomain } from '../utils/subdomain';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const subdomain = getSubdomain();
  if (subdomain) {
    config.headers['X-Subdomain'] = subdomain;
  }
  return config;
});

export default axiosInstance;
