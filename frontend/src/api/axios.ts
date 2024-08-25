import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { store } from '../redux/store';
import { refreshToken, logout } from '../redux/slices/authSlice';
import { handleApiError } from '../utils/errorHandler';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    handleApiError(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const action = await store.dispatch(refreshToken());
        if (refreshToken.fulfilled.match(action)) {
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        store.dispatch(logout());
        if (refreshError instanceof Error || axios.isAxiosError(refreshError)) {
          handleApiError(refreshError);
        } else {
          console.error('Unknown refresh token error:', refreshError);
        }
        return Promise.reject(refreshError);
      }
    }

    handleApiError(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
