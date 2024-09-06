import axios from 'axios';
import { LoyaltyReward, LoyaltyConfig } from '../types/loyaltyTypes';

export const loyaltyService = {
  getLoyaltyRewards: async (clientId: string, locationId?: string): Promise<LoyaltyReward[]> => {
    const url = locationId 
      ? `/api/clients/${clientId}/locations/${locationId}/loyalty/rewards`
      : `/api/clients/${clientId}/loyalty/rewards`;
    const response = await axios.get(url);
    return response.data;
  },

  createLoyaltyReward: async (clientId: string, locationId: string | undefined, reward: Partial<LoyaltyReward>): Promise<LoyaltyReward> => {
    const url = locationId 
      ? `/api/clients/${clientId}/locations/${locationId}/loyalty/rewards`
      : `/api/clients/${clientId}/loyalty/rewards`;
    const response = await axios.post(url, reward);
    return response.data;
  },

  updateLoyaltyReward: async (reward: LoyaltyReward): Promise<LoyaltyReward> => {
    try {
      const response = await axios.put(`/api/loyalty/rewards/${reward.id}`, reward);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update loyalty reward: ' + (error as Error).message);
    }
  },

  deleteLoyaltyReward: async (rewardId: string): Promise<void> => {
    try {
      await axios.delete(`/api/loyalty/rewards/${rewardId}`);
    } catch (error) {
      throw new Error('Failed to delete loyalty reward: ' + (error as Error).message);
    }
  },

  getLoyaltyConfig: async (): Promise<LoyaltyConfig> => {
    try {
      const response = await axios.get('/api/loyalty/config');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch loyalty config: ' + (error as Error).message);
    }
  },

  updateLoyaltyConfig: async (config: LoyaltyConfig): Promise<LoyaltyConfig> => {
    try {
      const response = await axios.put('/api/loyalty/config', config);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update loyalty config: ' + (error as Error).message);
    }
  },
};
