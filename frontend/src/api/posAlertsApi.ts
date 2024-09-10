import axios from 'axios';
import { POSAlert } from '../redux/slices/posAlertsSlice';

export const posAlertsApi = {
  getAlerts: async (clientId: string): Promise<POSAlert[]> => {
    const response = await axios.get(`/api/pos-alerts/${clientId}`);
    return response.data;
  },
};