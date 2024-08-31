import axios from 'axios';
import { RealtimeMetrics } from '../types';

export const fetchRealtimeMetrics = async (
  clientId: string
): Promise<{ data: RealtimeMetrics }> => {
  const response = await axios.get(`/api/clients/${clientId}/realtime-metrics`);
  return response.data;
};
