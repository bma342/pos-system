import axios from 'axios';
import { SalesByCategory } from '../types/analyticsTypes';

export class AnalyticsService {
  async getSalesByCategory(
    startDate?: string,
    endDate?: string
  ): Promise<SalesByCategory[]> {
    const response = await axios.get('/api/analytics/sales-by-category', {
      params: { startDate, endDate },
    });
    return response.data;
  }

  async getTopSellingItems(
    startDate?: string,
    endDate?: string
  ): Promise<TopSellingItem[]> {
    const response = await axios.get('/api/analytics/top-selling-items', {
      params: { startDate, endDate },
    });
    return response.data;
  }

  // Add other analytics methods as needed
}
