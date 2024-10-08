import apiClient from './axios';
import { LoyaltyReward } from '../types';

interface LoyaltyProgramData {
  tiers: { name: string; pointThreshold: number }[];
  pointsPerDollar: number;
}

interface LoyaltyChallengeData {
  name: string;
  description: string;
  pointReward: number;
  startDate: string;
  endDate: string;
}

// Fetch loyalty rewards by guest ID
export const fetchLoyaltyRewards = async (
  guestId: number
): Promise<LoyaltyReward[]> => {
  const response = await apiClient.get<LoyaltyReward[]>(
    `/api/loyalty/${guestId}`
  );
  return response.data;
};

// Update loyalty program
export const updateLoyaltyProgram = async (
  clientId: number,
  data: LoyaltyProgramData
): Promise<void> => {
  await apiClient.put(`/api/loyalty/${clientId}`, data);
};

export const upsertLoyaltyChallenge = async (
  challengeData: LoyaltyChallengeData
): Promise<void> => {
  await apiClient.post('/api/loyalty/challenge', challengeData);
};

// Delete a loyalty challenge
export const deleteLoyaltyChallenge = async (
  challengeId: number
): Promise<void> => {
  await apiClient.delete(`/api/loyalty/challenge/${challengeId}`);
};

export const getLoyaltyRewards = async (clientId: string) => fetchLoyaltyRewards(clientId);

export const createLoyaltyReward = async (clientId: string, reward: Omit<LoyaltyReward, 'id'>): Promise<LoyaltyReward> => {
  const response = await apiClient.post<LoyaltyReward>(`/clients/${clientId}/loyalty/rewards`, reward);
  return response.data;
};

export const updateLoyaltyReward = async (clientId: string, id: number, reward: Partial<LoyaltyReward>): Promise<LoyaltyReward> => {
  const response = await apiClient.put<LoyaltyReward>(`/clients/${clientId}/loyalty/rewards/${id}`, reward);
  return response.data;
};

export const deleteLoyaltyReward = async (clientId: string, id: number): Promise<void> => {
  await apiClient.delete(`/clients/${clientId}/loyalty/rewards/${id}`);
};

export const getLoyaltyConfig = async (clientId: string): Promise<LoyaltyConfig> => {
  const response = await apiClient.get<LoyaltyConfig>(`/clients/${clientId}/loyalty/config`);
  return response.data;
};

export const updateLoyaltyConfig = async (clientId: string, config: Partial<LoyaltyConfig>): Promise<LoyaltyConfig> => {
  const response = await apiClient.put<LoyaltyConfig>(`/clients/${clientId}/loyalty/config`, config);
  return response.data;
};
