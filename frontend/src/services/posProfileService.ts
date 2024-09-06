import axios from 'axios';
import { LocationPOSProfile } from '../types/posTypes';

export const posProfileService = {
  fetchLocationPOSProfiles: async (locationId: string): Promise<LocationPOSProfile[]> => {
    try {
      const response = await axios.get(`/api/locations/${locationId}/pos-profiles`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch POS profiles: ' + (error as Error).message);
    }
  },

  createPOSProfile: async (locationId: string, profile: Omit<LocationPOSProfile, 'id'>): Promise<LocationPOSProfile> => {
    try {
      const response = await axios.post(`/api/locations/${locationId}/pos-profiles`, profile);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create POS profile: ' + (error as Error).message);
    }
  },

  updatePOSProfile: async (locationId: string, profileId: string, profile: Partial<LocationPOSProfile>): Promise<LocationPOSProfile> => {
    try {
      const response = await axios.put(`/api/locations/${locationId}/pos-profiles/${profileId}`, profile);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update POS profile: ' + (error as Error).message);
    }
  },

  deletePOSProfile: async (locationId: string, profileId: string): Promise<void> => {
    try {
      await axios.delete(`/api/locations/${locationId}/pos-profiles/${profileId}`);
    } catch (error) {
      throw new Error('Failed to delete POS profile: ' + (error as Error).message);
    }
  }
};
