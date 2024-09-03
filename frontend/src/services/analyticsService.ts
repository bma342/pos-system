import { apiClient } from '../api/apiClient';
import { SalesByCategory } from '../types/analyticsTypes';

export class AnalyticsService {
  async getSalesByCategory(startDate?: string, endDate?: string): Promise<SalesByCategory[]> {
    const response = await apiClient.get('/analytics/sales-by-category', {
      params: { startDate, endDate },
    });
    return response.data;
  }

  // Add other analytics-related methods here
}