import axios from 'axios';
import { LoyaltyReward, LoyaltyConfig } from '../types';

const API_URL = '/api/loyalty';

export const loyaltyService = {
  getLoyaltyRewards: async (): Promise<LoyaltyReward[]> => {
    const response = await axios.get(`${API_URL}/rewards`);
    return response.data;
  },

  createLoyaltyReward: async (
    rewardData: Partial<LoyaltyReward>
  ): Promise<LoyaltyReward> => {
    const response = await axios.post(`${API_URL}/rewards`, rewardData);
    return response.data;
  },

  updateLoyaltyReward: async (
    rewardData: LoyaltyReward
  ): Promise<LoyaltyReward> => {
    const response = await axios.put(
      `${API_URL}/rewards/${rewardData.id}`,
      rewardData
    );
    return response.data;
  },

  deleteLoyaltyReward: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/rewards/${id}`);
  },

  getLoyaltyConfig: async (): Promise<LoyaltyConfig> => {
    const response = await axios.get(`${API_URL}/config`);
    return response.data;
  },

  updateLoyaltyConfig: async (
    configData: LoyaltyConfig
  ): Promise<LoyaltyConfig> => {
    const response = await axios.put(`${API_URL}/config`, configData);
    return response.data;
  },
};
