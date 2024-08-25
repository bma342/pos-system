import axiosInstance from './axios';
import { DashboardStat } from '../types';

export const fetchDashboardStats = async (): Promise<DashboardStat[]> => {
  try {
    const response = await axiosInstance.get<DashboardStat[]>(
      '/api/dashboard/stats'
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch dashboard stats');
  }
};
