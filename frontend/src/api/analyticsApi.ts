import axios from 'axios';
import { TopSellingItem, SalesByCategory, AnalyticsData } from '../types/analyticsTypes';

const BASE_URL = '/api/analytics';

export const fetchTopSellingItems = async (startDate?: string, endDate?: string): Promise<TopSellingItem[]> => {
  const response = await axios.get(`${BASE_URL}/top-selling-items`, { params: { startDate, endDate } });
  return response.data;
};

export const fetchSalesByCategory = async (startDate?: string, endDate?: string): Promise<SalesByCategory[]> => {
  const response = await axios.get(`${BASE_URL}/sales-by-category`, { params: { startDate, endDate } });
  return response.data;
};

export const fetchRevenueOverTime = async (startDate: string, endDate: string, interval: 'day' | 'week' | 'month'): Promise<AnalyticsData[]> => {
  const response = await axios.get(`${BASE_URL}/revenue-over-time`, { params: { startDate, endDate, interval } });
  return response.data;
};

export const fetchCustomerRetentionRate = async (startDate: string, endDate: string): Promise<number> => {
  const response = await axios.get(`${BASE_URL}/customer-retention-rate`, { params: { startDate, endDate } });
  return response.data;
};

export const fetchAverageOrderValue = async (startDate?: string, endDate?: string): Promise<number> => {
  const response = await axios.get(`${BASE_URL}/average-order-value`, { params: { startDate, endDate } });
  return response.data;
};