import axios from 'axios';
import { Order, User } from '../types/orderTypes';
import logger from '../utils/logger';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const placeOrder = async (order: Omit<Order, 'id'>): Promise<Order> => {
  try {
    const response = await api.post<Order>('/orders', order);
    logger.info('Order placed successfully', { orderId: response.data.id });
    return response.data;
  } catch (error) {
    logger.error('Error placing order', error);
    throw error;
  }
};

export const fetchOrderData = async (): Promise<Order[]> => {
  try {
    const response = await api.get<Order[]>('/orders');
    logger.info('Fetched order data successfully');
    return response.data;
  } catch (error) {
    logger.error('Error fetching order data', error);
    throw error;
  }
};

export const getUser = async (userId: string): Promise<User> => {
  try {
    const response = await api.get<User>(`/users/${userId}`);
    logger.info('Fetched user data successfully', { userId });
    return response.data;
  } catch (error) {
    logger.error('Error fetching user data', error);
    throw error;
  }
};

// Add more API functions as needed