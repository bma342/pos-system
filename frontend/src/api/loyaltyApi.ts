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
