import axios from 'axios';
import { POSSettings } from '../redux/slices/posSettingsSlice';

export const posSettingsApi = {
  fetchPOSSettings: async (locationId: string): Promise<POSSettings> => {
    const response = await axios.get(`/api/pos-settings/${locationId}`);
    return response.data;
  },

  updatePOSSettings: async (locationId: string, settings: Partial<POSSettings>): Promise<POSSettings> => {
    const response = await axios.put(`/api/pos-settings/${locationId}`, settings);
    return response.data;
  },
};
