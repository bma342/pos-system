import axios from 'axios';
import { SalesByCategory, TopSellingItem } from '../types/analyticsTypes';

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

  async getTopSellingItemsCustom(
    startDate: Date,
    endDate: Date,
    limit: number
  ): Promise<TopSellingItem[]> {
    const response = await axios.get('/api/analytics/top-selling-items-custom', {
      params: { startDate, endDate, limit },
    });
    return response.data;
  }

  async getTopSellingItemsDefault(): Promise<TopSellingItem[]> {
    const response = await axios.get('/api/analytics/top-selling-items-default');
    return response.data;
  }
}

export default new AnalyticsService();