import api from './axios';
import { Order, OrderItem } from '../types';

export const createOrder = async (orderData: Partial<Order>) => {
  try {
    return await api.post<Order>('/orders', orderData);
  } catch (error) {
    throw new Error('Failed to create order');
  }
};

export const getActiveOrders = async () => {
  try {
    return await api.get<Order[]>('/orders/active');
  } catch (error) {
    throw new Error('Failed to fetch active orders');
  }
};

export const cancelOrder = async (orderId: string) => {
  try {
    return await api.post<Order>(`/orders/${orderId}/cancel`);
  } catch (error) {
    throw new Error(`Failed to cancel order ${orderId}`);
  }
};

export const markItemOutOfStock = async (orderId: string, itemId: string) => {
  try {
    return await api.post<OrderItem>(
      `/orders/${orderId}/items/${itemId}/out-of-stock`
    );
  } catch (error) {
    throw new Error(`Failed to mark item ${itemId} out of stock for order ${orderId}`);
  }
};

// Add other order-related API calls as needed
