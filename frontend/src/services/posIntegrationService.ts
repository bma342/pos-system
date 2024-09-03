import axios from 'axios';
import { POSProfile } from '../types/posIntegrationTypes';

export class POSIntegrationService {
  async getProfiles(): Promise<POSProfile[]> {
    const response = await axios.get('/api/core-pos-profiles');
    return response.data;
  }

  async createProfile(profile: Partial<POSProfile>): Promise<POSProfile> {
    const response = await axios.post('/api/core-pos-profiles', profile);
    return response.data;
  }

  async updateProfile(profile: POSProfile): Promise<POSProfile> {
    const response = await axios.put(
      `/api/core-pos-profiles/${profile.id}`,
      profile
    );
    return response.data;
  }

  async deleteProfile(profileId: number): Promise<void> {
    await axios.delete(`/api/core-pos-profiles/${profileId}`);
  }

  async syncProfile(profileId: number): Promise<void> {
    await axios.post(`/api/core-pos-profiles/${profileId}/sync`);
  }
}
