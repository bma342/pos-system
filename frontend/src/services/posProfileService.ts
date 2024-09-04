import api from '../api/apiClient';
import { POSSettings } from '../types/posSettingsTypes';

export const posProfileService = {
  getLocationProfiles: async (locationId: string): Promise<POSSettings[]> => {
    const response = await api.get(`/locations/${locationId}/pos-profiles`);
    return response.data;
  },

  updateLocationProfile: async (locationId: string, profile: Partial<POSSettings>): Promise<POSSettings> => {
    const response = await api.put(`/locations/${locationId}/pos-profiles/${profile.id}`, profile);
    return response.data;
  },
};
