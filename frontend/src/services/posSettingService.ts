import api from '../api/apiClient';
import { POSSettings } from '../types/posSettingsTypes';

export const posSettingService = {
  getSettings: async (locationId: string): Promise<POSSettings> => {
    const response = await api.get(`/locations/${locationId}/pos-settings`);
    return response.data;
  },

  updateSettings: async (locationId: string, settings: Partial<POSSettings>): Promise<POSSettings> => {
    const response = await api.put(`/locations/${locationId}/pos-settings`, settings);
    return response.data;
  },
};
