import axios from 'axios';
import { BrandingProfile } from '../types';

const API_URL = '/api/branding';

export const brandingService = {
  getBrandingProfiles: async (): Promise<BrandingProfile[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  createBrandingProfile: async (
    profileData: Partial<BrandingProfile>
  ): Promise<BrandingProfile> => {
    const response = await axios.post(API_URL, profileData);
    return response.data;
  },

  updateBrandingProfile: async (
    profileData: BrandingProfile
  ): Promise<BrandingProfile> => {
    const response = await axios.put(
      `${API_URL}/${profileData.id}`,
      profileData
    );
    return response.data;
  },

  deleteBrandingProfile: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
