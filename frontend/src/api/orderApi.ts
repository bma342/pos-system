import api from './axios';
import { Order, OrderItem } from '../types';

export const createOrder = async (orderData: Partial<Order>) => {
  return await api.post<Order>('/orders', orderData);
};

export const getActiveOrders = async () => {
  return await api.get<Order[]>('/orders/active');
};

export const cancelOrder = async (orderId: string) => {
  return await api.post<Order>(`/orders/${orderId}/cancel`);
};

export const markItemOutOfStock = async (orderId: string, itemId: string) => {
  return await api.post<OrderItem>(
    `/orders/${orderId}/items/${itemId}/out-of-stock`
  );
};

// Add other order-related API calls as needed
