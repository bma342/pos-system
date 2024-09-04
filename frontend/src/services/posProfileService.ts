import api from './api';
import { LocationPOSProfile } from '../types/posTypes';

export const posProfileService = {
  getLocationProfiles: async (locationId: string): Promise<LocationPOSProfile[]> => {
    const response = await api.get(`/locations/${locationId}/pos-profiles`);
    return response.data;
  },

  updateLocationProfile: async (locationId: string, profile: Partial<LocationPOSProfile>): Promise<LocationPOSProfile> => {
    const response = await api.put(`/locations/${locationId}/pos-profiles/${profile.id}`, profile);
    return response.data;
  },

  // Add other methods as needed
};
