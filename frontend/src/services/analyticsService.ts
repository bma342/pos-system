import axios from 'axios';
import { SalesByCategory } from '../redux/slices/analyticsSlice';

export interface TopSellingItem {
  itemName: string;
  quantity: number;
}

export const analyticsService = {
  getSalesByCategory: async (clientId: string): Promise<SalesByCategory[]> => {
    const response = await axios.get(`/api/analytics/sales-by-category/${clientId}`);
    return response.data;
  },
  
  getTopSellingItems: async (clientId: string, startDate: string, endDate: string): Promise<TopSellingItem[]> => {
    const response = await axios.get(`/api/analytics/top-selling-items`, {
      params: { clientId, startDate, endDate }
    });
    return response.data;
  }
};