import axios from 'axios';
import { Order, OrderStatus } from '../types/orderTypes';

export const orderService = {
  fetchOrders: async (clientId: string): Promise<Order[]> => {
    try {
      const response = await axios.get(`/api/clients/${clientId}/orders`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch orders: ' + (error as Error).message);
    }
  },

  updateOrderStatus: async (clientId: string, orderId: string, status: OrderStatus): Promise<Order> => {
    try {
      const response = await axios.put(`/api/clients/${clientId}/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update order status: ' + (error as Error).message);
    }
  },

  createOrder: async (clientId: string, orderData: Omit<Order, 'id'>): Promise<Order> => {
    try {
      const response = await axios.post(`/api/clients/${clientId}/orders`, orderData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create order: ' + (error as Error).message);
    }
  }
};