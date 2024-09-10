import axios from 'axios';
import { RealtimeMetrics } from '../types/metricsTypes';

export const fetchRealtimeMetrics = async (clientId: string) => {
  const response = await axios.get<RealtimeMetrics>(`/api/metrics/realtime/${clientId}`);
  return response;
};
