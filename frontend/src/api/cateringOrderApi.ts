import apiClient from './apiClient';
import { OrderStatistics } from '../types/cateringOrderTypes';

export const cateringOrderApi = {
  // ... other methods

  getOrderStatistics: async (clientId: string, startDate: string, endDate: string): Promise<OrderStatistics> => {
    const response = await apiClient.get(`/catering-orders/statistics/${clientId}`, {
      params: { startDate, endDate },
    });
    return response.data;
  },
};
