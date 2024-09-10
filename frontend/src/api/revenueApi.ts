import axios from 'axios';
import { RevenueData } from '../types/revenueTypes';

export const fetchRevenueData = async (clientId: string, startDate: string, endDate: string): Promise<RevenueData[]> => {
  const response = await axios.get(`/api/revenue/${clientId}`, {
    params: { startDate, endDate }
  });
  return response.data;
};
