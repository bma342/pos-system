import axios from 'axios';
import { POSProfile } from '../types/posTypes';

export const posIntegrationApi = {
  getProfiles: async (clientId: string): Promise<POSProfile[]> => {
    const response = await axios.get(`/api/pos-integration/profiles/${clientId}`);
    return response.data;
  },

  createProfile: async (profile: Omit<POSProfile, 'id'>): Promise<POSProfile> => {
    const response = await axios.post('/api/pos-integration/profiles', profile);
    return response.data;
  },

  updateProfile: async (profile: POSProfile): Promise<POSProfile> => {
    const response = await axios.put(`/api/pos-integration/profiles/${profile.id}`, profile);
    return response.data;
  },

  deleteProfile: async (profileId: string): Promise<void> => {
    await axios.delete(`/api/pos-integration/profiles/${profileId}`);
  },

  syncProfile: async (profileId: string): Promise<POSProfile> => {
    const response = await axios.post(`/api/pos-integration/profiles/${profileId}/sync`);
    return response.data;
  },
};
