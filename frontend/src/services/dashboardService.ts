import axios from 'axios';
import { DashboardParams, DashboardData } from '../types/dashboardTypes';

export const fetchDashboardDataAPI = async (params: DashboardParams): Promise<DashboardData> => {
  const response = await axios.get<DashboardData>('/api/dashboard', { params });
  return response.data;
};

