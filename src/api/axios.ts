import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import logger from '../utils/logger';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    logger.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized access
          toast.error('Unauthorized access. Please log in again.');
          // Implement logout functionality here
          break;
        case 403:
          toast.error('You do not have permission to perform this action.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 500:
          toast.error('An unexpected error occurred. Please try again later.');
          break;
        default:
          toast.error('An error occurred. Please try again.');
      }
    } else if (error.request) {
      toast.error('No response received from the server. Please check your internet connection.');
    } else {
      toast.error('An unexpected error occurred. Please try again.');
    }
    logger.error('Response interceptor error:', error);
    return Promise.reject(error);
  }
);

export default api;

// Utility functions for common API operations
export const get = async <T>(url: string, params?: object): Promise<T> => {
  const response = await api.get<T>(url, { params });
  return response.data;
};

export const post = async <T>(url: string, data: object): Promise<T> => {
  const response = await api.post<T>(url, data);
  return response.data;
};

export const put = async <T>(url: string, data: object): Promise<T> => {
  const response = await api.put<T>(url, data);
  return response.data;
};

export const del = async <T>(url: string): Promise<T> => {
  const response = await api.delete<T>(url);
  return response.data;
};