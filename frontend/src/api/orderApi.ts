import axios from 'axios';
import { Order } from '../types/orderTypes';

export const orderApi = {
  getOrders: async (clientId: string): Promise<Order[]> => {
    const response = await axios.get(`/api/orders/${clientId}`);
    return response.data;
  },

  createOrder: async (clientId: string, orderData: Omit<Order, 'id'>): Promise<Order> => {
    const response = await axios.post(`/api/orders/${clientId}`, orderData);
    return response.data;
  },
};
