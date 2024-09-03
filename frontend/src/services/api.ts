import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from 'axios';
import { store } from '../redux/store';
import { logout as logoutAction } from '../redux/slices/authSlice';
import logger from '../utils/logger';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError | Error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/auth/refresh', { refreshToken });
        const newToken = response.data.token;

        // Update the token in local storage and redux store
        localStorage.setItem('token', newToken);
        store.dispatch({ type: 'auth/setToken', payload: newToken });

        // Retry the original request
        return api(error.config as AxiosRequestConfig);
      } catch (refreshError) {
        store.dispatch(logoutAction());
        if (isAxiosError(refreshError)) {
          logger.error('API Refresh Error:', refreshError);
        } else if (refreshError instanceof Error) {
          logger.error('Refresh Error:', refreshError.message);
        } else {
          logger.error('Unknown refresh token error:', refreshError);
        }
        return Promise.reject(error);
      }
    }
    if (isAxiosError(error)) {
      logger.error('API Error:', error);
    } else {
      logger.error('Non-Axios Error:', error);
    }
    return Promise.reject(error);
  }
);

export const apiCall = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await api(config);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      logger.error('API Call Error:', error);
    } else if (error instanceof Error) {
      logger.error('Non-Axios Error:', error.message);
    } else {
      logger.error('Unknown Error:', error);
    }
    throw error;
  }
};

export const placeOrder = async (orderData: any) => {
  return apiCall({
    method: 'POST',
    url: '/orders',
    data: orderData,
  });
};

export const getUser = async (userId: string) => {
  return apiCall({
    method: 'GET',
    url: `/users/${userId}`,
  });
};

export const login = async (credentials: {
  username: string;
  password: string;
}) => {
  return apiCall({
    method: 'POST',
    url: '/auth/login',
    data: credentials,
  });
};

export const logout = async () => {
  return apiCall({
    method: 'POST',
    url: '/auth/logout',
  });
};

export default api;
