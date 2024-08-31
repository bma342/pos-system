import api from './axios';
import { CustomerMetrics } from '../types/customerTypes';

export const fetchCustomerMetricsData = async (): Promise<CustomerMetrics> => {
  const response = await api.get<CustomerMetrics>('/customer-metrics');
  return response.data;
};