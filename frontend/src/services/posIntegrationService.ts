import api from './api';
import { POSProfile } from '../types/posIntegrationTypes';

export const posIntegrationService = {
  getProfiles: async (): Promise<POSProfile[]> => {
    const response = await api.get('/core-pos-profiles');
    return response.data;
  },

  createProfile: async (profile: Partial<POSProfile>): Promise<POSProfile> => {
    const response = await api.post('/core-pos-profiles', profile);
    return response.data;
  },

  updateProfile: async (profile: POSProfile): Promise<POSProfile> => {
    const response = await api.put(`/core-pos-profiles/${profile.id}`, profile);
    return response.data;
  },

  deleteProfile: async (profileId: number): Promise<void> => {
    await api.delete(`/core-pos-profiles/${profileId}`);
  },

  syncProfile: async (profileId: number): Promise<void> => {
    await api.post(`/core-pos-profiles/${profileId}/sync`);
  },
};
