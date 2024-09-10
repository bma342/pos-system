import axios from 'axios';
import { Order } from '../types/orderTypes';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const orderApi = {
  getOrders: async (clientId: string): Promise<Order[]> => {
    const response = await axios.get(`${API_BASE_URL}/clients/${clientId}/orders`);
    return response.data;
  },

  getActiveOrders: async (clientId: string): Promise<Order[]> => {
    const response = await axios.get(`${API_BASE_URL}/clients/${clientId}/orders/active`);
    return response.data;
  },

  createOrder: async (clientId: string, orderData: Omit<Order, 'id'>): Promise<Order> => {
    const response = await axios.post(`${API_BASE_URL}/clients/${clientId}/orders`, orderData);
    return response.data;
  },

  cancelOrder: async (clientId: string, orderId: string): Promise<void> => {
    await axios.post(`${API_BASE_URL}/clients/${clientId}/orders/${orderId}/cancel`);
  },

  markItemOutOfStock: async (clientId: string, orderId: string, itemId: string): Promise<void> => {
    await axios.post(`${API_BASE_URL}/clients/${clientId}/orders/${orderId}/items/${itemId}/out-of-stock`);
  },

  updateOrderStatus: async (clientId: string, orderId: string, status: string): Promise<Order> => {
    const response = await axios.put(`/api/orders/${clientId}/${orderId}/status`, { status });
    return response.data;
  },
};
