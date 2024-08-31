import api from './axios';
import { RevenueData } from '../types/revenueTypes';

export const fetchRevenueData = async (): Promise<RevenueData[]> => {
  const response = await api.get<RevenueData[]>('/revenue');
  return response.data;
};