import { fetchSalesByCategory } from '../api/analyticsApi';
import { SalesByCategory } from '../types/analyticsTypes';

export class AnalyticsService {
  async getSalesByCategory(startDate?: string, endDate?: string): Promise<SalesByCategory[]> {
    return fetchSalesByCategory(startDate, endDate);
  }
}