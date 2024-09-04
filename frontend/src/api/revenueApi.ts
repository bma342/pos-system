import api from '../services/api';

export const fetchRevenueData = async (dateRange: { startDate: string; endDate: string }) => {
  const response = await api.get('/revenue', { params: dateRange });
  return response.data;
};
