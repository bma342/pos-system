import axios from 'axios';
import { DashboardData, DateRange } from '../types/dashboardTypes';

export const fetchDashboardDataAPI = async (clientId: string, locationId: string, dateRange: DateRange): Promise<DashboardData> => {
  const response = await axios.get(`/api/dashboard/${clientId}/${locationId}`, {
    params: {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate
    }
  });
  return response.data;
};

