import apiClient from './apiClient';
import { CateringOrder, OrderStatus, OrderStatistics } from '../types/cateringOrderTypes';

export const cateringOrderApi = {
  fetchOrders: async (clientId: string, status: OrderStatus): Promise<CateringOrder[]> => {
    const response = await apiClient.get(`/catering-orders/${clientId}`, {
      params: { status },
    });
    return response.data;
  },

  updateOrderStatus: async (clientId: string, orderId: string, newStatus: OrderStatus): Promise<CateringOrder> => {
    const response = await apiClient.put(`/catering-orders/${clientId}/${orderId}/status`, { status: newStatus });
    return response.data;
  },

  deleteOrder: async (clientId: string, orderId: string): Promise<void> => {
    await apiClient.delete(`/catering-orders/${clientId}/${orderId}`);
  },

  getOrderStatistics: async (clientId: string, startDate: string, endDate: string): Promise<OrderStatistics> => {
    const response = await apiClient.get(`/catering-orders/statistics/${clientId}`, {
      params: { startDate, endDate },
    });
    return response.data;
  },
};
